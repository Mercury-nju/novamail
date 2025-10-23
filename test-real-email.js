#!/usr/bin/env node

/**
 * 使用真实邮箱测试邮件发送
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function testRealEmail() {
  console.log('📧 NovaMail 真实邮箱测试\n');
  
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.log('❌ RESEND_API_KEY 环境变量未设置');
    process.exit(1);
  }
  
  console.log('请输入您的真实邮箱地址进行测试:');
  const testEmail = await question('收件人邮箱: ');
  
  if (!testEmail.includes('@')) {
    console.log('❌ 邮箱格式不正确');
    process.exit(1);
  }
  
  console.log(`\n📧 准备发送测试邮件到: ${testEmail}`);
  console.log('发件人: NovaMail Test <noreply@novamail.world>');
  console.log('主题: NovaMail 邮件发送测试');
  
  const confirm = await question('\n确认发送？(y/N): ');
  
  if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
    console.log('❌ 测试已取消');
    rl.close();
    return;
  }
  
  console.log('\n🚀 正在发送邮件...');
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'NovaMail Test <noreply@novamail.world>',
        to: [testEmail],
        subject: 'NovaMail 邮件发送测试',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">🎉 NovaMail 邮件发送测试</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">恭喜！您的邮件发送功能已成功配置</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">测试信息</h2>
              <p><strong>发送时间:</strong> ${new Date().toLocaleString('zh-CN')}</p>
              <p><strong>发送方式:</strong> Resend API</p>
              <p><strong>邮件ID:</strong> 即将生成</p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">✅ 功能验证</h3>
                <ul style="color: #666; line-height: 1.6;">
                  <li>API 连接正常</li>
                  <li>邮件发送成功</li>
                  <li>HTML 内容渲染正常</li>
                  <li>样式应用正确</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://novamail.world" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  访问 NovaMail
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              <p style="color: #666; font-size: 12px; text-align: center;">
                这是一封由 NovaMail 系统自动发送的测试邮件。<br>
                如果您收到此邮件，说明邮件发送功能已正常工作。
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
      
      console.log('\n📬 请检查您的邮箱:');
      console.log('1. 收件箱');
      console.log('2. 垃圾邮件文件夹');
      console.log('3. 促销邮件文件夹');
      
      console.log('\n💡 如果没收到邮件:');
      console.log('1. 等待 1-2 分钟（邮件传输需要时间）');
      console.log('2. 检查垃圾邮件文件夹');
      console.log('3. 尝试不同的邮箱地址');
      console.log('4. 检查邮箱服务商的反垃圾邮件设置');
      
    } else {
      console.log('❌ 邮件发送失败');
      console.log(`错误代码: ${response.status}`);
      console.log(`错误信息: ${JSON.stringify(data, null, 2)}`);
    }
    
  } catch (error) {
    console.log('❌ 发送错误:', error.message);
  }
  
  rl.close();
}

testRealEmail().catch(console.error);
