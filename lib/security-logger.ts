import { NextRequest } from 'next/server'

// 安全事件类型
export enum SecurityEventType {
  LOGIN_ATTEMPT = 'LOGIN_ATTEMPT',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  REGISTRATION_ATTEMPT = 'REGISTRATION_ATTEMPT',
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  REGISTRATION_FAILURE = 'REGISTRATION_FAILURE',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  CSRF_VIOLATION = 'CSRF_VIOLATION',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  ADMIN_ACCESS = 'ADMIN_ACCESS',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY'
}

// 安全事件接口
export interface SecurityEvent {
  type: SecurityEventType
  timestamp: string
  ip: string
  userAgent: string
  userId?: string
  email?: string
  details?: any
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
}

// 获取客户端信息
function getClientInfo(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  return { ip, userAgent }
}

// 安全日志记录器
export class SecurityLogger {
  private static instance: SecurityLogger
  private logs: SecurityEvent[] = []

  private constructor() {}

  public static getInstance(): SecurityLogger {
    if (!SecurityLogger.instance) {
      SecurityLogger.instance = new SecurityLogger()
    }
    return SecurityLogger.instance
  }

  // 记录安全事件
  public log(event: Omit<SecurityEvent, 'timestamp' | 'ip' | 'userAgent'>, request: NextRequest): void {
    const { ip, userAgent } = getClientInfo(request)
    
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      ip,
      userAgent
    }

    this.logs.push(securityEvent)
    
    // 控制台输出（生产环境应该写入文件或发送到日志服务）
    console.log(`[SECURITY] ${event.type}:`, {
      timestamp: securityEvent.timestamp,
      ip: securityEvent.ip,
      userId: securityEvent.userId,
      email: securityEvent.email,
      severity: event.severity,
      details: event.details
    })

    // 如果是高危事件，立即告警
    if (event.severity === 'CRITICAL' || event.severity === 'HIGH') {
      this.alert(securityEvent)
    }
  }

  // 告警处理
  private alert(event: SecurityEvent): void {
    console.error(`[SECURITY ALERT] ${event.type}:`, event)
    // 这里可以集成邮件、短信或其他告警方式
  }

  // 获取日志
  public getLogs(limit: number = 100): SecurityEvent[] {
    return this.logs.slice(-limit)
  }

  // 清理旧日志
  public cleanup(olderThanHours: number = 24): void {
    const cutoff = new Date(Date.now() - olderThanHours * 60 * 60 * 1000)
    this.logs = this.logs.filter(log => new Date(log.timestamp) > cutoff)
  }
}

// 便捷函数
export const securityLogger = SecurityLogger.getInstance()

// 预定义的安全事件记录函数
export const logSecurityEvent = {
  loginAttempt: (request: NextRequest, email: string) => {
    securityLogger.log({
      type: SecurityEventType.LOGIN_ATTEMPT,
      email,
      severity: 'LOW'
    }, request)
  },

  loginSuccess: (request: NextRequest, userId: string, email: string) => {
    securityLogger.log({
      type: SecurityEventType.LOGIN_SUCCESS,
      userId,
      email,
      severity: 'LOW'
    }, request)
  },

  loginFailure: (request: NextRequest, email: string, reason: string) => {
    securityLogger.log({
      type: SecurityEventType.LOGIN_FAILURE,
      email,
      details: { reason },
      severity: 'MEDIUM'
    }, request)
  },

  registrationAttempt: (request: NextRequest, email: string) => {
    securityLogger.log({
      type: SecurityEventType.REGISTRATION_ATTEMPT,
      email,
      severity: 'LOW'
    }, request)
  },

  registrationSuccess: (request: NextRequest, userId: string, email: string) => {
    securityLogger.log({
      type: SecurityEventType.REGISTRATION_SUCCESS,
      userId,
      email,
      severity: 'LOW'
    }, request)
  },

  registrationFailure: (request: NextRequest, email: string, reason: string) => {
    securityLogger.log({
      type: SecurityEventType.REGISTRATION_FAILURE,
      email,
      details: { reason },
      severity: 'MEDIUM'
    }, request)
  },

  rateLimitExceeded: (request: NextRequest, endpoint: string) => {
    securityLogger.log({
      type: SecurityEventType.RATE_LIMIT_EXCEEDED,
      details: { endpoint },
      severity: 'HIGH'
    }, request)
  },

  csrfViolation: (request: NextRequest, endpoint: string) => {
    securityLogger.log({
      type: SecurityEventType.CSRF_VIOLATION,
      details: { endpoint },
      severity: 'HIGH'
    }, request)
  },

  unauthorizedAccess: (request: NextRequest, endpoint: string, userId?: string) => {
    securityLogger.log({
      type: SecurityEventType.UNAUTHORIZED_ACCESS,
      userId,
      details: { endpoint },
      severity: 'HIGH'
    }, request)
  },

  adminAccess: (request: NextRequest, userId: string, action: string) => {
    securityLogger.log({
      type: SecurityEventType.ADMIN_ACCESS,
      userId,
      details: { action },
      severity: 'MEDIUM'
    }, request)
  }
}
