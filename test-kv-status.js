/**
 * 直接测试 Cloudflare KV 配置状态
 * 运行此脚本来检查 KV binding 是否正常工作
 */

async function testKVStatus() {
  console.log('=== Testing Cloudflare KV Status ===\n');
  
  try {
    // 测试 KV status API
    const response = await fetch('/api/kv-status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    console.log('✅ KV Status API Response:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.success && result.kv_status) {
      const kv = result.kv_status;
      
      console.log('\n=== KV Binding Status ===');
      console.log(`Available: ${kv.available ? '✅' : '❌'}`);
      console.log(`Readable: ${kv.readable ? '✅' : '❌'}`);
      console.log(`Writable: ${kv.writable ? '✅' : '❌'}`);
      
      if (kv.error) {
        console.log(`Error: ❌ ${kv.error}`);
      }
      
      console.log('\n=== Environment Info ===');
      console.log(`Environment available: ${result.environment_info.has_env ? '✅' : '❌'}`);
      console.log(`Environment keys: ${result.environment_info.env_keys.join(', ')}`);
      console.log(`USERS_KV type: ${result.environment_info.users_kv_type}`);
      
      if (kv.available && kv.readable && kv.writable) {
        console.log('\n🎉 KV binding is working correctly!');
        console.log('Export functionality should work properly.');
      } else {
        console.log('\n⚠️ KV binding has issues:');
        if (!kv.available) {
          console.log('- USERS_KV binding not found in Cloudflare Dashboard');
          console.log('- Need to manually configure KV binding in Pages settings');
        }
        if (!kv.readable || !kv.writable) {
          console.log('- KV operations failed, check Cloudflare Dashboard configuration');
        }
      }
    } else {
      console.log('❌ KV Status API failed:', result.error || 'Unknown error');
    }
    
  } catch (error) {
    console.error('❌ Failed to test KV status:', error.message);
    console.log('\nPossible causes:');
    console.log('1. API endpoint not deployed yet');
    console.log('2. Network connectivity issues');
    console.log('3. Cloudflare Pages Functions not working');
  }
}

// 如果在浏览器环境中运行
if (typeof window !== 'undefined') {
  window.testKVStatus = testKVStatus;
  console.log('KV status test ready. Run: testKVStatus()');
} else {
  // 在 Node.js 环境中运行
  console.log('This script needs to run in a browser environment.');
  console.log('Please open the website and run testKVStatus() in the console.');
}

// 自动运行测试（如果在浏览器中）
if (typeof window !== 'undefined' && window.location) {
  console.log('Auto-running KV status test...');
  testKVStatus();
}
