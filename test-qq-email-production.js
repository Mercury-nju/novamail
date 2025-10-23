// 使用内置fetch

async function testQQEmailProduction() {
  console.log('🔍 生产环境测试 - 发送邮件到QQ邮箱...');
  
  const testData = {
    campaignData: {
      subject: '🎉 生产环境QQ邮箱测试 - 修复成功！',
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
          <h1 style="color: #007bff; text-align: center;">🎉 生产环境QQ邮箱测试</h1>
          <p style="font-size: 16px; line-height: 1.6;">您好！</p>
          <p style="font-size: 16px; line-height: 1.6;">这是一封来自生产环境 <strong>https://novamail.world</strong> 的测试邮件，发送到您的QQ邮箱。</p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>QQ邮箱发送功能已修复！</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>收件人可以是任何邮箱地址</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>发件人始终使用已验证域名</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>不再出现域名验证错误</strong></p>
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #0066cc;">📧 测试信息：</p>
            <p style="margin: 5px 0 0 0;">发送时间: ${new Date().toLocaleString('zh-CN')}</p>
            <p style="margin: 5px 0 0 0;">发送方式: Resend API</p>
            <p style="margin: 5px 0 0 0;">发送地址: noreply@novamail.world (已验证)</p>
            <p style="margin: 5px 0 0 0;">收件人: 2945235656@qq.com</p>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">现在用户可以在生产环境正常发送邮件到任何邮箱地址了！</p>
          <p style="font-size: 16px; line-height: 1.6;">包括：Gmail、QQ邮箱、163邮箱、企业邮箱等。</p>
          <p style="font-size: 16px; line-height: 1.6;">祝您使用愉快！</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">此邮件由 NovaMail 生产环境自动发送</p>
        </div>
      `
    },
    recipients: ['2945235656@qq.com'], // 您的QQ邮箱
    senderEmail: 'noreply@novamail.world',
    senderName: 'NovaMail 生产环境'
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
      console.log('✅ 生产环境QQ邮箱发送成功！');
      console.log('🎉 您应该很快就能在QQ邮箱收到邮件了！');
    } else {
      console.log('❌ 生产环境QQ邮箱发送失败');
      console.log('错误:', responseData.error || '未知错误');
    }
  } catch (error) {
    console.error('❌ 请求失败:', error);
  }
}

testQQEmailProduction();
