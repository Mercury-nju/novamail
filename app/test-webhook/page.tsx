'use client'

import { useState } from 'react'

export default function WebhookTestPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testWebhook = async () => {
    setLoading(true)
    try {
      // 模拟Creem Webhook事件
      const testEvent = {
        type: 'subscription.created',
        data: {
          id: 'test_subscription_123',
          customer: {
            id: 'test_customer_456',
            email: 'test@novamail.com',
            name: 'Test User'
          },
          plan: {
            id: 'pro-monthly',
            name: 'Pro',
            price: 19,
            currency: 'usd',
            interval: 'month'
          },
          status: 'active',
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      }

      const response = await fetch('https://novamail-api.zhuanz.workers.dev/api/creem/webhook-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'creem-signature': 'test-signature'
        },
        body: JSON.stringify(testEvent)
      })

      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  const testAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://novamail-api.zhuanz.workers.dev/api/creem/test')
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">🧪 Creem Webhook测试工具</h1>
          
          <div className="space-y-6">
            {/* 测试按钮 */}
            <div className="flex space-x-4">
              <button
                onClick={testAPI}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? '测试中...' : '🔗 测试API连接'}
              </button>
              
              <button
                onClick={testWebhook}
                disabled={loading}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? '测试中...' : '📡 测试Webhook接收'}
              </button>
            </div>

            {/* 测试结果 */}
            {testResult && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">测试结果</h2>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
            )}

            {/* 配置信息 */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-4">📋 配置信息</h2>
              <div className="space-y-2 text-sm">
                <div><strong>API密钥:</strong> creem_22oMcuzUH4TeWyWVAVjTes</div>
                <div><strong>Webhook密钥:</strong> whsec_5uvCq8f1gQMsqz5rqwdVgZ</div>
                <div><strong>API基础URL:</strong> https://api.creem.com/v1</div>
                <div><strong>Webhook测试URL:</strong> /api/creem/webhook-test</div>
                <div><strong>Webhook生产URL:</strong> /api/creem/webhook</div>
              </div>
            </div>

            {/* 测试步骤 */}
            <div className="bg-yellow-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-yellow-900 mb-4">🚀 测试步骤</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-800">
                <li>点击"测试API连接"按钮验证Creem API连接</li>
                <li>点击"测试Webhook接收"按钮模拟Webhook事件</li>
                <li>在Creem控制台配置Webhook URL: <code className="bg-yellow-200 px-1 rounded">https://your-domain.com/api/creem/webhook</code></li>
                <li>在Creem控制台发送测试Webhook事件</li>
                <li>检查服务器日志查看详细信息</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
