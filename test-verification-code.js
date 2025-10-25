#!/usr/bin/env node

/**
 * 测试注册验证码发送功能
 */

console.log('🔍 测试注册验证码发送功能\n');

async function testVerificationCode() {
  try {
    console.log('📤 发送验证码请求...');
    
    const testEmail = '2945235656@qq.com';
    
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
      console.log('⏰ 过期时间: 10分钟');
      
      console.log('\n📬 如果没收到验证码邮件，请检查:');
      console.log('   1. 📬 QQ邮箱的垃圾邮件文件夹');
      console.log('   2. 📁 QQ邮箱的"其他文件夹"');
      console.log('   3. ⏰ 等待5-10分钟（邮件传输延迟）');
      console.log('   4. 🔍 搜索关键词"NovaMail"或"verification"');
      
    } else {
      console.log('❌ 验证码发送失败:', result.error);
      
      if (result.code === 'USER_EXISTS') {
        console.log('👤 用户已存在，请使用登录功能');
      }
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testVerificationCode();
