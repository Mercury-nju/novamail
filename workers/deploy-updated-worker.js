// 使用 Cloudflare API 部署更新后的 Workers
const https = require('https');
const fs = require('fs');
const path = require('path');

const API_TOKEN = 'o1CH8v-fJgNZh7OHScY02oYpbxWpYiF8sdMq7Bwl';
const ACCOUNT_ID = '8b0131a99f0fbfe479670ecaef6b4448';
const WORKER_NAME = 'novamail-api';

// 读取更新后的 Workers 代码
const workerCode = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

// 部署配置
const deployData = {
  name: WORKER_NAME,
  main: {
    name: 'index.js',
    content: workerCode,
    type: 'esm'
  },
  compatibility_date: '2024-01-01',
  compatibility_flags: ['nodejs_compat'],
  vars: {
    CREEM_API_KEY: 'creem_22oMcuzUH4TeWyWVAVjTes',
    CREEM_BASE_URL: 'https://api.creem.io/v1',
    CREEM_WEBHOOK_SECRET: 'whsec_5uvCq8f1gQMsqz5rqwdVgZ',
    RESEND_API_KEY: 're_HoZby1YY_8DhQswTinqLVqUwFjqHV4V7y',
    DASHSCOPE_API_KEY: 'sk-9bf19547ddbd4be1a87a7a43cf251097',
    GMAIL_SMTP_USER: 'lihongyangnju@gmail.com',
    GMAIL_SMTP_PASSWORD: 'zjhk rkmy ysoz dhyi',
    GMAIL_SMTP_HOST: 'smtp.gmail.com',
    GMAIL_SMTP_PORT: '587',
    GMAIL_REFRESH_TOKEN: '1//04FWiY69BwVHbCgYIARAAGAQSNwF-L9IrZeOSGrUTkpP5iwxbNiR27XmP7fcSOg2AWpjRh55RUIlzrUI3nDHecaJV29bkosRLxrU',
    GOOGLE_CLIENT_ID: '3269831923-bu142o4r9b9f29jm8tb0qmumitgu51t9.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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'
  }
};

// 创建部署请求
const postData = JSON.stringify(deployData);

const options = {
  hostname: 'api.cloudflare.com',
  port: 443,
  path: `/client/v4/accounts/${ACCOUNT_ID}/workers/scripts/${WORKER_NAME}`,
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🚀 开始部署更新后的 Workers...');
console.log('Worker 名称:', WORKER_NAME);
console.log('Account ID:', ACCOUNT_ID);
console.log('代码长度:', workerCode.length, '字符');
console.log('修复内容: 确保发送用户编辑的真实邮件内容');

const req = https.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头:`, res.headers);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (res.statusCode === 200 || res.statusCode === 201) {
        console.log('✅ 部署成功!');
        console.log('响应:', JSON.stringify(response, null, 2));
        console.log('🎉 Workers已更新，现在将发送用户编辑的真实邮件内容！');
      } else {
        console.log('❌ 部署失败!');
        console.log('错误响应:', JSON.stringify(response, null, 2));
      }
    } catch (e) {
      console.log('响应数据:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`请求错误: ${e.message}`);
});

req.write(postData);
req.end();
