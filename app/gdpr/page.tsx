'use client'

import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon,
  DocumentTextIcon,
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function GDPRPage() {
  const rights = [
    {
      icon: EyeIcon,
      title: '知情权',
      description: '了解我们如何收集、使用和保护您的个人数据',
      details: [
        '数据收集目的',
        '数据处理方式',
        '数据保留期限',
        '第三方共享情况'
      ]
    },
    {
      icon: PencilIcon,
      title: '更正权',
      description: '要求更正不准确或不完整的个人数据',
      details: [
        '更新个人信息',
        '修正错误数据',
        '补充缺失信息',
        '验证数据准确性'
      ]
    },
    {
      icon: TrashIcon,
      title: '删除权',
      description: '要求删除您的个人数据（被遗忘权）',
      details: [
        '删除账户数据',
        '清除历史记录',
        '移除营销信息',
        '停止数据处理'
      ]
    },
    {
      icon: LockClosedIcon,
      title: '限制处理权',
      description: '限制我们处理您个人数据的方式',
      details: [
        '暂停数据处理',
        '限制特定用途',
        '保留数据但限制使用',
        '等待争议解决'
      ]
    },
    {
      icon: DocumentTextIcon,
      title: '数据可携权',
      description: '以结构化格式获取您的个人数据',
      details: [
        '导出个人数据',
        '机器可读格式',
        '传输到其他服务',
        '数据格式转换'
      ]
    },
    {
      icon: UserIcon,
      title: '反对权',
      description: '反对基于合法利益的数据处理',
      details: [
        '反对营销处理',
        '反对分析处理',
        '反对自动化决策',
        '基于特殊情况反对'
      ]
    }
  ]

  const dataTypes = [
    {
      category: '身份信息',
      examples: ['姓名', '邮箱地址', '电话号码', '用户ID'],
      purpose: '用户识别和账户管理',
      legalBasis: '合同履行'
    },
    {
      category: '使用数据',
      examples: ['登录记录', '页面访问', '功能使用', '设备信息'],
      purpose: '服务改进和用户体验优化',
      legalBasis: '合法利益'
    },
    {
      category: '营销数据',
      examples: ['偏好设置', '兴趣标签', '行为分析', '反馈信息'],
      purpose: '个性化服务和营销活动',
      legalBasis: '同意'
    },
    {
      category: '技术数据',
      examples: ['IP地址', '浏览器信息', '操作系统', 'Cookie数据'],
      purpose: '网站功能和安全保障',
      legalBasis: '合法利益'
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
              <h1 className="text-3xl font-bold text-gray-900">GDPR 合规</h1>
              <p className="text-gray-600 mt-2">数据保护法规合规信息</p>
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
              GDPR 合规
              <span className="block text-yellow-300">数据保护承诺</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              我们严格遵守GDPR法规，保护您的个人数据权利和隐私
            </p>
          </motion.div>
        </div>
      </div>

      {/* What is GDPR */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">什么是GDPR？</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              通用数据保护条例（GDPR）是欧盟的数据保护法规，旨在保护个人数据权利
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">GDPR核心原则</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-600">数据最小化：只收集必要的数据</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-600">目的限制：数据仅用于明确目的</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-600">存储限制：数据保留时间合理</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-600">准确性：确保数据准确和最新</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">您的权利</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-600">知情权：了解数据处理情况</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-600">访问权：获取您的个人数据</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-600">更正权：修正不准确数据</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-600">删除权：要求删除数据</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Rights */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">您的数据权利</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              GDPR赋予您多项数据保护权利，我们全力支持您行使这些权利
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rights.map((right, index) => (
              <motion.div
                key={right.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                  <right.icon className="w-8 h-8 text-primary-600" />
                </div>
                
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {right.title}
                </h4>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {right.description}
                </p>

                <ul className="space-y-2">
                  {right.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Types */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">我们收集的数据</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              透明地说明我们收集的数据类型及其用途
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dataTypes.map((dataType, index) => (
              <motion.div
                key={dataType.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
              >
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {dataType.category}
                </h4>
                
                <div className="mb-6">
                  <h5 className="text-lg font-medium text-gray-900 mb-2">数据示例：</h5>
                  <div className="flex flex-wrap gap-2">
                    {dataType.examples.map((example, exampleIndex) => (
                      <span
                        key={exampleIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-900">用途：</span>
                    <span className="text-sm text-gray-600 ml-2">{dataType.purpose}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">法律依据：</span>
                    <span className="text-sm text-gray-600 ml-2">{dataType.legalBasis}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Exercise Rights */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">如何行使您的权利</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              简单快捷的方式行使您的数据保护权利
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">在线行使权利</h4>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <UserIcon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">账户设置</h5>
                    <p className="text-sm text-gray-600">在账户设置中管理您的数据</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <DocumentTextIcon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">数据导出</h5>
                    <p className="text-sm text-gray-600">下载您的个人数据</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <TrashIcon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">删除账户</h5>
                    <p className="text-sm text-gray-600">永久删除您的账户和数据</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">联系我们</h4>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">邮箱联系</h5>
                  <p className="text-sm text-gray-600 mb-2">发送邮件至：contact@novamail.com</p>
                  <p className="text-xs text-gray-500">我们将在30天内回复您的请求</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">身份验证</h5>
                  <p className="text-sm text-gray-600">为了保护您的隐私，我们可能需要验证您的身份</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">免费服务</h5>
                  <p className="text-sm text-gray-600">行使GDPR权利完全免费</p>
                </div>
              </div>
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
                需要帮助行使您的权利？
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                我们的数据保护团队随时为您提供帮助和支持
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  联系数据保护官
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </motion.a>
                <motion.a
                  href="/privacy"
                  className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  查看隐私政策
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
