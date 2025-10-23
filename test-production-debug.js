// 生产环境调试测试
const https = require('https');

async function testProductionDebug() {
  return new Promise((resolve, reject) => {
    // 使用最简单的数据结构
    const testData = {
      subject: 'Debug Test',
      content: '<p>Debug Content</p>',
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
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'NovaMail-Debug-Test'
      }
    };

    console.log('🔍 生产环境调试测试...');
    console.log('发送数据:', JSON.stringify(testData, null, 2));

    const req = https.request(options, (res) => {
      console.log('状态码:', res.statusCode);
      console.log('响应头:', res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('原始响应:', data);
        
        try {
          const response = JSON.parse(data);
          console.log('解析后响应:', JSON.stringify(response, null, 2));
          
          if (res.statusCode === 200) {
            console.log('✅ 生产环境API正常工作');
            resolve({ success: true, response });
          } else {
            console.log('❌ 生产环境API有问题');
            console.log('错误详情:', response);
            resolve({ success: false, error: response.error, details: response });
          }
        } catch (e) {
          console.log('❌ 响应解析失败');
          console.log('原始数据:', data);
          resolve({ success: false, error: 'Parse error', rawData: data });
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

testProductionDebug().then(result => {
  console.log('\n📊 调试结果:');
  if (result.success) {
    console.log('✅ 生产环境正常');
  } else {
    console.log('❌ 生产环境有问题');
    console.log('错误:', result.error);
    console.log('详情:', result.details);
    
    if (result.error === 'Subject and content are required') {
      console.log('\n💡 问题分析:');
      console.log('生产环境的API代码没有正确部署');
      console.log('可能的原因:');
      console.log('1. 部署还在进行中');
      console.log('2. 缓存问题');
      console.log('3. 代码没有正确推送');
      
      console.log('\n🚀 建议解决方案:');
      console.log('1. 等待5-10分钟让部署完成');
      console.log('2. 检查Cloudflare Pages部署状态');
      console.log('3. 或者使用本地环境进行测试');
    }
  }
}).catch(error => {
  console.error('调试失败:', error.message);
});