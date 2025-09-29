// 生成验证码
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString() // 6位数字验证码
}

import nodemailer from 'nodemailer'

// 创建邮件传输器
const createTransporter = () => {
  if (!process.env.EMAIL_SERVER_USER || process.env.EMAIL_SERVER_USER === 'your-email@gmail.com') {
    console.log('⚠️ SMTP配置未完成，使用开发模式')
    return null
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: process.env.EMAIL_SERVER_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    }
  })
}

// 发送验证码邮件
export const sendVerificationEmail = async (email: string, code: string): Promise<boolean> => {
  try {
    const transporter = createTransporter()
    
    // 检查是否配置了SMTP
    const isConfigured = process.env.EMAIL_SERVER_USER && 
                        process.env.EMAIL_SERVER_USER !== 'your-email@gmail.com'

    if (!isConfigured || !transporter) {
      // 开发环境模式：只显示在控制台
      console.log('\n📧 ===== 验证码邮件 (开发环境) =====')
      console.log(`发送给: ${email}`)
      console.log(`验证码: ${code}`)
      console.log(`过期时间: 10分钟`)
      console.log('\n邮件内容预览:')
      console.log('主题: Email Verification Code - NovaMail')
      console.log('─────────────────────────────────────────')
      console.log(`您的新验证码: ${code}`)
      console.log(`此验证码将在10分钟后过期。`)
      console.log(`如果您没有请求此验证码，请忽略此邮件。`)
      console.log('\n感谢您注册NovaMail！')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('💡 要启用真实邮件发送，请配置.env文件中的SMTP设置')
      
      // 模拟邮件发送延迟
      await new Promise(resolve => setTimeout(resolve, 800))
      
      console.log('✅ 模拟邮件发送成功\n')
      return true
    }

    // 生产环境：发送真实邮件
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"NovaMail Team" <noreply@novamail.world>',
      to: email,
      subject: 'Email Verification Code - NovaMail',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">NovaMail</h1>
            <p style="color: white; margin: 10px 0 0 0;">Email Marketing Platform</p>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #333; margin: 0 0 20px 0;">Email Verification</h2>
            <p style="color: #666; line-height: 1.6; margin: 0 0 30px 0;">
              Thank you for registering with NovaMail! To complete your registration and verify your email address, please use the verification code below:
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${code}</span>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin: 20px 0 0 0;">
              This verification code will expire in <strong>10 minutes</strong>. If you didn't request this code, please ignore this email.
            </p>
            
            <div style="border-top: 1px solid #eee; margin: 40px 0 20px 0; padding-top: 20px;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                If you have any questions, please contact our support team at support@novamail.world
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        NovaMail - Email Verification
        
        Your verification code is: ${code}
        
        This code will expire in 10 minutes.
        
        If you didn't request this code, please ignore this email.
        
        Best regards,
        NovaMail Team
      `
    }

    await transporter.sendMail(mailOptions)
    console.log(`✅ 真实邮件已发送到: ${email}`)
    return true
    
  } catch (error) {
    console.error('❌ 发送验证码邮件失败:', error)
    return false
  }
}

// 在生产环境中，您可以取消注释下面的代码来使用真实的邮件发送
/*
import nodemailer from 'nodemailer'

const createTransporter = () => {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
}

export const sendVerificationEmail = async (email: string, code: string): Promise<boolean> => {
  try {
    // 在开发环境中显示到控制台
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 验证码邮件 (开发环境):')
      console.log(`   发送给: ${email}`)
      console.log(`   验证码: ${code}`)
      return true
    }

    // 生产环境中发送真实邮件
    const transporter = createTransporter()
    await transporter.sendMail({
      from: '"NovaMail Team" <noreply@novamail.world>',
      to: email,
      subject: 'Email Verification Code - NovaMail',
      html: `您的验证码: <strong>${code}</strong><br/>此验证码将在10分钟后过期。`,
      text: `您的验证码: ${code}\n此验证码将在10分钟后过期。`
    })
    
    return true
  } catch (error) {
    console.error('发送验证码邮件失败:', error)
    return false
  }
}
*/