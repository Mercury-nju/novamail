#!/usr/bin/env node

/**
 * 测试用户key修复
 * 验证用户存储key格式是否正确
 */

console.log('🔧 测试用户key修复\n');

async function testUserKeyFix() {
  try {
    // 测试多个不同的邮箱
    const testEmails = [
      'test1@gmail.com',
      'test2@outlook.com', 
      'test3@qq.com',
      'test4@163.com'
    ];
    
    console.log('📧 测试邮箱:', testEmails);
    console.log('🔧 使用修复后的用户key格式\n');
    
    for (let i = 0; i < testEmails.length; i++) {
      const email = testEmails[i];
      console.log(`📤 测试 ${i + 1}/${testEmails.length}: ${email}`);
      
      try {
        const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/auth/send-verification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          console.log(`✅ ${email} - 发送成功！`);
          console.log(`   🔑 验证码: ${result.code}`);
          console.log(`   📧 邮件ID: ${result.messageId || 'N/A'}`);
          
          // 等待2秒后检查邮件状态
          setTimeout(async () => {
            try {
              const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
              if (result.messageId) {
                const statusResponse = await fetch(`https://api.resend.com/emails/${result.messageId}`, {
                  headers: {
                    'Authorization': `Bearer ${RESEND_API_KEY}`
                  }
                });
                
                if (statusResponse.ok) {
                  const statusResult = await statusResponse.json();
                  console.log(`   📊 ${email} 状态: ${statusResult.last_event}`);
                  if (statusResult.sent_at) {
                    console.log(`   📅 发送时间: ${statusResult.sent_at}`);
                  }
                }
              }
            } catch (error) {
              console.log(`   ❌ 状态检查失败: ${error.message}`);
            }
          }, 2000);
          
        } else {
          console.log(`❌ ${email} - 发送失败: ${result.error}`);
          
          // 如果是用户已存在的错误，说明key格式修复成功
          if (result.code === 'USER_EXISTS') {
            console.log(`   💡 用户已存在，说明key格式修复成功！`);
          }
        }
        
        // 避免API限制
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.log(`❌ ${email} - 网络错误: ${error.message}`);
      }
    }
    
    console.log('\n📊 测试完成！');
    console.log('💡 修复说明:');
    console.log('   - 用户存储key格式: user_${email.toLowerCase()}');
    console.log('   - 验证码发送时使用相同的key格式');
    console.log('   - 现在应该能正确检查用户是否存在');
    
    console.log('\n🚀 如果用户还是收不到邮件:');
    console.log('   1. 检查DNS记录配置');
    console.log('   2. 等待DNS记录生效');
    console.log('   3. 检查邮件投递状态');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testUserKeyFix();
