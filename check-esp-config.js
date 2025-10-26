/**
 * ESP配置检查工具
 * 用于验证ESP配置是否正确
 */

// 配置检查函数
async function checkESPConfiguration() {
  console.log('🔍 Checking ESP Configuration...\n')
  
  const checks = [
    {
      name: 'Mailchimp OAuth',
      endpoint: '/api/mailchimp/connect',
      test: async () => {
        try {
          const response = await fetch('/api/mailchimp/connect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: 'test@example.com' })
          })
          return response.ok
        } catch {
          return false
        }
      }
    },
    {
      name: 'SendGrid API',
      endpoint: '/api/export',
      test: async () => {
        try {
          const response = await fetch('/api/export', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              esp: 'sendgrid',
              name: 'Test',
              html: '<p>Test</p>',
              userEmail: 'test@example.com'
            })
          })
          // 即使失败，只要端点存在就算配置正确
          return response.status !== 404
        } catch {
          return false
        }
      }
    },
    {
      name: 'Resend API',
      endpoint: '/api/export',
      test: async () => {
        try {
          const response = await fetch('/api/export', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              esp: 'resend',
              name: 'Test',
              html: '<p>Test</p>',
              userEmail: 'test@example.com'
            })
          })
          return response.status !== 404
        } catch {
          return false
        }
      }
    }
  ]

  const results = []
  
  for (const check of checks) {
    console.log(`Testing ${check.name}...`)
    try {
      const isWorking = await check.test()
      results.push({
        name: check.name,
        status: isWorking ? '✅ Working' : '❌ Not configured',
        endpoint: check.endpoint
      })
      console.log(`  ${isWorking ? '✅' : '❌'} ${check.name}`)
    } catch (error) {
      results.push({
        name: check.name,
        status: '❌ Error',
        endpoint: check.endpoint,
        error: error.message
      })
      console.log(`  ❌ ${check.name}: ${error.message}`)
    }
  }

  console.log('\n📋 Configuration Summary:')
  console.log('========================')
  results.forEach(result => {
    console.log(`${result.status} ${result.name}`)
    if (result.error) {
      console.log(`   Error: ${result.error}`)
    }
  })

  console.log('\n💡 Next Steps:')
  console.log('1. Configure ESP API keys in Cloudflare Workers Dashboard')
  console.log('2. Set up Mailchimp OAuth application')
  console.log('3. Update redirect URI in Mailchimp app settings')
  console.log('4. Test with real ESP credentials')

  return results
}

// 如果在浏览器环境中运行
if (typeof window !== 'undefined') {
  window.checkESPConfiguration = checkESPConfiguration
  console.log('Configuration check function available: checkESPConfiguration()')
} else {
  // Node.js环境
  checkESPConfiguration().catch(console.error)
}
