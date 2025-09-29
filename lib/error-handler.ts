import { NextResponse } from 'next/server'
import { createSecureResponse } from './security-headers'

// 错误类型枚举
export enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  CSRF_ERROR = 'CSRF_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}

// 自定义错误类
export class AppError extends Error {
  public readonly type: ErrorType
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(
    message: string,
    type: ErrorType = ErrorType.INTERNAL_ERROR,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message)
    this.type = type
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

// 错误处理函数
export function handleError(error: unknown): NextResponse {
  console.error('Error occurred:', error)

  // 如果是自定义错误
  if (error instanceof AppError) {
    return createSecureResponse(
      {
        error: error.message,
        type: error.type
      },
      error.statusCode
    )
  }

  // 如果是 Zod 验证错误
  if (error && typeof error === 'object' && 'issues' in error) {
    return createSecureResponse(
      {
        error: 'Validation failed',
        type: ErrorType.VALIDATION_ERROR,
        details: (error as any).issues
      },
      400
    )
  }

  // 如果是 Prisma 错误
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as any
    
    switch (prismaError.code) {
      case 'P2002':
        return createSecureResponse(
          {
            error: 'Duplicate entry',
            type: ErrorType.VALIDATION_ERROR
          },
          409
        )
      case 'P2025':
        return createSecureResponse(
          {
            error: 'Record not found',
            type: ErrorType.NOT_FOUND_ERROR
          },
          404
        )
      default:
        return createSecureResponse(
          {
            error: 'Database error',
            type: ErrorType.INTERNAL_ERROR
          },
          500
        )
    }
  }

  // 默认错误处理
  return createSecureResponse(
    {
      error: 'Internal server error',
      type: ErrorType.INTERNAL_ERROR
    },
    500
  )
}

// 错误创建辅助函数
export const createError = {
  validation: (message: string) => new AppError(message, ErrorType.VALIDATION_ERROR, 400),
  authentication: (message: string = 'Authentication required') => new AppError(message, ErrorType.AUTHENTICATION_ERROR, 401),
  authorization: (message: string = 'Access denied') => new AppError(message, ErrorType.AUTHORIZATION_ERROR, 403),
  notFound: (message: string = 'Resource not found') => new AppError(message, ErrorType.NOT_FOUND_ERROR, 404),
  rateLimit: (message: string = 'Rate limit exceeded') => new AppError(message, ErrorType.RATE_LIMIT_ERROR, 429),
  csrf: (message: string = 'CSRF token invalid') => new AppError(message, ErrorType.CSRF_ERROR, 403),
  internal: (message: string = 'Internal server error') => new AppError(message, ErrorType.INTERNAL_ERROR, 500)
}
