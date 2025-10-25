#!/usr/bin/env node

/**
 * 修复Resend API配置问题
 * 专注解决Resend API的邮件投递问题
 */

console.log('🔧 修复Resend API配置问题\n');

async function fixResendAPIConfig() {
  try {
    const RESEND_API_KEY = "re_C2KHNFp4_tdC2FzoZ8pYNQiKwKbMuuyRX";
    
    // 1. 检查Resend API密钥权限
    console.log('📊 1. 检查Resend API密钥权限...');
    
    const apiKeyResponse = await fetch('https://api.resend.com/api-keys', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (apiKeyResponse.ok) {
      const apiKeys = await apiKeyResponse.json();
      console.log('✅ API密钥有效');
      console.log('📋 API密钥信息:', apiKeys);
    } else {
      console.log('❌ API密钥无效或权限不足');
    }
    
    // 2. 检查域名详细配置
    console.log('\n📊 2. 检查域名详细配置...');
    
    const domainResponse = await fetch('https://api.resend.com/domains', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (domainResponse.ok) {
      const domains = await domainResponse.json();
      
      if (domains.data && domains.data.length > 0) {
        const domain = domains.data[0];
        console.log('📧 域名详情:');
        console.log('   - 域名:', domain.name);
        console.log('   - 状态:', domain.status);
        console.log('   - 能力:', domain.capability);
        console.log('   - 创建时间:', domain.created_at);
        console.log('   - 区域:', domain.region);
        
        // 获取域名记录
        const recordsResponse = await fetch(`https://api.resend.com/domains/${domain.id}/records`, {
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`
          }
        });
        
        if (recordsResponse.ok) {
          const records = await recordsResponse.json();
          console.log('📋 DNS记录:');
          
          if (records.data && records.data.length > 0) {
            records.data.forEach(record => {
              console.log(`   - ${record.type}: ${record.name} = ${record.value}`);
              console.log(`     状态: ${record.status || '未知'}`);
            });
          } else {
            console.log('❌ 没有找到DNS记录！');
            console.log('💡 这可能是邮件无法投递的主要原因！');
          }
        }
      }
    }
    
    // 3. 测试不同的邮件发送方式
    console.log('\n📤 3. 测试不同的邮件发送方式...');
    
    const testCases = [
      {
        name: "标准发送方式",
        config: {
          from: 'noreply@novamail.world',
          to: 'test@example.com',
          subject: 'Standard Test',
          html: '<p>Standard test email</p>',
          text: 'Standard test email'
        }
      },
      {
        name: "带回复地址",
        config: {
          from: 'NovaMail <noreply@novamail.world>',
          to: 'test@example.com',
          subject: 'Reply Test',
          html: '<p>Reply test email</p>',
          text: 'Reply test email',
          reply_to: 'support@novamail.world'
        }
      },
      {
        name: "带标签",
        config: {
          from: 'noreply@novamail.world',
          to: 'test@example.com',
          subject: 'Tagged Test',
          html: '<p>Tagged test email</p>',
          text: 'Tagged test email',
          tags: [{ name: 'verification', value: 'test' }]
        }
      }
    ];
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      console.log(`📤 测试 ${i + 1}/${testCases.length}: ${testCase.name}`);
      
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testCase.config)
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log(`✅ ${testCase.name} - 发送成功: ${result.id}`);
          
          // 检查邮件状态
          setTimeout(async () => {
            try {
              const statusResponse = await fetch(`https://api.resend.com/emails/${result.id}`, {
                headers: {
                  'Authorization': `Bearer ${RESEND_API_KEY}`
                }
              });
              
              if (statusResponse.ok) {
                const statusResult = await statusResponse.json();
                console.log(`   📊 ${testCase.name} 状态: ${statusResult.last_event}`);
                console.log(`   📅 发送时间: ${statusResult.sent_at || '未发送'}`);
                console.log(`   📬 投递时间: ${statusResult.delivered_at || '未投递'}`);
              }
            } catch (error) {
              console.log(`   ❌ 状态检查失败: ${error.message}`);
            }
          }, 3000);
          
        } else {
          const errorText = await response.text();
          console.log(`❌ ${testCase.name} - 发送失败: ${errorText}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.log(`❌ ${testCase.name} - 网络错误: ${error.message}`);
      }
    }
    
    // 4. 检查Resend账户限制
    console.log('\n📊 4. 检查Resend账户限制...');
    
    const usageResponse = await fetch('https://api.resend.com/emails?limit=1', {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    });
    
    if (usageResponse.ok) {
      const usageData = await usageResponse.json();
      console.log('📋 账户使用情况:');
      console.log('   - 总邮件数:', usageData.data?.length || 0);
      
      if (usageData.data && usageData.data.length > 0) {
        const recentEmail = usageData.data[0];
        console.log('   - 最近邮件状态:', recentEmail.last_event);
        console.log('   - 最近邮件时间:', recentEmail.created_at);
      }
    }
    
    // 5. 问题分析和解决方案
    console.log('\n🔍 5. Resend API问题分析和解决方案...');
    
    console.log('💡 Resend API可能的问题:');
    console.log('   1. DNS记录配置不完整');
    console.log('   2. 域名验证状态问题');
    console.log('   3. API密钥权限不足');
    console.log('   4. 账户限制或配额问题');
    console.log('   5. 邮件内容被过滤');
    
    console.log('\n🚀 Resend API解决方案:');
    console.log('   1. 配置完整的DNS记录（SPF、DKIM、DMARC）');
    console.log('   2. 重新验证域名状态');
    console.log('   3. 检查API密钥权限');
    console.log('   4. 优化邮件内容');
    console.log('   5. 联系Resend技术支持');
    
    // 6. 具体的DNS记录配置
    console.log('\n📋 6. 具体的DNS记录配置:');
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
    
  } catch (error) {
    console.error('❌ Resend API配置检查失败:', error.message);
  }
}

fixResendAPIConfig();
