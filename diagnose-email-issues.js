#!/usr/bin/env node

/**
 * NovaMail 邮件发送问题诊断脚本
 * 帮助排查邮件发送失败的原因
 */

console.log('🔍 NovaMail 邮件发送问题诊断\n');

// 检查环境变量
const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.log('❌ RESEND_API_KEY 环境变量未设置');
  console.log('解决方案: 设置环境变量或创建 .env.local 文件');
  process.exit(1);
}

console.log('✅ API 密钥已设置');
console.log(`🔑 API 密钥: ${apiKey.substring(0, 10)}...`);

// 测试 Resend API 连接
async function testResendConnection() {
  console.log('\n🌐 测试 Resend API 连接...');
  
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
        subject: 'NovaMail 连接测试',
        html: '<p>这是一封测试邮件，用于验证 API 连接。</p>'
      }),
    });
    
    const data = await response.json();
    
    console.log(`📊 响应状态: ${response.status}`);
    console.log(`📊 响应数据:`, JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ Resend API 连接成功');
      console.log(`📧 邮件ID: ${data.id}`);
      return true;
    } else {
      console.log('❌ Resend API 连接失败');
      console.log('可能的原因:');
      
      if (data.message) {
        console.log(`- 错误信息: ${data.message}`);
        
        if (data.message.includes('Invalid API key')) {
          console.log('💡 解决方案: 检查 API 密钥是否正确');
        } else if (data.message.includes('Invalid email')) {
          console.log('💡 解决方案: 检查邮箱地址格式');
        } else if (data.message.includes('rate limit')) {
          console.log('💡 解决方案: 等待一段时间后重试');
        }
      }
      
      return false;
    }
  } catch (error) {
    console.log('❌ 网络连接错误:', error.message);
    console.log('💡 解决方案: 检查网络连接');
    return false;
  }
}

// 检查常见问题
function checkCommonIssues() {
  console.log('\n🔍 检查常见问题...');
  
  const issues = [];
  
  // 检查 API 密钥格式
  if (!apiKey.startsWith('re_')) {
    issues.push('API 密钥格式不正确（应该以 re_ 开头）');
  }
  
  // 检查 API 密钥长度
  if (apiKey.length < 20) {
    issues.push('API 密钥长度异常（可能不完整）');
  }
  
  // 检查环境变量文件
  const fs = require('fs');
  try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    if (!envContent.includes(apiKey)) {
      issues.push('.env.local 文件中未找到 API 密钥');
    }
  } catch (error) {
    issues.push('.env.local 文件不存在或无法读取');
  }
  
  if (issues.length > 0) {
    console.log('⚠️  发现以下问题:');
    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue}`);
    });
  } else {
    console.log('✅ 未发现明显问题');
  }
}

// 提供解决方案
function provideSolutions() {
  console.log('\n💡 解决方案:');
  console.log('1. 检查 Resend 控制台:');
  console.log('   - 访问 https://resend.com');
  console.log('   - 查看 API 使用统计');
  console.log('   - 检查是否有错误日志');
  
  console.log('\n2. 验证 API 密钥:');
  console.log('   - 确认密钥格式正确');
  console.log('   - 检查密钥权限');
  console.log('   - 尝试重新生成密钥');
  
  console.log('\n3. 检查邮箱设置:');
  console.log('   - 确认收件人邮箱格式正确');
  console.log('   - 检查垃圾邮件文件夹');
  console.log('   - 尝试不同的邮箱地址');
  
  console.log('\n4. 测试步骤:');
  console.log('   - 重启开发服务器');
  console.log('   - 清除浏览器缓存');
  console.log('   - 检查控制台错误信息');
}

// 主函数
async function main() {
  console.log('开始诊断...\n');
  
  checkCommonIssues();
  
  const connectionOk = await testResendConnection();
  
  if (!connectionOk) {
    provideSolutions();
  } else {
    console.log('\n✅ API 连接正常');
    console.log('如果仍然没有收到邮件，请检查:');
    console.log('1. 垃圾邮件文件夹');
    console.log('2. 邮箱服务商的反垃圾邮件设置');
    console.log('3. 发送域名是否已验证');
  }
  
  console.log('\n📞 需要更多帮助？');
  console.log('- 查看 Resend 文档: https://resend.com/docs');
  console.log('- 检查 Resend 控制台日志');
  console.log('- 联系技术支持');
}

main().catch(console.error);
