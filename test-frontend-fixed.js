// 测试修复后的前端数据结构
const https = require('https');

const emailData = {
  campaignData: {
    subject: '修复后的前端测试 - ' + new Date().toISOString(),
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333;">修复后的前端测试</h1>
        <p>这是测试修复后的前端数据结构的邮件。</p>
        <p>发送时间: ${new Date().toISOString()}</p>
        <p>数据结构已修复，应该可以正常发送了。</p>
      </div>
    `
  },
  recipients: ['lihongyangnju@gmail.com'],
  userId: 'current-user'
};

const postData = JSON.stringify(emailData);

const options = {
  hostname: 'novamail-api.lihongyangnju.workers.dev',
  port: 443,
  path: '/api/campaigns/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🧪 测试修复后的前端数据结构...');
console.log('URL:', `https://${options.hostname}${options.path}`);
console.log('数据结构:', JSON.stringify(emailData, null, 2));

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
        console.log('✅ 修复后的前端数据结构测试成功！');
        console.log('请检查收件箱（包括垃圾邮件文件夹）');
      } else {
        console.log('❌ 修复后的前端数据结构测试失败');
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
