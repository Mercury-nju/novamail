// 使用内置fetch

async function testProductionSendToUser() {
  console.log('🔍 生产环境测试 - 发送邮件给用户...');
  
  const testData = {
    campaignData: {
      subject: '🎉 生产环境邮件测试 - 修复成功！',
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
          <h1 style="color: #007bff; text-align: center;">🎉 生产环境邮件测试</h1>
          <p style="font-size: 16px; line-height: 1.6;">您好！</p>
          <p style="font-size: 16px; line-height: 1.6;">这是一封来自生产环境 <strong>https://novamail.world</strong> 的测试邮件。</p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>邮件发送功能已修复！</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>前端现在使用 campaignData 格式</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>兼容 Cloudflare Workers</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>不再出现 "Subject and content are required" 错误</strong></p>
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #0066cc;">📧 测试信息：</p>
            <p style="margin: 5px 0 0 0;">发送时间: ${new Date().toLocaleString('zh-CN')}</p>
            <p style="margin: 5px 0 0 0;">发送方式: Resend API</p>
            <p style="margin: 5px 0 0 0;">发送地址: noreply@novamail.world</p>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">现在用户可以在生产环境正常发送邮件了！</p>
          <p style="font-size: 16px; line-height: 1.6;">祝您使用愉快！</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">此邮件由 NovaMail 生产环境自动发送</p>
        </div>
      `
    },
    recipients: ['lihongyangnju@gmail.com'], // 您的邮箱
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
      console.log('✅ 生产环境邮件发送成功！');
      console.log('🎉 您应该很快就能收到邮件了！');
    } else {
      console.log('❌ 生产环境邮件发送失败');
      console.log('错误:', responseData.error || '未知错误');
    }
  } catch (error) {
    console.error('❌ 请求失败:', error);
  }
}

testProductionSendToUser();
