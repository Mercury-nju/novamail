// 测试使用novamail.world域名的邮件发送
const https = require('https');

const API_KEY = 're_HoZby1YY_8DhQswTinqLVqUwFjqHV4V7y';

const emailData = {
  from: 'NovaMail <noreply@novamail.world>',
  to: ['lihongyangnju@gmail.com'],
  subject: '测试NovaMail域名发送 - ' + new Date().toISOString(),
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">NovaMail测试邮件</h1>
      <p>这是使用novamail.world域名发送的测试邮件。</p>
      <p>发送时间: ${new Date().toISOString()}</p>
      <p>发件人: NovaMail <noreply@novamail.world></p>
      <p>如果您收到这封邮件，说明域名配置正确。</p>
    </div>
  `
};

const postData = JSON.stringify(emailData);

const options = {
  hostname: 'api.resend.com',
  port: 443,
  path: '/emails',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('📧 使用NovaMail域名发送测试邮件...');
console.log('发件人:', emailData.from);
console.log('收件人:', emailData.to);
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
      
      if (res.statusCode === 200 || res.statusCode === 201) {
        console.log('✅ 邮件发送成功！');
        console.log('消息ID:', response.id);
        console.log('请检查收件箱（包括垃圾邮件文件夹）');
        console.log('发件人地址已更改为: noreply@novamail.world');
      } else {
        console.log('❌ 邮件发送失败');
        console.log('错误:', response.message || 'Unknown error');
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
