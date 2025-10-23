// 检查邮件投递状态
const https = require('https');

const messageId = 'cb580d2e-df27-4152-a88f-37ee523b96e0'; // 从日志中获取的消息ID

const options = {
  hostname: 'api.resend.com',
  port: 443,
  path: `/emails/${messageId}`,
  method: 'GET',
  headers: {
    'Authorization': `Bearer re_HoZby1YY_8DhQswTinqLVqUwFjqHV4V7y`,
    'Content-Type': 'application/json'
  }
};

console.log('🔍 检查邮件投递状态...');
console.log('消息ID:', messageId);

const req = https.request(options, (res) => {
  console.log('状态码:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('邮件状态:', JSON.stringify(response, null, 2));
      
      if (response.object === 'email') {
        console.log('✅ 邮件已发送');
        console.log('收件人:', response.to);
        console.log('主题:', response.subject);
        console.log('发送时间:', response.created_at);
        console.log('状态:', response.last_event);
      }
    } catch (e) {
      console.log('响应数据:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('请求错误:', e.message);
});

req.end();
