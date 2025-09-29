import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { generateVerificationCode, sendVerificationEmail } from '@/lib/email'
import { authRateLimit } from '@/lib/rate-limit'

const requestSchema = z.object({
  email: z.string().email('Invalid email format')
})

export async function POST(request: NextRequest) {
  try {
    // 应用速率限制
    const rateLimitResult = await authRateLimit(request)
    if (rateLimitResult) {
      return rateLimitResult
    }

    const body = await request.json()
    const validatedData = requestSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validatedData.error.errors },
        { status: 400 }
      )
    }

    const { email } = validatedData.data

    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // 生成验证码
    const code = generateVerificationCode()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10分钟后过期

    // 删除该邮箱的旧验证码
    await prisma.verificationCode.deleteMany({
      where: { login: email }
    })

    // 保存新验证码
    await prisma.verificationCode.create({
      data: {
        login: email,
        code,
        expiresAt
      }
    })

    // 发送邮件
    const emailSent = await sendVerificationEmail(email, code)

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Verification code sent successfully',
      email: email
    })

  } catch (error) {
    console.error('Send verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
