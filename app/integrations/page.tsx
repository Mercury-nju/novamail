'use client'

import { motion } from 'framer-motion'
import { 
  CheckIcon,
  ArrowRightIcon,
  CogIcon,
  ShieldCheckIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

export default function IntegrationsPage() {
  const integrations = [
    {
      name: 'Gmail',
      description: '使用Gmail SMTP发送邮件',
      icon: '📧',
      status: '已支持',
      features: ['SMTP配置', '安全认证', '发送测试']
    },
    {
      name: 'Outlook',
      description: '集成Microsoft Outlook邮箱',
      icon: '📮',
      status: '已支持',
      features: ['SMTP配置', 'OAuth认证', '批量发送']
    },
    {
      name: 'Yahoo Mail',
      description: '支持Yahoo邮箱服务',
      icon: '📬',
      status: '已支持',
      features: ['SMTP配置', '安全连接', '邮件追踪']
    },
    {
      name: '自定义SMTP',
      description: '配置任何SMTP服务器',
      icon: '⚙️',
      status: '已支持',
      features: ['灵活配置', '多端口支持', 'SSL/TLS加密']
    },
    {
      name: 'Excel导入',
      description: '从Excel文件导入联系人',
      icon: '📊',
      status: '已支持',
      features: ['.xlsx支持', '.xls支持', '批量导入']
    },
    {
      name: 'CSV导入',
      description: 'CSV文件联系人导入',
      icon: '📋',
      status: '已支持',
      features: ['标准格式', '自定义字段', '数据验证']
    }
  ]

  const comingSoon = [
    {
      name: 'Zapier',
      description: '自动化工作流程集成',
      icon: '🔗',
      status: '即将推出'
    },
    {
      name: 'Salesforce',
      description: 'CRM系统集成',
      icon: '☁️',
      status: '即将推出'
    },
    {
      name: 'HubSpot',
      description: '营销自动化平台',
      icon: '🎯',
      status: '即将推出'
    },
    {
      name: 'Mailchimp',
      description: '邮件营销平台同步',
      icon: '📈',
      status: '即将推出'
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
              <h1 className="text-3xl font-bold text-gray-900">集成服务</h1>
              <p className="text-gray-600 mt-2">连接您喜爱的工具和服务</p>
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
              强大的集成
              <span className="block text-yellow-300">无缝连接</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              与您现有的工具和服务无缝集成，提升工作效率
            </p>
          </motion.div>

          {/* Integration Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white mb-2">6+</div>
              <div className="text-blue-200">已支持集成</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white mb-2">4+</div>
              <div className="text-blue-200">即将推出</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-200">安全可靠</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Available Integrations */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">已支持的集成</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              立即开始使用这些集成，提升您的邮件营销效率
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{integration.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{integration.name}</h4>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckIcon className="w-3 h-3 mr-1" />
                      {integration.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {integration.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {integration.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  立即使用
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">即将推出</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们正在开发更多集成，敬请期待
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {comingSoon.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center"
              >
                <div className="text-4xl mb-4">{integration.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{integration.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {integration.status}
                </span>
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
              需要其他集成？
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              告诉我们您需要的集成，我们会优先开发
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CogIcon className="w-5 h-5 mr-2" />
                请求集成
              </motion.a>
              <motion.a
                href="/dashboard/settings"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShieldCheckIcon className="w-5 h-5 mr-2" />
                配置设置
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
