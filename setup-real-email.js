#!/usr/bin/env node

/**
 * NovaMail 真实邮件发送设置脚本
 * 帮助用户快速配置 Resend API 进行真实邮件发送
 */

const fs = require('fs');
const path = require('path');
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

async function main() {
  console.log('🚀 NovaMail 真实邮件发送设置向导\n');
  
  console.log('📋 设置步骤：');
  console.log('1. 注册 Resend 账户: https://resend.com');
  console.log('2. 创建 API 密钥');
  console.log('3. 配置环境变量\n');
  
  const apiKey = await question('请输入您的 Resend API 密钥 (格式: re_xxxxxxxxxx): ');
  
  if (!apiKey.startsWith('re_')) {
    console.log('❌ API 密钥格式不正确，应该以 "re_" 开头');
    process.exit(1);
  }
  
  console.log('\n🔧 正在配置环境变量...');
  
  // 更新 wrangler.toml
  try {
    const wranglerPath = path.join(__dirname, 'wrangler.toml');
    let wranglerContent = fs.readFileSync(wranglerPath, 'utf8');
    
    // 替换 API 密钥
    wranglerContent = wranglerContent.replace(
      /RESEND_API_KEY = "re_PCbEHboB\.\.\."/,
      `RESEND_API_KEY = "${apiKey}"`
    );
    
    fs.writeFileSync(wranglerPath, wranglerContent);
    console.log('✅ wrangler.toml 已更新');
  } catch (error) {
    console.log('⚠️  无法更新 wrangler.toml:', error.message);
  }
  
  // 创建 .env.local 文件
  try {
    const envPath = path.join(__dirname, '.env.local');
    const envContent = `# NovaMail 环境变量
RESEND_API_KEY=${apiKey}

# NextAuth 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# 其他配置
EMAIL_FROM=noreply@novamail.world
`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env.local 已创建');
  } catch (error) {
    console.log('⚠️  无法创建 .env.local:', error.message);
  }
  
  console.log('\n🎉 配置完成！');
  console.log('\n📝 下一步：');
  console.log('1. 重启开发服务器: npm run dev');
  console.log('2. 进入邮件编辑页面');
  console.log('3. 点击 "Send Email" 测试发送');
  console.log('4. 检查控制台输出确认配置生效');
  
  console.log('\n🔍 验证方法：');
  console.log('- 如果看到 "Sending email via Resend API" - 配置成功');
  console.log('- 如果看到 "EMAIL SENDING SIMULATION" - 配置未生效');
  
  console.log('\n📚 更多信息请查看: ENABLE_REAL_EMAIL_SENDING.md');
  
  rl.close();
}

main().catch(console.error);
