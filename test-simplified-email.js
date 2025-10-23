// 测试简化后的邮件发送功能
const https = require('https');

const emailData = {
  subject: '简化测试邮件 - ' + new Date().toISOString(),
  content: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">简化测试邮件</h1>
      <p>这是简化后的邮件发送功能测试。</p>
      <p>发送时间: ${new Date().toISOString()}</p>
      <p>如果您收到这封邮件，说明简化后的功能正常工作。</p>
    </div>
  `,
  recipients: ['lihongyangnju@gmail.com'],
  senderEmail: 'noreply@novamail.world',
  senderName: 'NovaMail',
  useUserDomain: false
};

const postData = JSON.stringify(emailData);

const options = {
  hostname: 'api.resend.com',
  port: 443,
  path: '/emails',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer re_HoZby1YY_8DhQswTinqLVqUwFjqHV4V7y',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('📧 测试简化后的邮件发送功能...');
console.log('收件人:', emailData.recipients);
console.log('发件人:', emailData.senderEmail);
console.log('主题:', emailData.subject);
console.log('使用用户域名:', emailData.useUserDomain);

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
        console.log('✅ 简化后的邮件发送成功！');
        console.log('消息ID:', response.id);
        console.log('请检查收件箱（包括垃圾邮件文件夹）');
        console.log('发件人地址: noreply@novamail.world');
      } else {
        console.log('❌ 简化后的邮件发送失败');
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
