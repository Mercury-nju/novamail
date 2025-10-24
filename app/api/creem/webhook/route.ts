import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

// Creem Webhook处理器
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('creem-signature')
    
    // 验证webhook签名（可选，但推荐）
    if (process.env.CREEM_WEBHOOK_SECRET) {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.CREEM_WEBHOOK_SECRET)
        .update(body)
        .digest('hex')
      
      if (signature !== `sha256=${expectedSignature}`) {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        )
      }
    }

    const event = JSON.parse(body)
    console.log('Creem webhook received:', event.type)

    switch (event.type) {
      case 'subscription.created':
        await handleSubscriptionCreated(event.data)
        break
        
      case 'subscription.updated':
        await handleSubscriptionUpdated(event.data)
        break
        
      case 'subscription.canceled':
        await handleSubscriptionCanceled(event.data)
        break
        
      case 'payment.succeeded':
        await handlePaymentSucceeded(event.data)
        break
        
      case 'payment.failed':
        await handlePaymentFailed(event.data)
        break
        
      default:
        console.log('Unhandled webhook event type:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// 处理订阅创建
async function handleSubscriptionCreated(data: any) {
  try {
    const { subscription_id, customer_email, plan_id, status, current_period_end } = data
    
    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email: customer_email }
    })
    
    if (!user) {
      console.error('User not found for email:', customer_email)
      return
    }

    // 创建订阅记录
    await prisma.subscription.create({
      data: {
        creemSubscriptionId: subscription_id,
        userId: user.id,
        plan: plan_id === 'prod_1PTunmBSWBQRUyJjM6g90r' ? 'pro' : 'free',
        status: status,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(current_period_end * 1000)
      }
    })

    // 更新用户订阅状态
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionStatus: status,
        subscriptionPlan: plan_id === 'prod_1PTunmBSWBQRUyJjM6g90r' ? 'pro' : 'free',
        subscriptionEndsAt: new Date(current_period_end * 1000),
        creemSubscriptionId: subscription_id
      }
    })

    console.log(`Subscription created for user ${user.email}`)
  } catch (error) {
    console.error('Error handling subscription created:', error)
  }
}

// 处理订阅更新
async function handleSubscriptionUpdated(data: any) {
  try {
    const { subscription_id, status, current_period_end } = data
    
    // 更新订阅记录
    await prisma.subscription.updateMany({
      where: { creemSubscriptionId: subscription_id },
      data: {
        status: status,
        currentPeriodEnd: new Date(current_period_end * 1000)
      }
    })

    // 更新用户状态
    const subscription = await prisma.subscription.findUnique({
      where: { creemSubscriptionId: subscription_id }
    })

    if (subscription) {
      await prisma.user.update({
        where: { id: subscription.userId },
        data: {
          subscriptionStatus: status,
          subscriptionEndsAt: new Date(current_period_end * 1000)
        }
      })
    }

    console.log(`Subscription updated: ${subscription_id}`)
  } catch (error) {
    console.error('Error handling subscription updated:', error)
  }
}

// 处理订阅取消
async function handleSubscriptionCanceled(data: any) {
  try {
    const { subscription_id } = data
    
    // 更新订阅状态
    await prisma.subscription.updateMany({
      where: { creemSubscriptionId: subscription_id },
      data: {
        status: 'canceled',
        cancelAtPeriodEnd: true
      }
    })

    // 更新用户状态
    const subscription = await prisma.subscription.findUnique({
      where: { creemSubscriptionId: subscription_id }
    })

    if (subscription) {
      await prisma.user.update({
        where: { id: subscription.userId },
        data: {
          subscriptionStatus: 'canceled'
        }
      })
    }

    console.log(`Subscription canceled: ${subscription_id}`)
  } catch (error) {
    console.error('Error handling subscription canceled:', error)
  }
}

// 处理支付成功
async function handlePaymentSucceeded(data: any) {
  try {
    const { subscription_id, amount, currency } = data
    
    // 记录支付记录
    const subscription = await prisma.subscription.findUnique({
      where: { creemSubscriptionId: subscription_id }
    })

    if (subscription) {
      await prisma.payment.create({
        data: {
          creemPaymentId: data.payment_intent_id,
          userId: subscription.userId,
          subscriptionId: subscription.id,
          amount: amount,
          currency: currency,
          status: 'succeeded',
          description: 'Monthly subscription payment'
        }
      })

      // 重置用户使用量（新周期开始）
      await prisma.user.update({
        where: { id: subscription.userId },
        data: {
          emailsSentThisMonth: 0,
          lastUsageReset: new Date()
        }
      })
    }

    console.log(`Payment succeeded for subscription: ${subscription_id}`)
  } catch (error) {
    console.error('Error handling payment succeeded:', error)
  }
}

// 处理支付失败
async function handlePaymentFailed(data: any) {
  try {
    const { subscription_id, failure_reason } = data
    
    // 记录失败的支付
    const subscription = await prisma.subscription.findUnique({
      where: { creemSubscriptionId: subscription_id }
    })

    if (subscription) {
      await prisma.payment.create({
        data: {
          creemPaymentId: data.payment_intent_id,
          userId: subscription.userId,
          subscriptionId: subscription.id,
          amount: data.amount,
          currency: data.currency,
          status: 'failed',
          failureReason: failure_reason,
          description: 'Failed subscription payment'
        }
      })
    }

    console.log(`Payment failed for subscription: ${subscription_id}`)
  } catch (error) {
    console.error('Error handling payment failed:', error)
  }
}
