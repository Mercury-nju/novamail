import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

// 解密函数
function decrypt(encryptedText: string, key: string): string {
  const algorithm = 'aes-256-cbc'
  const textParts = encryptedText.split(':')
  const iv = Buffer.from(textParts.shift()!, 'hex')
  const encryptedData = textParts.join(':')
  const decipher = crypto.createDecipher(algorithm, key)
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

// 获取当前用户ID
async function getCurrentUserId(request: NextRequest): Promise<string | null> {
  try {
    const sessionToken = request.cookies.get('next-auth.session-token')?.value
    if (sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true }
      })
      return session?.userId || null
    }
    return null
  } catch (error) {
    console.error('Error getting user ID:', error)
    return null
  }
}

// 创建用户邮件传输器
const createUserTransporter = async (userId: string) => {
  try {
    // 获取用户邮箱配置
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { emailConfig: true }
    })

    if (!user?.emailConfig) {
      throw new Error('User email configuration not found')
    }

    // 解密配置
    const encryptionKey = process.env.ENCRYPTION_KEY || 'default-key'
    const emailConfig = JSON.parse(decrypt(user.emailConfig, encryptionKey))

    return nodemailer.createTransport({
      host: emailConfig.smtpHost,
      port: parseInt(emailConfig.smtpPort),
      secure: emailConfig.isSecure,
      auth: {
        user: emailConfig.email,
        pass: emailConfig.password
      }
    })
  } catch (error) {
    console.error('Error creating user transporter:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { campaignData, recipients } = await request.json()

    // 获取当前用户ID
    const userId = await getCurrentUserId(request)
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'User not authenticated'
      }, { status: 401 })
    }

    console.log('Sending campaign:', {
      subject: campaignData.subject,
      recipients: recipients.length,
      businessName: campaignData.businessName,
      userId
    })

    // 创建用户邮件传输器
    const transporter = await createUserTransporter(userId)
    
    if (!transporter) {
      return NextResponse.json({
        success: false,
        error: 'Email configuration not found. Please configure your email settings first.',
        details: 'Go to Settings > Email to configure your email account.'
      }, { status: 503 })
    }

    // 真实邮件发送
    let successCount = 0
    let failedCount = 0
    const errors: string[] = []

    // 获取用户邮箱配置用于发件人信息
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { emailConfig: true }
    })
    
    let senderEmail = 'noreply@novamail.com'
    if (user?.emailConfig) {
      const encryptionKey = process.env.ENCRYPTION_KEY || 'default-key'
      const emailConfig = JSON.parse(decrypt(user.emailConfig, encryptionKey))
      senderEmail = emailConfig.email
    }

    for (const recipient of recipients) {
      try {
        const mailOptions = {
          from: `"${campaignData.businessName || 'NovaMail'}" <${senderEmail}>`,
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
      errors: errors.length > 0 ? errors : undefined
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
