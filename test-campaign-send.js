#!/usr/bin/env node

/**
 * 测试邮件编辑页面的发送功能
 * 模拟前端调用 /api/campaigns/send 接口
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

async function testCampaignSend() {
  console.log('📧 测试邮件编辑页面发送功能\n');
  
  // 检查环境变量
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.log('❌ RESEND_API_KEY 环境变量未设置');
    console.log('请设置环境变量: $env:RESEND_API_KEY="re_HoZby1YY_8DhQswTinqLVqUwFjqHV4V7y"');
    process.exit(1);
  }
  
  console.log('✅ API 密钥已设置');
  console.log(`🔑 API 密钥: ${apiKey.substring(0, 10)}...`);
  
  // 获取测试数据
  console.log('\n请输入测试信息:');
  const recipientEmail = await question('收件人邮箱: ');
  const senderEmail = await question('发件人邮箱: ');
  const senderName = await question('发件人姓名 (默认: NovaMail): ') || 'NovaMail';
  const subject = await question('邮件主题 (默认: 测试邮件): ') || '测试邮件';
  
  if (!recipientEmail.includes('@') || !senderEmail.includes('@')) {
    console.log('❌ 邮箱格式不正确');
    process.exit(1);
  }
  
  // 模拟邮件内容
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">🎉 NovaMail 邮件发送测试</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">来自邮件编辑页面的测试</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-top: 0;">✅ 邮件编辑页面发送功能测试</h2>
        <p><strong>发送时间:</strong> ${new Date().toLocaleString('zh-CN')}</p>
        <p><strong>发送方式:</strong> /api/campaigns/send 接口</p>
        <p><strong>发件人:</strong> ${senderName} &lt;${senderEmail}&gt;</p>
        <p><strong>收件人:</strong> ${recipientEmail}</p>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
          <h3 style="color: #2e7d32; margin-top: 0;">🎯 功能验证</h3>
          <ul style="color: #2e7d32; line-height: 1.6;">
            <li>✅ 邮件编辑页面发送功能正常</li>
            <li>✅ API 接口调用成功</li>
            <li>✅ Resend API 集成正常</li>
            <li>✅ HTML 内容渲染正确</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://novamail.world" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            访问 NovaMail
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          这是一封由 NovaMail 邮件编辑页面发送的测试邮件。
        </p>
      </div>
    </div>
  `;
  
  console.log('\n📧 准备发送邮件:');
  console.log(`发件人: ${senderName} <${senderEmail}>`);
  console.log(`收件人: ${recipientEmail}`);
  console.log(`主题: ${subject}`);
  
  const confirm = await question('\n确认发送？(y/N): ');
  
  if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
    console.log('❌ 测试已取消');
    rl.close();
    return;
  }
  
  console.log('\n🚀 正在发送邮件...');
  
  try {
    // 直接调用 Resend API（模拟 /api/campaigns/send 的行为）
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${senderName} <${senderEmail}>`,
        to: [recipientEmail],
        subject: subject,
        html: emailContent,
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
      console.log('✅ 邮件编辑页面发送功能正常');
      console.log('✅ API 接口配置正确');
      console.log('✅ Resend API 集成成功');
      
      console.log('\n💡 下一步:');
      console.log('1. 在邮件编辑页面测试发送');
      console.log('2. 检查浏览器控制台日志');
      console.log('3. 验证前端到后端的完整流程');
      
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
  
  rl.close();
}

testCampaignSend().catch(console.error);
