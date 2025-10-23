// 测试用户界面发送邮件
const http = require('http');

const emailData = {
  subject: '🚀 Introducing [Product Name] - The Future is Here',
  content: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">Hi [Customer Name],</h1>
      <p>We're thrilled to introduce our latest innovation that's set to revolutionize your experience.</p>
      <p>This is a test email sent through the user interface.</p>
      <p>发送时间: ${new Date().toISOString()}</p>
    </div>
  `,
  recipients: ['lihongyangnju@gmail.com'],
  senderEmail: '11@qq.com', // 用户填写的Display Email
  senderName: '111111', // 用户填写的Sender Name
  useUserDomain: false
};

const postData = JSON.stringify(emailData);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/campaigns/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('📧 测试用户界面发送邮件...');
console.log('收件人:', emailData.recipients);
console.log('Display Email:', emailData.senderEmail);
console.log('Sender Name:', emailData.senderName);
console.log('主题:', emailData.subject);

const req = http.request(options, (res) => {
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
        console.log('✅ 用户界面邮件发送成功！');
        console.log('请检查收件箱（包括垃圾邮件文件夹）');
        console.log('收件人应该看到发件人为: 111111 <11@qq.com>');
        console.log('但实际发送地址是: noreply@novamail.world');
      } else {
        console.log('❌ 用户界面邮件发送失败');
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
