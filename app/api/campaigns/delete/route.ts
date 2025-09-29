import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
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

    const { campaignIds } = await request.json()

    if (!campaignIds || !Array.isArray(campaignIds) || campaignIds.length === 0) {
      return NextResponse.json({
        success: false,
        error: '请提供要删除的活动ID'
      }, { status: 400 })
    }

    // 删除活动（只能删除自己的活动）
    const result = await prisma.campaign.deleteMany({
      where: {
        id: { in: campaignIds },
        userId: user.id
      }
    })

    return NextResponse.json({
      success: true,
      deletedCount: result.count
    })

  } catch (error) {
    console.error('Delete campaigns error:', error)
    
    return NextResponse.json({
      success: false,
      error: '删除活动失败'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

