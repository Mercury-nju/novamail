import { NextRequest, NextResponse } from 'next/server'
import { sendVerificationEmail } from '@/lib/email'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 存储验证码的内存缓存（生产环境建议使用Redis）
const verificationCodes = new Map<string, { code: string, expiresAt: number }>()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    // 生成6位验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    
    // 设置过期时间（10分钟）
    const expiresAt = Date.now() + 10 * 60 * 1000
    
    // 存储验证码
    verificationCodes.set(email, { code, expiresAt })

    // 发送验证码邮件
    const emailSent = await sendVerificationEmail(email, code)

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code sent successfully'
    })

  } catch (error) {
    console.error('Send verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
