#!/usr/bin/env node

/**
 * 检查邮件发送状态和可能的问题
 */

console.log('📊 NovaMail 邮件发送状态检查\n');

// 检查环境变量
const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.log('❌ RESEND_API_KEY 环境变量未设置');
  console.log('请设置环境变量: $env:RESEND_API_KEY="re_HoZby1YY_8DhQswTinqLVqUwFjqHV4V7y"');
  process.exit(1);
}

console.log('✅ API 密钥已设置');
console.log(`🔑 API 密钥: ${apiKey.substring(0, 10)}...`);

// 检查 Resend API 状态
async function checkResendStatus() {
  console.log('\n🌐 检查 Resend API 状态...');
  
  try {
    // 尝试发送一封简单的测试邮件
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'NovaMail Test <noreply@novamail.world>',
        to: ['test@example.com'],
        subject: 'NovaMail 状态检查',
        html: '<p>这是一封状态检查邮件。</p>'
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Resend API 工作正常');
      console.log(`📧 测试邮件ID: ${data.id}`);
      console.log('📊 响应状态: 200 OK');
      
      console.log('\n💡 可能的问题和解决方案:');
      console.log('1. 邮件被发送到垃圾邮件文件夹');
      console.log('   - 检查垃圾邮件文件夹');
      console.log('   - 将发件人添加到白名单');
      
      console.log('\n2. 发送域名未验证');
      console.log('   - 访问 https://resend.com');
      console.log('   - 进入 Domains 页面');
      console.log('   - 添加并验证您的域名');
      
      console.log('\n3. 邮箱服务商限制');
      console.log('   - 某些邮箱服务商可能限制新域名');
      console.log('   - 尝试使用不同的邮箱地址');
      
      console.log('\n4. 邮件传输延迟');
      console.log('   - 等待 1-5 分钟');
      console.log('   - 检查 Resend 控制台日志');
      
    } else {
      console.log('❌ Resend API 返回错误');
      console.log(`📊 错误代码: ${response.status}`);
      console.log(`📊 错误信息: ${JSON.stringify(data, null, 2)}`);
      
      if (data.message) {
        console.log('\n💡 解决方案:');
        if (data.message.includes('Invalid API key')) {
          console.log('- 检查 API 密钥是否正确');
          console.log('- 确认密钥权限是否足够');
        } else if (data.message.includes('rate limit')) {
          console.log('- 等待一段时间后重试');
          console.log('- 检查 API 使用量限制');
        }
      }
    }
    
  } catch (error) {
    console.log('❌ 网络连接错误:', error.message);
    console.log('💡 解决方案: 检查网络连接和防火墙设置');
  }
}

// 提供调试建议
function provideDebuggingTips() {
  console.log('\n🔧 调试建议:');
  console.log('1. 检查 Resend 控制台:');
  console.log('   - 访问 https://resend.com');
  console.log('   - 查看 API 使用统计');
  console.log('   - 检查发送日志');
  
  console.log('\n2. 测试不同邮箱:');
  console.log('   - Gmail: 检查垃圾邮件文件夹');
  console.log('   - Outlook: 检查垃圾邮件文件夹');
  console.log('   - QQ邮箱: 检查垃圾邮件文件夹');
  
  console.log('\n3. 验证域名设置:');
  console.log('   - 添加 SPF 记录');
  console.log('   - 添加 DKIM 记录');
  console.log('   - 添加 DMARC 记录');
  
  console.log('\n4. 检查应用日志:');
  console.log('   - 查看浏览器控制台');
  console.log('   - 检查网络请求');
  console.log('   - 查看服务器日志');
}

// 主函数
async function main() {
  await checkResendStatus();
  provideDebuggingTips();
  
  console.log('\n📞 需要更多帮助？');
  console.log('- 查看 Resend 文档: https://resend.com/docs');
  console.log('- 检查 Resend 控制台: https://resend.com/emails');
  console.log('- 联系技术支持');
}

main().catch(console.error);
