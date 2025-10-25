#!/usr/bin/env node

/**
 * 测试DNS配置
 * 检查SPF、DKIM、DMARC记录是否正确配置
 */

console.log('🔍 测试DNS配置\n');

async function testDNSConfig() {
  try {
    // 1. 检查SPF记录
    console.log('📊 1. 检查SPF记录...');
    
    const spfResponse = await fetch('https://dns.google/resolve?name=novamail.world&type=TXT');
    if (spfResponse.ok) {
      const spfData = await spfResponse.json();
      console.log('📋 SPF记录:');
      
      if (spfData.Answer && spfData.Answer.length > 0) {
        spfData.Answer.forEach(record => {
          if (record.data.includes('v=spf1')) {
            console.log(`   ✅ SPF记录: ${record.data}`);
          }
        });
      } else {
        console.log('   ❌ 没有找到SPF记录');
      }
    }
    
    // 2. 检查DKIM记录
    console.log('\n📊 2. 检查DKIM记录...');
    
    const dkimResponse = await fetch('https://dns.google/resolve?name=resend._domainkey.novamail.world&type=TXT');
    if (dkimResponse.ok) {
      const dkimData = await dkimResponse.json();
      console.log('📋 DKIM记录:');
      
      if (dkimData.Answer && dkimData.Answer.length > 0) {
        dkimData.Answer.forEach(record => {
          if (record.data.includes('v=DKIM1')) {
            console.log(`   ✅ DKIM记录: ${record.data.substring(0, 50)}...`);
          }
        });
      } else {
        console.log('   ❌ 没有找到DKIM记录');
      }
    }
    
    // 3. 检查DMARC记录
    console.log('\n📊 3. 检查DMARC记录...');
    
    const dmarcResponse = await fetch('https://dns.google/resolve?name=_dmarc.novamail.world&type=TXT');
    if (dmarcResponse.ok) {
      const dmarcData = await dmarcResponse.json();
      console.log('📋 DMARC记录:');
      
      if (dmarcData.Answer && dmarcData.Answer.length > 0) {
        dmarcData.Answer.forEach(record => {
          if (record.data.includes('v=DMARC1')) {
            console.log(`   ✅ DMARC记录: ${record.data}`);
          }
        });
      } else {
        console.log('   ❌ 没有找到DMARC记录');
      }
    }
    
    // 4. 测试邮件发送
    console.log('\n📤 4. 测试邮件发送...');
    
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
        subject: 'DNS Test',
        html: `<p>DNS配置测试 - 验证码: <strong>${verificationCode}</strong></p>`,
        text: `DNS配置测试 - 验证码: ${verificationCode}`
      })
    });
    
    if (emailResponse.ok) {
      const result = await emailResponse.json();
      console.log('✅ 邮件发送成功:', result.id);
      
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
              console.log('🎉 邮件已成功投递！DNS配置正确！');
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
      const errorText = await emailResponse.text();
      console.log('❌ 邮件发送失败:', errorText);
    }
    
    // 5. 总结
    console.log('\n📋 5. DNS配置总结:');
    console.log('💡 如果DNS记录配置正确，应该看到:');
    console.log('   ✅ SPF记录: v=spf1 include:_spf.resend.com ~all');
    console.log('   ✅ DKIM记录: v=DKIM1 ...');
    console.log('   ✅ DMARC记录: v=DMARC1; p=quarantine; ...');
    console.log('   ✅ 邮件状态: delivered');
    
    console.log('\n🚀 如果DNS记录缺失，需要:');
    console.log('   1. 在域名注册商处添加DNS记录');
    console.log('   2. 等待24-48小时生效');
    console.log('   3. 重新测试邮件发送');
    
  } catch (error) {
    console.error('❌ DNS配置测试失败:', error.message);
  }
}

testDNSConfig();
