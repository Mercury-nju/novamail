import { NextRequest, NextResponse } from 'next/server'

// 简单的内存存储（生产环境应使用 Redis）
const requestCounts = new Map<string, { count: number; resetTime: number }>()

interface RateLimitOptions {
  windowMs: number // 时间窗口（毫秒）
  maxRequests: number // 最大请求数
  message?: string // 错误消息
  keyGenerator?: (req: NextRequest) => string // 键生成器
}

export function rateLimit(options: RateLimitOptions) {
  const {
    windowMs = 15 * 60 * 1000, // 默认15分钟
    maxRequests = 100, // 默认100次请求
    message = 'Too many requests, please try again later.',
    keyGenerator = (req) => {
      // 默认使用 IP 地址作为键
      const forwarded = req.headers.get('x-forwarded-for')
      const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown'
      return ip
    }
  } = options

  return async (req: NextRequest): Promise<NextResponse | null> => {
    const key = keyGenerator(req)
    const now = Date.now()
    const windowStart = now - windowMs

    // 清理过期的记录
    requestCounts.forEach((v, k) => {
      if (v.resetTime < now) {
        requestCounts.delete(k)
      }
    })

    // 获取或创建当前键的记录
    let record = requestCounts.get(key)
    if (!record || record.resetTime < now) {
      record = { count: 0, resetTime: now + windowMs }
      requestCounts.set(key, record)
    }

    // 增加计数
    record.count++

    // 检查是否超过限制
    if (record.count > maxRequests) {
      return NextResponse.json(
        { error: message },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((record.resetTime - now) / 1000).toString(),
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(record.resetTime).toISOString()
          }
        }
      )
    }

    // 返回 null 表示通过
    return null
  }
}

// 预定义的速率限制器
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  maxRequests: 5, // 5次尝试
  message: 'Too many authentication attempts, please try again later.'
})

export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  maxRequests: 100, // 100次请求
  message: 'Too many API requests, please try again later.'
})

export const strictRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1分钟
  maxRequests: 10, // 10次请求
  message: 'Rate limit exceeded, please slow down.'
})
