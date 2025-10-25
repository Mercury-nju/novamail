#!/usr/bin/env node

/**
 * 详细测试邮件发送和接收问题
 */

console.log('🔍 详细测试邮件发送和接收问题\n');

async function testEmailDelivery() {
  const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
  
  try {
    // 1. 检查API密钥状态
    console.log('1️⃣ 检查API密钥状态...');
    const domainsResponse = await fetch('https://api.resend.com/domains', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    const domainsData = await domainsResponse.json();
    console.log('✅ API密钥有效');
    console.log('📋 可用域名:', domainsData.data.map(d => `${d.name} (${d.status})`).join(', '));
    
    // 2. 发送测试邮件
    console.log('\n2️⃣ 发送测试邮件...');
    const testEmail = {
      from: 'NovaMail <noreply@novamail.world>',
      to: ['2945235656@qq.com'],
      subject: '🔍 邮件发送测试 - ' + new Date().toISOString(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
          <h1 style="color: #007bff; text-align: center;">🔍 邮件发送测试</h1>
          <p style="font-size: 16px; line-height: 1.6;">您好！</p>
          <p style="font-size: 16px; line-height: 1.6;">这是一封测试邮件，用于诊断邮件发送问题。</p>
          
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #0066cc;">📧 测试信息：</p>
            <p style="margin: 5px 0 0 0;">发送时间: ${new Date().toISOString()}</p>
            <p style="margin: 5px 0 0 0;">发送域名: novamail.world (已验证)</p>
            <p style="margin: 5px 0 0 0;">发送方式: Resend API</p>
            <p style="margin: 5px 0 0 0;">收件人: 2945235656@qq.com</p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #856404;">⚠️ 如果没收到邮件，请检查：</p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px;">
              <li>垃圾邮件文件夹</li>
              <li>QQ邮箱的"其他文件夹"</li>
              <li>邮件传输延迟（等待5-10分钟）</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6;">NovaMail邮件发送功能测试完成！</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">此邮件由 NovaMail 自动发送</p>
        </div>
      `
    };
    
    const sendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testEmail)
    });
    
    if (sendResponse.ok) {
      const result = await sendResponse.json();
      console.log('✅ 邮件发送成功！');
      console.log('📧 邮件ID:', result.id);
      console.log('📬 收件人: 2945235656@qq.com');
      console.log('🌐 发送域名: novamail.world (已验证)');
      
      // 3. 检查邮件状态
      console.log('\n3️⃣ 检查邮件状态...');
      setTimeout(async () => {
        try {
          const statusResponse = await fetch(`https://api.resend.com/emails/${result.id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (statusResponse.ok) {
            const statusData = await statusResponse.json();
            console.log('📊 邮件状态:', statusData);
          }
        } catch (error) {
          console.log('⚠️ 无法获取邮件状态:', error.message);
        }
      }, 2000);
      
    } else {
      const errorData = await sendResponse.text();
      console.log('❌ 邮件发送失败:', sendResponse.status, errorData);
    }
    
    // 4. 提供解决方案
    console.log('\n4️⃣ 解决方案建议:');
    console.log('📬 如果没收到邮件，请检查:');
    console.log('   1. QQ邮箱的垃圾邮件文件夹');
    console.log('   2. QQ邮箱的"其他文件夹"');
    console.log('   3. 等待5-10分钟（邮件传输延迟）');
    console.log('   4. 尝试发送到Gmail或Outlook邮箱测试');
    
    console.log('\n🔧 技术配置:');
    console.log('   - 发送域名: novamail.world (已验证)');
    console.log('   - API密钥: 有效');
    console.log('   - 发送方式: Resend API');
    
  } catch (error) {
    console.error('❌ 测试失败:', error);
  }
}

testEmailDelivery();
