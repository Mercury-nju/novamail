import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { authRateLimit } from '@/lib/rate-limit'

const verifySchema = z.object({
  email: z.string().email('Invalid email format'),
  code: z.string().length(6, 'Verification code must be 6 digits'),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  company: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    // 应用速率限制
    const rateLimitResult = await authRateLimit(request)
    if (rateLimitResult) {
      return rateLimitResult
    }

    const body = await request.json()
    const validatedData = verifySchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validatedData.error.errors },
        { status: 400 }
      )
    }

    const { email, code, firstName, lastName, password, company } = validatedData.data

    // 查找验证码
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        login: email,
        code,
        expiresAt: { gt: new Date() } // 验证码未过期
      }
    })

    if (!verificationCode) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      )
    }

    // 增加尝试次数
    await prisma.verificationCode.update({
      where: { id: verificationCode.id },
      data: { attempts: verificationCode.attempts + 1 }
    })

    // 检查尝试次数
    if (verificationCode.attempts >= 3) {
      // 删除验证码防止重复使用
      await prisma.verificationCode.delete({
        where: { id: verificationCode.id }
      })
      
      return NextResponse.json(
        { error: 'Too many failed attempts. Please request a new verification code.' },
        { status: 429 }
      )
    }

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

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 12)

    // 创建用户
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        password: hashedPassword,
        company
      }
    })

    // 删除使用过的验证码
    await prisma.verificationCode.delete({
      where: { id: verificationCode.id }
    })

    return NextResponse.json({
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
