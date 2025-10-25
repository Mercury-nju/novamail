#!/usr/bin/env node

/**
 * 清理所有用户信息 - 重新开始
 * 删除Cloudflare KV存储中的所有用户数据
 */

console.log('🗑️ 清理所有用户信息 - 重新开始\n');

async function clearAllUsers() {
  try {
    const API_TOKEN = "bNFX_SuAB89BOLb30GTmttQe_FTDDGUkG7PIrt20";
    const ACCOUNT_ID = "8b0131a99f0fbfe479670ecaef6b4448";
    const NAMESPACE_ID = "41bca314c98c4db580f450fb2e2c37bd"; // USERS_KV
    
    console.log('🔧 清理配置:');
    console.log('   - 账户ID:', ACCOUNT_ID);
    console.log('   - 命名空间ID:', NAMESPACE_ID);
    console.log('   - API Token:', API_TOKEN.substring(0, 10) + '...');
    
    // 1. 获取所有KV键值对
    console.log('\n📊 1. 获取所有KV键值对...');
    
    const listUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}/keys`;
    
    const listResponse = await fetch(listUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });
    
    if (!listResponse.ok) {
      const errorText = await listResponse.text();
      console.log('❌ 获取KV键值对失败:', errorText);
      return;
    }
    
    const listResult = await listResponse.json();
    const keys = listResult.result || [];
    
    console.log('✅ 找到', keys.length, '个KV键值对');
    
    if (keys.length === 0) {
      console.log('🎉 KV存储已经是空的，无需清理！');
      return;
    }
    
    // 2. 显示要删除的键值对
    console.log('\n📋 2. 要删除的键值对:');
    keys.forEach((key, index) => {
      console.log(`   ${index + 1}. ${key.name}`);
    });
    
    // 3. 批量删除所有键值对
    console.log('\n🗑️ 3. 开始删除所有键值对...');
    
    let deletedCount = 0;
    let errorCount = 0;
    
    for (const key of keys) {
      try {
        const deleteUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}/values/${key.name}`;
        
        const deleteResponse = await fetch(deleteUrl, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          }
        });
        
        if (deleteResponse.ok) {
          deletedCount++;
          console.log(`   ✅ 已删除: ${key.name}`);
        } else {
          errorCount++;
          console.log(`   ❌ 删除失败: ${key.name}`);
        }
      } catch (error) {
        errorCount++;
        console.log(`   ❌ 删除错误: ${key.name} - ${error.message}`);
      }
    }
    
    // 4. 显示清理结果
    console.log('\n📊 4. 清理结果:');
    console.log('   - 成功删除:', deletedCount, '个键值对');
    console.log('   - 删除失败:', errorCount, '个键值对');
    console.log('   - 总计处理:', keys.length, '个键值对');
    
    if (deletedCount > 0) {
      console.log('\n🎉 用户信息清理完成！');
      console.log('📋 清理内容:');
      console.log('   - 所有用户账户数据');
      console.log('   - 所有验证码数据');
      console.log('   - 所有用户会话数据');
      console.log('   - 所有用户配置数据');
      
      console.log('\n🚀 现在可以重新开始:');
      console.log('   1. 用户可以重新注册');
      console.log('   2. 所有数据都是全新的');
      console.log('   3. 系统状态已重置');
      console.log('   4. 可以重新设置用户会员');
    }
    
    if (errorCount > 0) {
      console.log('\n⚠️ 部分数据删除失败，请检查API权限');
    }
    
  } catch (error) {
    console.error('❌ 清理失败:', error.message);
  }
}

clearAllUsers();
