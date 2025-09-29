import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { host, port, user, pass, secure } = body

    // 创建测试传输器
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port),
      secure: secure, // true for 465, false for other ports
      auth: {
        user,
        pass
      }
    })

    // 测试连接
    await transporter.verify()

    return NextResponse.json({
      success: true,
      message: 'SMTP连接测试成功'
    })

  } catch (error) {
    console.error('SMTP test error:', error)
    
    let errorMessage = 'SMTP连接测试失败'
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = '邮箱地址或密码错误'
      } else if (error.message.includes('ECONNREFUSED')) {
        errorMessage = '无法连接到SMTP服务器'
      } else if (error.message.includes('timeout')) {
        errorMessage = '连接超时，请检查网络和服务器设置'
      } else {
        errorMessage = error.message
      }
    }

    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 400 })
  }
}

