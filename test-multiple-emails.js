#!/usr/bin/env node

/**
 * 测试多个邮箱服务商的邮件发送
 */

console.log('🔍 测试多个邮箱服务商的邮件发送\n');

async function testMultipleEmails() {
  try {
    const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 测试多个邮箱服务商
    const testEmails = [
      '66597405@qq.com',           // QQ邮箱
      'test@gmail.com',            // Gmail
      'test@outlook.com',          // Outlook
      'test@163.com'              // 163邮箱
    ];
    
    console.log('🔑 验证码:', verificationCode);
    console.log('📧 测试邮箱列表:', testEmails);
    
    for (const email of testEmails) {
      console.log(`\n📤 发送到: ${email}`);
      
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'NovaMail <noreply@novamail.world>',
          to: email,
          subject: `NovaMail Verification Code - ${email.split('@')[1]}`,
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
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ ${email} - 发送成功！邮件ID: ${result.id}`);
      } else {
        const errorText = await response.text();
        console.log(`❌ ${email} - 发送失败: ${response.status} - ${errorText}`);
      }
    }
    
    console.log('\n📊 测试总结:');
    console.log('   - QQ邮箱: 可能被过滤或分类到垃圾邮件');
    console.log('   - Gmail: 通常能正常接收');
    console.log('   - Outlook: 通常能正常接收');
    console.log('   - 163邮箱: 可能被过滤');
    
    console.log('\n💡 建议解决方案:');
    console.log('   1. 使用Gmail或Outlook邮箱注册');
    console.log('   2. 将发件人添加到白名单');
    console.log('   3. 检查垃圾邮件文件夹');
    console.log('   4. 联系客服获取验证码');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testMultipleEmails();