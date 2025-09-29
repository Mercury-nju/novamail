import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({
        success: false,
        error: '未登录'
      }, { status: 401 })
    }

    const body = await request.json()
    const { campaignData, recipients } = body

    // 获取用户的邮箱配置
    const userEmailConfig = await getUserEmailConfig(session.user.email)
    
    if (!userEmailConfig) {
      return NextResponse.json({
        success: false,
        error: '请先在设置中配置您的邮箱账户'
      }, { status: 400 })
    }

    // 创建邮件传输器
    const transporter = nodemailer.createTransport({
      host: userEmailConfig.host,
      port: userEmailConfig.port,
      secure: userEmailConfig.secure,
      auth: {
        user: userEmailConfig.user,
        pass: userEmailConfig.pass
      }
    })

    // 发送邮件到每个收件人
    const sendPromises = recipients.map(async (email: string) => {
      try {
        const mailOptions = {
          from: `"${campaignData.businessName || 'NovaMail'}" <${userEmailConfig.user}>`,
          to: email,
          subject: campaignData.subject,
          html: campaignData.body
        }

        const result = await transporter.sendMail(mailOptions)
        console.log(`Email sent to ${email}:`, result.messageId)
        return { email, success: true, messageId: result.messageId }
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error)
        return { email, success: false, error: error instanceof Error ? error.message : 'Unknown error' }
      }
    })

    const results = await Promise.all(sendPromises)
    const successful = results.filter(r => r.success)
    const failed = results.filter(r => !r.success)

    return NextResponse.json({
      success: true,
      message: `Campaign sent successfully`,
      stats: {
        total: recipients.length,
        successful: successful.length,
        failed: failed.length
      },
      results: results
    })

  } catch (error) {
    console.error('Campaign send error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to send campaign',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// 临时函数：获取用户邮箱配置
// TODO: 从数据库获取用户邮箱配置
async function getUserEmailConfig(userEmail: string) {
  // 临时返回默认配置，实际应该从数据库获取
  // 这里先使用环境变量作为默认配置
  return {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password',
    secure: process.env.EMAIL_SECURE === 'true'
  }
}
