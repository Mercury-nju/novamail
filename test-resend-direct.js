#!/usr/bin/env node

/**
 * 直接测试Resend API发送邮件
 */

console.log('🔍 直接测试Resend API发送邮件\n');

async function testResendDirect() {
  try {
    const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
    const testEmail = '66597405@qq.com';
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log('📧 测试邮箱:', testEmail);
    console.log('🔑 验证码:', verificationCode);
    console.log('🔑 API密钥:', RESEND_API_KEY.substring(0, 10) + '...');
    
    console.log('\n📤 直接调用Resend API...');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'NovaMail <noreply@novamail.world>',
        to: testEmail,
        subject: 'Your NovaMail Verification Code - Direct Test',
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
    
    console.log('📊 Resend API响应状态:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Resend API发送成功！');
      console.log('📧 邮件ID:', result.id);
      console.log('📧 收件人:', testEmail);
      console.log('🔑 验证码:', verificationCode);
      
      console.log('\n📬 请检查您的QQ邮箱:');
      console.log('   1. 📬 垃圾邮件文件夹');
      console.log('   2. 📁 其他文件夹');
      console.log('   3. ⏰ 等待5-10分钟（邮件传输延迟）');
      console.log('   4. 🔍 搜索关键词"NovaMail"或"verification"');
      
      // 检查邮件状态
      console.log('\n🔍 检查邮件发送状态...');
      const statusResponse = await fetch(`https://api.resend.com/emails/${result.id}`, {
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`
        }
      });
      
      if (statusResponse.ok) {
        const statusResult = await statusResponse.json();
        console.log('📊 邮件状态:', statusResult);
      }
      
    } else {
      const errorText = await response.text();
      console.log('❌ Resend API发送失败！');
      console.log('📊 错误状态:', response.status);
      console.log('📋 错误信息:', errorText);
      
      console.log('\n🔧 可能的原因:');
      console.log('   1. API密钥无效');
      console.log('   2. 域名未验证');
      console.log('   3. 邮箱地址格式问题');
      console.log('   4. Resend服务问题');
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.log('\n🔧 故障排除:');
    console.log('   1. 检查网络连接');
    console.log('   2. 检查API密钥');
    console.log('   3. 检查域名验证状态');
  }
}

testResendDirect();
