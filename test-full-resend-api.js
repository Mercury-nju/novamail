// 使用内置fetch

async function testFullResendAPI() {
  console.log('🔍 测试完整Resend API权限...');
  
  const testData = {
    campaignData: {
      subject: '🎉 完整Resend API测试 - 可发送到任意邮箱！',
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
          <h1 style="color: #007bff; text-align: center;">🎉 完整Resend API测试</h1>
          <p style="font-size: 16px; line-height: 1.6;">您好！</p>
          <p style="font-size: 16px; line-height: 1.6;">这是一封测试完整Resend API权限的邮件。</p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>使用完整API密钥</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>域名已验证</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>可发送到任意邮箱</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>真正的SaaS功能</strong></p>
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #0066cc;">📧 测试信息：</p>
            <p style="margin: 5px 0 0 0;">发送时间: ${new Date().toLocaleString('zh-CN')}</p>
            <p style="margin: 5px 0 0 0;">发送方式: Resend API (完整权限)</p>
            <p style="margin: 5px 0 0 0;">发送地址: noreply@novamail.world (已验证)</p>
            <p style="margin: 5px 0 0 0;">收件人: 2945235656@qq.com</p>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">现在用户可以发送邮件到任何邮箱地址了！</p>
          <p style="font-size: 16px; line-height: 1.6;">包括：Gmail、QQ邮箱、163邮箱、企业邮箱等。</p>
          <p style="font-size: 16px; line-height: 1.6;">真正的SaaS邮件营销功能已实现！</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">此邮件由 NovaMail 生产环境自动发送</p>
        </div>
      `
    },
    recipients: ['2945235656@qq.com'], // 您的QQ邮箱
    senderEmail: 'noreply@novamail.world',
    senderName: 'NovaMail 完整API测试'
  };
  
  console.log('发送数据:', JSON.stringify(testData, null, 2));
  
  try {
    const response = await fetch('https://novamail.world/api/campaigns/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const responseData = await response.json();
    
    console.log('状态码:', response.status);
    console.log('响应:', JSON.stringify(responseData, null, 2));
    
    if (response.ok && responseData.success) {
      console.log('✅ 完整Resend API测试成功！');
      console.log('🎉 现在可以发送到任意邮箱了！');
      console.log('🚀 真正的SaaS功能已实现！');
    } else {
      console.log('❌ 完整Resend API测试失败');
      console.log('错误:', responseData.error || '未知错误');
    }
  } catch (error) {
    console.error('❌ 请求失败:', error);
  }
}

testFullResendAPI();
