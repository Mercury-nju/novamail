#!/usr/bin/env node

/**
 * 使用自己的邮箱测试邮件发送
 * 根据 Resend 限制，只能向自己的邮箱发送测试邮件
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

async function testWithOwnEmail() {
  console.log('📧 使用自己的邮箱测试邮件发送\n');
  
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.log('❌ RESEND_API_KEY 环境变量未设置');
    process.exit(1);
  }
  
  console.log('✅ API 密钥已设置');
  console.log(`🔑 API 密钥: ${apiKey.substring(0, 10)}...`);
  
  console.log('\n💡 根据 Resend 限制，只能向自己的邮箱发送测试邮件');
  console.log('请输入您的邮箱地址进行测试:');
  const testEmail = await question('您的邮箱地址: ');
  
  if (!testEmail.includes('@')) {
    console.log('❌ 邮箱格式不正确');
    process.exit(1);
  }
  
  console.log(`\n📧 准备发送测试邮件到: ${testEmail}`);
  console.log('发件人: NovaMail Test <onboarding@resend.dev>');
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
        from: 'NovaMail Test <onboarding@resend.dev>',
        to: [testEmail],
        subject: 'NovaMail 邮件发送测试',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">🎉 NovaMail 邮件发送测试</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">测试时间: ${new Date().toLocaleString('zh-CN')}</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #333; margin-top: 0;">✅ 邮件发送功能测试</h2>
              <p>如果您收到此邮件，说明 NovaMail 的邮件发送功能完全正常。</p>
              
              <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
                <h3 style="color: #2e7d32; margin-top: 0;">🎯 测试结果</h3>
                <ul style="color: #2e7d32; line-height: 1.6;">
                  <li>✅ Resend API 连接正常</li>
                  <li>✅ 邮件发送成功</li>
                  <li>✅ 使用验证域名发送</li>
                  <li>✅ HTML 内容渲染正确</li>
                </ul>
              </div>
              
              <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
                <h3 style="color: #856404; margin-top: 0;">💡 下一步</h3>
                <p style="color: #856404; margin: 0;">
                  现在您可以在邮件编辑页面正常使用发送功能了。<br>
                  系统将使用 Resend API 发送真实邮件。
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://novamail.world" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  访问 NovaMail
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
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
      
      console.log('\n🎯 如果收到此邮件，说明:');
      console.log('✅ 邮件发送功能完全正常');
      console.log('✅ 可以在邮件编辑页面正常使用');
      console.log('✅ Resend API 集成成功');
      
      console.log('\n🚀 现在可以:');
      console.log('1. 进入邮件编辑页面');
      console.log('2. 填写邮件内容');
      console.log('3. 点击 "Send Email" 发送');
      console.log('4. 邮件将真实发送到收件人');
      
    } else {
      console.log('❌ 邮件发送失败');
      console.log(`错误代码: ${response.status}`);
      console.log(`错误信息: ${JSON.stringify(data, null, 2)}`);
      
      if (data.message) {
        console.log('\n💡 错误分析:');
        if (data.message.includes('own email address')) {
          console.log('- 只能向自己的邮箱发送测试邮件');
          console.log('- 请使用您注册 Resend 账户时使用的邮箱');
        } else if (data.message.includes('verify a domain')) {
          console.log('- 需要验证发送域名');
          console.log('- 访问 https://resend.com/domains 验证域名');
        }
      }
    }
    
  } catch (error) {
    console.log('❌ 发送错误:', error.message);
  }
  
  rl.close();
}

testWithOwnEmail().catch(console.error);
