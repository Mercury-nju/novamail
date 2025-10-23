// 测试用户邮件发送流程
const https = require('https');

const emailData = {
  subject: '用户测试邮件 - ' + new Date().toISOString(),
  content: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">用户测试邮件</h1>
      <p>这是用户通过NovaMail平台发送的测试邮件。</p>
      <p>发送时间: ${new Date().toISOString()}</p>
      <p>如果您收到这封邮件，说明用户邮件发送功能正常工作。</p>
    </div>
  `,
  recipients: ['lihongyangnju@gmail.com'],
  senderEmail: 'noreply@novamail.world',
  senderName: 'NovaMail',
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

console.log('📧 测试用户邮件发送流程...');
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
      
      if (res.statusCode === 200) {
        console.log('✅ 用户邮件发送成功！');
        console.log('请检查收件箱（包括垃圾邮件文件夹）');
      } else {
        console.log('❌ 用户邮件发送失败');
        console.log('错误:', response.error || 'Unknown error');
      }
    } catch (e) {
      console.log('响应数据:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('请求错误:', e.message);
  console.log('请确保Next.js开发服务器正在运行 (npm run dev)');
});

req.write(postData);
req.end();
