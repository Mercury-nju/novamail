#!/usr/bin/env node

/**
 * 测试优化的邮件发送
 * 使用更简单的邮件内容，避免被过滤
 */

console.log('🔍 测试优化的邮件发送\n');

async function testOptimizedEmail() {
  try {
    const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
    
    // 测试多个不同的邮件内容
    const testCases = [
      {
        name: "极简文本邮件",
        content: {
          from: 'NovaMail <noreply@novamail.world>',
          to: 'test@example.com',
          subject: 'Verification Code',
          text: 'Your verification code is: 123456. This code will expire in 10 minutes.'
        }
      },
      {
        name: "简单HTML邮件",
        content: {
          from: 'NovaMail <noreply@novamail.world>',
          to: 'test@example.com',
          subject: 'Verification Code',
          html: '<p>Your verification code is: <strong>123456</strong></p>',
          text: 'Your verification code is: 123456'
        }
      },
      {
        name: "无品牌邮件",
        content: {
          from: 'noreply@novamail.world',
          to: 'test@example.com',
          subject: 'Code',
          text: 'Code: 123456'
        }
      }
    ];
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      console.log(`📤 测试 ${i + 1}/${testCases.length}: ${testCase.name}`);
      
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testCase.content)
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log(`✅ ${testCase.name} - 发送成功！`);
          console.log(`   📧 邮件ID: ${result.id}`);
          
          // 检查邮件状态
          setTimeout(async () => {
            try {
              const statusResponse = await fetch(`https://api.resend.com/emails/${result.id}`, {
                headers: {
                  'Authorization': `Bearer ${RESEND_API_KEY}`
                }
              });
              
              if (statusResponse.ok) {
                const statusResult = await statusResponse.json();
                console.log(`   📊 状态: ${statusResult.last_event}`);
                if (statusResult.sent_at) {
                  console.log(`   📅 发送时间: ${statusResult.sent_at}`);
                }
              }
            } catch (error) {
              console.log(`   ❌ 状态检查失败: ${error.message}`);
            }
          }, 2000);
          
        } else {
          const errorText = await response.text();
          console.log(`❌ ${testCase.name} - 发送失败: ${errorText}`);
        }
        
        // 避免API限制
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.log(`❌ ${testCase.name} - 网络错误: ${error.message}`);
      }
    }
    
    // 测试不同的发件人地址
    console.log('\n📧 测试不同的发件人地址...');
    
    const senderTests = [
      'noreply@novamail.world',
      'NovaMail <noreply@novamail.world>',
      'NovaMail <support@novamail.world>',
      'NovaMail <hello@novamail.world>'
    ];
    
    for (let i = 0; i < senderTests.length; i++) {
      const sender = senderTests[i];
      console.log(`📤 测试发件人 ${i + 1}/${senderTests.length}: ${sender}`);
      
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: sender,
            to: 'test@example.com',
            subject: 'Test Email',
            text: 'This is a test email to check delivery.'
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log(`✅ ${sender} - 发送成功！`);
        } else {
          const errorText = await response.text();
          console.log(`❌ ${sender} - 发送失败: ${errorText}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.log(`❌ ${sender} - 网络错误: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testOptimizedEmail();
