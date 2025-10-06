import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 获取当前用户ID的辅助函数
async function getCurrentUserId(request: NextRequest): Promise<string | null> {
  try {
    // 方法1: 从Authorization header获取JWT token
    const authHeader = request.headers.get('authorization')
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      // TODO: 验证JWT token并提取用户ID
      // 这里需要实现JWT验证逻辑
      return null // 暂时返回null，需要实现JWT验证
    }

    // 方法2: 从cookie获取session
    const sessionToken = request.cookies.get('next-auth.session-token')?.value
    if (sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true }
      })
      return session?.userId || null
    }

    // 方法3: 从Google OAuth获取用户信息
    // 这里可以根据Google OAuth的响应获取用户ID
    
    return null
  } catch (error) {
    console.error('Error getting user ID:', error)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    // 从请求头或cookie中获取用户信息
    // 这里需要根据实际的认证系统实现
    const userId = await getCurrentUserId(request)
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'User not authenticated'
      }, { status: 401 })
    }

    // 获取用户统计数据
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        contacts: true,
        campaigns: true
      }
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    // 计算统计数据
    const totalContacts = user.contacts.length
    const totalEmailsSent = user.emailsSentThisMonth
    const totalCampaigns = user.campaigns.length

    // 计算平均投递率和回复率
    const sentCampaigns = user.campaigns.filter(c => c.status === 'sent')
    const avgDeliveryRate = sentCampaigns.length > 0 
      ? sentCampaigns.reduce((sum, c) => sum + (c.openRate || 0), 0) / sentCampaigns.length 
      : 0
    const avgReplyRate = sentCampaigns.length > 0 
      ? sentCampaigns.reduce((sum, c) => sum + (c.clickRate || 0), 0) / sentCampaigns.length 
      : 0

    // 获取最近的营销活动
    const recentCampaigns = user.campaigns
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map(campaign => ({
        id: campaign.id,
        name: campaign.name,
        status: campaign.status,
        recipients: campaign.recipients,
        deliveryRate: campaign.openRate || 0,
        replyRate: campaign.clickRate || 0,
        sentDate: campaign.sentDate?.toISOString().split('T')[0] || null
      }))

    return NextResponse.json({
      success: true,
      stats: {
        totalContacts,
        totalEmailsSent,
        deliveryRate: Math.round(avgDeliveryRate * 100) / 100,
        replyRate: Math.round(avgReplyRate * 100) / 100
      },
      recentCampaigns
    })

  } catch (error) {
    console.error('Dashboard stats API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch dashboard statistics' 
      },
      { status: 500 }
    )
  }
}
