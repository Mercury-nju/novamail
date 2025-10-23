// 检查最新邮件的投递状态
const https = require('https');

const messageId = 'be3ccfaa-75cf-481e-9e71-84276400ae66'; // 最新的消息ID

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

async function checkEmail() {
  console.log('🔍 检查最新邮件状态...');
  console.log(`消息ID: ${messageId}`);
  
  try {
    const result = await checkEmailStatus(messageId);
    console.log(`状态码: ${result.status}`);
    
    if (result.data.object === 'email') {
      console.log(`✅ 邮件已发送`);
      console.log(`收件人: ${result.data.to}`);
      console.log(`主题: ${result.data.subject}`);
      console.log(`发送时间: ${result.data.created_at}`);
      console.log(`最后状态: ${result.data.last_event}`);
      console.log(`发件人: ${result.data.from}`);
      
      // 检查投递状态
      if (result.data.last_event === 'delivered') {
        console.log(`✅ 邮件已投递到收件箱`);
      } else if (result.data.last_event === 'opened') {
        console.log(`✅ 邮件已被打开`);
      } else if (result.data.last_event === 'sent') {
        console.log(`⚠️  邮件已发送但未确认投递`);
      } else {
        console.log(`❓ 邮件状态: ${result.data.last_event}`);
      }
      
      console.log('\n💡 如果还是收不到邮件，请检查：');
      console.log('1. Gmail 垃圾邮件文件夹');
      console.log('2. Gmail 搜索: from:noreply@novamail.world');
      console.log('3. 等待几分钟后再次检查');
      
    } else {
      console.log(`❌ 邮件状态异常:`, result.data);
    }
  } catch (error) {
    console.log(`❌ 检查邮件失败:`, error.message);
  }
}

checkEmail();
