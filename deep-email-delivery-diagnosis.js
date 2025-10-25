#!/usr/bin/env node

/**
 * 深度邮件投递诊断
 * 检查邮件是否真正投递到用户邮箱
 */

console.log('🔍 深度邮件投递诊断\n');

async function deepEmailDeliveryDiagnosis() {
  try {
    const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
    
    // 1. 检查Resend账户状态
    console.log('📊 1. 检查Resend账户状态...');
    
    const accountResponse = await fetch('https://api.resend.com/audiences', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (accountResponse.ok) {
      console.log('✅ Resend账户正常');
    } else {
      console.log('❌ Resend账户可能有问题');
    }
    
    // 2. 检查域名状态
    console.log('\n📊 2. 检查域名状态...');
    
    const domainResponse = await fetch('https://api.resend.com/domains', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (domainResponse.ok) {
      const domains = await domainResponse.json();
      console.log('📧 域名状态:', domains);
      
      if (domains.data && domains.data.length > 0) {
        const domain = domains.data[0];
        console.log('📧 域名:', domain.name);
        console.log('📊 状态:', domain.status);
        console.log('🔧 能力:', domain.capability);
        
        if (domain.status !== 'verified') {
          console.log('❌ 域名未验证，这可能是问题所在！');
        }
      }
    }
    
    // 3. 发送测试邮件并追踪状态
    console.log('\n📤 3. 发送测试邮件并追踪状态...');
    
    const testEmail = 'test@example.com';
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@novamail.world',
        to: testEmail,
        subject: 'Test Email Delivery',
        html: `<p>Test email - Code: <strong>${verificationCode}</strong></p>`,
        text: `Test email - Code: ${verificationCode}`
      })
    });
    
    if (emailResponse.ok) {
      const result = await emailResponse.json();
      console.log('✅ 邮件发送成功:', result.id);
      
      // 等待5秒后检查状态
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
            console.log('   - 发送时间:', statusResult.sent_at);
            console.log('   - 投递时间:', statusResult.delivered_at);
            
            // 分析状态
            if (statusResult.last_event === 'delivered') {
              console.log('🎉 邮件已成功投递！');
            } else if (statusResult.last_event === 'sent') {
              console.log('📤 邮件已发送，但未投递');
              console.log('💡 可能的原因:');
              console.log('   1. 收件人邮箱服务商过滤');
              console.log('   2. 发件人域名信誉问题');
              console.log('   3. DNS记录配置问题');
            } else if (statusResult.last_event === 'bounced') {
              console.log('❌ 邮件被退回');
              console.log('💡 可能的原因:');
              console.log('   1. 收件人邮箱不存在');
              console.log('   2. 发件人域名未验证');
              console.log('   3. 邮件内容被拒绝');
            } else if (statusResult.last_event === 'complained') {
              console.log('⚠️ 邮件被投诉为垃圾邮件');
            } else {
              console.log('⚠️ 邮件状态未知:', statusResult.last_event);
            }
          }
        } catch (error) {
          console.log('❌ 状态检查失败:', error.message);
        }
      }, 5000);
      
    } else {
      const errorText = await emailResponse.text();
      console.log('❌ 邮件发送失败:', errorText);
    }
    
    // 4. 检查最近的邮件发送记录
    console.log('\n📊 4. 检查最近的邮件发送记录...');
    
    const recentEmailsResponse = await fetch('https://api.resend.com/emails?limit=10', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (recentEmailsResponse.ok) {
      const recentEmails = await recentEmailsResponse.json();
      console.log('📋 最近10封邮件状态:');
      
      if (recentEmails.data && recentEmails.data.length > 0) {
        recentEmails.data.forEach((email, index) => {
          console.log(`   ${index + 1}. ${email.to} - ${email.last_event} - ${email.created_at}`);
        });
        
        // 统计状态
        const statusCounts = {};
        recentEmails.data.forEach(email => {
          statusCounts[email.last_event] = (statusCounts[email.last_event] || 0) + 1;
        });
        
        console.log('\n📊 状态统计:');
        Object.entries(statusCounts).forEach(([status, count]) => {
          console.log(`   ${status}: ${count}封`);
        });
      }
    }
    
    // 5. 问题分析和解决方案
    console.log('\n🔍 5. 问题分析和解决方案...');
    
    console.log('💡 可能的问题:');
    console.log('   1. 域名未完全验证');
    console.log('   2. DNS记录配置不完整');
    console.log('   3. 发件人域名信誉度低');
    console.log('   4. 收件人邮箱服务商严格过滤');
    console.log('   5. 邮件内容被识别为垃圾邮件');
    
    console.log('\n🚀 解决方案:');
    console.log('   1. 重新验证域名');
    console.log('   2. 配置完整的DNS记录');
    console.log('   3. 使用更成熟的邮件服务商');
    console.log('   4. 优化邮件内容');
    console.log('   5. 添加邮件追踪功能');
    
  } catch (error) {
    console.error('❌ 诊断失败:', error.message);
  }
}

deepEmailDeliveryDiagnosis();
