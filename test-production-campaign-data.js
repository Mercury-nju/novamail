// 生产环境测试 - 使用campaignData格式
const https = require('https');

async function testProductionCampaignData() {
  return new Promise((resolve, reject) => {
    // 使用Workers API格式的数据结构
    const testData = {
      campaignData: {
        subject: 'Campaign Data Test Subject',
        body: '<p>Campaign Data Test Content</p>'
      },
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
        'User-Agent': 'NovaMail-CampaignData-Test',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    };

    console.log('🔍 生产环境测试 - 使用campaignData格式...');
    console.log('发送数据:', JSON.stringify(testData, null, 2));

    const req = https.request(options, (res) => {
      console.log('状态码:', res.statusCode);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('响应:', data);
        
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log('✅ 生产环境API正常工作');
            console.log('🎉 用户现在可以正常发送邮件了！');
            resolve({ success: true, response });
          } else {
            console.log('❌ 生产环境API有问题');
            console.log('错误:', response.error);
            resolve({ success: false, error: response.error, details: response });
          }
        } catch (e) {
          console.log('❌ 响应解析失败');
          resolve({ success: false, error: 'Parse error' });
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

testProductionCampaignData().then(result => {
  console.log('\n📊 CampaignData测试结果:');
  if (result.success) {
    console.log('✅ 生产环境完全正常');
    console.log('🎉 用户现在可以正常发送邮件了！');
  } else {
    console.log('❌ 生产环境还有问题');
    console.log('错误:', result.error);
    console.log('详情:', result.details);
  }
}).catch(error => {
  console.error('测试失败:', error.message);
});
