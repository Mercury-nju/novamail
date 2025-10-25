#!/usr/bin/env node

/**
 * 测试极简邮件模板
 */

console.log('🔍 测试极简邮件模板\n');

async function testMinimalEmail() {
  try {
    const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
    
    // 测试极简邮件
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log('📤 发送极简验证码邮件...');
    console.log('🔑 验证码:', verificationCode);
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@novamail.world',
        to: 'test@example.com',
        subject: 'Code',
        html: `<p>Code: <strong>${verificationCode}</strong></p>`,
        text: `Code: ${verificationCode}`
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ 极简邮件发送成功！');
      console.log('📧 邮件ID:', result.id);
      
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
            console.log('📊 邮件状态:', statusResult.last_event);
            console.log('📅 发送时间:', statusResult.sent_at || '未发送');
            
            if (statusResult.last_event === 'delivered') {
              console.log('🎉 邮件已成功投递！');
            } else if (statusResult.last_event === 'sent') {
              console.log('📤 邮件已发送，等待投递...');
            } else {
              console.log('⚠️ 邮件状态:', statusResult.last_event);
            }
          }
        } catch (error) {
          console.log('❌ 状态检查失败:', error.message);
        }
      }, 3000);
      
    } else {
      const errorText = await response.text();
      console.log('❌ 邮件发送失败:', errorText);
    }
    
    console.log('\n💡 极简邮件模板特点:');
    console.log('   - 极简主题: "Code"');
    console.log('   - 极简内容: 只有验证码');
    console.log('   - 无品牌标识');
    console.log('   - 无复杂HTML');
    console.log('   - 无垃圾邮件关键词');
    
    console.log('\n🚀 如果用户还是收不到邮件:');
    console.log('   1. 检查DNS记录配置');
    console.log('   2. 添加SPF、DKIM记录');
    console.log('   3. 提高发件人域名信誉');
    console.log('   4. 考虑使用其他邮件服务商');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testMinimalEmail();
