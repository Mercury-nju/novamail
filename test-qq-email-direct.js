// 直接测试发送到QQ邮箱
const https = require('https');

const emailData = {
  subject: 'NovaMail 直接测试邮件 - ' + new Date().toISOString(),
  content: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #007bff; border-radius: 10px;">
      <h1 style="color: #007bff; text-align: center;">🎉 NovaMail 测试邮件</h1>
      <p style="font-size: 16px; line-height: 1.6;">这是一封测试邮件，用于验证邮件发送功能。</p>
      <p style="font-size: 16px; line-height: 1.6;">发送时间: ${new Date().toISOString()}</p>
      <p style="font-size: 16px; line-height: 1.6;">如果您收到这封邮件，说明邮件发送功能正常工作。</p>
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0; font-weight: bold;">测试信息：</p>
        <p style="margin: 5px 0;">发件人: NovaMail <noreply@novamail.world></p>
        <p style="margin: 5px 0;">收件人: 2945235656@qq.com</p>
        <p style="margin: 5px 0;">发送方式: Resend API</p>
      </div>
      <p style="text-align: center; color: #666; font-size: 14px;">此邮件由 NovaMail 系统自动发送</p>
    </div>
  `,
  recipients: ['2945235656@qq.com'], // 您的QQ邮箱
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

console.log('📧 发送测试邮件到QQ邮箱...');
console.log('收件人: 2945235656@qq.com');
console.log('主题:', emailData.subject);
console.log('发件人: NovaMail <noreply@novamail.world>');

const req = https.request(options, (res) => {
  console.log('状态码:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('响应:', JSON.stringify(response, null, 2));
      
      if (res.statusCode === 200) {
        console.log('✅ 邮件发送成功！');
        console.log('请检查您的QQ邮箱（包括垃圾邮件文件夹）');
        console.log('如果还是没有收到，可能是邮件服务商的问题');
      } else {
        console.log('❌ 邮件发送失败');
        console.log('错误:', response.error || 'Unknown error');
      }
    } catch (e) {
      console.log('响应数据:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('请求错误:', e.message);
});

req.write(postData);
req.end();
