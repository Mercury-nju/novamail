// 生产环境最终测试
const https = require('https');

async function testProductionFinal() {
  return new Promise((resolve, reject) => {
    // 使用最简单的数据结构
    const testData = {
      subject: 'Final Production Test',
      content: '<p>Final Production Test Content</p>',
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

    console.log('🔍 生产环境最终测试...');
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
            console.log('用户现在可以正常发送邮件了！');
            resolve({ success: true, response });
          } else {
            console.log('❌ 生产环境API有问题');
            console.log('错误:', response.error);
            resolve({ success: false, error: response.error });
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

testProductionFinal().then(result => {
  console.log('\n📊 最终测试结果:');
  if (result.success) {
    console.log('✅ 生产环境完全正常');
    console.log('🎉 用户现在可以正常发送邮件了！');
    console.log('📧 请在生产环境测试邮件发送功能');
  } else {
    console.log('❌ 生产环境还有问题');
    console.log('错误:', result.error);
    
    if (result.error === 'Subject and content are required') {
      console.log('\n💡 问题分析:');
      console.log('生产环境的API代码还没有正确部署');
      console.log('可能的原因:');
      console.log('1. 部署还在进行中（通常需要5-10分钟）');
      console.log('2. Cloudflare Pages缓存问题');
      console.log('3. 代码没有正确推送');
      
      console.log('\n🚀 建议解决方案:');
      console.log('1. 等待5-10分钟让部署完成');
      console.log('2. 检查Cloudflare Pages部署状态');
      console.log('3. 或者使用本地环境进行测试');
      
      console.log('\n📧 临时解决方案:');
      console.log('您可以使用本地环境进行测试：');
      console.log('1. 运行 npm run dev');
      console.log('2. 访问 http://localhost:3000');
      console.log('3. 测试邮件发送功能');
      
      console.log('\n⏰ 预计修复时间:');
      console.log('生产环境部署通常需要5-10分钟');
      console.log('请稍等片刻后再次测试');
    }
  }
}).catch(error => {
  console.error('测试失败:', error.message);
});