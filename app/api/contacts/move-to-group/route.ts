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

    const { contactIds, groupId } = await request.json()

    if (!contactIds || !Array.isArray(contactIds) || contactIds.length === 0) {
      return NextResponse.json({
        success: false,
        error: '请提供要移动的联系人ID'
      }, { status: 400 })
    }

    if (!groupId) {
      return NextResponse.json({
        success: false,
        error: '请提供目标分组ID'
      }, { status: 400 })
    }

    // 更新联系人分组（只能更新自己的联系人）
    const result = await prisma.contact.updateMany({
      where: {
        id: { in: contactIds },
        userId: user.id
      },
      data: {
        userSegment: groupId
      }
    })

    return NextResponse.json({
      success: true,
      updatedCount: result.count
    })

  } catch (error) {
    console.error('Move contacts to group error:', error)
    
    return NextResponse.json({
      success: false,
      error: '移动联系人失败'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

