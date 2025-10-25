#!/usr/bin/env node

/**
 * 深度诊断邮件发送问题
 * 检查Resend API配置、邮件内容、域名设置等
 */

console.log('🔍 深度诊断邮件发送问题\n');

async function deepEmailDiagnosis() {
  try {
    const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
    
    // 1. 检查Resend API密钥状态
    console.log('📊 1. 检查Resend API密钥状态...');
    
    const apiKeyResponse = await fetch('https://api.resend.com/api-keys', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (apiKeyResponse.ok) {
      const apiKeys = await apiKeyResponse.json();
      console.log('✅ API密钥有效');
      console.log('📋 API密钥信息:', apiKeys);
    } else {
      console.log('❌ API密钥无效或过期');
      const errorText = await apiKeyResponse.text();
      console.log('错误详情:', errorText);
    }
    
    // 2. 检查域名详细配置
    console.log('\n📧 2. 检查域名详细配置...');
    
    const domainResponse = await fetch('https://api.resend.com/domains', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (domainResponse.ok) {
      const domains = await domainResponse.json();
      console.log('✅ 域名配置正常');
      
      if (domains.data && domains.data.length > 0) {
        const domain = domains.data[0];
        console.log('📧 域名详情:');
        console.log('   - 域名:', domain.name);
        console.log('   - 状态:', domain.status);
        console.log('   - 能力:', domain.capability);
        console.log('   - 创建时间:', domain.created_at);
        console.log('   - 区域:', domain.region);
        
        // 检查域名记录
        if (domain.id) {
          const recordsResponse = await fetch(`https://api.resend.com/domains/${domain.id}/records`, {
            headers: {
              'Authorization': `Bearer ${RESEND_API_KEY}`
            }
          });
          
          if (recordsResponse.ok) {
            const records = await recordsResponse.json();
            console.log('📋 DNS记录:');
            records.data.forEach(record => {
              console.log(`   - ${record.type}: ${record.name} = ${record.value}`);
            });
          }
        }
      }
    }
    
    // 3. 测试发送真实邮件并检查状态
    console.log('\n📤 3. 测试发送真实邮件...');
    
    const testEmail = 'test@example.com';
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 使用更简单的邮件内容
    const simpleEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">NovaMail Verification</h2>
        <p>Your verification code is:</p>
        <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; color: #333; border-radius: 8px; margin: 20px 0;">
          ${verificationCode}
        </div>
        <p style="color: #666; font-size: 14px;">
          This code will expire in 10 minutes.
        </p>
      </div>
    `;
    
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'NovaMail <noreply@novamail.world>',
        to: testEmail,
        subject: 'NovaMail Verification Code',
        html: simpleEmailContent,
        text: `Your NovaMail verification code is: ${verificationCode}. This code will expire in 10 minutes.`
      })
    });
    
    if (emailResponse.ok) {
      const result = await emailResponse.json();
      console.log('✅ 邮件发送成功！');
      console.log('📧 邮件ID:', result.id);
      console.log('🔑 验证码:', verificationCode);
      
      // 4. 检查邮件发送状态
      console.log('\n📊 4. 检查邮件发送状态...');
      
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
        
        // 检查是否有错误
        if (statusResult.last_event === 'delivered') {
          console.log('✅ 邮件已成功投递');
        } else if (statusResult.last_event === 'sent') {
          console.log('📤 邮件已发送，等待投递');
        } else if (statusResult.last_event === 'bounced') {
          console.log('❌ 邮件被退回');
        } else if (statusResult.last_event === 'complained') {
          console.log('⚠️ 邮件被投诉为垃圾邮件');
        } else {
          console.log('⚠️ 邮件状态未知:', statusResult.last_event);
        }
      }
      
    } else {
      const errorText = await emailResponse.text();
      console.log('❌ 邮件发送失败:', errorText);
    }
    
    // 5. 检查Resend账户状态
    console.log('\n📊 5. 检查Resend账户状态...');
    
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
    
    // 6. 问题分析和解决方案
    console.log('\n🔍 6. 问题分析和解决方案...');
    
    console.log('💡 可能的问题:');
    console.log('   1. 邮件内容被识别为垃圾邮件');
    console.log('   2. 发件人域名信誉问题');
    console.log('   3. 收件人邮箱服务商过滤');
    console.log('   4. DNS记录配置问题');
    console.log('   5. 邮件模板问题');
    
    console.log('\n🚀 解决方案:');
    console.log('   1. 优化邮件内容，减少垃圾邮件关键词');
    console.log('   2. 添加SPF、DKIM、DMARC记录');
    console.log('   3. 使用更简单的邮件模板');
    console.log('   4. 添加纯文本版本');
    console.log('   5. 检查发件人域名配置');
    
  } catch (error) {
    console.error('❌ 诊断失败:', error.message);
  }
}

deepEmailDiagnosis();
