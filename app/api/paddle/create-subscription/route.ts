import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createSubscription } from '@/lib/paddle'

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

    // 创建 Paddle 订阅
    const result = await createSubscription(
      session.user.email,
      plan,
      billingCycle
    )

    if (result.success) {
      return NextResponse.json({
        success: true,
        subscriptionId: (result as any).subscriptionId,
        checkoutUrl: (result as any).checkoutUrl
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Create subscription error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to create subscription'
    }, { status: 500 })
  }
}


