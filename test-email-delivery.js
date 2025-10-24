// 测试邮件送达率
// 使用内置fetch

async function testEmailDelivery() {
  console.log('🔍 测试邮件送达率...');
  
  const url = 'https://novamail.world/api/campaigns/send'; // 生产环境API地址
  const testRecipient = '2945235656@qq.com'; // 您的测试邮箱

  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}Z`;

  const requestData = {
    campaignData: {
      subject: `📧 邮件送达测试 - ${formattedDate}`,
      body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0; font-size: 28px;">📧 邮件送达测试</h1>
          <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">NovaMail 邮件系统测试</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 20px;">✅ 测试信息</h2>
          <p style="margin: 8px 0; color: #374151;"><strong>发送时间:</strong> ${formattedDate}</p>
          <p style="margin: 8px 0; color: #374151;"><strong>发送方式:</strong> Resend API (生产环境)</p>
          <p style="margin: 8px 0; color: #374151;"><strong>发送地址:</strong> noreply@novamail.world</p>
          <p style="margin: 8px 0; color: #374151;"><strong>收件人:</strong> ${testRecipient}</p>
          <p style="margin: 8px 0; color: #374151;"><strong>邮件状态:</strong> 已成功发送</p>
        </div>
        
        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #10b981;">
          <h3 style="color: #065f46; margin: 0 0 10px 0; font-size: 18px;">📋 检查清单</h3>
          <ul style="margin: 0; padding-left: 20px; color: #374151;">
            <li>✅ 检查收件箱</li>
            <li>✅ 检查垃圾邮件文件夹</li>
            <li>✅ 检查促销邮件文件夹</li>
            <li>✅ 检查其他邮件分类</li>
          </ul>
        </div>
        
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
          <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 18px;">⚠️ 如果收不到邮件</h3>
          <p style="margin: 0; color: #374151;">请检查以下位置：</p>
          <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #374151;">
            <li>垃圾邮件/Spam 文件夹</li>
            <li>促销邮件/Promotions 文件夹</li>
            <li>其他邮件分类文件夹</li>
            <li>邮件过滤规则</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            此邮件由 NovaMail 生产环境自动发送<br>
            发送时间: ${formattedDate}
          </p>
        </div>
      </div>
    `
    },
    recipients: [testRecipient],
    senderEmail: 'noreply@novamail.world',
    senderName: 'NovaMail 送达测试'
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
      console.log('✅ 邮件发送成功！');
      console.log('🎉 邮件ID:', responseData.data?.messageId || responseData.messageId);
      console.log('📧 收件人:', testRecipient);
      console.log('');
      console.log('📋 请检查以下位置：');
      console.log('1. 收件箱');
      console.log('2. 垃圾邮件文件夹');
      console.log('3. 促销邮件文件夹');
      console.log('4. 其他邮件分类');
      console.log('');
      console.log('💡 如果仍然收不到，可能是邮件被标记为垃圾邮件');
    } else {
      console.log('❌ 邮件发送失败');
      console.log('错误:', responseData.error || '未知错误');
    }
  } catch (error) {
    console.error('❌ 请求失败:', error);
  }
}

testEmailDelivery();
