// 使用内置fetch

async function testDirectResendAPI() {
  console.log('🔍 直接测试Resend API发送邮件...');
  
  const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
  
  const emailData = {
    from: 'NovaMail <noreply@novamail.world>',
    to: ['2945235656@qq.com'],
    subject: '🎉 直接Resend API测试 - 域名已验证！',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
        <h1 style="color: #007bff; text-align: center;">🎉 直接Resend API测试</h1>
        <p style="font-size: 16px; line-height: 1.6;">您好！</p>
        <p style="font-size: 16px; line-height: 1.6;">这是一封直接使用Resend API发送的测试邮件。</p>
        <p style="font-size: 16px; line-height: 1.6;">✅ <strong>域名已验证</strong></p>
        <p style="font-size: 16px; line-height: 1.6;">✅ <strong>API密钥完整权限</strong></p>
        <p style="font-size: 16px; line-height: 1.6;">✅ <strong>可发送到任意邮箱</strong></p>
        <div style="background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold; color: #0066cc;">📧 测试信息：</p>
          <p style="margin: 5px 0 0 0;">发送时间: ${new Date().toLocaleString('zh-CN')}</p>
          <p style="margin: 5px 0 0 0;">发送方式: 直接Resend API</p>
          <p style="margin: 5px 0 0 0;">发送地址: noreply@novamail.world (已验证)</p>
          <p style="margin: 5px 0 0 0;">收件人: 2945235656@qq.com</p>
        </div>
        <p style="font-size: 16px; line-height: 1.6;">如果这封邮件成功发送，说明真正的SaaS功能已实现！</p>
      </div>
    `
  };
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const responseData = await response.json();
    
    console.log('状态码:', response.status);
    console.log('响应:', JSON.stringify(responseData, null, 2));
    
    if (response.ok && responseData.id) {
      console.log('✅ 直接Resend API发送成功！');
      console.log('🎉 邮件ID:', responseData.id);
      console.log('🚀 真正的SaaS功能已实现！');
    } else {
      console.log('❌ 直接Resend API发送失败');
      console.log('错误:', responseData.message || '未知错误');
    }
  } catch (error) {
    console.error('❌ 请求失败:', error);
  }
}

testDirectResendAPI();
