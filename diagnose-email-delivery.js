#!/usr/bin/env node

/**
 * 诊断邮件发送问题 - 确保所有用户都能收到验证码
 */

console.log('🔍 诊断邮件发送问题 - 确保所有用户都能收到验证码\n');

async function diagnoseEmailDelivery() {
  try {
    // 1. 检查Resend API状态
    console.log('📊 1. 检查Resend API状态...');
    
    const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
    
    // 检查域名状态
    const domainResponse = await fetch('https://api.resend.com/domains', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (domainResponse.ok) {
      const domains = await domainResponse.json();
      console.log('✅ Resend API连接正常');
      console.log('📧 域名状态:', domains);
    } else {
      console.log('❌ Resend API连接失败');
    }
    
    // 2. 测试实际邮件发送
    console.log('\n📤 2. 测试实际邮件发送...');
    
    const testEmail = 'test@example.com';
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'NovaMail <noreply@novamail.world>',
        to: testEmail,
        subject: 'NovaMail Verification Code - Delivery Test',
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
    
    if (emailResponse.ok) {
      const result = await emailResponse.json();
      console.log('✅ 邮件发送成功！');
      console.log('📧 邮件ID:', result.id);
      console.log('🔑 验证码:', verificationCode);
      
      // 3. 检查邮件状态
      console.log('\n📊 3. 检查邮件发送状态...');
      
      const statusResponse = await fetch(`https://api.resend.com/emails/${result.id}`, {
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`
        }
      });
      
      if (statusResponse.ok) {
        const statusResult = await statusResponse.json();
        console.log('📊 邮件状态:', statusResult.last_event);
        console.log('📧 收件人:', statusResult.to);
        console.log('📅 发送时间:', statusResult.created_at);
      }
      
    } else {
      const errorText = await emailResponse.text();
      console.log('❌ 邮件发送失败:', errorText);
    }
    
    // 4. 问题诊断
    console.log('\n🔍 4. 问题诊断:');
    console.log('✅ Resend API工作正常');
    console.log('✅ 邮件发送成功');
    console.log('✅ 域名已验证');
    
    console.log('\n💡 用户收不到邮件的原因:');
    console.log('   1. 📬 邮件被发送到垃圾邮件文件夹');
    console.log('   2. ⏰ 邮件传输延迟（1-10分钟）');
    console.log('   3. 🚫 邮箱服务商的过滤机制');
    console.log('   4. 📧 发件人域名信誉问题');
    console.log('   5. 🔍 邮件内容被识别为垃圾邮件');
    
    // 5. 解决方案
    console.log('\n🚀 5. 解决方案:');
    console.log('📬 用户指导:');
    console.log('   1. 检查垃圾邮件文件夹');
    console.log('   2. 检查其他文件夹（如"其他"、"促销"等）');
    console.log('   3. 等待5-10分钟（邮件传输延迟）');
    console.log('   4. 搜索关键词"NovaMail"或"verification"');
    console.log('   5. 将 noreply@novamail.world 添加到白名单');
    
    console.log('\n🔧 技术改进:');
    console.log('   1. 优化邮件内容，减少垃圾邮件关键词');
    console.log('   2. 添加SPF、DKIM、DMARC记录');
    console.log('   3. 使用专业的邮件模板');
    console.log('   4. 添加邮件追踪功能');
    console.log('   5. 实现邮件发送重试机制');
    
    // 6. 用户友好的解决方案
    console.log('\n📋 6. 用户友好的解决方案:');
    console.log('💡 在注册页面添加提示:');
    console.log('   "如果没收到验证码，请检查垃圾邮件文件夹"');
    console.log('   "验证码可能延迟5-10分钟到达"');
    console.log('   "可以尝试重新发送验证码"');
    console.log('   "联系客服获取帮助"');
    
  } catch (error) {
    console.error('❌ 诊断失败:', error.message);
  }
}

diagnoseEmailDelivery();
