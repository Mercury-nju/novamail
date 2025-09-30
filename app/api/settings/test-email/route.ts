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
      message: 'SMTP connection test successful'
    })

  } catch (error) {
    console.error('SMTP test error:', error)
    
    let errorMessage = 'SMTP connection test failed'
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Invalid email address or password'
      } else if (error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Unable to connect to SMTP server'
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Connection timeout, please check network and server settings'
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

