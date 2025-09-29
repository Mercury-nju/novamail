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

    const { contactIds } = await request.json()

    if (!contactIds || !Array.isArray(contactIds) || contactIds.length === 0) {
      return NextResponse.json({
        success: false,
        error: '请提供要删除的联系人ID'
      }, { status: 400 })
    }

    // 删除联系人（只能删除自己的联系人）
    const result = await prisma.contact.deleteMany({
      where: {
        id: { in: contactIds },
        userId: user.id
      }
    })

    return NextResponse.json({
      success: true,
      deletedCount: result.count
    })

  } catch (error) {
    console.error('Delete contacts error:', error)
    
    return NextResponse.json({
      success: false,
      error: '删除联系人失败'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

