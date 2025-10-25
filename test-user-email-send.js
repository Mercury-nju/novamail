#!/usr/bin/env node

/**
 * 用户友好的邮件发送测试
 * 模拟用户发送邮件并检查状态
 */

console.log('📧 NovaMail 邮件发送测试\n');

async function testUserEmailSend() {
  try {
    // 模拟用户发送邮件
    console.log('👤 模拟用户发送邮件...');
    
    const userEmailData = {
      campaignData: {
        subject: '🎉 欢迎使用NovaMail - 您的邮件营销平台',
        body: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <!-- Clean Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <div style="display: inline-block; background: rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 16px; margin-bottom: 16px;">
                <span style="color: white; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Welcome</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.2;">欢迎使用NovaMail</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 16px; font-weight: 400;">您的专业邮件营销平台</p>
            </div>
            
            <!-- Main Content Section -->
            <div style="padding: 40px 30px;">
              <!-- Personalized Greeting -->
              <div style="margin-bottom: 24px;">
                <p style="color: #1a202c; font-size: 16px; line-height: 1.5; margin-bottom: 8px; font-weight: 500;">
                  您好！
                </p>
                <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 0;">
                  感谢您选择NovaMail作为您的邮件营销解决方案。
                </p>
              </div>
              
              <!-- Main Message -->
              <div style="background: #f8fafc; padding: 24px; border-radius: 8px; margin: 24px 0; border: 1px solid #e2e8f0; border-left: 4px solid #667eea;">
                <h3 style="color: #1a202c; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">NovaMail为您提供：</h3>
                <div style="display: grid; gap: 12px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 6px; height: 6px; background: #667eea; border-radius: 50%;"></div>
                    <span style="color: #2d3748; font-size: 14px; line-height: 1.5;">专业的邮件模板设计</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 6px; height: 6px; background: #667eea; border-radius: 50%;"></div>
                    <span style="color: #2d3748; font-size: 14px; line-height: 1.5;">智能的邮件发送系统</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 6px; height: 6px; background: #667eea; border-radius: 50%;"></div>
                    <span style="color: #2d3748; font-size: 14px; line-height: 1.5;">详细的发送统计报告</span>
                  </div>
                </div>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="https://novamail.world/dashboard" style="display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
                  开始使用NovaMail
                </a>
                <p style="color: #718096; font-size: 12px; margin: 8px 0 0 0;">免费使用 • 无需信用卡</p>
              </div>
              
              <!-- Closing Message -->
              <div style="margin: 32px 0 0 0;">
                <p style="color: #4a5568; font-size: 15px; line-height: 1.5; margin: 0 0 20px 0;">
                  如有任何问题，请随时联系我们的客服团队。
                </p>
                
                <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
                  <p style="color: #2d3748; font-size: 14px; line-height: 1.5; margin: 0;">
                    祝您使用愉快！<br>
                    <strong style="color: #1a202c;">NovaMail团队</strong><br>
                    <span style="color: #667eea; font-weight: 500;">专业邮件营销平台</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        `
      },
      recipients: ['2945235656@qq.com'],
      senderEmail: 'noreply@novamail.world',
      senderName: 'NovaMail'
    };
    
    console.log('📤 发送邮件到生产环境...');
    
    const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/campaigns/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userEmailData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ 邮件发送成功！');
      console.log('📧 邮件ID:', result.sentEmails?.[0]?.messageId || 'N/A');
      console.log('📬 收件人:', result.sentEmails?.[0]?.recipient || 'N/A');
      console.log('🌐 发送方式:', result.sentEmails?.[0]?.method || 'N/A');
      console.log('⏰ 发送时间:', result.sentEmails?.[0]?.timestamp || 'N/A');
      
      console.log('\n📋 邮件发送详情:');
      console.log('   - 发件人: NovaMail <noreply@novamail.world>');
      console.log('   - 收件人: 2945235656@qq.com');
      console.log('   - 主题: 🎉 欢迎使用NovaMail - 您的邮件营销平台');
      console.log('   - 状态: 已发送');
      
      console.log('\n🔍 如果没收到邮件，请检查:');
      console.log('   1. 📬 QQ邮箱的垃圾邮件文件夹');
      console.log('   2. 📁 QQ邮箱的"其他文件夹"');
      console.log('   3. ⏰ 等待5-10分钟（邮件传输延迟）');
      console.log('   4. 🔍 搜索关键词"NovaMail"或"novamail.world"');
      
      console.log('\n💡 解决方案:');
      console.log('   - 将 noreply@novamail.world 添加到白名单');
      console.log('   - 将 @novamail.world 域名添加到白名单');
      console.log('   - 尝试发送到Gmail或Outlook邮箱测试');
      
    } else {
      console.log('❌ 邮件发送失败:', result.error);
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testUserEmailSend();