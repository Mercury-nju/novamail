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

    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '30d'
    const campaign = searchParams.get('campaign') || 'all'

    // 计算时间范围
    const now = new Date()
    let startDate = new Date()
    
    switch (timeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    // 获取活动数据
    const campaigns = await prisma.campaign.findMany({
      where: { 
        userId: user.id,
        ...(campaign !== 'all' ? { id: campaign } : {}),
        createdAt: { gte: startDate }
      },
      select: {
        id: true,
        name: true,
        status: true,
        recipients: true,
        sentDate: true,
        openRate: true,
        clickRate: true,
        createdAt: true
      }
    })

    // 如果没有数据，返回空状态
    if (campaigns.length === 0) {
      return NextResponse.json({
        success: true,
        analytics: {
          emailStats: [
            { name: 'Total Sent', value: '0', change: '0%', changeType: 'neutral' },
            { name: 'Delivered', value: '0', change: '0%', changeType: 'neutral' },
            { name: 'Replied', value: '0', change: '0%', changeType: 'neutral' },
            { name: 'Unsubscribed', value: '0', change: '0%', changeType: 'neutral' },
            { name: 'Bounced', value: '0', change: '0%', changeType: 'neutral' }
          ],
          engagementStats: [
            { name: 'Open Rate', value: '0%', change: '0%', changeType: 'neutral' },
            { name: 'Click Rate', value: '0%', change: '0%', changeType: 'neutral' },
            { name: 'Conversion Rate', value: '0%', change: '0%', changeType: 'neutral' },
            { name: 'Unsubscribe Rate', value: '0%', change: '0%', changeType: 'neutral' }
          ],
          timeStats: [
            { name: 'Best Send Time', value: 'N/A', change: 'No data', changeType: 'neutral' },
            { name: 'Avg Response Time', value: 'N/A', change: 'No data', changeType: 'neutral' },
            { name: 'Peak Engagement', value: 'N/A', change: 'No data', changeType: 'neutral' }
          ],
          hasData: false
        }
      })
    }

    // 计算统计数据
    const sentCampaigns = campaigns.filter(c => c.status === 'sent')
    const totalSent = sentCampaigns.reduce((sum, c) => sum + c.recipients, 0)
    const totalDelivered = Math.floor(totalSent * 0.985) // 模拟98.5%投递率
    const totalReplied = Math.floor(totalSent * 0.058) // 模拟5.8%回复率
    const totalUnsubscribed = Math.floor(totalSent * 0.002) // 模拟0.2%退订率
    const totalBounced = Math.floor(totalSent * 0.015) // 模拟1.5%退信率

    // 计算平均打开率和点击率
    const avgOpenRate = sentCampaigns.length > 0 
      ? sentCampaigns.reduce((sum, c) => sum + (c.openRate || 0), 0) / sentCampaigns.length
      : 0
    
    const avgClickRate = sentCampaigns.length > 0
      ? sentCampaigns.reduce((sum, c) => sum + (c.clickRate || 0), 0) / sentCampaigns.length
      : 0

    return NextResponse.json({
      success: true,
      analytics: {
        emailStats: [
          { name: 'Total Sent', value: totalSent.toLocaleString(), change: '0%', changeType: 'neutral' },
          { name: 'Delivered', value: totalDelivered.toLocaleString(), change: '0%', changeType: 'neutral' },
          { name: 'Replied', value: totalReplied.toLocaleString(), change: '0%', changeType: 'neutral' },
          { name: 'Unsubscribed', value: totalUnsubscribed.toLocaleString(), change: '0%', changeType: 'neutral' },
          { name: 'Bounced', value: totalBounced.toLocaleString(), change: '0%', changeType: 'neutral' }
        ],
        engagementStats: [
          { name: 'Open Rate', value: `${avgOpenRate.toFixed(1)}%`, change: '0%', changeType: 'neutral' },
          { name: 'Click Rate', value: `${avgClickRate.toFixed(1)}%`, change: '0%', changeType: 'neutral' },
          { name: 'Conversion Rate', value: `${(avgClickRate * 0.6).toFixed(1)}%`, change: '0%', changeType: 'neutral' },
          { name: 'Unsubscribe Rate', value: `${(totalUnsubscribed / totalSent * 100).toFixed(1)}%`, change: '0%', changeType: 'neutral' }
        ],
        timeStats: [
          { name: 'Best Send Time', value: '10:00 AM', change: 'Tue, Thu', changeType: 'neutral' },
          { name: 'Avg Response Time', value: '2.4 hrs', change: 'No data', changeType: 'neutral' },
          { name: 'Peak Engagement', value: 'Weekdays', change: 'Mon-Fri', changeType: 'neutral' }
        ],
        hasData: true
      }
    })

  } catch (error) {
    console.error('Analytics stats error:', error)
    
    return NextResponse.json({
      success: false,
      error: '获取分析数据失败'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

