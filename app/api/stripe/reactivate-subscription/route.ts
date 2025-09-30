import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

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
        error: 'No subscription found'
      }, { status: 400 })
    }

    // Reactivate subscription
    const subscription = await stripe.subscriptions.update(user.subscriptionId, {
      cancel_at_period_end: false
    })

    // Update user subscription status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionStatus: 'active',
        subscriptionEndsAt: null
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Subscription reactivated successfully'
    })

  } catch (error) {
    console.error('Reactivate subscription error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to reactivate subscription'
    }, { status: 500 })
  }
}


