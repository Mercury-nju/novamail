import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 存储验证码的内存缓存（生产环境建议使用Redis）
const verificationCodes = new Map<string, { code: string, expiresAt: number }>()

export async function POST(request: NextRequest) {
  try {
    const { email, code, firstName, lastName, password, company } = await request.json()

    // 验证必需字段
    if (!email || !code || !firstName || !lastName || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // 验证验证码
    const storedData = verificationCodes.get(email)
    if (!storedData) {
      return NextResponse.json(
        { error: 'Verification code not found or expired' },
        { status: 400 }
      )
    }

    if (storedData.code !== code) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    if (Date.now() > storedData.expiresAt) {
      verificationCodes.delete(email)
      return NextResponse.json(
        { error: 'Verification code has expired' },
        { status: 400 }
      )
    }

    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 12)

    // 创建用户
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        company: company || null,
        emailVerified: new Date(),
      }
    })

    // 清除验证码
    verificationCodes.delete(email)

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })

  } catch (error) {
    console.error('Verify code error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
