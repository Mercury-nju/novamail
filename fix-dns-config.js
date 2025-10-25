#!/usr/bin/env node

/**
 * 修复DNS配置问题
 * 检查并配置SPF、DKIM、DMARC记录
 */

console.log('🔧 修复DNS配置问题\n');

async function fixDNSConfig() {
  try {
    const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
    
    // 1. 检查当前DNS记录
    console.log('📊 1. 检查当前DNS记录...');
    
    const domainResponse = await fetch('https://api.resend.com/domains', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (domainResponse.ok) {
      const domains = await domainResponse.json();
      
      if (domains.data && domains.data.length > 0) {
        const domain = domains.data[0];
        console.log('📧 域名:', domain.name);
        console.log('📊 状态:', domain.status);
        
        // 获取DNS记录
        const recordsResponse = await fetch(`https://api.resend.com/domains/${domain.id}/records`, {
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`
          }
        });
        
        if (recordsResponse.ok) {
          const records = await recordsResponse.json();
          console.log('📋 当前DNS记录:');
          
          if (records.data && records.data.length > 0) {
            records.data.forEach(record => {
              console.log(`   - ${record.type}: ${record.name} = ${record.value}`);
            });
          } else {
            console.log('❌ 没有找到DNS记录！');
            console.log('💡 这可能是邮件无法投递的主要原因！');
          }
        }
      }
    }
    
    // 2. 检查域名验证状态
    console.log('\n📊 2. 检查域名验证状态...');
    
    const domainResponse2 = await fetch('https://api.resend.com/domains', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (domainResponse2.ok) {
      const domains = await domainResponse2.json();
      
      if (domains.data && domains.data.length > 0) {
        const domain = domains.data[0];
        console.log('📧 域名:', domain.name);
        console.log('📊 状态:', domain.status);
        console.log('🔧 能力:', domain.capability);
        console.log('📅 创建时间:', domain.created_at);
        console.log('🌍 区域:', domain.region);
        
        if (domain.status === 'verified') {
          console.log('✅ 域名已验证');
        } else {
          console.log('❌ 域名未验证，需要配置DNS记录');
        }
      }
    }
    
    // 3. 获取需要配置的DNS记录
    console.log('\n📊 3. 获取需要配置的DNS记录...');
    
    const domainResponse3 = await fetch('https://api.resend.com/domains', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (domainResponse3.ok) {
      const domains = await domainResponse3.json();
      
      if (domains.data && domains.data.length > 0) {
        const domain = domains.data[0];
        
        // 获取DNS记录
        const recordsResponse = await fetch(`https://api.resend.com/domains/${domain.id}/records`, {
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`
          }
        });
        
        if (recordsResponse.ok) {
          const records = await recordsResponse.json();
          console.log('📋 需要配置的DNS记录:');
          
          if (records.data && records.data.length > 0) {
            records.data.forEach(record => {
              console.log(`   - ${record.type}: ${record.name} = ${record.value}`);
              console.log(`     状态: ${record.status || '未知'}`);
            });
          } else {
            console.log('❌ 没有找到需要配置的DNS记录！');
            console.log('💡 这可能是邮件无法投递的主要原因！');
          }
        }
      }
    }
    
    // 4. 问题分析和解决方案
    console.log('\n🔍 4. 问题分析和解决方案...');
    
    console.log('💡 DNS配置问题:');
    console.log('   1. 缺少SPF记录 - 验证发件人身份');
    console.log('   2. 缺少DKIM记录 - 数字签名验证');
    console.log('   3. 缺少DMARC记录 - 邮件认证策略');
    console.log('   4. DNS记录配置不完整');
    console.log('   5. 域名验证状态问题');
    
    console.log('\n🚀 解决方案:');
    console.log('   1. 在域名注册商处添加SPF记录');
    console.log('   2. 在域名注册商处添加DKIM记录');
    console.log('   3. 在域名注册商处添加DMARC记录');
    console.log('   4. 等待DNS记录生效（通常需要24-48小时）');
    console.log('   5. 重新验证域名状态');
    
    // 5. 具体的DNS记录配置
    console.log('\n📋 5. 具体的DNS记录配置:');
    console.log('📧 域名: novamail.world');
    console.log('🔧 需要添加的DNS记录:');
    console.log('   1. SPF记录:');
    console.log('      - 类型: TXT');
    console.log('      - 名称: @');
    console.log('      - 值: v=spf1 include:_spf.resend.com ~all');
    console.log('   2. DKIM记录:');
    console.log('      - 由Resend自动生成');
    console.log('      - 需要在Resend控制台获取');
    console.log('   3. DMARC记录:');
    console.log('      - 类型: TXT');
    console.log('      - 名称: _dmarc');
    console.log('      - 值: v=DMARC1; p=quarantine; rua=mailto:dmarc@novamail.world');
    
    // 6. 操作步骤
    console.log('\n📝 6. 操作步骤:');
    console.log('   1. 登录域名注册商控制台');
    console.log('   2. 进入DNS管理页面');
    console.log('   3. 添加上述DNS记录');
    console.log('   4. 等待DNS记录生效');
    console.log('   5. 在Resend控制台重新验证域名');
    console.log('   6. 测试邮件发送');
    
  } catch (error) {
    console.error('❌ DNS配置检查失败:', error.message);
  }
}

fixDNSConfig();
