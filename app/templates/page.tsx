'use client'

import { motion } from 'framer-motion'
import BackgroundAnimations from '@/components/BackgroundAnimations'
import { 
  EyeIcon,
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function TemplatesPage() {
  const templates = [
    {
      id: 'modern-promo',
      name: '现代促销',
      category: '营销推广',
      description: '适合产品推广和促销活动的现代化设计',
      preview: '/api/placeholder/400/300',
      features: ['响应式设计', 'CTA按钮', '产品展示', '社交媒体链接'],
      isPro: true
    },
    {
      id: 'newsletter',
      name: '新闻通讯',
      category: '内容营销',
      description: '专业的新闻通讯模板，适合定期内容推送',
      preview: '/api/placeholder/400/300',
      features: ['多栏布局', '文章摘要', '订阅管理', '分享功能'],
      isPro: true
    },
    {
      id: 'ecommerce',
      name: '电商推广',
      category: '电商营销',
      description: '专为电商设计的邮件模板，突出产品特色',
      preview: '/api/placeholder/400/300',
      features: ['产品网格', '价格展示', '购物车提醒', '推荐商品'],
      isPro: true
    },
    {
      id: 'event-invite',
      name: '活动邀请',
      category: '活动营销',
      description: '精美的活动邀请模板，提升参与度',
      preview: '/api/placeholder/400/300',
      features: ['活动详情', '时间地点', 'RSVP按钮', '地图集成'],
      isPro: true
    },
    {
      id: 'welcome',
      name: '欢迎邮件',
      category: '用户引导',
      description: '新用户欢迎邮件，建立良好的第一印象',
      preview: '/api/placeholder/400/300',
      features: ['个性化欢迎', '功能介绍', '快速开始', '帮助链接'],
      isPro: false
    },
    {
      id: 'simple-text',
      name: '简洁文本',
      category: '基础模板',
      description: '简洁的文本邮件模板，适合正式沟通',
      preview: '/api/placeholder/400/300',
      features: ['纯文本格式', '简洁布局', '易读性强', '通用性强'],
      isPro: false
    }
  ]

  const categories = ['全部', '营销推广', '内容营销', '电商营销', '活动营销', '用户引导', '基础模板']

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <BackgroundAnimations variant="default" particleCount={10} />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900">邮件模板</h1>
              <p className="text-gray-600 mt-2">选择适合的模板，打造专业邮件</p>
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
              专业邮件模板
              <span className="block text-yellow-300">让营销更简单</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              精心设计的邮件模板，帮助您快速创建美观、有效的营销邮件
            </p>
          </motion.div>

          {/* Template Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white mb-2">6+</div>
              <div className="text-blue-200">专业模板</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-200">响应式设计</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white mb-2">免费</div>
              <div className="text-blue-200">基础模板</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-600"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Template Preview */}
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-sm">模板预览</div>
                  </div>
                  {template.isPro && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <SparklesIcon className="w-3 h-3 mr-1" />
                        Pro
                      </span>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-primary-600 font-medium">
                      {template.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-600"
                        >
                          <CheckIcon className="w-3 h-3 mr-1" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    使用此模板
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </motion.button>
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
              需要更多专业模板？
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              升级到Pro版本，解锁所有专业模板和高级功能
            </p>
            <motion.a
              href="/pricing"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              查看Pro版本
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
