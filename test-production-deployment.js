// 测试生产环境部署状态
const https = require('https');

async function testProductionDeployment() {
  return new Promise((resolve, reject) => {
    // 先测试一个简单的请求
    const options = {
      hostname: 'novamail.world',
      port: 443,
      path: '/',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    console.log('🔍 检查生产环境部署状态...');
    console.log('访问: https://novamail.world');

    const req = https.request(options, (res) => {
      console.log('状态码:', res.statusCode);
      console.log('响应头:', res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ 生产环境网站正常运行');
          
          // 现在测试API
          testProductionAPI().then(resolve).catch(reject);
        } else {
          console.log('❌ 生产环境网站异常');
          resolve({ success: false, error: 'Website not accessible' });
        }
      });
    });

    req.on('error', (e) => {
      console.error('请求错误:', e.message);
      reject(e);
    });

    req.end();
  });
}

async function testProductionAPI() {
  return new Promise((resolve, reject) => {
    const testData = {
      subject: '生产环境测试 - ' + new Date().toISOString(),
      content: '<p>这是生产环境测试邮件</p>',
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

    console.log('\n📧 测试生产环境API...');
    console.log('发送数据:', JSON.stringify(testData, null, 2));

    const req = https.request(options, (res) => {
      console.log('API状态码:', res.statusCode);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('API响应:', data);
        
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log('✅ 生产环境API正常工作');
            resolve({ success: true, response });
          } else {
            console.log('❌ 生产环境API有问题');
            console.log('错误:', response.error || 'Unknown error');
            resolve({ success: false, error: response.error });
          }
        } catch (e) {
          console.log('❌ API响应解析失败');
          resolve({ success: false, error: 'Parse error' });
        }
      });
    });

    req.on('error', (e) => {
      console.error('API请求错误:', e.message);
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

testProductionDeployment().then(result => {
  console.log('\n📊 生产环境测试结果:');
  if (result.success) {
    console.log('✅ 生产环境完全正常');
    console.log('用户现在可以正常发送邮件了！');
  } else {
    console.log('❌ 生产环境有问题');
    console.log('需要等待部署完成或手动修复');
  }
}).catch(error => {
  console.error('测试失败:', error.message);
});
