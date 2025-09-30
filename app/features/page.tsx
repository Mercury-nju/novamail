'use client'

import { motion } from 'framer-motion'
import BackgroundAnimations from '@/components/BackgroundAnimations'
import { 
  EnvelopeIcon, 
  ChartBarIcon, 
  DocumentTextIcon, 
  UserGroupIcon,
  CogIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function FeaturesPage() {
  const features = [
    {
      icon: EnvelopeIcon,
      title: "智能邮件生成",
      description: "基于先进AI技术，自动生成个性化邮件内容，提高营销效果",
      details: [
        "AI智能内容生成",
        "个性化邮件模板",
        "多语言支持",
        "内容优化建议"
      ]
    },
    {
      icon: DocumentTextIcon,
      title: "专业模板库",
      description: "丰富的邮件模板，支持自定义设计，打造品牌专属邮件",
      details: [
        "专业模板",
        "响应式设计",
        "品牌定制",
        "拖拽编辑器"
      ]
    },
    {
      icon: UserGroupIcon,
      title: "联系人管理",
      description: "高效管理联系人，支持分组、标签和批量操作",
      details: [
        "智能分组",
        "批量导入",
        "状态跟踪",
        "数据同步"
      ]
    },
    {
      icon: ChartBarIcon,
      title: "数据分析",
      description: "详细的邮件发送统计，帮助优化营销策略",
      details: [
        "实时统计",
        "打开率分析",
        "点击率追踪",
        "ROI计算"
      ]
    },
    {
      icon: CogIcon,
      title: "SMTP配置",
      description: "支持自定义SMTP设置，使用自己的邮箱发送邮件",
      details: [
        "多邮箱支持",
        "安全认证",
        "发送测试",
        "配置备份"
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: "数据安全",
      description: "企业级安全保障，保护用户数据和隐私",
      details: [
        "数据加密",
        "隐私保护",
        "合规认证",
        "安全审计"
      ]
    }
  ]

  const stats = [
    { number: "10K+", label: "活跃用户" },
    { number: "1M+", label: "邮件发送" },
    { number: "99.9%", label: "送达率" },
    { number: "24/7", label: "技术支持" }
  ]

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <BackgroundAnimations variant="features" particleCount={12} />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900">功能特性</h1>
              <p className="text-gray-600 mt-2">了解NovaMail的强大功能</p>
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
              强大的邮件营销
              <span className="block text-yellow-300">功能套件</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              从智能内容生成到数据分析，NovaMail为您提供完整的邮件营销解决方案
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">核心功能</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              每个功能都经过精心设计，旨在提升您的邮件营销效果
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">{feature.title}</h4>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
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
              准备开始您的邮件营销之旅？
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              立即注册NovaMail，体验强大的邮件营销功能
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/dashboard/campaigns/new"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RocketLaunchIcon className="w-5 h-5 mr-2" />
                立即开始
              </motion.a>
              <motion.a
                href="/pricing"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <SparklesIcon className="w-5 h-5 mr-2" />
                查看定价
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}