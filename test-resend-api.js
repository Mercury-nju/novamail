// 测试Resend API Key是否有效
const https = require('https');

const API_KEY = 're_HoZby1YY_8DhQswTinqLVqUwFjqHV4V7y';

const options = {
  hostname: 'api.resend.com',
  port: 443,
  path: '/domains',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
};

console.log('🔍 检查Resend API Key状态...');
console.log('API Key:', API_KEY);

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
        console.log('✅ Resend API Key有效');
        console.log('域名数量:', response.data?.length || 0);
      } else {
        console.log('❌ Resend API Key无效或过期');
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

req.end();
