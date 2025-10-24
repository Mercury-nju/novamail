// 发送简单测试邮件，优化送达率
// 使用内置fetch

async function sendSimpleTestEmail() {
  console.log('📧 发送简单测试邮件...');
  
  const url = 'https://novamail.world/api/campaigns/send';
  const testRecipient = '2945235656@qq.com';

  const now = new Date();
  const timeStr = now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

  const requestData = {
    campaignData: {
      subject: `测试邮件 - ${timeStr}`,
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; background: #ffffff; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #333; margin-bottom: 20px;">📧 简单测试邮件</h2>
          
          <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 0; color: #333;"><strong>发送时间:</strong> ${timeStr}</p>
            <p style="margin: 5px 0 0 0; color: #333;"><strong>收件人:</strong> ${testRecipient}</p>
            <p style="margin: 5px 0 0 0; color: #333;"><strong>状态:</strong> 已发送</p>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107;">
            <h3 style="margin: 0 0 10px 0; color: #856404;">📋 请检查以下位置:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #856404;">
              <li>收件箱</li>
              <li>垃圾邮件文件夹</li>
              <li>促销邮件文件夹</li>
            </ul>
          </div>
          
          <p style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
            此邮件由 NovaMail 系统发送
          </p>
        </div>
      `
    },
    recipients: [testRecipient],
    senderEmail: 'noreply@novamail.world',
    senderName: 'NovaMail 测试'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const responseData = await response.json();

    if (response.ok && responseData.success) {
      console.log('✅ 邮件发送成功！');
      console.log('📧 收件人:', testRecipient);
      console.log('⏰ 发送时间:', timeStr);
      console.log('');
      console.log('🔍 请检查您的邮箱：');
      console.log('1. 收件箱');
      console.log('2. 垃圾邮件文件夹');
      console.log('3. 促销邮件文件夹');
      console.log('');
      console.log('💡 如果收不到，请检查邮件过滤规则');
    } else {
      console.log('❌ 发送失败:', responseData.error);
    }
  } catch (error) {
    console.error('❌ 请求失败:', error);
  }
}

sendSimpleTestEmail();
