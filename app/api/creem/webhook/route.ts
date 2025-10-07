import { NextRequest, NextResponse } from 'next/server'
import CreemAPI from '@/lib/creem'
import { prisma } from '@/lib/prisma'

const creem = new CreemAPI({
  apiKey: process.env.CREEM_API_KEY!,
  baseUrl: process.env.CREEM_BASE_URL || 'https://api.creem.com/v1',
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('creem-signature')

    if (!signature) {
      return NextResponse.json({
        success: false,
        error: 'Missing signature'
      }, { status: 400 })
    }

    // 验证Webhook签名
    if (!creem.verifyWebhookSignature(body, signature)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid signature'
      }, { status: 401 })
    }

    const event = JSON.parse(body)

    // 处理不同类型的Webhook事件
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
        console.log('Unhandled webhook event:', event.type)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({
      success: false,
      error: 'Webhook processing failed'
    }, { status: 500 })
  }
}

async function handleSubscriptionCreated(data: any) {
  // 更新用户订阅状态
  await prisma.user.update({
    where: { email: data.customer.email },
    data: {
      subscriptionId: data.id,
      subscriptionStatus: data.status,
      subscriptionPlan: data.plan.name,
      subscriptionStartDate: new Date(data.currentPeriodStart),
      subscriptionEndDate: new Date(data.currentPeriodEnd),
    }
  })
}

async function handleSubscriptionUpdated(data: any) {
  // 更新订阅信息
  await prisma.user.update({
    where: { subscriptionId: data.id },
    data: {
      subscriptionStatus: data.status,
      subscriptionPlan: data.plan.name,
      subscriptionEndDate: new Date(data.currentPeriodEnd),
    }
  })
}

async function handleSubscriptionCanceled(data: any) {
  // 标记订阅为已取消
  await prisma.user.update({
    where: { subscriptionId: data.id },
    data: {
      subscriptionStatus: 'canceled',
      subscriptionEndDate: new Date(data.currentPeriodEnd),
    }
  })
}

async function handlePaymentSucceeded(data: any) {
  // 记录成功支付
  await prisma.payment.create({
    data: {
      userId: data.customer.metadata?.userId,
      subscriptionId: data.subscription,
      amount: data.amount,
      currency: data.currency,
      status: 'succeeded',
      paymentMethod: data.paymentMethod,
      createdAt: new Date(data.created),
    }
  })
}

async function handlePaymentFailed(data: any) {
  // 记录失败支付
  await prisma.payment.create({
    data: {
      userId: data.customer.metadata?.userId,
      subscriptionId: data.subscription,
      amount: data.amount,
      currency: data.currency,
      status: 'failed',
      failureReason: data.failureReason,
      createdAt: new Date(data.created),
    }
  })
}
