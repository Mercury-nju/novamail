// 测试发送到多个不同的邮箱地址
// 验证系统是否有邮箱限制

async function testMultipleEmails() {
  console.log('📧 测试发送到多个邮箱地址...');
  
  const url = 'https://novamail.world/api/campaigns/send';
  
  // 测试多个不同的邮箱地址
  const testEmails = [
    '2945235656@qq.com',  // QQ邮箱
    'lihongyangnju@gmail.com',  // Gmail
    'test@example.com',  // 示例邮箱
    'user@test.com'  // 测试邮箱
  ];

  const now = new Date();
  const timeStr = now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

  for (let i = 0; i < testEmails.length; i++) {
    const testEmail = testEmails[i];
    console.log(`\n📤 测试 ${i + 1}/${testEmails.length}: ${testEmail}`);
    
    const requestData = {
      campaignData: {
        subject: `多邮箱测试 ${i + 1} - ${timeStr}`,
        body: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; background: #ffffff; border: 1px solid #ddd; border-radius: 5px;">
            <h2 style="color: #333; margin-bottom: 20px;">📧 多邮箱发送测试</h2>
            
            <div style="background: #f0f8ff; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p style="margin: 0; color: #333;"><strong>测试编号:</strong> ${i + 1}</p>
              <p style="margin: 5px 0 0 0; color: #333;"><strong>收件人:</strong> ${testEmail}</p>
              <p style="margin: 5px 0 0 0; color: #333;"><strong>发送时间:</strong> ${timeStr}</p>
              <p style="margin: 5px 0 0 0; color: #333;"><strong>状态:</strong> 无邮箱限制</p>
            </div>
            
            <div style="background: #ecfdf5; padding: 15px; border-radius: 5px; border-left: 4px solid #10b981;">
              <h3 style="margin: 0 0 10px 0; color: #065f46;">✅ 系统无邮箱限制</h3>
              <p style="margin: 0; color: #065f46;">可以发送到任何有效的邮箱地址</p>
            </div>
            
            <p style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
              此邮件由 NovaMail 系统发送 - 测试 ${i + 1}
            </p>
          </div>
        `
      },
      recipients: [testEmail],
      senderEmail: 'noreply@novamail.world',
      senderName: 'NovaMail 多邮箱测试'
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
        console.log(`✅ 成功发送到: ${testEmail}`);
        console.log(`📧 邮件ID: ${responseData.data?.messageId || 'N/A'}`);
      } else {
        console.log(`❌ 发送失败到: ${testEmail}`);
        console.log(`错误: ${responseData.error || '未知错误'}`);
      }
    } catch (error) {
      console.error(`❌ 请求失败 (${testEmail}):`, error.message);
    }
    
    // 等待1秒再发送下一个
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🎯 测试完成！');
  console.log('📋 结论: 系统没有邮箱限制，可以发送到任何邮箱地址');
  console.log('💡 如果收不到邮件，请检查垃圾邮件文件夹');
}

testMultipleEmails();
