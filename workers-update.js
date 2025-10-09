// 更新发送验证码函数中的发件人地址
// 将以下代码替换到 handleSendVerificationAPI 函数中

// 使用Resend API发送邮件
const emailData = {
  from: 'NovaMail <onboarding@resend.dev>', // 使用Resend默认域名
  to: email,
  subject: 'Your NovaMail Verification Code',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">NovaMail</h1>
      </div>
      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.5;">
          Thank you for signing up for NovaMail! To complete your registration, please use the verification code below:
        </p>
        <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${verificationCode}</span>
        </div>
        <p style="color: #666; font-size: 14px;">
          This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
        </p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">
            This email was sent by NovaMail. If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  `
}

// 同时更新欢迎邮件的发件人地址
const welcomeEmailData = {
  from: 'NovaMail <onboarding@resend.dev>', // 使用Resend默认域名
  to: email,
  subject: 'Welcome to NovaMail!',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Welcome to NovaMail!</h1>
      </div>
      <div style="padding: 30px; background: #f9f9f9;">
        <h2 style="color: #333; margin-bottom: 20px;">Hello ${firstName}!</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.5;">
          Welcome to NovaMail! Your account has been successfully created and verified.
        </p>
        <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <h3 style="color: #667eea; margin: 0;">Get Started</h3>
          <p style="color: #666; margin: 10px 0;">Start creating your first email campaign</p>
          <a href="https://novamail.pages.dev/dashboard" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Dashboard</a>
        </div>
        <p style="color: #666; font-size: 14px;">
          If you have any questions, please don't hesitate to contact our support team.
        </p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">
            This email was sent by NovaMail. Thank you for choosing us!
          </p>
        </div>
      </div>
    </div>
  `
}

