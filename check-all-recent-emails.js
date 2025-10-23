// 检查所有最近的邮件状态
const https = require('https');

// 从日志中获取所有最近的消息ID
const messageIds = [
  'cb580d2e-df27-4152-a88f-37ee523b96e0', // 最新的
  '2923c1fd-76d2-4201-a3b4-7e5cff5c71be',
  '480ed973-ee44-436b-bb21-2ae05fabeebc',
  '5d17c23c-f8c2-4054-a45c-a56d2966cf32',
  '96aae781-b059-4dec-aa19-7df2ba6e37a2',
  'd2d39baa-2892-4c36-abf6-3ac937a888dd',
  '896b0170-4b64-455e-9fe5-dbfdff850b23',
  'd3dd1c0b-b414-4138-a931-d24386b8bb2f',
  'a938724a-df66-43ca-9964-9a45088b5615',
  '197d4adb-e330-42c0-bfe4-a1a2adddf42a'
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
  console.log('🔍 检查所有最近邮件状态...');
  console.log(`总共 ${messageIds.length} 封邮件\n`);
  
  for (let i = 0; i < messageIds.length; i++) {
    const messageId = messageIds[i];
    try {
      const result = await checkEmailStatus(messageId);
      console.log(`📧 邮件 ${i + 1}/${messageIds.length} (${messageId}):`);
      console.log(`状态码: ${result.status}`);
      
      if (result.data.object === 'email') {
        console.log(`✅ 邮件已发送`);
        console.log(`收件人: ${result.data.to}`);
        console.log(`主题: ${result.data.subject}`);
        console.log(`发送时间: ${result.data.created_at}`);
        console.log(`最后状态: ${result.data.last_event}`);
        console.log(`发件人: ${result.data.from}`);
        
        // 检查是否有投递问题
        if (result.data.last_event === 'delivered') {
          console.log(`✅ 邮件已投递`);
        } else if (result.data.last_event === 'opened') {
          console.log(`✅ 邮件已打开`);
        } else if (result.data.last_event === 'sent') {
          console.log(`⚠️  邮件已发送但未确认投递`);
        } else {
          console.log(`❓ 邮件状态: ${result.data.last_event}`);
        }
      } else {
        console.log(`❌ 邮件状态异常:`, result.data);
      }
      console.log('---');
    } catch (error) {
      console.log(`❌ 检查邮件 ${messageId} 失败:`, error.message);
      console.log('---');
    }
  }
}

checkAllEmails();
