import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/paddle'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('paddle-signature')!

  // 验证 Webhook 签名
  if (!verifyWebhookSignature(body, signature)) {
    console.error('Invalid webhook signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    const event = JSON.parse(body)
    
    switch (event.event_type) {
      case 'subscription.created':
        await handleSubscriptionCreated(event.data)
        break
      
      case 'subscription.updated':
        await handleSubscriptionUpdated(event.data)
        break
      
      case 'subscription.canceled':
        await handleSubscriptionCanceled(event.data)
        break
      
      case 'transaction.completed':
        await handleTransactionCompleted(event.data)
        break
      
      case 'transaction.payment_failed':
        await handleTransactionFailed(event.data)
        break
      
      default:
        console.log(`Unhandled event type: ${event.event_type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handleSubscriptionCreated(data: any) {
  const subscription = data
  const customerEmail = subscription.customer?.email

  if (!customerEmail) {
    console.error('No customer email in subscription data')
    return
  }

  // 查找用户
  const user = await prisma.user.findUnique({
    where: { email: customerEmail }
  })

  if (!user) {
    console.error('User not found:', customerEmail)
    return
  }

  // 更新用户订阅状态
  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionId: subscription.id,
      subscriptionStatus: 'active',
      subscriptionPlan: 'pro', // 根据实际产品调整
      subscriptionEndsAt: null
    }
  })

  // 创建订阅记录
  await prisma.subscription.create({
    data: {
      stripeSubscriptionId: subscription.id, // 复用字段名
      userId: user.id,
      plan: 'pro',
      status: 'active',
      currentPeriodStart: new Date(subscription.current_billing_period?.starts_at),
      currentPeriodEnd: new Date(subscription.current_billing_period?.ends_at),
      cancelAtPeriodEnd: false
    }
  })

  console.log(`Subscription created for user ${user.id}: ${subscription.id}`)
}

async function handleSubscriptionUpdated(data: any) {
  const subscription = data
  const customerEmail = subscription.customer?.email

  if (!customerEmail) {
    console.error('No customer email in subscription data')
    return
  }

  // 查找用户
  const user = await prisma.user.findUnique({
    where: { email: customerEmail }
  })

  if (!user) {
    console.error('User not found:', customerEmail)
    return
  }

  // 更新用户订阅状态
  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: subscription.status,
      subscriptionEndsAt: subscription.scheduled_change?.action === 'cancel' 
        ? new Date(subscription.scheduled_change.effective_at)
        : null
    }
  })

  // 更新订阅记录
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_billing_period?.starts_at),
      currentPeriodEnd: new Date(subscription.current_billing_period?.ends_at),
      cancelAtPeriodEnd: subscription.scheduled_change?.action === 'cancel'
    }
  })

  console.log(`Subscription updated for user ${user.id}: ${subscription.status}`)
}

async function handleSubscriptionCanceled(data: any) {
  const subscription = data
  const customerEmail = subscription.customer?.email

  if (!customerEmail) {
    console.error('No customer email in subscription data')
    return
  }

  // 查找用户
  const user = await prisma.user.findUnique({
    where: { email: customerEmail }
  })

  if (!user) {
    console.error('User not found:', customerEmail)
    return
  }

  // 更新用户订阅状态
  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'canceled',
      subscriptionPlan: 'free',
      subscriptionEndsAt: new Date(subscription.current_billing_period?.ends_at)
    }
  })

  // 更新订阅记录
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: 'canceled'
    }
  })

  console.log(`Subscription canceled for user ${user.id}`)
}

async function handleTransactionCompleted(data: any) {
  const transaction = data
  const customerEmail = transaction.customer?.email

  if (!customerEmail) {
    console.error('No customer email in transaction data')
    return
  }

  // 查找用户
  const user = await prisma.user.findUnique({
    where: { email: customerEmail }
  })

  if (!user) {
    console.error('User not found:', customerEmail)
    return
  }

  // 记录支付
  await prisma.payment.create({
    data: {
      stripePaymentIntentId: transaction.id, // 复用字段名
      userId: user.id,
      amount: transaction.details?.totals?.total,
      currency: transaction.currency_code,
      status: 'succeeded',
      description: `Subscription payment for ${transaction.items?.[0]?.product?.name || 'NovaMail'}`
    }
  })

  console.log(`Payment completed for user ${user.id}: $${transaction.details?.totals?.total / 100}`)
}

async function handleTransactionFailed(data: any) {
  const transaction = data
  const customerEmail = transaction.customer?.email

  if (!customerEmail) {
    console.error('No customer email in transaction data')
    return
  }

  // 查找用户
  const user = await prisma.user.findUnique({
    where: { email: customerEmail }
  })

  if (!user) {
    console.error('User not found:', customerEmail)
    return
  }

  // 记录失败支付
  await prisma.payment.create({
    data: {
      stripePaymentIntentId: transaction.id, // 复用字段名
      userId: user.id,
      amount: transaction.details?.totals?.total,
      currency: transaction.currency_code,
      status: 'failed',
      description: `Failed subscription payment for ${transaction.items?.[0]?.product?.name || 'NovaMail'}`
    }
  })

  // 更新用户订阅状态
  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'past_due'
    }
  })

  console.log(`Payment failed for user ${user.id}: $${transaction.details?.totals?.total / 100}`)
}


