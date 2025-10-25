#!/usr/bin/env node

/**
 * 测试优化后的验证码发送
 */

console.log('🔍 测试优化后的验证码发送\n');

async function testOptimizedVerification() {
  try {
    // 测试多个不同的邮箱
    const testEmails = [
      'test1@gmail.com',
      'test2@outlook.com', 
      'test3@qq.com',
      'test4@163.com'
    ];
    
    console.log('📧 测试邮箱:', testEmails);
    console.log('🔧 使用优化的邮件模板\n');
    
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
        }
        
        // 避免API限制
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.log(`❌ ${email} - 网络错误: ${error.message}`);
      }
    }
    
    console.log('\n📊 测试完成！');
    console.log('💡 如果用户还是收不到邮件，可能的原因:');
    console.log('   1. 邮箱服务商的严格过滤');
    console.log('   2. 发件人域名信誉问题');
    console.log('   3. 需要添加SPF、DKIM记录');
    console.log('   4. 邮件内容仍被识别为垃圾邮件');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testOptimizedVerification();
