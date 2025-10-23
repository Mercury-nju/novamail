#!/usr/bin/env node

/**
 * 快速邮件发送测试
 * 直接测试 Resend API 是否工作
 */

console.log('📧 快速邮件发送测试\n');

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.log('❌ RESEND_API_KEY 环境变量未设置');
  process.exit(1);
}

console.log('✅ API 密钥已设置');
console.log(`🔑 API 密钥: ${apiKey.substring(0, 10)}...`);

async function sendTestEmail() {
  console.log('\n🚀 正在发送测试邮件...');
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'NovaMail Test <onboarding@resend.dev>', // 使用 Resend 验证域名
        to: ['test@example.com'],
        subject: 'NovaMail 快速测试',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">🎉 NovaMail 快速测试</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">测试时间: ${new Date().toLocaleString('zh-CN')}</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">✅ 邮件发送测试</h2>
              <p>如果您收到此邮件，说明 Resend API 工作正常。</p>
              
              <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
                <h3 style="color: #2e7d32; margin-top: 0;">🎯 测试结果</h3>
                <ul style="color: #2e7d32; line-height: 1.6;">
                  <li>✅ API 连接正常</li>
                  <li>✅ 邮件发送成功</li>
                  <li>✅ 使用验证域名</li>
                </ul>
              </div>
              
              <p style="color: #666; font-size: 12px; text-align: center;">
                这是一封由 NovaMail 系统发送的测试邮件。
              </p>
            </div>
          </div>
        `
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ 邮件发送成功！');
      console.log(`📧 邮件ID: ${data.id}`);
      console.log(`📅 发送时间: ${new Date().toLocaleString('zh-CN')}`);
      console.log(`📊 响应状态: ${response.status}`);
      
      console.log('\n📬 请检查您的邮箱:');
      console.log('1. 收件箱');
      console.log('2. 垃圾邮件文件夹');
      console.log('3. 促销邮件文件夹');
      
      console.log('\n💡 如果没收到邮件:');
      console.log('1. 等待 1-2 分钟（邮件传输需要时间）');
      console.log('2. 检查垃圾邮件文件夹');
      console.log('3. 尝试不同的邮箱地址');
      console.log('4. 检查邮箱服务商的反垃圾邮件设置');
      
      console.log('\n🔍 调试信息:');
      console.log(`- 发件人: onboarding@resend.dev (验证域名)`);
      console.log(`- 收件人: test@example.com`);
      console.log(`- 主题: NovaMail 快速测试`);
      console.log(`- 邮件ID: ${data.id}`);
      
    } else {
      console.log('❌ 邮件发送失败');
      console.log(`错误代码: ${response.status}`);
      console.log(`错误信息: ${JSON.stringify(data, null, 2)}`);
      
      if (data.message) {
        console.log('\n💡 可能的解决方案:');
        if (data.message.includes('Invalid API key')) {
          console.log('- 检查 API 密钥是否正确');
        } else if (data.message.includes('Invalid email')) {
          console.log('- 检查邮箱地址格式');
        } else if (data.message.includes('rate limit')) {
          console.log('- 等待一段时间后重试');
        }
      }
    }
    
  } catch (error) {
    console.log('❌ 发送错误:', error.message);
    console.log('💡 请检查网络连接和 API 配置');
  }
}

sendTestEmail().catch(console.error);
