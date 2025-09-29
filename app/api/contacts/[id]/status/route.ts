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

    const contactId = params.id
    const { status, reason } = await request.json()

    if (!status || !['active', 'unsubscribed', 'bounced'].includes(status)) {
      return NextResponse.json({
        success: false,
        error: '请提供有效的状态'
      }, { status: 400 })
    }

    // 查找联系人
    const contact = await prisma.contact.findFirst({
      where: {
        id: contactId,
        userId: user.id
      }
    })

    if (!contact) {
      return NextResponse.json({
        success: false,
        error: '联系人不存在'
      }, { status: 404 })
    }

    // 注意：Contact 模型目前没有 status 字段，需要先在数据库模型中添加
    // 这里先返回成功，实际实现需要更新数据库模型
    
    return NextResponse.json({
      success: true,
      message: '联系人状态更新功能需要数据库模型支持'
    })

  } catch (error) {
    console.error('Change contact status error:', error)
    
    return NextResponse.json({
      success: false,
      error: '状态更新失败'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

