'use client'

import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon,
  InformationCircleIcon,
  CogIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function CookiePage() {
  const cookieTypes = [
    {
      name: '必要Cookie',
      description: '这些Cookie对于网站的基本功能是必需的，无法禁用',
      examples: [
        '用户登录状态',
        '购物车信息',
        '安全验证',
        '语言设置'
      ],
      required: true
    },
    {
      name: '功能Cookie',
      description: '这些Cookie提供增强的功能和个性化体验',
      examples: [
        '用户偏好设置',
        '主题选择',
        '字体大小',
        '界面布局'
      ],
      required: false
    },
    {
      name: '分析Cookie',
      description: '这些Cookie帮助我们了解网站的使用情况',
      examples: [
        '页面访问统计',
        '用户行为分析',
        '性能监控',
        '错误追踪'
      ],
      required: false
    },
    {
      name: '营销Cookie',
      description: '这些Cookie用于个性化广告和营销内容',
      examples: [
        '广告个性化',
        '营销活动追踪',
        '用户兴趣分析',
        '推荐内容'
      ],
      required: false
    }
  ]

  const cookieDetails = [
    {
      name: '_session',
      purpose: '用户会话管理',
      duration: '会话期间',
      type: '必要Cookie'
    },
    {
      name: '_auth',
      purpose: '用户认证状态',
      duration: '30天',
      type: '必要Cookie'
    },
    {
      name: '_preferences',
      purpose: '用户偏好设置',
      duration: '1年',
      type: '功能Cookie'
    },
    {
      name: '_analytics',
      purpose: '网站使用分析',
      duration: '2年',
      type: '分析Cookie'
    },
    {
      name: '_marketing',
      purpose: '营销内容个性化',
      duration: '1年',
      type: '营销Cookie'
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
              <h1 className="text-3xl font-bold text-gray-900">Cookie 政策</h1>
              <p className="text-gray-600 mt-2">了解我们如何使用Cookie</p>
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
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <ShieldCheckIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Cookie 政策
              <span className="block text-yellow-300">透明使用</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              我们承诺透明地使用Cookie，保护您的隐私和数据安全
            </p>
          </motion.div>
        </div>
      </div>

      {/* What are Cookies */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">什么是Cookie？</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cookie是存储在您设备上的小型文本文件，用于改善您的网站体验
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Cookie的作用</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-600">记住您的登录状态</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-600">保存您的偏好设置</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-600">提供个性化内容</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-600">分析网站使用情况</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Cookie的类型</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">必要Cookie</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">功能Cookie</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">分析Cookie</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">营销Cookie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Types */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Cookie类型详情</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              详细了解我们使用的各种Cookie类型
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-gray-900">{type.name}</h4>
                  {type.required ? (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      必需
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      可选
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6">{type.description}</p>
                
                <div>
                  <h5 className="text-lg font-medium text-gray-900 mb-3">使用示例：</h5>
                  <ul className="space-y-2">
                    {type.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3"></div>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Cookie Details */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Cookie详情</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们使用的具体Cookie及其用途
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Cookie名称</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">用途</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">持续时间</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">类型</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cookieDetails.map((cookie, index) => (
                    <motion.tr
                      key={cookie.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-mono text-primary-600">{cookie.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{cookie.purpose}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{cookie.duration}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{cookie.type}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Management */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Cookie管理</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              您可以控制和管理Cookie的使用
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center mb-6">
                <CogIcon className="w-8 h-8 text-primary-600 mr-4" />
                <h4 className="text-xl font-semibold text-gray-900">浏览器设置</h4>
              </div>
              <p className="text-gray-600 mb-6">
                您可以通过浏览器设置来控制Cookie的使用
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Chrome：设置 → 隐私和安全 → Cookie</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Firefox：设置 → 隐私与安全 → Cookie</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Safari：偏好设置 → 隐私 → Cookie</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center mb-6">
                <InformationCircleIcon className="w-8 h-8 text-primary-600 mr-4" />
                <h4 className="text-xl font-semibold text-gray-900">重要提醒</h4>
              </div>
              <p className="text-gray-600 mb-6">
                禁用某些Cookie可能影响网站功能
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">禁用必要Cookie将无法正常使用网站</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">禁用功能Cookie将失去个性化体验</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">禁用分析Cookie将影响我们改进服务</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-200 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                对Cookie政策有疑问？
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                如果您对我们的Cookie使用有任何疑问，请随时联系我们
              </p>
              <motion.a
                href="/contact"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                联系我们
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
