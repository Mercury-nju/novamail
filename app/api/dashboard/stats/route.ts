import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        error: '未登录'
      }, { status: 401 })
    }

    // 获取用户信息
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: '用户不存在'
      }, { status: 404 })
    }

    // 获取统计数据
    const [
      totalContacts,
      totalCampaigns,
      sentCampaigns,
      recentCampaigns
    ] = await Promise.all([
      // 总联系人数量
      prisma.contact.count({
        where: { userId: user.id }
      }),
      
      // 总活动数量
      prisma.campaign.count({
        where: { userId: user.id }
      }),
      
      // 已发送的活动
      prisma.campaign.findMany({
        where: { 
          userId: user.id,
          status: 'sent'
        },
        select: {
          recipients: true,
          openRate: true,
          clickRate: true
        }
      }),
      
      // 最近的活动
      prisma.campaign.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          status: true,
          recipients: true,
          sentDate: true,
          openRate: true,
          clickRate: true
        }
      })
    ])

    // 计算总发送邮件数
    const totalEmailsSent = sentCampaigns.reduce((sum, campaign) => sum + campaign.recipients, 0)
    
    // 计算平均打开率和点击率
    const avgOpenRate = sentCampaigns.length > 0 
      ? sentCampaigns.reduce((sum, campaign) => sum + (campaign.openRate || 0), 0) / sentCampaigns.length
      : 0
    
    const avgClickRate = sentCampaigns.length > 0
      ? sentCampaigns.reduce((sum, campaign) => sum + (campaign.clickRate || 0), 0) / sentCampaigns.length
      : 0

    // 格式化最近活动数据
    const formattedRecentCampaigns = recentCampaigns.map(campaign => ({
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
      recipients: campaign.recipients,
      sentDate: campaign.sentDate ? new Date(campaign.sentDate).toISOString().split('T')[0] : null,
      deliveryRate: campaign.status === 'sent' ? 98.5 : 0, // 模拟投递率
      replyRate: campaign.clickRate || 0
    }))

    return NextResponse.json({
      success: true,
      stats: {
        totalContacts,
        totalEmailsSent,
        deliveryRate: totalEmailsSent > 0 ? 98.5 : 0, // 模拟投递率
        replyRate: avgClickRate
      },
      recentCampaigns: formattedRecentCampaigns
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)
    
    return NextResponse.json({
      success: false,
      error: '获取统计数据失败'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

