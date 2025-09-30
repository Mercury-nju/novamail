import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserSubscription, getUserUsage } from '@/lib/subscription'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    // Get user ID from session
    const userId = (session.user as any).id
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'User ID not found'
      }, { status: 400 })
    }

    // Get subscription and usage data
    const [subscription, usage] = await Promise.all([
      getUserSubscription(userId),
      getUserUsage(userId)
    ])

    return NextResponse.json({
      success: true,
      subscription,
      usage
    })

  } catch (error) {
    console.error('Get subscription error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to get subscription data'
    }, { status: 500 })
  }
}


