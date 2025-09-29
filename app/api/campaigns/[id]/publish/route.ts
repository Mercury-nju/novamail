import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const campaignId = params.id

    // 查找活动
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: campaignId,
        userId: user.id
      }
    })

    if (!campaign) {
      return NextResponse.json({
        success: false,
        error: '活动不存在'
      }, { status: 404 })
    }

    if (campaign.status !== 'draft') {
      return NextResponse.json({
        success: false,
        error: '只能发布草稿状态的活动'
      }, { status: 400 })
    }

    // 更新活动状态为已发送
    await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        status: 'sent',
        sentDate: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      message: '活动发布成功'
    })

  } catch (error) {
    console.error('Publish campaign error:', error)
    
    return NextResponse.json({
      success: false,
      error: '发布活动失败'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

