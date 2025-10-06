import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { action, currentCount } = await request.json()

    // 静态导出模式：模拟权限检查
    // 假设用户有基本权限，可以发送邮件
    const mockUserLimits = {
      send_email: {
        daily: 1000,
        monthly: 10000,
        currentDaily: 50,
        currentMonthly: 500
      }
    }

    if (action === 'send_email') {
      const limits = mockUserLimits.send_email
      const newDailyCount = limits.currentDaily + currentCount
      const newMonthlyCount = limits.currentMonthly + currentCount

      if (newDailyCount > limits.daily) {
        return NextResponse.json({
          success: true,
          allowed: false,
          reason: `Daily limit exceeded. You can send ${limits.daily} emails per day.`
        })
      }

      if (newMonthlyCount > limits.monthly) {
        return NextResponse.json({
          success: true,
          allowed: false,
          reason: `Monthly limit exceeded. You can send ${limits.monthly} emails per month.`
        })
      }

      return NextResponse.json({
        success: true,
        allowed: true,
        remaining: {
          daily: limits.daily - newDailyCount,
          monthly: limits.monthly - newMonthlyCount
        }
      })
    }

    return NextResponse.json({
      success: true,
      allowed: true
    })

  } catch (error) {
    console.error('Permission check error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check permissions' 
      },
      { status: 500 }
    )
  }
}
