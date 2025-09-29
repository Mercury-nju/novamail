'use client'

import { motion } from 'framer-motion'
import { 
  BookOpenIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export default function HelpPage() {
  const helpCategories = [
    {
      icon: BookOpenIcon,
      title: '快速入门',
      description: '新用户指南，帮助您快速上手',
      articles: [
        '如何注册账户',
        '创建第一个邮件活动',
        '导入联系人列表',
        '发送测试邮件'
      ],
      color: 'bg-blue-500'
    },
    {
      icon: DocumentTextIcon,
      title: '使用指南',
      description: '详细的功能使用说明',
      articles: [
        '邮件模板使用',
        '联系人管理',
        '数据分析查看',
        'SMTP配置设置'
      ],
      color: 'bg-green-500'
    },
    {
      icon: VideoCameraIcon,
      title: '视频教程',
      description: '视频演示，直观学习',
      articles: [
        '平台功能介绍',
        '邮件创建流程',
        '数据分析解读',
        '高级功能使用'
      ],
      color: 'bg-purple-500'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: '常见问题',
      description: '解答您最关心的问题',
      articles: [
        '账户相关问题',
        '邮件发送问题',
        '技术故障排除',
        '付费套餐问题'
      ],
      color: 'bg-orange-500'
    }
  ]

  const popularArticles = [
    {
      title: '如何配置Gmail SMTP发送邮件？',
      category: '配置指南',
      readTime: '5分钟',
      views: '1.2k'
    },
    {
      title: '邮件模板如何自定义？',
      category: '模板使用',
      readTime: '8分钟',
      views: '980'
    },
    {
      title: '如何导入Excel联系人文件？',
      category: '数据导入',
      readTime: '6分钟',
      views: '856'
    },
    {
      title: '邮件发送失败怎么办？',
      category: '故障排除',
      readTime: '4分钟',
      views: '743'
    },
    {
      title: '如何查看邮件打开率？',
      category: '数据分析',
      readTime: '3分钟',
      views: '692'
    },
    {
      title: '专业模板如何使用？',
      category: '高级功能',
      readTime: '10分钟',
      views: '567'
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
              <h1 className="text-3xl font-bold text-gray-900">帮助中心</h1>
              <p className="text-gray-600 mt-2">找到您需要的帮助和答案</p>
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
              帮助中心
              <span className="block text-yellow-300">随时为您服务</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              找到您需要的帮助，快速解决问题，提升使用体验
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="搜索帮助文章..."
                className="w-full px-6 py-4 pl-12 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Help Categories */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">帮助分类</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              按类别浏览帮助内容，快速找到您需要的信息
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {category.title}
                </h4>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3"></div>
                      {article}
                    </li>
                  ))}
                </ul>

                <motion.button
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  查看详情
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">热门文章</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              用户最常查看的帮助文章
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-primary-600 font-medium">
                    {article.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{article.views} 次查看</span>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {article.title}
                </h4>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {article.readTime} 阅读
                  </span>
                  <motion.button
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    阅读文章
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-200">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <QuestionMarkCircleIcon className="w-10 h-10 text-primary-600" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                找不到您需要的帮助？
              </h3>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                我们的支持团队随时为您提供帮助，快速解决您的问题
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  联系支持
                </motion.a>
                <motion.a
                  href="/faq"
                  className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <QuestionMarkCircleIcon className="w-5 h-5 mr-2" />
                  查看FAQ
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
