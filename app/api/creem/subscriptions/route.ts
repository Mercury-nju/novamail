import { NextRequest, NextResponse } from 'next/server'
import CreemAPI from '@/lib/creem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const creem = new CreemAPI({
  apiKey: process.env.CREEM_API_KEY || 'creem_22oMcuzUH4TeWyWVAVjTes',
  baseUrl: process.env.CREEM_BASE_URL || 'https://api.creem.com/v1',
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET || 'whsec_5uvCq8f1gQMsqz5rqwdVgZ',
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    const { planId, trialDays } = await request.json()

    // 创建或获取客户
    let customer
    try {
      // 这里需要根据用户ID获取Creem客户ID
      // 实际实现中需要将用户ID与Creem客户ID关联存储
      customer = await creem.createCustomer(session.user.email, session.user.name || undefined)
    } catch (error) {
      console.error('Failed to create/get customer:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to create customer'
      }, { status: 500 })
    }

    // 创建订阅
    const subscription = await creem.createSubscription(
      customer.id,
      planId,
      trialDays
    )

    return NextResponse.json({
      success: true,
      data: {
        subscription,
        customer
      }
    })
  } catch (error) {
    console.error('Failed to create subscription:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create subscription'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    // 这里需要根据用户ID获取订阅信息
    // 实际实现中需要查询数据库获取用户的Creem订阅ID
    const url = new URL(request.url)
    const subscriptionId = url.searchParams.get('subscriptionId')

    if (!subscriptionId) {
      return NextResponse.json({
        success: false,
        error: 'Subscription ID required'
      }, { status: 400 })
    }

    const subscription = await creem.getSubscription(subscriptionId)

    return NextResponse.json({
      success: true,
      data: subscription
    })
  } catch (error) {
    console.error('Failed to fetch subscription:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch subscription'
    }, { status: 500 })
  }
}
