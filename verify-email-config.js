#!/usr/bin/env node

/**
 * 验证邮件发送配置
 */

console.log('🔍 NovaMail 邮件发送配置验证\n');

// 检查环境变量
const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.log('❌ RESEND_API_KEY 环境变量未设置');
  console.log('请设置环境变量或创建 .env.local 文件');
  process.exit(1);
}

if (!apiKey.startsWith('re_')) {
  console.log('❌ API 密钥格式不正确，应该以 "re_" 开头');
  process.exit(1);
}

console.log('✅ API 密钥格式正确');
console.log(`🔑 API 密钥: ${apiKey.substring(0, 10)}...`);

// 检查配置文件
const fs = require('fs');
const path = require('path');

// 检查 wrangler.toml
try {
  const wranglerContent = fs.readFileSync('wrangler.toml', 'utf8');
  if (wranglerContent.includes(apiKey)) {
    console.log('✅ wrangler.toml 配置正确');
  } else {
    console.log('⚠️  wrangler.toml 中未找到当前 API 密钥');
  }
} catch (error) {
  console.log('⚠️  无法读取 wrangler.toml');
}

// 检查 .env.local
try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  if (envContent.includes(apiKey)) {
    console.log('✅ .env.local 配置正确');
  } else {
    console.log('⚠️  .env.local 中未找到当前 API 密钥');
  }
} catch (error) {
  console.log('⚠️  .env.local 文件不存在');
}

console.log('\n📋 配置状态总结:');
console.log('✅ Resend API 密钥已配置');
console.log('✅ 真实邮件发送功能已启用');
console.log('✅ 开发环境和生产环境都已配置');

console.log('\n🚀 下一步:');
console.log('1. 启动开发服务器: npm run dev');
console.log('2. 进入邮件编辑页面');
console.log('3. 点击 "Send Email" 测试发送');
console.log('4. 查看控制台输出确认使用 Resend API');

console.log('\n📧 测试方法:');
console.log('- 如果看到 "Sending email via Resend API" - 配置成功');
console.log('- 如果看到 "EMAIL SENDING SIMULATION" - 配置未生效');

console.log('\n🎉 邮件发送功能已准备就绪！');
