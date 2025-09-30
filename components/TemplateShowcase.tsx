'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Template {
  id: string
  name: string
  heroGradient: string
  heroTitle: string
  heroSubtitle: string
  subject: string
  content: {
    greeting: string
    intro: string
    features: string[]
    ctaText: string
  }
  preview: JSX.Element
}

const templates: Template[] = [
  {
    id: 'modern-promo',
    name: 'Modern Promo',
    heroGradient: 'from-blue-500 to-purple-600',
    heroTitle: '专业服务升级',
    heroSubtitle: '为您的业务提供更强大的支持',
    subject: '🎉 限时优惠！专业服务升级方案',
    content: {
      greeting: '亲爱的客户，',
      intro: '我们很高兴为您介绍我们的专业服务升级方案。通过这个方案，您将获得：',
      features: [
        '24/7 专业技术支持',
        '高级数据分析报告',
        '定制化解决方案'
      ],
      ctaText: '立即升级'
    },
    preview: (
      <div className="h-20 rounded-lg bg-white border border-gray-200 p-2 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-6 rounded mb-2"></div>
        <div className="space-y-1">
          <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    heroGradient: 'from-green-500 to-teal-600',
    heroTitle: '月度资讯简报',
    heroSubtitle: '掌握最新行业动态',
    subject: '📰 2025年1月行业资讯简报',
    content: {
      greeting: '尊敬的订阅用户，',
      intro: '感谢您订阅我们的月度资讯简报。本月为您精选了以下重要内容：',
      features: [
        '行业趋势分析报告',
        '最新技术发展动态',
        '成功案例分享'
      ],
      ctaText: '阅读全文'
    },
    preview: (
      <div className="h-20 rounded-lg bg-white border border-gray-200 p-2 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 h-4 rounded mb-2"></div>
        <div className="grid grid-cols-2 gap-1">
          <div className="h-2 bg-gray-200 rounded"></div>
          <div className="h-2 bg-gray-200 rounded"></div>
          <div className="h-2 bg-gray-200 rounded"></div>
          <div className="h-2 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    heroGradient: 'from-orange-500 to-red-600',
    heroTitle: '新品上市',
    heroSubtitle: '限时特惠，错过再等一年',
    subject: '🛍️ 新品上市！限时7折优惠',
    content: {
      greeting: '亲爱的顾客，',
      intro: '我们很高兴为您介绍最新上市的产品系列。现在购买享受限时优惠：',
      features: [
        '全场新品7折优惠',
        '免费配送服务',
        '30天无理由退换'
      ],
      ctaText: '立即购买'
    },
    preview: (
      <div className="h-20 rounded-lg bg-white border border-gray-200 p-2 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 h-5 rounded mb-2"></div>
        <div className="flex space-x-1">
          <div className="h-3 bg-gray-200 rounded w-8"></div>
          <div className="h-3 bg-gray-200 rounded w-8"></div>
          <div className="h-3 bg-gray-200 rounded w-8"></div>
        </div>
      </div>
    )
  },
  {
    id: 'event-invite',
    name: 'Event Invite',
    heroGradient: 'from-pink-500 to-rose-600',
    heroTitle: '年度盛典邀请',
    heroSubtitle: '与您共度美好时光',
    subject: '🎊 年度盛典邀请函',
    content: {
      greeting: '尊敬的朋友，',
      intro: '我们诚挚邀请您参加我们的年度盛典活动。这将是一个难忘的夜晚：',
      features: [
        '精彩表演节目',
        '精美晚宴招待',
        '丰厚奖品抽奖'
      ],
      ctaText: '确认参加'
    },
    preview: (
      <div className="h-20 rounded-lg bg-white border border-gray-200 p-2 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 h-6 rounded mb-2"></div>
        <div className="text-center">
          <div className="h-2 bg-gray-200 rounded w-16 mx-auto mb-1"></div>
          <div className="h-2 bg-gray-200 rounded w-12 mx-auto"></div>
        </div>
      </div>
    )
  }
]

const TemplateShowcase: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0])

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-24 relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary-100/30 to-blue-100/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4"
          >
            专业模板展示
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            专业模板，让您的邮件
            <span className="text-primary-600">脱颖而出</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            选择专业模板，AI智能生成内容，轻松创建精美的营销邮件
          </motion.p>
        </div>

        {/* Template Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Template Selection */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">选择专业模板</h3>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => handleTemplateSelect(template)}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedTemplate.id === template.id
                        ? 'border-primary-500 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {template.preview}
                    <p className="text-sm font-medium text-gray-900 mt-3">{template.name}</p>
                    {selectedTemplate.id === template.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI Generation Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-200"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900">AI智能生成</h4>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  分析模板结构和风格
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  根据业务信息生成内容
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  优化排版和视觉效果
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Generated Email Preview */}
          <motion.div
            key={selectedTemplate.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Email Preview Container */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Email Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">N</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">NovaMail</p>
                      <p className="text-xs text-gray-500">noreply@novamail.com</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">刚刚</div>
                </div>
              </div>

              {/* Email Content */}
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-4"
                >
                  {/* Subject */}
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-sm text-gray-500 mb-1">主题：</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedTemplate.subject}</p>
                  </div>

                  {/* Email Body */}
                  <div className="space-y-4">
                    {/* Hero Section */}
                    <div className={`bg-gradient-to-r ${selectedTemplate.heroGradient} rounded-lg p-6 text-white text-center`}>
                      <h2 className="text-2xl font-bold mb-2">{selectedTemplate.heroTitle}</h2>
                      <p className="text-white/90">{selectedTemplate.heroSubtitle}</p>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <p className="text-gray-700">{selectedTemplate.content.greeting}</p>
                      <p className="text-gray-700">
                        {selectedTemplate.content.intro}
                      </p>
                      <ul className="space-y-2 ml-4">
                        {selectedTemplate.content.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary-500 mr-2">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-center pt-4"
                    >
                      <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                        {selectedTemplate.content.ctaText}
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Success Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
            >
              ✓ 生成完成
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              ),
              title: "智能生成",
              description: "AI根据模板自动生成专业内容，节省90%的创作时间"
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              ),
              title: "实时预览",
              description: "所见即所得，实时预览邮件效果，确保完美呈现"
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              ),
              title: "专业模板",
              description: "精美模板，覆盖各行业需求，提升品牌形象"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default TemplateShowcase
