import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { updateUsage } from '@/lib/subscription'

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
    const { action, increment = 1 } = body

    if (!action) {
      return NextResponse.json({
        success: false,
        error: 'Action is required'
      }, { status: 400 })
    }

    // Get user ID from session
    const userId = (session.user as any).id
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'User ID not found'
      }, { status: 400 })
    }

    // Update usage
    await updateUsage(userId, action, increment)

    return NextResponse.json({
      success: true,
      message: 'Usage updated successfully'
    })

  } catch (error) {
    console.error('Update usage error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to update usage'
    }, { status: 500 })
  }
}


