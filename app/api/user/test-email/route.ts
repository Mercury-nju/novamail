import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const emailConfig = await request.json()

    // 验证必需字段
    if (!emailConfig.email || !emailConfig.password) {
      return NextResponse.json({
        success: false,
        error: 'Email and password are required'
      }, { status: 400 })
    }

    // 创建邮件传输器
    const transporter = nodemailer.createTransporter({
      host: emailConfig.smtpHost,
      port: parseInt(emailConfig.smtpPort),
      secure: emailConfig.isSecure,
      auth: {
        user: emailConfig.email,
        pass: emailConfig.password
      }
    })

    // 测试连接
    await transporter.verify()

    // 发送测试邮件
    const testEmailOptions = {
      from: `"NovaMail Test" <${emailConfig.email}>`,
      to: emailConfig.email, // 发送给自己
      subject: 'NovaMail - Email Configuration Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">✅ Email Configuration Test Successful!</h2>
          <p>Hello,</p>
          <p>This is a test email to confirm that your email configuration is working correctly.</p>
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Configuration Details:</h3>
            <ul style="color: #374151;">
              <li><strong>Email:</strong> ${emailConfig.email}</li>
              <li><strong>SMTP Host:</strong> ${emailConfig.smtpHost}</li>
              <li><strong>SMTP Port:</strong> ${emailConfig.smtpPort}</li>
              <li><strong>Provider:</strong> ${emailConfig.provider}</li>
            </ul>
          </div>
          <p>Your email configuration is now ready for sending marketing emails through NovaMail!</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">© 2024 NovaMail. All rights reserved.</p>
        </div>
      `,
      text: `Email Configuration Test Successful!

This is a test email to confirm that your email configuration is working correctly.

Configuration Details:
- Email: ${emailConfig.email}
- SMTP Host: ${emailConfig.smtpHost}
- SMTP Port: ${emailConfig.smtpPort}
- Provider: ${emailConfig.provider}

Your email configuration is now ready for sending marketing emails through NovaMail!`
    }

    await transporter.sendMail(testEmailOptions)

    return NextResponse.json({
      success: true,
      message: 'Email configuration test successful! A test email has been sent to your inbox.'
    })

  } catch (error) {
    console.error('Email test error:', error)
    
    let errorMessage = 'Email configuration test failed'
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Invalid email or password. Please check your credentials.'
      } else if (error.message.includes('ENOTFOUND')) {
        errorMessage = 'SMTP host not found. Please check your SMTP settings.'
      } else if (error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Connection refused. Please check your SMTP port and security settings.'
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Connection timeout. Please check your network connection.'
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
