// 测试带Display Email的情况
const http = require('http');

const emailData = {
  subject: '测试带Display Email - ' + new Date().toISOString(),
  content: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">测试带Display Email</h1>
      <p>这是测试带Display Email字段的情况。</p>
      <p>发送时间: ${new Date().toISOString()}</p>
      <p>如果您收到这封邮件，说明Display Email字段正常工作。</p>
    </div>
  `,
  recipients: ['lihongyangnju@gmail.com'],
  senderEmail: '2945235656@qq.com', // 填写Display Email
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

console.log('📧 测试带Display Email功能...');
console.log('收件人:', emailData.recipients);
console.log('Display Email:', emailData.senderEmail);
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
        console.log('✅ 带Display Email功能测试成功！');
        console.log('请检查收件箱（包括垃圾邮件文件夹）');
        console.log('收件人应该看到发件人为: NovaMail <2945235656@qq.com>');
      } else {
        console.log('❌ 带Display Email功能测试失败');
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
