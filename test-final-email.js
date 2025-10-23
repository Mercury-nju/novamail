// 最终邮件测试 - 发送到多个邮箱
const https = require('https');

const testEmails = [
  'lihongyangnju@gmail.com',
  '2945235656@qq.com'
];

async function sendTestEmail(toEmail) {
  return new Promise((resolve, reject) => {
    const emailData = {
      subject: `NovaMail 最终测试邮件 - ${new Date().toISOString()}`,
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #007bff; border-radius: 10px;">
          <h1 style="color: #007bff; text-align: center;">🎉 NovaMail 最终测试</h1>
          <p style="font-size: 16px; line-height: 1.6;">这是一封最终测试邮件，用于验证邮件发送功能。</p>
          <p style="font-size: 16px; line-height: 1.6;">发送时间: ${new Date().toISOString()}</p>
          <p style="font-size: 16px; line-height: 1.6;">如果您收到这封邮件，说明邮件发送功能正常工作。</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold;">测试信息：</p>
            <p style="margin: 5px 0;">发件人: NovaMail <noreply@novamail.world></p>
            <p style="margin: 5px 0;">收件人: ${toEmail}</p>
            <p style="margin: 5px 0;">发送方式: Resend API</p>
          </div>
          <p style="text-align: center; color: #666; font-size: 14px;">此邮件由 NovaMail 系统自动发送</p>
        </div>
      `,
      recipients: [toEmail],
      senderEmail: 'noreply@novamail.world',
      senderName: 'NovaMail'
    };

    const postData = JSON.stringify(emailData);

    const options = {
      hostname: 'novamail.world',
      port: 443,
      path: '/api/campaigns/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    console.log(`📧 发送测试邮件到: ${toEmail}`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log(`✅ ${toEmail}: 邮件发送成功`);
            console.log(`   消息ID: ${response.data?.id || 'N/A'}`);
            resolve({ success: true, email: toEmail, messageId: response.data?.id });
          } else {
            console.log(`❌ ${toEmail}: 邮件发送失败`);
            console.log(`   错误: ${response.error || 'Unknown error'}`);
            resolve({ success: false, email: toEmail, error: response.error });
          }
        } catch (e) {
          console.log(`❌ ${toEmail}: 响应解析失败`);
          console.log(`   响应: ${data}`);
          resolve({ success: false, email: toEmail, error: 'Parse error' });
        }
      });
    });

    req.on('error', (e) => {
      console.log(`❌ ${toEmail}: 请求错误 - ${e.message}`);
      resolve({ success: false, email: toEmail, error: e.message });
    });

    req.write(postData);
    req.end();
  });
}

async function testAllEmails() {
  console.log('🚀 开始最终邮件测试...');
  console.log(`测试邮箱: ${testEmails.join(', ')}`);
  console.log('');

  const results = [];
  
  for (const email of testEmails) {
    const result = await sendTestEmail(email);
    results.push(result);
    console.log('---');
    
    // 等待1秒再发送下一封
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n📊 测试结果汇总:');
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  console.log(`✅ 成功: ${successCount}/${results.length}`);
  console.log(`❌ 失败: ${failCount}/${results.length}`);
  
  if (successCount > 0) {
    console.log('\n🎉 邮件发送成功！请检查以下邮箱：');
    results.filter(r => r.success).forEach(r => {
      console.log(`   - ${r.email} (消息ID: ${r.messageId})`);
    });
    console.log('\n💡 如果还是收不到邮件，请检查：');
    console.log('   1. 垃圾邮件文件夹');
    console.log('   2. 邮件过滤规则');
    console.log('   3. 等待几分钟后再次检查');
  }
}

testAllEmails();
