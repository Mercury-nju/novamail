import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const config = {
      // OAuth配置检查 (不暴露敏感值)
      hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== '',
      hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CLIENT_SECRET !== '',
      nextAuthSecret: !!process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET !== '',
      nextAuthUrl: process.env.NEXTAUTH_URL || 'missing',
      
      // 数据库检查
      hasDatabaseUrl: !!process.env.DATABASE_URL && process.env.DATABASE_URL !== '',
      
      // SMTP配置检查
      hasEmailConfig: !!process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_USER !== 'your-email@gmail.com',
      
      // 环境信息
      nodeEnv: process.env.NODE_ENV || 'development',
      version: '2.1.0',
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      config,
      message: '配置检查完成'
    })
    
  } catch (error) {
    console.error('Config check error:', error)
    return NextResponse.json({
      success: false,
      error: '配置检查失败',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
