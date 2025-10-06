import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // 获取当前用户ID（这里需要根据实际的认证系统获取）
    // 暂时使用一个默认用户ID，实际应该从session或token中获取
    const userId = 'default-user-id' // TODO: 从认证系统获取真实用户ID

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
