import { NextRequest, NextResponse } from 'next/server'

// 用户订阅管理API
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'default_user'
    
    // 模拟用户订阅数据
    const subscription = {
      userId: userId,
      plan: 'free', // free, premium
      status: 'active',
      features: {
        monthlyCredits: 50, // 免费用户每月50积分
        unlimitedCredits: false, // 免费用户无无限积分
        aiAccess: false, // 免费用户无AI访问权限
        emailSending: true, // 基础邮件发送功能
        templates: 5, // 免费模板数量
        contacts: 100, // 免费联系人数量
        campaigns: 10 // 免费活动数量
      },
      pricing: {
        free: {
          name: 'Free Plan',
          price: 0,
          credits: 50,
          features: [
            '50 credits per month',
            'Basic email templates',
            '100 contacts',
            '10 campaigns per month',
            'Standard support'
          ]
        },
        premium: {
          name: 'Premium Plan',
          price: 29,
          credits: 'unlimited',
          features: [
            'Unlimited credits',
            'AI email assistant',
            'Advanced templates',
            'Unlimited contacts',
            'Unlimited campaigns',
            'Priority support',
            'Analytics dashboard'
          ]
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      data: subscription
    })
  } catch (error) {
    console.error('Get subscription error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get subscription' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, userId = 'default_user', plan = 'free' } = body
    
    // 模拟订阅操作
    let result
    switch (action) {
      case 'upgrade':
        if (plan === 'premium') {
          result = {
            success: true,
            message: 'Upgraded to Premium plan',
            subscription: {
              plan: 'premium',
              status: 'active',
              features: {
                monthlyCredits: 'unlimited',
                unlimitedCredits: true,
                aiAccess: true,
                emailSending: true,
                templates: 'unlimited',
                contacts: 'unlimited',
                campaigns: 'unlimited'
              }
            }
          }
        } else {
          result = {
            success: true,
            message: 'Downgraded to Free plan',
            subscription: {
              plan: 'free',
              status: 'active',
              features: {
                monthlyCredits: 50,
                unlimitedCredits: false,
                aiAccess: false,
                emailSending: true,
                templates: 5,
                contacts: 100,
                campaigns: 10
              }
            }
          }
        }
        break
        
      case 'cancel':
        result = {
          success: true,
          message: 'Subscription cancelled',
          subscription: {
            plan: 'free',
            status: 'cancelled',
            features: {
              monthlyCredits: 50,
              unlimitedCredits: false,
              aiAccess: false,
              emailSending: true,
              templates: 5,
              contacts: 100,
              campaigns: 10
            }
          }
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
    console.error('Subscription operation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}
