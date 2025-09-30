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

    if (!user.subscriptionId) {
      return NextResponse.json({
        success: false,
        error: 'No active subscription found'
      }, { status: 400 })
    }

    // Cancel subscription at period end
    const subscription = await stripe.subscriptions.update(user.subscriptionId, {
      cancel_at_period_end: true
    })

    // Update user subscription status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionEndsAt: new Date((subscription as any).current_period_end * 1000)
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Subscription will be canceled at the end of the current billing period',
      cancelAt: new Date((subscription as any).current_period_end * 1000)
    })

  } catch (error) {
    console.error('Cancel subscription error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to cancel subscription'
    }, { status: 500 })
  }
}


