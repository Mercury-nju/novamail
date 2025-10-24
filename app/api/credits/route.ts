import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 积分管理API
export async function GET(request: NextRequest) {
  try {
    // 从请求中获取用户ID（实际应该从session中获取）
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // 从数据库查询用户信息
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscriptions: {
          where: {
            status: 'active',
            currentPeriodEnd: {
              gt: new Date()
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // 检查用户是否有有效的付费订阅
    const activeSubscription = user.subscriptions[0]
    const isPremium = activeSubscription && 
                      activeSubscription.status === 'active' && 
                      activeSubscription.currentPeriodEnd > new Date()

    // 计算积分信息
    const userCredits = {
      userId: userId,
      totalCredits: isPremium ? Infinity : 50, // Premium用户无限积分，免费用户50积分
      usedCredits: user.emailsSentThisMonth * 5, // 每封邮件5积分
      remainingCredits: isPremium ? Infinity : Math.max(0, 50 - (user.emailsSentThisMonth * 5)),
      subscriptionType: isPremium ? 'premium' : 'free',
      aiAccess: isPremium, // Premium用户有AI访问权限
      lastResetDate: user.lastUsageReset.toISOString().split('T')[0],
      nextResetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subscriptionStatus: activeSubscription?.status || 'free',
      subscriptionPlan: activeSubscription?.plan || 'free',
      subscriptionEndsAt: activeSubscription?.currentPeriodEnd || null
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
    const { action, userId, credits = 0 } = body
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // 查询用户信息
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscriptions: {
          where: {
            status: 'active',
            currentPeriodEnd: {
              gt: new Date()
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const activeSubscription = user.subscriptions[0]
    const isPremium = activeSubscription && 
                      activeSubscription.status === 'active' && 
                      activeSubscription.currentPeriodEnd > new Date()

    let result
    switch (action) {
      case 'deduct':
        // 检查用户是否有足够积分
        if (!isPremium && user.emailsSentThisMonth * 5 + credits > 50) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Insufficient credits',
              requiredCredits: credits,
              remainingCredits: Math.max(0, 50 - (user.emailsSentThisMonth * 5))
            },
            { status: 402 }
          )
        }

        // 更新用户邮件发送计数
        await prisma.user.update({
          where: { id: userId },
          data: {
            emailsSentThisMonth: {
              increment: Math.ceil(credits / 5) // 每5积分对应1封邮件
            }
          }
        })

        result = {
          success: true,
          message: `Deducted ${credits} credits`,
          remainingCredits: isPremium ? Infinity : Math.max(0, 50 - ((user.emailsSentThisMonth + Math.ceil(credits / 5)) * 5))
        }
        break
        
      case 'add':
        // 添加积分（购买或奖励）
        await prisma.user.update({
          where: { id: userId },
          data: {
            emailsSentThisMonth: {
              decrement: Math.ceil(credits / 5) // 减少已使用积分
            }
          }
        })

        result = {
          success: true,
          message: `Added ${credits} credits`,
          remainingCredits: isPremium ? Infinity : Math.max(0, 50 - ((user.emailsSentThisMonth - Math.ceil(credits / 5)) * 5))
        }
        break
        
      case 'reset':
        // 重置积分（月度重置）
        await prisma.user.update({
          where: { id: userId },
          data: {
            emailsSentThisMonth: 0,
            lastUsageReset: new Date()
          }
        })

        result = {
          success: true,
          message: 'Credits reset for new month',
          remainingCredits: isPremium ? Infinity : 50
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
