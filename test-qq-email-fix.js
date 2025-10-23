// 使用内置fetch

async function testQQEmailFix() {
  console.log('🔍 测试QQ邮箱发送修复...');
  
  const testData = {
    campaignData: {
      subject: 'QQ邮箱测试 - 修复后',
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
          <h1 style="color: #007bff; text-align: center;">QQ邮箱发送测试</h1>
          <p style="font-size: 16px; line-height: 1.6;">您好！</p>
          <p style="font-size: 16px; line-height: 1.6;">这是一封测试QQ邮箱发送功能的邮件。</p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>现在QQ邮箱可以正常发送了！</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>系统始终使用已验证的域名发送</strong></p>
          <p style="font-size: 16px; line-height: 1.6;">✅ <strong>不再出现域名验证错误</strong></p>
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #0066cc;">📧 测试信息：</p>
            <p style="margin: 5px 0 0 0;">发送时间: ${new Date().toLocaleString('zh-CN')}</p>
            <p style="margin: 5px 0 0 0;">发送方式: Resend API</p>
            <p style="margin: 5px 0 0 0;">发送地址: noreply@novamail.world (已验证)</p>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">现在用户可以使用任何邮箱地址作为显示名称，系统会自动使用已验证的域名发送！</p>
        </div>
      `
    },
    recipients: ['lihongyangnju@gmail.com'], // 您的邮箱
    senderEmail: '2945235656@qq.com', // 模拟用户填写QQ邮箱
    senderName: 'QQ邮箱测试用户'
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
      console.log('✅ QQ邮箱发送测试成功！');
      console.log('🎉 现在QQ邮箱可以正常发送了！');
    } else {
      console.log('❌ QQ邮箱发送测试失败');
      console.log('错误:', responseData.error || '未知错误');
    }
  } catch (error) {
    console.error('❌ 请求失败:', error);
  }
}

testQQEmailFix();
