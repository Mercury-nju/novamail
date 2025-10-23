// 测试生产环境邮件发送
// 使用内置fetch

async function testProductionEmail() {
  console.log('🔍 测试生产环境邮件发送...');
  
  const url = 'https://novamail.world/api/campaigns/send'; // 生产环境API地址
  const testRecipient = '2945235656@qq.com'; // 您的测试邮箱

  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}Z`;

  const requestData = {
    campaignData: {
      subject: `🎉 生产环境测试邮件 - ${formattedDate}`,
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
          <h1 style="color: #007bff; text-align: center;">🎉 生产环境测试邮件</h1>
          <p style="font-size: 16px; line-height: 1.6;">您好！</p>
          <p style="font-size: 16px; line-height: 1.6;">这是一封来自NovaMail生产环境的测试邮件。</p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>生产环境部署成功</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>邮件发送功能正常</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>Resend API配置正确</strong></p>
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #0066cc;">📧 测试信息：</p>
            <p style="margin: 5px 0 0 0;">发送时间: ${formattedDate}</p>
            <p style="margin: 5px 0 0 0;">发送环境: 生产环境 (novamail.world)</p>
            <p style="margin: 5px 0 0 0;">发送方式: Resend API</p>
            <p style="margin: 5px 0 0 0;">发送地址: noreply@novamail.world</p>
            <p style="margin: 5px 0 0 0;">收件人: ${testRecipient}</p>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">NovaMail SaaS邮件营销平台运行正常！</p>
          <p style="font-size: 16px; line-height: 1.6;">用户可以正常发送邮件到任何邮箱地址。</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #666; text-align: center;">此邮件由 NovaMail 生产环境自动发送</p>
        </div>
      `
    },
    recipients: [testRecipient],
    senderEmail: 'noreply@novamail.world',
    senderName: 'NovaMail 生产环境测试'
  };

  console.log('发送数据:', JSON.stringify(requestData, null, 2));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const responseData = await response.json();

    console.log('状态码:', response.status);
    console.log('响应:', JSON.stringify(responseData, null, 2));

    if (response.ok && responseData.success) {
      console.log('✅ 生产环境邮件发送成功！');
      console.log('🎉 邮件ID:', responseData.data?.messageId || responseData.messageId);
      console.log('🚀 收件人:', responseData.data?.recipients || testRecipient);
      console.log('📧 请检查您的邮箱收件箱！');
    } else {
      console.log('❌ 生产环境邮件发送失败');
      console.log('错误:', responseData.error || '未知错误');
    }
  } catch (error) {
    console.error('❌ 请求失败:', error);
  }
}

testProductionEmail();
