'use client'

import { motion } from 'framer-motion'
import { 
  CodeBracketIcon,
  DocumentTextIcon,
  PlayIcon,
  ArrowRightIcon,
  CheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function APIDocsPage() {
  const apiEndpoints = [
    {
      method: 'POST',
      path: '/api/campaigns',
      description: '创建新的邮件活动',
      parameters: [
        { name: 'name', type: 'string', required: true, description: '活动名称' },
        { name: 'subject', type: 'string', required: true, description: '邮件主题' },
        { name: 'body', type: 'string', required: true, description: '邮件内容' },
        { name: 'recipients', type: 'array', required: true, description: '收件人列表' }
      ],
      example: {
        request: `{
  "name": "新产品推广",
  "subject": "限时优惠，立即抢购！",
  "body": "<h1>新产品上线</h1><p>限时优惠...</p>",
  "recipients": ["user@example.com"]
}`,
        response: `{
  "success": true,
  "campaignId": "camp_123456",
  "message": "活动创建成功"
}`
      }
    },
    {
      method: 'GET',
      path: '/api/campaigns',
      description: '获取用户的所有邮件活动',
      parameters: [
        { name: 'page', type: 'number', required: false, description: '页码' },
        { name: 'limit', type: 'number', required: false, description: '每页数量' }
      ],
      example: {
        request: `GET /api/campaigns?page=1&limit=10`,
        response: `{
  "success": true,
  "campaigns": [
    {
      "id": "camp_123456",
      "name": "新产品推广",
      "status": "sent",
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ],
  "total": 1
}`
      }
    },
    {
      method: 'POST',
      path: '/api/contacts',
      description: '添加新的联系人',
      parameters: [
        { name: 'firstName', type: 'string', required: true, description: '名字' },
        { name: 'lastName', type: 'string', required: true, description: '姓氏' },
        { name: 'email', type: 'string', required: true, description: '邮箱地址' },
        { name: 'userSegment', type: 'string', required: false, description: '用户分组' }
      ],
      example: {
        request: `{
  "firstName": "张",
  "lastName": "三",
  "email": "zhangsan@example.com",
  "userSegment": "VIP客户"
}`,
        response: `{
  "success": true,
  "contactId": "contact_123456",
  "message": "联系人添加成功"
}`
      }
    }
  ]

  const codeExamples = [
    {
      language: 'JavaScript',
      title: '使用 fetch API',
      code: `// 创建邮件活动
const response = await fetch('/api/campaigns', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: '新产品推广',
    subject: '限时优惠，立即抢购！',
    body: '<h1>新产品上线</h1><p>限时优惠...</p>',
    recipients: ['user@example.com']
  })
});

const result = await response.json();
console.log(result);`
    },
    {
      language: 'Python',
      title: '使用 requests 库',
      code: `import requests

# 创建邮件活动
url = 'https://your-domain.com/api/campaigns'
data = {
    'name': '新产品推广',
    'subject': '限时优惠，立即抢购！',
    'body': '<h1>新产品上线</h1><p>限时优惠...</p>',
    'recipients': ['user@example.com']
}

response = requests.post(url, json=data)
result = response.json()
print(result)`
    },
    {
      language: 'cURL',
      title: '使用命令行',
      code: `curl -X POST https://your-domain.com/api/campaigns \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "新产品推广",
    "subject": "限时优惠，立即抢购！",
    "body": "<h1>新产品上线</h1><p>限时优惠...</p>",
    "recipients": ["user@example.com"]
  }'`
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900">API 文档</h1>
              <p className="text-gray-600 mt-2">开发者接口文档和示例</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              API 文档
              <span className="block text-yellow-300">开发者友好</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              完整的API接口文档，支持多种编程语言，快速集成NovaMail功能
            </p>
          </motion.div>

          {/* API Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white mb-2">RESTful</div>
              <div className="text-blue-200">API 设计</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white mb-2">JSON</div>
              <div className="text-blue-200">数据格式</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-200">技术支持</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">API 接口</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              完整的RESTful API接口，支持所有核心功能
            </p>
          </motion.div>

          <div className="space-y-8">
            {apiEndpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.path}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
              >
                {/* Endpoint Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      endpoint.method === 'POST' ? 'bg-green-100 text-green-800' :
                      endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-lg font-mono text-gray-900">{endpoint.path}</code>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{endpoint.description}</p>

                {/* Parameters */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">参数</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-4">参数名</th>
                          <th className="text-left py-2 px-4">类型</th>
                          <th className="text-left py-2 px-4">必需</th>
                          <th className="text-left py-2 px-4">描述</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.parameters.map((param, paramIndex) => (
                          <tr key={paramIndex} className="border-b border-gray-100">
                            <td className="py-2 px-4 font-mono text-primary-600">{param.name}</td>
                            <td className="py-2 px-4 text-gray-600">{param.type}</td>
                            <td className="py-2 px-4">
                              {param.required ? (
                                <span className="text-red-600">是</span>
                              ) : (
                                <span className="text-gray-500">否</span>
                              )}
                            </td>
                            <td className="py-2 px-4 text-gray-600">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Example */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">请求示例</h4>
                    <pre className="bg-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
                      <code>{endpoint.example.request}</code>
                    </pre>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">响应示例</h4>
                    <pre className="bg-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
                      <code>{endpoint.example.response}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">代码示例</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              多种编程语言的代码示例，快速开始集成
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {codeExamples.map((example, index) => (
              <motion.div
                key={example.language}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <CodeBracketIcon className="w-6 h-6 text-primary-600 mr-3" />
                  <h4 className="text-lg font-semibold text-gray-900">{example.language}</h4>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">{example.title}</p>
                
                <pre className="bg-gray-100 rounded-lg p-4 text-xs overflow-x-auto">
                  <code>{example.code}</code>
                </pre>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              开始使用 API
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              立即开始集成NovaMail API，提升您的应用功能
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/dashboard/settings"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                获取API密钥
              </motion.a>
              <motion.a
                href="/contact"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                技术支持
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
