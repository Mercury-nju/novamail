// 测试本地环境邮件发送
const http = require('http');

async function testLocalEmail() {
  return new Promise((resolve, reject) => {
    const emailData = {
      subject: '本地测试邮件 - ' + new Date().toISOString(),
      content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #007bff;">🎉 本地测试邮件</h1>
          <p>这是一封本地测试邮件，用于验证邮件发送功能。</p>
          <p>发送时间: ${new Date().toISOString()}</p>
          <p>如果您收到这封邮件，说明本地邮件发送功能正常工作。</p>
        </div>
      `,
      recipients: ['lihongyangnju@gmail.com'],
      senderEmail: 'noreply@novamail.world',
      senderName: 'NovaMail'
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

    console.log('📧 测试本地环境邮件发送...');
    console.log('收件人: lihongyangnju@gmail.com');

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
            console.log('✅ 本地邮件发送成功！');
            console.log('请检查您的Gmail邮箱');
          } else {
            console.log('❌ 本地邮件发送失败');
            console.log('错误:', response.error || 'Unknown error');
          }
          
          resolve({ success: res.statusCode === 200, response });
        } catch (e) {
          console.log('响应数据:', data);
          resolve({ success: false, response: data });
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

testLocalEmail().catch(error => {
  console.error('测试失败:', error.message);
});
