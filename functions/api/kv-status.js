/**
 * KV Status Check API
 * 检查 Cloudflare KV binding 是否正常工作
 */

export async function onRequestGet({ request, env }) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    console.log('=== KV Status Check ===');
    console.log('env.USERS_KV available:', !!env.USERS_KV);
    console.log('env.USERS_KV type:', typeof env.USERS_KV);
    
    // Test KV operations
    const testKey = 'kv_test_' + Date.now();
    const testValue = JSON.stringify({ 
      test: true, 
      timestamp: new Date().toISOString(),
      message: 'KV binding is working'
    });

    let kvStatus = {
      available: false,
      readable: false,
      writable: false,
      error: null
    };

    if (env.USERS_KV) {
      kvStatus.available = true;
      
      try {
        // Test write operation
        await env.USERS_KV.put(testKey, testValue);
        console.log('KV write test: SUCCESS');
        kvStatus.writable = true;
        
        // Test read operation
        const retrievedValue = await env.USERS_KV.get(testKey);
        if (retrievedValue) {
          console.log('KV read test: SUCCESS');
          kvStatus.readable = true;
          
          // Clean up test data
          await env.USERS_KV.delete(testKey);
          console.log('KV cleanup: SUCCESS');
        } else {
          console.log('KV read test: FAILED - No data retrieved');
        }
      } catch (kvError) {
        console.error('KV operation error:', kvError);
        kvStatus.error = kvError.message;
      }
    } else {
      console.log('KV binding: NOT AVAILABLE');
      kvStatus.error = 'USERS_KV binding not found in environment';
    }

    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      kv_status: kvStatus,
      environment_info: {
        has_env: !!env,
        env_keys: env ? Object.keys(env) : [],
        users_kv_type: typeof env?.USERS_KV
      },
      message: kvStatus.available && kvStatus.readable && kvStatus.writable 
        ? 'KV binding is working correctly' 
        : 'KV binding has issues - check Cloudflare Dashboard configuration'
    };

    console.log('KV Status Check Result:', response);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('KV Status Check Error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      message: 'Failed to check KV status'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}
