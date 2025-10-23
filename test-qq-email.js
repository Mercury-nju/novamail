// 测试发送到QQ邮箱
const https = require('https');

const emailData = {
  subject: 'NovaMail 测试邮件 - ' + new Date().toISOString(),
  content: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">NovaMail 测试邮件</h1>
      <p>这是一封测试邮件，用于验证邮件发送功能。</p>
      <p>发送时间: ${new Date().toISOString()}</p>
      <p>如果您收到这封邮件，说明邮件发送功能正常工作。</p>
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
