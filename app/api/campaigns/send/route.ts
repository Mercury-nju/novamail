import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// 邮件发送配置
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
}

// 创建邮件传输器
const createTransporter = () => {
  if (!SMTP_CONFIG.auth.user || !SMTP_CONFIG.auth.pass) {
    console.warn('SMTP credentials not configured, using mock sending')
    return null
  }
  
  return nodemailer.createTransport(SMTP_CONFIG)
}

export async function POST(request: NextRequest) {
  try {
    const { campaignData, recipients } = await request.json()

    console.log('Sending campaign:', {
      subject: campaignData.subject,
      recipients: recipients.length,
      businessName: campaignData.businessName
    })

    const transporter = createTransporter()
    
    if (!transporter) {
      // 如果没有配置SMTP，使用模拟发送
      console.log('Using mock email sending (SMTP not configured)')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const successCount = Math.floor(recipients.length * 0.95)
      const failedCount = recipients.length - successCount

      return NextResponse.json({
        success: true,
        message: `Campaign sent successfully (Mock Mode)`,
        stats: {
          total: recipients.length,
          sent: successCount,
          failed: failedCount,
          deliveryRate: (successCount / recipients.length * 100).toFixed(1)
        },
        mockMode: true
      })
    }

    // 真实邮件发送
    let successCount = 0
    let failedCount = 0
    const errors: string[] = []

    for (const recipient of recipients) {
      try {
        const mailOptions = {
          from: `"${campaignData.businessName || 'NovaMail'}" <${SMTP_CONFIG.auth.user}>`,
          to: recipient,
          subject: campaignData.subject,
          html: campaignData.body,
          // 添加纯文本版本
          text: campaignData.body.replace(/<[^>]*>/g, ''), // 简单的HTML到文本转换
        }

        await transporter.sendMail(mailOptions)
        successCount++
        
        // 添加延迟避免被标记为垃圾邮件
        await new Promise(resolve => setTimeout(resolve, 100))
        
      } catch (error) {
        failedCount++
        errors.push(`${recipient}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        console.error(`Failed to send to ${recipient}:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Campaign sent successfully`,
      stats: {
        total: recipients.length,
        sent: successCount,
        failed: failedCount,
        deliveryRate: recipients.length > 0 ? (successCount / recipients.length * 100).toFixed(1) : '0'
      },
      errors: errors.length > 0 ? errors : undefined,
      mockMode: false
    })

  } catch (error) {
    console.error('Send campaign error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send campaign',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
