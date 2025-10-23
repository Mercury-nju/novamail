#!/usr/bin/env node

/**
 * 调试邮件编辑页面发送问题
 */

console.log('🔍 调试邮件编辑页面发送问题\n');

// 检查环境变量
const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.log('❌ RESEND_API_KEY 环境变量未设置');
  console.log('解决方案: 设置环境变量');
  console.log('$env:RESEND_API_KEY="re_HoZby1YY_8DhQswTinqLVqUwFjqHV4V7y"');
  process.exit(1);
}

console.log('✅ API 密钥已设置');
console.log(`🔑 API 密钥: ${apiKey.substring(0, 10)}...`);

// 测试 Resend API 直接调用
async function testDirectResendCall() {
  console.log('\n🌐 测试直接调用 Resend API...');
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'NovaMail Test <noreply@novamail.world>',
        to: ['test@example.com'],
        subject: 'NovaMail 邮件编辑页面测试',
        html: '<p>这是一封测试邮件，用于验证邮件编辑页面的发送功能。</p>'
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Resend API 直接调用成功');
      console.log(`📧 邮件ID: ${data.id}`);
      console.log(`📊 响应状态: ${response.status}`);
      
      console.log('\n💡 问题分析:');
      console.log('1. Resend API 工作正常');
      console.log('2. 问题可能在于 Next.js 环境变量读取');
      console.log('3. 或者前端到后端的 API 调用');
      
      console.log('\n🔧 解决方案:');
      console.log('1. 检查 .env.local 文件是否存在');
      console.log('2. 重启 Next.js 开发服务器');
      console.log('3. 检查浏览器控制台错误');
      console.log('4. 验证 /api/campaigns/send 路由');
      
    } else {
      console.log('❌ Resend API 调用失败');
      console.log(`错误代码: ${response.status}`);
      console.log(`错误信息: ${JSON.stringify(data, null, 2)}`);
    }
    
  } catch (error) {
    console.log('❌ 网络错误:', error.message);
  }
}

// 检查 Next.js 环境变量
function checkNextjsEnv() {
  console.log('\n🔍 检查 Next.js 环境变量...');
  
  const fs = require('fs');
  const path = require('path');
  
  // 检查 .env.local
  try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    if (envContent.includes(apiKey)) {
      console.log('✅ .env.local 文件存在且包含 API 密钥');
    } else {
      console.log('⚠️  .env.local 文件存在但未包含当前 API 密钥');
    }
  } catch (error) {
    console.log('❌ .env.local 文件不存在');
    console.log('💡 解决方案: 创建 .env.local 文件');
  }
  
  // 检查 .env
  try {
    const envContent = fs.readFileSync('.env', 'utf8');
    if (envContent.includes('RESEND_API_KEY')) {
      console.log('✅ .env 文件包含 RESEND_API_KEY');
    } else {
      console.log('⚠️  .env 文件不包含 RESEND_API_KEY');
    }
  } catch (error) {
    console.log('ℹ️  .env 文件不存在（这是正常的）');
  }
}

// 提供调试步骤
function provideDebugSteps() {
  console.log('\n🔧 调试步骤:');
  console.log('1. 检查开发服务器是否正在运行');
  console.log('2. 打开浏览器开发者工具');
  console.log('3. 进入邮件编辑页面');
  console.log('4. 点击 "Send Email" 按钮');
  console.log('5. 查看网络请求和控制台日志');
  
  console.log('\n📊 需要检查的内容:');
  console.log('- 网络请求是否发送到 /api/campaigns/send');
  console.log('- 请求是否返回 200 状态码');
  console.log('- 响应内容是否包含 success: true');
  console.log('- 控制台是否有错误信息');
  
  console.log('\n🚀 快速测试:');
  console.log('1. 启动开发服务器: npm run dev');
  console.log('2. 访问邮件编辑页面');
  console.log('3. 填写邮件信息并发送');
  console.log('4. 查看浏览器控制台输出');
}

// 主函数
async function main() {
  await testDirectResendCall();
  checkNextjsEnv();
  provideDebugSteps();
  
  console.log('\n📞 如果问题仍然存在:');
  console.log('- 检查 Next.js 开发服务器日志');
  console.log('- 验证环境变量是否正确加载');
  console.log('- 测试 API 路由是否可访问');
}

main().catch(console.error);
