#!/usr/bin/env node

/**
 * NovaMail 邮件发送功能测试脚本
 * 用于验证 Resend API 配置是否正确
 */

const fetch = require('node-fetch');

async function testEmailSending() {
  console.log('🧪 NovaMail 邮件发送功能测试\n');
  
  // 检查环境变量
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.log('❌ RESEND_API_KEY 环境变量未设置');
    console.log('请先运行: node setup-real-email.js');
    process.exit(1);
  }
  
  if (!apiKey.startsWith('re_')) {
    console.log('❌ API 密钥格式不正确，应该以 "re_" 开头');
    process.exit(1);
  }
  
  console.log('✅ API 密钥格式正确');
  console.log(`🔑 API 密钥: ${apiKey.substring(0, 10)}...`);
  
  // 测试邮件数据
  const testEmail = {
    from: 'NovaMail Test <noreply@novamail.world>',
    to: ['test@example.com'], // 请替换为您的测试邮箱
    subject: 'NovaMail 邮件发送测试',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">🎉 NovaMail 邮件发送测试</h2>
        <p>恭喜！您的 NovaMail 邮件发送功能已成功配置。</p>
        <p><strong>测试时间:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>发送方式:</strong> Resend API</p>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          这是一封测试邮件，由 NovaMail 系统自动发送。
        </p>
      </div>
    `
  };
  
  console.log('\n📧 测试邮件信息:');
  console.log(`发件人: ${testEmail.from}`);
  console.log(`收件人: ${testEmail.to.join(', ')}`);
  console.log(`主题: ${testEmail.subject}`);
  
  const confirm = await new Promise((resolve) => {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('\n是否发送测试邮件？(y/N): ', (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
  
  if (!confirm) {
    console.log('❌ 测试已取消');
    process.exit(0);
  }
  
  console.log('\n🚀 正在发送测试邮件...');
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testEmail),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ 邮件发送成功！');
      console.log(`📧 邮件ID: ${data.id}`);
      console.log(`📅 发送时间: ${new Date().toLocaleString()}`);
      console.log('\n📬 请检查您的邮箱（包括垃圾邮件文件夹）');
    } else {
      console.log('❌ 邮件发送失败');
      console.log(`错误代码: ${response.status}`);
      console.log(`错误信息: ${JSON.stringify(data, null, 2)}`);
      
      if (data.message) {
        console.log(`\n💡 可能的解决方案:`);
        if (data.message.includes('Invalid API key')) {
          console.log('- 检查 API 密钥是否正确');
          console.log('- 确认 API 密钥权限是否足够');
        } else if (data.message.includes('Invalid email')) {
          console.log('- 检查收件人邮箱格式是否正确');
          console.log('- 确认发件人邮箱格式是否正确');
        }
      }
    }
  } catch (error) {
    console.log('❌ 网络错误:', error.message);
    console.log('请检查网络连接和 API 端点');
  }
  
  console.log('\n📚 更多帮助信息:');
  console.log('- 查看 ENABLE_REAL_EMAIL_SENDING.md 获取详细设置指南');
  console.log('- 访问 https://resend.com 查看 API 文档');
  console.log('- 检查 Resend 控制台的使用统计和日志');
}

// 运行测试
testEmailSending().catch(console.error);
