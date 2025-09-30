import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { checkUserPermission } from '@/lib/subscription'

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
    const { action, currentCount } = body

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

    // Check permission
    const permission = await checkUserPermission(userId, action, currentCount)

    return NextResponse.json({
      success: true,
      allowed: permission.allowed,
      reason: permission.reason
    })

  } catch (error) {
    console.error('Check permission error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to check permission'
    }, { status: 500 })
  }
}


