import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { cancelSubscription } from '@/lib/paddle'
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

    // 获取用户订阅信息
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user || !user.subscriptionId) {
      return NextResponse.json({
        success: false,
        error: 'No active subscription found'
      }, { status: 400 })
    }

    // 取消 Paddle 订阅
    const result = await cancelSubscription(user.subscriptionId)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Subscription will be canceled at the end of the current billing period'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Cancel subscription error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to cancel subscription'
    }, { status: 500 })
  }
}


