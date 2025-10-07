// 简单的Creem API测试页面
export default function CreemTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">🧪 Creem 付费功能测试</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-4">📋 Creem配置信息</h2>
              <div className="space-y-2 text-sm">
                <div><strong>API密钥:</strong> creem_22oMcuzUH4TeWyWVAVjTes</div>
                <div><strong>Webhook密钥:</strong> whsec_5uvCq8f1gQMsqz5rqwdVgZ</div>
                <div><strong>API基础URL:</strong> https://api.creem.com/v1</div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-green-900 mb-4">✅ 测试页面已加载</h2>
              <p className="text-green-800">Creem付费功能测试页面正常工作！</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-yellow-900 mb-4">🚀 测试步骤</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-800">
                <li>在Creem控制台配置Webhook URL</li>
                <li>发送测试Webhook事件</li>
                <li>检查服务器日志查看详细信息</li>
              </ol>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">🔗 直接测试链接</h2>
              <div className="space-y-2">
                <a 
                  href="https://novamail-api.lihongyangnju.workers.dev/api/creem/test" 
                  target="_blank"
                  className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  🔗 测试Creem API连接
                </a>
                <a 
                  href="https://novamail-api.lihongyangnju.workers.dev/api/creem/webhook-test" 
                  target="_blank"
                  className="block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  📡 测试Webhook接收
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}