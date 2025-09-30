import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

const prisma = new PrismaClient()
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break
      
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  const plan = session.metadata?.plan
  const billingCycle = session.metadata?.billingCycle

  if (!userId || !plan) {
    console.error('Missing metadata in checkout session')
    return
  }

  // Update user subscription status
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: 'active',
      subscriptionPlan: plan,
      subscriptionId: session.subscription as string,
    }
  })

  console.log(`User ${userId} subscribed to ${plan} plan`)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  // Find user by Stripe customer ID
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId }
  })

  if (!user) {
    console.error('User not found for customer:', customerId)
    return
  }

  // Update or create subscription record
  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: subscription.id },
    update: {
      status: subscription.status,
      currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
    },
    create: {
      stripeSubscriptionId: subscription.id,
      userId: user.id,
      plan: subscription.metadata?.plan || 'pro',
      status: subscription.status,
      currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
    }
  })

  // Update user subscription status
  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: subscription.status,
      subscriptionEndsAt: (subscription as any).cancel_at_period_end 
        ? new Date((subscription as any).current_period_end * 1000)
        : null,
    }
  })

  console.log(`Subscription updated for user ${user.id}: ${subscription.status}`)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  // Find user by Stripe customer ID
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId }
  })

  if (!user) {
    console.error('User not found for customer:', customerId)
    return
  }

  // Update user subscription status
  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'canceled',
      subscriptionPlan: 'free',
      subscriptionEndsAt: new Date((subscription as any).current_period_end * 1000),
    }
  })

  // Update subscription record
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: 'canceled',
    }
  })

  console.log(`Subscription canceled for user ${user.id}`)
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  
  // Find user by Stripe customer ID
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId }
  })

  if (!user) {
    console.error('User not found for customer:', customerId)
    return
  }

  // Record payment
  await prisma.payment.create({
    data: {
      stripePaymentIntentId: (invoice as any).payment_intent as string,
      userId: user.id,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: 'succeeded',
      description: `Subscription payment for ${invoice.lines.data[0]?.description || 'NovaMail'}`,
    }
  })

  console.log(`Payment succeeded for user ${user.id}: $${invoice.amount_paid / 100}`)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  
  // Find user by Stripe customer ID
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId }
  })

  if (!user) {
    console.error('User not found for customer:', customerId)
    return
  }

  // Record failed payment
  await prisma.payment.create({
    data: {
      stripePaymentIntentId: (invoice as any).payment_intent as string,
      userId: user.id,
      amount: invoice.amount_due,
      currency: invoice.currency,
      status: 'failed',
      description: `Failed subscription payment for ${invoice.lines.data[0]?.description || 'NovaMail'}`,
    }
  })

  // Update user subscription status
  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: 'past_due',
    }
  })

  console.log(`Payment failed for user ${user.id}: $${invoice.amount_due / 100}`)
}


