// 测试生产环境API
const https = require('https');

async function testProductionAPI() {
  return new Promise((resolve, reject) => {
    const testData = {
      subject: 'Test Subject',
      content: '<p>Test Content</p>',
      recipients: ['test@example.com'],
      senderEmail: 'noreply@novamail.world',
      senderName: 'NovaMail'
    };

    const postData = JSON.stringify(testData);

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

    console.log('🔍 测试生产环境API...');
    console.log('发送数据:', JSON.stringify(testData, null, 2));

    const req = https.request(options, (res) => {
      console.log('状态码:', res.statusCode);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('响应数据:', data);
        
        try {
          const response = JSON.parse(data);
          resolve({ status: res.statusCode, response });
        } catch (e) {
          resolve({ status: res.statusCode, response: data });
        }
      });
    });

    req.on('error', (e) => {
      console.error('请求错误:', e.message);
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

testProductionAPI().then(result => {
  console.log('\n📊 测试结果:');
  console.log('状态码:', result.status);
  console.log('响应:', JSON.stringify(result.response, null, 2));
}).catch(error => {
  console.error('测试失败:', error.message);
});
