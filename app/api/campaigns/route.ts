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

    // 获取用户的所有活动
    const campaigns = await prisma.campaign.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        subject: true,
        body: true,
        status: true,
        recipients: true,
        sentDate: true,
        openRate: true,
        clickRate: true,
        createdAt: true,
        userSegment: true,
        goal: true,
        style: true
      }
    })

    // 格式化数据
    const formattedCampaigns = campaigns.map(campaign => ({
      id: campaign.id,
      name: campaign.name,
      subject: campaign.subject,
      body: campaign.body,
      status: campaign.status,
      recipients: campaign.recipients,
      sentDate: campaign.sentDate ? new Date(campaign.sentDate).toISOString().split('T')[0] : undefined,
      openRate: campaign.openRate || 0,
      clickRate: campaign.clickRate || 0,
      createdAt: new Date(campaign.createdAt).toISOString().split('T')[0],
      userSegment: campaign.userSegment,
      goal: campaign.goal,
      style: campaign.style
    }))

    return NextResponse.json({
      success: true,
      campaigns: formattedCampaigns
    })

  } catch (error) {
    console.error('Get campaigns error:', error)
    
    return NextResponse.json({
      success: false,
      error: '获取活动列表失败'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

