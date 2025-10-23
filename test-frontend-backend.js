// 测试前端到后端的连接
const http = require('http');

const emailData = {
  subject: '前端后端连接测试 - ' + new Date().toISOString(),
  content: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">前端后端连接测试</h1>
      <p>这是测试前端到后端连接的邮件。</p>
      <p>发送时间: ${new Date().toISOString()}</p>
      <p>如果您收到这封邮件，说明前端后端连接正常。</p>
    </div>
  `,
  recipients: ['lihongyangnju@gmail.com'],
  senderEmail: '212@qq.com', // 使用图片中显示的邮箱
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

console.log('🧪 测试前端到后端连接...');
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
        console.log('✅ 前端后端连接测试成功！');
        console.log('消息ID:', response.data?.messageId);
        console.log('请检查收件箱（包括垃圾邮件文件夹）');
        console.log('收件人应该看到发件人为: NovaMail <212@qq.com>');
      } else {
        console.log('❌ 前端后端连接测试失败');
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
