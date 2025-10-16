// Cloudflare Workers 部署脚本
// 使用 Cloudflare API 直接部署

const API_TOKEN = 'o1CH8v-fJgNZh7OHScY02oYpbxWpYiF8sdMq7Bwl';
const ACCOUNT_ID = '8b0131a99f0fbfe479670ecaef6b4448';
const WORKER_NAME = 'novamail-api';

// 读取简化版本的代码
const fs = require('fs');
const path = require('path');

const workerCode = fs.readFileSync(path.join(__dirname, 'index-simple.js'), 'utf8');

// 部署配置
const deployConfig = {
  name: WORKER_NAME,
  main: {
    name: 'index-simple.js',
    content: workerCode,
    type: 'esm'
  },
  compatibility_date: '2024-01-01',
  compatibility_flags: ['nodejs_compat'],
  vars: {
    CREEM_API_KEY: 'creem_22oMcuzUH4TeWyWVAVjTes',
    CREEM_BASE_URL: 'https://api.creem.io/v1',
    CREEM_WEBHOOK_SECRET: 'whsec_5uvCq8f1gQMsqz5rqwdVgZ',
    RESEND_API_KEY: 're_PCbEHboB...',
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

console.log('部署配置已准备完成');
console.log('Worker 名称:', WORKER_NAME);
console.log('代码长度:', workerCode.length, '字符');
console.log('环境变量数量:', Object.keys(deployConfig.vars).length);

// 输出部署信息
console.log('\n=== 部署信息 ===');
console.log('API Token:', API_TOKEN.substring(0, 10) + '...');
console.log('Account ID:', ACCOUNT_ID);
console.log('Worker Name:', WORKER_NAME);
console.log('\n请使用以下信息在 Cloudflare Dashboard 中手动部署：');
console.log('1. 登录 https://dash.cloudflare.com');
console.log('2. 进入 Workers & Pages');
console.log('3. 创建新的 Worker');
console.log('4. 复制 index-simple.js 的内容到编辑器');
console.log('5. 配置环境变量');
console.log('6. 部署');

