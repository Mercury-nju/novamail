import { NextRequest, NextResponse } from 'next/server'

// 积分管理API
export async function GET(request: NextRequest) {
  try {
    // 从请求中获取用户ID（这里简化处理，实际应该从session中获取）
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'default_user'
    
    // 模拟用户积分数据
    let userCredits
    
    // 模拟Premium用户（用于测试）
    if (userId === 'premium_user' || userId === 'premium') {
      userCredits = {
        userId: userId,
        totalCredits: Infinity, // Premium用户无限积分
        usedCredits: 0,   // 已使用积分
        remainingCredits: Infinity, // 剩余积分
        subscriptionType: 'premium', // free, premium
        aiAccess: true, // Premium用户有AI访问权限
        lastResetDate: new Date().toISOString().split('T')[0], // 最后重置日期
        nextResetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 下次重置日期
      }
    } else {
      // 免费用户
      userCredits = {
        userId: userId,
        totalCredits: 50, // 免费用户每月50积分
        usedCredits: 0,   // 已使用积分
        remainingCredits: 50, // 剩余积分
        subscriptionType: 'free', // free, premium
        aiAccess: false, // 免费用户无AI访问权限
        lastResetDate: new Date().toISOString().split('T')[0], // 最后重置日期
        nextResetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 下次重置日期
      }
    }
    
    return NextResponse.json({
      success: true,
      data: userCredits
    })
  } catch (error) {
    console.error('Get credits error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get credits' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, userId = 'default_user', credits = 0 } = body
    
    // 模拟积分操作
    let result
    switch (action) {
      case 'deduct':
        // 扣除积分（发送邮件）
        result = {
          success: true,
          message: `Deducted ${credits} credits`,
          remainingCredits: Math.max(0, 50 - credits) // 简化计算
        }
        break
        
      case 'add':
        // 添加积分（购买或奖励）
        result = {
          success: true,
          message: `Added ${credits} credits`,
          totalCredits: 50 + credits
        }
        break
        
      case 'reset':
        // 重置积分（月度重置）
        result = {
          success: true,
          message: 'Credits reset for new month',
          totalCredits: 50,
          remainingCredits: 50
        }
        break
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Credits operation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process credits' },
      { status: 500 }
    )
  }
}
