#!/usr/bin/env node

/**
 * 使用Cloudflare API直接部署Workers
 * 绕过wrangler，直接使用API部署
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 使用Cloudflare API直接部署Workers\n');

async function deployWorkerViaAPI() {
  try {
    const API_TOKEN = "PNfIW6IQR074DgyXXMirxecLs7QTyjTzqyppXkih";
    const ACCOUNT_ID = "8b0131a99f0fbfe479670ecaef6b4448";
    const WORKER_NAME = "novamail-api";
    
    console.log('🔧 部署配置:');
    console.log('   - Worker名称:', WORKER_NAME);
    console.log('   - 账户ID:', ACCOUNT_ID);
    console.log('   - API Token:', API_TOKEN.substring(0, 10) + '...');
    
    // 读取Worker代码
    const workerCodePath = path.join(__dirname, 'workers', 'index-with-admin.js');
    if (!fs.existsSync(workerCodePath)) {
      console.log('❌ 找不到Worker代码文件:', workerCodePath);
      return;
    }
    
    const workerCode = fs.readFileSync(workerCodePath, 'utf8');
    console.log('✅ 读取Worker代码成功，大小:', workerCode.length, '字符');
    
    // 1. 创建Worker版本
    console.log('\n📊 1. 创建Worker版本...');
    
    const createVersionUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/workers/scripts/${WORKER_NAME}/versions`;
    
    const versionResponse = await fetch(createVersionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/javascript'
      },
      body: workerCode
    });
    
    if (!versionResponse.ok) {
      const errorText = await versionResponse.text();
      console.log('❌ 创建版本失败:', errorText);
      return;
    }
    
    const versionResult = await versionResponse.json();
    console.log('✅ Worker版本创建成功');
    console.log('📊 版本ID:', versionResult.result?.id);
    
    // 2. 部署Worker版本
    console.log('\n📊 2. 部署Worker版本...');
    
    const deployUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/workers/scripts/${WORKER_NAME}/deployments`;
    
    const deployResponse = await fetch(deployUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version_id: versionResult.result?.id
      })
    });
    
    if (!deployResponse.ok) {
      const errorText = await deployResponse.text();
      console.log('❌ 部署失败:', errorText);
      return;
    }
    
    const deployResult = await deployResponse.json();
    console.log('✅ Worker部署成功！');
    console.log('📊 部署结果:', deployResult);
    
    console.log('\n🎉 Workers部署完成！');
    console.log('🌐 Worker URL: https://novamail-api.lihongyangnju.workers.dev');
    console.log('📋 包含功能:');
    console.log('   - 验证码发送 (Resend API)');
    console.log('   - 用户注册和登录');
    console.log('   - 活动发送');
    console.log('   - AI生成邮件');
    console.log('   - 管理员API (设置用户会员)');
    
    console.log('\n🚀 下一步:');
    console.log('   1. 测试管理员API: /api/admin/set-premium');
    console.log('   2. 验证用户会员功能');
    console.log('   3. 测试所有API端点');
    
  } catch (error) {
    console.error('❌ 部署失败:', error.message);
  }
}

deployWorkerViaAPI();
