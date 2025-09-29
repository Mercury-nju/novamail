import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { authRateLimit } from "@/lib/rate-limit"
import { csrfProtection } from "@/lib/csrf"
import { createSecureResponse } from "@/lib/security-headers"
import { handleError, createError } from "@/lib/error-handler"
import { logSecurityEvent } from "@/lib/security-logger"

const prisma = new PrismaClient()

// 输入验证模式
const registerSchema = z.object({
  firstName: z.string()
    .min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s\u4e00-\u9fa5]+$/, "First name can only contain letters and spaces"),
  lastName: z.string()
    .min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s\u4e00-\u9fa5]+$/, "Last name can only contain letters and spaces"),
  email: z.string()
    .email("Invalid email format")
    .max(255, "Email cannot exceed 255 characters")
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
  company: z.string()
    .max(100, "Company name cannot exceed 100 characters")
    .optional()
    .transform(val => val?.trim() || undefined)
})

export async function POST(request: NextRequest) {
  try {
    // 应用速率限制
    const rateLimitResponse = await authRateLimit(request)
    if (rateLimitResponse) {
      logSecurityEvent.rateLimitExceeded(request, '/api/auth/register')
      return rateLimitResponse
    }

    // CSRF 保护
    const csrfResponse = await csrfProtection(request)
    if (csrfResponse) {
      logSecurityEvent.csrfViolation(request, '/api/auth/register')
      return csrfResponse
    }

    const body = await request.json()
    
    // 验证输入
    const validationResult = registerSchema.safeParse(body)
    
    if (!validationResult.success) {
      return createSecureResponse(
        { 
          error: "Validation failed",
          details: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        400
      )
    }

    const { firstName, lastName, email, password, company } = validationResult.data

    // 记录注册尝试
    logSecurityEvent.registrationAttempt(request, email)

    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      logSecurityEvent.registrationFailure(request, email, 'User already exists')
      throw createError.validation("User already exists")
    }

    // 哈希密码
    const hashedPassword = await bcrypt.hash(password, 12)

    // 创建用户
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        company,
        name: `${firstName} ${lastName}`.trim(),
      }
    })

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user

    // 记录注册成功
    logSecurityEvent.registrationSuccess(request, user.id, user.email)

    return createSecureResponse(
      { 
        message: "User created successfully",
        user: userWithoutPassword 
      },
      201
    )
  } catch (error) {
    return handleError(error)
  }
}
