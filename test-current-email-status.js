#!/usr/bin/env node

/**
 * 测试当前邮件发送状态
 * 检查DNS记录配置后的邮件投递情况
 */

console.log('🔍 测试当前邮件发送状态\n');

async function testCurrentEmailStatus() {
  try {
    const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
    
    // 1. 发送测试邮件
    console.log('📤 1. 发送测试邮件...');
    
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
        subject: 'DNS配置后测试',
        html: `<p>DNS配置后测试 - 验证码: <strong>${verificationCode}</strong></p>`,
        text: `DNS配置后测试 - 验证码: ${verificationCode}`
      })
    });
    
    if (emailResponse.ok) {
      const result = await emailResponse.json();
      console.log('✅ 邮件发送成功:', result.id);
      console.log('🔑 验证码:', verificationCode);
      
      // 2. 检查邮件状态
      console.log('\n📊 2. 检查邮件状态...');
      
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
            
            // 分析状态
            if (statusResult.last_event === 'delivered') {
              console.log('🎉 邮件已成功投递！DNS配置生效！');
            } else if (statusResult.last_event === 'sent') {
              console.log('📤 邮件已发送，但未投递');
              console.log('💡 可能的原因:');
              console.log('   1. DMARC记录未验证');
              console.log('   2. 收件人邮箱服务商过滤');
              console.log('   3. 需要等待DNS记录完全生效');
            } else if (statusResult.last_event === 'bounced') {
              console.log('❌ 邮件被退回');
            } else {
              console.log('⚠️ 邮件状态:', statusResult.last_event);
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
    
    // 3. 检查最近的邮件发送记录
    console.log('\n📊 3. 检查最近的邮件发送记录...');
    
    const recentEmailsResponse = await fetch('https://api.resend.com/emails?limit=5', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (recentEmailsResponse.ok) {
      const recentEmails = await recentEmailsResponse.json();
      console.log('📋 最近5封邮件状态:');
      
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
    
    // 4. 问题分析和解决方案
    console.log('\n🔍 4. 问题分析和解决方案...');
    
    console.log('💡 从Resend控制台看到:');
    console.log('   ✅ DKIM记录: 已验证');
    console.log('   ✅ SPF记录: 已验证');
    console.log('   ✅ MX记录: 已验证');
    console.log('   ⚠️ DMARC记录: 状态为空');
    
    console.log('\n🚀 解决方案:');
    console.log('   1. 检查DMARC记录是否正确配置');
    console.log('   2. 等待DNS记录完全生效（24-48小时）');
    console.log('   3. 重新验证域名状态');
    console.log('   4. 测试邮件发送');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

testCurrentEmailStatus();
