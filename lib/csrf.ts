import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// CSRF 保护中间件
export async function csrfProtection(request: NextRequest): Promise<NextResponse | null> {
  // 只对 POST、PUT、DELETE、PATCH 请求进行 CSRF 检查
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    return null
  }

  try {
    // 获取 CSRF token
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })

    if (!token) {
      return NextResponse.json(
        { error: 'CSRF token missing' },
        { status: 403 }
      )
    }

    // 从请求头或请求体中获取 CSRF token
    const csrfToken = request.headers.get('x-csrf-token') || 
                     request.headers.get('csrf-token')

    if (!csrfToken) {
      return NextResponse.json(
        { error: 'CSRF token required' },
        { status: 403 }
      )
    }

    // 验证 CSRF token（这里简化处理，实际应该使用更严格的验证）
    if (csrfToken !== token.csrfToken) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      )
    }

    return null // 通过验证
  } catch (error) {
    console.error('CSRF validation error:', error)
    return NextResponse.json(
      { error: 'CSRF validation failed' },
      { status: 403 }
    )
  }
}

// 生成 CSRF token 的辅助函数
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}
