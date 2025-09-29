'use client'

import { motion } from 'framer-motion'
import { 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

export default function StatusPage() {
  const services = [
    {
      name: '邮件发送服务',
      status: 'operational',
      description: 'SMTP邮件发送功能',
      uptime: '99.9%',
      lastIncident: '2024-12-15'
    },
    {
      name: 'AI内容生成',
      status: 'operational',
      description: '智能邮件内容生成',
      uptime: '99.8%',
      lastIncident: '2024-12-10'
    },
    {
      name: '联系人管理',
      status: 'operational',
      description: '联系人数据管理',
      uptime: '99.95%',
      lastIncident: '2024-11-28'
    },
    {
      name: '数据分析',
      status: 'operational',
      description: '邮件发送统计和分析',
      uptime: '99.7%',
      lastIncident: '2024-12-05'
    },
    {
      name: '用户认证',
      status: 'operational',
      description: '用户登录和权限管理',
      uptime: '99.9%',
      lastIncident: '2024-11-20'
    },
    {
      name: '文件上传',
      status: 'operational',
      description: '联系人文件导入功能',
      uptime: '99.6%',
      lastIncident: '2024-12-01'
    }
  ]

  const recentIncidents = [
    {
      date: '2024-12-15',
      title: '邮件发送延迟',
      status: 'resolved',
      description: '部分用户反馈邮件发送存在延迟，已修复',
      duration: '2小时'
    },
    {
      date: '2024-12-10',
      title: 'AI生成服务异常',
      status: 'resolved',
      description: 'AI内容生成服务临时不可用，已恢复正常',
      duration: '1小时'
    },
    {
      date: '2024-12-05',
      title: '数据分析延迟',
      status: 'resolved',
      description: '数据分析报告生成延迟，已优化',
      duration: '30分钟'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'degraded':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
      case 'outage':
        return <XCircleIcon className="w-5 h-5 text-red-500" />
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational':
        return '正常运行'
      case 'degraded':
        return '性能下降'
      case 'outage':
        return '服务中断'
      default:
        return '未知状态'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100'
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100'
      case 'outage':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

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
              <h1 className="text-3xl font-bold text-gray-900">服务状态</h1>
              <p className="text-gray-600 mt-2">实时监控系统运行状态</p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              刷新状态
            </motion.button>
          </div>
        </div>
      </div>

      {/* Overall Status */}
      <div className="py-12 bg-green-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <CheckCircleIcon className="w-12 h-12 text-green-500 mr-4" />
              <h2 className="text-3xl font-bold text-green-800">所有系统正常运行</h2>
            </div>
            <p className="text-lg text-green-700 mb-4">
              所有服务运行正常，没有已知问题
            </p>
            <div className="text-sm text-green-600">
              最后更新：{new Date().toLocaleString('zh-CN')}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Status */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">服务状态</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              实时监控各个服务的运行状态和性能指标
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{service.name}</h4>
                  {getStatusIcon(service.status)}
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">运行时间</span>
                    <span className="text-sm font-medium text-green-600">{service.uptime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">最后事件</span>
                    <span className="text-sm text-gray-600">{service.lastIncident}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                    {getStatusText(service.status)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">最近事件</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              记录最近的服务事件和解决方案
            </p>
          </motion.div>

          <div className="space-y-6">
            {recentIncidents.map((incident, index) => (
              <motion.div
                key={incident.date}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">{incident.title}</h4>
                  </div>
                  <span className="text-sm text-gray-500">{incident.date}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{incident.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">持续时间：{incident.duration}</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    已解决
                  </span>
                </div>
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
              遇到问题？
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              如果发现服务异常，请及时联系我们
            </p>
            <motion.a
              href="/contact"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              报告问题
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
