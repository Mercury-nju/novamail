import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    const body = await request.json()
    const { plan, billingCycle } = body

    if (!plan || !billingCycle) {
      return NextResponse.json({
        success: false,
        error: 'Missing plan or billing cycle'
      }, { status: 400 })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    // Create or get Stripe customer
    let customerId = user.stripeCustomerId
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        metadata: {
          userId: user.id
        }
      })
      
      customerId = customer.id
      
      // Update user with Stripe customer ID
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId }
      })
    }

    // Enterprise plan requires consultation, redirect to contact page
    if (plan === 'enterprise') {
      return NextResponse.json({
        success: false,
        error: 'Enterprise plan requires consultation',
        redirectTo: '/contact'
      }, { status: 400 })
    }

    // Get price ID based on plan and billing cycle
    const priceId = getPriceId(plan, billingCycle)
    
    if (!priceId) {
      return NextResponse.json({
        success: false,
        error: 'Invalid plan or billing cycle'
      }, { status: 400 })
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
        plan: plan,
        billingCycle: billingCycle
      }
    })

    return NextResponse.json({
      success: true,
      sessionId: checkoutSession.id,
      url: checkoutSession.url
    })

  } catch (error) {
    console.error('Create checkout session error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to create checkout session'
    }, { status: 500 })
  }
}

function getPriceId(plan: string, billingCycle: string): string | null {
  const planConfig = {
    pro: {
      monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
      yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
    }
    // Enterprise plan doesn't have fixed pricing, handled separately
  }

  return planConfig[plan as keyof typeof planConfig]?.[billingCycle as keyof typeof planConfig.pro] || null
}
