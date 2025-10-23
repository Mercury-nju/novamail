// 最终验证测试 - 测试所有情况
const http = require('http');

async function runTests() {
  console.log('🧪 最终验证测试 - 测试所有邮件发送情况...\n');

  // 测试1: 带Display Email的情况
  console.log('📧 测试1: 带Display Email的情况');
  const test1 = {
    subject: '测试1: 带Display Email - ' + new Date().toISOString(),
    content: '<h1>测试1: 带Display Email</h1><p>这是带Display Email的测试邮件。</p>',
    recipients: ['lihongyangnju@gmail.com'],
    senderEmail: 'test@example.com',
    senderName: 'Test User',
    useUserDomain: false
  };

  await sendTestEmail(test1);

  // 等待1秒
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 测试2: 空Display Email的情况
  console.log('\n📧 测试2: 空Display Email的情况');
  const test2 = {
    subject: '测试2: 空Display Email - ' + new Date().toISOString(),
    content: '<h1>测试2: 空Display Email</h1><p>这是空Display Email的测试邮件。</p>',
    recipients: ['lihongyangnju@gmail.com'],
    senderEmail: '',
    senderName: 'NovaMail',
    useUserDomain: false
  };

  await sendTestEmail(test2);

  console.log('\n🎉 所有测试完成！请检查收件箱。');
}

runTests();

async function sendTestEmail(emailData) {
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

  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log(`✅ 成功 - 消息ID: ${response.data?.messageId}`);
          } else {
            console.log(`❌ 失败 - 错误: ${response.error}`);
          }
        } catch (e) {
          console.log(`❌ 解析错误: ${data}`);
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.error(`❌ 请求错误: ${e.message}`);
      resolve();
    });

    req.write(postData);
    req.end();
  });
}
