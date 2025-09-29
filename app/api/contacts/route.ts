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

    // 获取用户的所有联系人
    const contacts = await prisma.contact.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      contacts: contacts
    })

  } catch (error) {
    console.error('Get contacts error:', error)
    
    return NextResponse.json({
      success: false,
      error: '获取联系人列表失败'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

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

    const { firstName, lastName, email, userSegment } = await request.json()

    if (!email) {
      return NextResponse.json({
        success: false,
        error: '邮箱地址是必填项'
      }, { status: 400 })
    }

    // 检查邮箱是否已存在
    const existingContact = await prisma.contact.findFirst({
      where: {
        email: email,
        userId: user.id
      }
    })

    if (existingContact) {
      return NextResponse.json({
        success: false,
        error: '该邮箱地址已存在'
      }, { status: 400 })
    }

    // 创建新联系人
    const contact = await prisma.contact.create({
      data: {
        firstName: firstName || '',
        lastName: lastName || '',
        email: email,
        userSegment: userSegment || null,
        userId: user.id
      }
    })

    return NextResponse.json({
      success: true,
      contact: contact
    })

  } catch (error) {
    console.error('Create contact error:', error)
    
    return NextResponse.json({
      success: false,
      error: '创建联系人失败'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

