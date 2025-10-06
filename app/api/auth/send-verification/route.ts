import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

// 邮件发送配置
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
}

// 生成6位数字验证码
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({
        success: false,
        error: 'Email is required'
      }, { status: 400 })
    }

    // 生成验证码
    const code = generateVerificationCode()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10分钟后过期

    // 保存验证码到数据库
    await prisma.verificationCode.upsert({
      where: {
        login_code: {
          login: email,
          code: code
        }
      },
      update: {
        code: code,
        expiresAt: expiresAt,
        attempts: 0,
        createdAt: new Date()
      },
      create: {
        login: email,
        code: code,
        expiresAt: expiresAt,
        attempts: 0
      }
    })

    // 发送验证码邮件
    const transporter = nodemailer.createTransport(SMTP_CONFIG)
    
    const mailOptions = {
      from: `"NovaMail" <${SMTP_CONFIG.auth.user}>`,
      to: email,
      subject: 'NovaMail - Email Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Hello,</p>
          <p>Thank you for registering with NovaMail. Please use the following verification code to complete your registration:</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 4px;">${code}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this verification code, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">© 2024 NovaMail. All rights reserved.</p>
        </div>
      `,
      text: `Your NovaMail verification code is: ${code}. This code will expire in 10 minutes.`
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: 'Verification code sent successfully'
    })

  } catch (error) {
    console.error('Send verification error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send verification code' 
      },
      { status: 500 }
    )
  }
}
