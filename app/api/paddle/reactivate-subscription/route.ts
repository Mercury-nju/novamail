import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { reactivateSubscription } from '@/lib/paddle'
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
        error: 'No subscription found'
      }, { status: 400 })
    }

    // 重新激活 Paddle 订阅
    const result = await reactivateSubscription(user.subscriptionId)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Subscription reactivated successfully'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Reactivate subscription error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to reactivate subscription'
    }, { status: 500 })
  }
}


