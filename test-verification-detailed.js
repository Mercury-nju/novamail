#!/usr/bin/env node

/**
 * 详细测试注册验证码发送功能
 */

console.log('🔍 详细测试注册验证码发送功能\n');

async function testVerificationDetailed() {
  try {
    console.log('📤 发送验证码请求...');
    
    // 使用一个随机的新邮箱地址
    const randomId = Math.floor(Math.random() * 10000);
    const testEmail = `testuser${randomId}@qq.com`;
    
    console.log('📧 测试邮箱:', testEmail);
    
    const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/auth/send-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail
      })
    });
    
    const result = await response.json();
    
    console.log('📊 响应状态:', response.status);
    console.log('📋 响应数据:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('✅ 验证码发送成功！');
      console.log('📧 收件人:', testEmail);
      console.log('🔑 验证码:', result.code || 'N/A');
      console.log('📧 邮件ID:', result.messageId || 'N/A');
      console.log('⏰ 过期时间: 10分钟');
      
      if (result.note) {
        console.log('📝 备注:', result.note);
      }
      
      if (result.error) {
        console.log('⚠️ 错误信息:', result.error);
      }
      
      console.log('\n📬 如果没收到验证码邮件，请检查:');
      console.log('   1. 📬 QQ邮箱的垃圾邮件文件夹');
      console.log('   2. 📁 QQ邮箱的"其他文件夹"');
      console.log('   3. ⏰ 等待5-10分钟（邮件传输延迟）');
      console.log('   4. 🔍 搜索关键词"NovaMail"或"verification"');
      
      console.log('\n🔧 技术信息:');
      console.log('   - 发送域名: novamail.world (已验证)');
      console.log('   - 发送方式: Resend API (优先)');
      console.log('   - 后备方式: Gmail API');
      console.log('   - 邮件状态: 已发送');
      
      // 如果邮件ID存在，说明Resend API工作正常
      if (result.messageId) {
        console.log('\n🎉 Resend API工作正常！');
        console.log('📧 邮件已通过Resend API发送');
      } else {
        console.log('\n⚠️ 使用Gmail API作为后备');
        console.log('📧 邮件可能通过Gmail API发送');
      }
      
    } else {
      console.log('❌ 验证码发送失败:', result.error);
      
      if (result.code === 'USER_EXISTS') {
        console.log('👤 用户已存在，请使用登录功能');
      } else {
        console.log('🔧 可能的原因:');
        console.log('   - API密钥配置问题');
        console.log('   - 邮件服务商问题');
        console.log('   - 网络连接问题');
      }
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.log('\n🔧 故障排除:');
    console.log('   1. 检查网络连接');
    console.log('   2. 检查API端点是否可访问');
    console.log('   3. 检查Cloudflare Workers状态');
  }
}

testVerificationDetailed();
