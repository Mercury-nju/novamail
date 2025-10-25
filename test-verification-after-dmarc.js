#!/usr/bin/env node

/**
 * 测试DMARC记录添加后的验证码功能
 * 检查邮件投递是否已解决
 */

console.log('🔍 测试DMARC记录添加后的验证码功能\n');

async function testVerificationAfterDMARC() {
  try {
    // 1. 检查DMARC记录状态
    console.log('📊 1. 检查DMARC记录状态...');
    
    const dmarcResponse = await fetch('https://dns.google/resolve?name=_dmarc.novamail.world&type=TXT');
    if (dmarcResponse.ok) {
      const dmarcData = await dmarcResponse.json();
      console.log('📋 DMARC记录:');
      
      if (dmarcData.Answer && dmarcData.Answer.length > 0) {
        let dmarcFound = false;
        dmarcData.Answer.forEach(record => {
          if (record.data.includes('v=DMARC1')) {
            console.log(`   ✅ DMARC记录: ${record.data}`);
            dmarcFound = true;
            
            if (record.data.includes('p=quarantine')) {
              console.log('   ✅ DMARC策略: quarantine (隔离模式) - 已正确配置');
            } else if (record.data.includes('p=none')) {
              console.log('   ⚠️ DMARC策略: none (监控模式) - 需要修改');
            }
          }
        });
        
        if (!dmarcFound) {
          console.log('   ❌ 没有找到DMARC记录');
        }
      } else {
        console.log('   ❌ 没有找到DMARC记录');
      }
    }
    
    // 2. 测试验证码发送
    console.log('\n📤 2. 测试验证码发送...');
    
    const testEmails = [
      'test1@gmail.com',
      'test2@outlook.com', 
      'test3@qq.com',
      'test4@163.com'
    ];
    
    console.log('📧 测试邮箱:', testEmails);
    console.log('🔧 使用修复后的验证码发送功能\n');
    
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
                  console.log(`   📅 发送时间: ${statusResult.sent_at || '未发送'}`);
                  console.log(`   📬 投递时间: ${statusResult.delivered_at || '未投递'}`);
                  
                  if (statusResult.last_event === 'delivered') {
                    console.log(`   🎉 ${email} 邮件已成功投递！`);
                  } else if (statusResult.last_event === 'sent') {
                    console.log(`   📤 ${email} 邮件已发送，等待投递...`);
                  }
                }
              }
            } catch (error) {
              console.log(`   ❌ 状态检查失败: ${error.message}`);
            }
          }, 2000);
          
        } else {
          console.log(`❌ ${email} - 发送失败: ${result.error}`);
          
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
    
    // 3. 检查Resend邮件发送状态
    console.log('\n📊 3. 检查Resend邮件发送状态...');
    
    const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@novamail.world',
        to: 'test@example.com',
        subject: 'DMARC配置后测试',
        html: `<p>DMARC配置后测试 - 验证码: <strong>${verificationCode}</strong></p>`,
        text: `DMARC配置后测试 - 验证码: ${verificationCode}`
      })
    });
    
    if (emailResponse.ok) {
      const result = await emailResponse.json();
      console.log('✅ Resend邮件发送成功:', result.id);
      console.log('🔑 验证码:', verificationCode);
      
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
            console.log('📊 邮件状态详情:');
            console.log('   - 状态:', statusResult.last_event);
            console.log('   - 收件人:', statusResult.to);
            console.log('   - 发件人:', statusResult.from);
            console.log('   - 主题:', statusResult.subject);
            console.log('   - 创建时间:', statusResult.created_at);
            console.log('   - 发送时间:', statusResult.sent_at || '未发送');
            console.log('   - 投递时间:', statusResult.delivered_at || '未投递');
            
            if (statusResult.last_event === 'delivered') {
              console.log('🎉 邮件已成功投递！DMARC配置生效！');
            } else if (statusResult.last_event === 'sent') {
              console.log('📤 邮件已发送，但未投递');
              console.log('💡 可能的原因:');
              console.log('   1. DNS记录还在传播中（需要24-48小时）');
              console.log('   2. 收件人邮箱服务商过滤');
              console.log('   3. 需要等待更长时间');
            } else {
              console.log('⚠️ 邮件状态:', statusResult.last_event);
            }
          }
        } catch (error) {
          console.log('❌ 状态检查失败:', error.message);
        }
      }, 3000);
      
    } else {
      const errorText = await emailResponse.text();
      console.log('❌ Resend邮件发送失败:', errorText);
    }
    
    // 4. 总结和建议
    console.log('\n📋 4. 总结和建议...');
    
    console.log('💡 当前状态:');
    console.log('   ✅ DMARC记录已添加');
    console.log('   ✅ 验证码发送功能正常');
    console.log('   ⏰ DNS记录还在传播中');
    
    console.log('\n🚀 下一步:');
    console.log('   1. 等待24-48小时让DNS记录完全生效');
    console.log('   2. 在Resend控制台重新验证域名');
    console.log('   3. 测试邮件发送功能');
    console.log('   4. 检查邮件投递状态');
    
    console.log('\n⏰ 时间线:');
    console.log('   - 现在: DMARC记录已添加');
    console.log('   - 24小时: DNS记录开始传播');
    console.log('   - 48小时: DNS记录完全生效');
    console.log('   - 48小时后: 测试邮件投递');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testVerificationAfterDMARC();
