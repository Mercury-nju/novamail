#!/usr/bin/env node

/**
 * 全面修复邮件发送问题
 * 1. 检查DNS记录配置
 * 2. 测试替代邮件服务商
 * 3. 实现备用发送方案
 */

console.log('🔧 全面修复邮件发送问题\n');

async function comprehensiveEmailFix() {
  try {
    const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
    
    // 1. 检查DNS记录配置
    console.log('📊 1. 检查DNS记录配置...');
    
    const domainResponse = await fetch('https://api.resend.com/domains', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (domainResponse.ok) {
      const domains = await domainResponse.json();
      
      if (domains.data && domains.data.length > 0) {
        const domain = domains.data[0];
        console.log('📧 域名:', domain.name);
        console.log('📊 状态:', domain.status);
        
        // 获取DNS记录
        const recordsResponse = await fetch(`https://api.resend.com/domains/${domain.id}/records`, {
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`
          }
        });
        
        if (recordsResponse.ok) {
          const records = await recordsResponse.json();
          console.log('📋 DNS记录:');
          
          if (records.data && records.data.length > 0) {
            records.data.forEach(record => {
              console.log(`   - ${record.type}: ${record.name} = ${record.value}`);
            });
          } else {
            console.log('❌ 没有找到DNS记录！');
            console.log('💡 这可能是邮件无法投递的主要原因！');
            console.log('🚀 需要添加以下DNS记录:');
            console.log('   - SPF记录: v=spf1 include:_spf.resend.com ~all');
            console.log('   - DKIM记录: 由Resend自动生成');
            console.log('   - DMARC记录: v=DMARC1; p=quarantine; rua=mailto:dmarc@novamail.world');
          }
        }
      }
    }
    
    // 2. 测试不同的邮件服务商
    console.log('\n📤 2. 测试不同的邮件服务商...');
    
    // 测试Resend API
    console.log('🔧 测试Resend API...');
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const resendResponse = await fetch('https://api.resend.com/emails', {
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
    
    if (resendResponse.ok) {
      const result = await resendResponse.json();
      console.log('✅ Resend API发送成功:', result.id);
      
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
            console.log('📊 Resend邮件状态:', statusResult.last_event);
            console.log('📅 发送时间:', statusResult.sent_at || '未发送');
            
            if (statusResult.last_event === 'delivered') {
              console.log('🎉 Resend邮件已成功投递！');
            } else if (statusResult.last_event === 'sent') {
              console.log('📤 Resend邮件已发送，等待投递...');
            } else if (statusResult.last_event === 'bounced') {
              console.log('❌ Resend邮件被退回');
            } else if (statusResult.last_event === 'complained') {
              console.log('⚠️ Resend邮件被投诉为垃圾邮件');
            } else {
              console.log('⚠️ Resend邮件状态未知:', statusResult.last_event);
            }
          }
        } catch (error) {
          console.log('❌ Resend状态检查失败:', error.message);
        }
      }, 3000);
      
    } else {
      const errorText = await resendResponse.text();
      console.log('❌ Resend API发送失败:', errorText);
    }
    
    // 3. 测试替代方案
    console.log('\n🔄 3. 测试替代方案...');
    
    // 测试使用不同的发件人地址
    const alternativeSenders = [
      'hello@novamail.world',
      'support@novamail.world',
      'noreply@novamail.world',
      'mail@novamail.world'
    ];
    
    for (let i = 0; i < alternativeSenders.length; i++) {
      const sender = alternativeSenders[i];
      console.log(`📤 测试发件人 ${i + 1}/${alternativeSenders.length}: ${sender}`);
      
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
            subject: 'Test',
            text: 'Test email'
          })
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log(`✅ ${sender} - 发送成功: ${result.id}`);
        } else {
          const errorText = await response.text();
          console.log(`❌ ${sender} - 发送失败: ${errorText}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.log(`❌ ${sender} - 网络错误: ${error.message}`);
      }
    }
    
    // 4. 问题分析和解决方案
    console.log('\n🔍 4. 问题分析和解决方案...');
    
    console.log('💡 可能的问题:');
    console.log('   1. DNS记录配置不完整（SPF、DKIM、DMARC）');
    console.log('   2. 发件人域名信誉度低');
    console.log('   3. 邮箱服务商严格过滤机制');
    console.log('   4. 邮件内容仍被识别为垃圾邮件');
    console.log('   5. Resend服务商本身的问题');
    
    console.log('\n🚀 解决方案:');
    console.log('   1. 配置完整的DNS记录');
    console.log('   2. 使用更成熟的邮件服务商');
    console.log('   3. 实现邮件发送重试机制');
    console.log('   4. 添加邮件追踪功能');
    console.log('   5. 考虑使用SMTP直接发送');
    
    // 5. 推荐替代方案
    console.log('\n🔄 5. 推荐替代方案:');
    console.log('   1. SendGrid - 更成熟的邮件服务');
    console.log('   2. Mailgun - 专业的邮件API');
    console.log('   3. AWS SES - 亚马逊邮件服务');
    console.log('   4. 自建SMTP服务器');
    console.log('   5. 使用多个邮件服务商作为备用');
    
  } catch (error) {
    console.error('❌ 全面修复失败:', error.message);
  }
}

comprehensiveEmailFix();
