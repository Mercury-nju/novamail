// 检查最新的邮件状态
const https = require('https');

// 从日志中获取最新的消息ID
const messageIds = [
  'cb580d2e-df27-4152-a88f-37ee523b96e0', // 最新的
  '2923c1fd-76d2-4201-a3b4-7e5cff5c71be',
  '480ed973-ee44-436b-bb21-2ae05fabeebc'
];

async function checkEmailStatus(messageId) {
  return new Promise((resolve, reject) => {
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

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ messageId, status: res.statusCode, data: response });
        } catch (e) {
          resolve({ messageId, status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

async function checkAllEmails() {
  console.log('🔍 检查所有邮件状态...');
  
  for (const messageId of messageIds) {
    try {
      const result = await checkEmailStatus(messageId);
      console.log(`\n📧 邮件 ${messageId}:`);
      console.log(`状态码: ${result.status}`);
      
      if (result.data.object === 'email') {
        console.log(`✅ 邮件已发送`);
        console.log(`收件人: ${result.data.to}`);
        console.log(`主题: ${result.data.subject}`);
        console.log(`发送时间: ${result.data.created_at}`);
        console.log(`最后状态: ${result.data.last_event}`);
        console.log(`发件人: ${result.data.from}`);
      } else {
        console.log(`❌ 邮件状态异常:`, result.data);
      }
    } catch (error) {
      console.log(`❌ 检查邮件 ${messageId} 失败:`, error.message);
    }
  }
}

checkAllEmails();
