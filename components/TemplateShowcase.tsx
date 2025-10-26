'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckIcon, EyeIcon, SparklesIcon, DocumentTextIcon, ShoppingCartIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { professionalTemplates, type ProfessionalTemplate } from '@/lib/templates'

// Use shared template data
const templates = professionalTemplates.map(template => ({
  ...template,
  icon: getTemplateIcon(template.category),
  gradient: getTemplateGradient(template.category)
}))

function getTemplateIcon(category: string) {
  switch (category) {
    case 'Modern': return <SparklesIcon className="w-6 h-6 text-white" />
    case 'Minimal': return <DocumentTextIcon className="w-6 h-6 text-white" />
    case 'Corporate': return <DocumentTextIcon className="w-6 h-6 text-white" />
    case 'Creative': return <SparklesIcon className="w-6 h-6 text-white" />
    case 'Elegant': return <SparklesIcon className="w-6 h-6 text-white" />
    case 'Sales': return <ShoppingCartIcon className="w-6 h-6 text-white" />
    default: return <SparklesIcon className="w-6 h-6 text-white" />
  }
}

function getTemplateGradient(category: string) {
  switch (category) {
    case 'Modern': return 'from-blue-500 to-purple-600'
    case 'Minimal': return 'from-gray-500 to-gray-700'
    case 'Corporate': return 'from-slate-500 to-slate-700'
    case 'Creative': return 'from-pink-500 to-rose-600'
    case 'Elegant': return 'from-amber-500 to-yellow-600'
    case 'Sales': return 'from-pink-500 to-rose-600'
    default: return 'from-blue-500 to-purple-600'
  }
}

export default function TemplateShowcase() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])

  const handleTemplateClick = (template: ProfessionalTemplate) => {
    // Navigate to the professional templates page with the selected template
    router.push(`/dashboard/campaigns/new?template=${template.id}`)
  }

  return (
    <section className="py-20 relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.6, 0.3],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-pink-100/40 to-rose-100/40 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2], 
            opacity: [0.2, 0.5, 0.2],
            x: [0, -15, 0],
            y: [0, 10, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-100/30 to-yellow-100/30 rounded-full filter blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm border border-blue-200/50"
          >
            ✨ Professional Templates
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            AI-Powered Templates That
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
              Drive Results
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Choose from professional templates, let AI generate personalized content, and create stunning emails that convert
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Template Selection - 只显示精选模板 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h3>
              <p className="text-gray-600">Select from our most popular professional templates</p>
            </div>

            {/* 只显示前4个精选模板 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {templates.slice(0, 4).map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => {
                    setSelectedTemplate(template)
                    // 首页展示，不跳转到编辑页面
                    console.log('Template selected:', template.name, '- homepage showcase only')
                  }}
                  className={`
                    relative group cursor-pointer transition-all duration-300 p-4 rounded-xl border-2 h-28
                    ${selectedTemplate.id === template.id 
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg shadow-blue-100/50' 
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-lg hover:bg-white hover:shadow-gray-100/50'
                    }
                  `}
                >
                  {/* Selected Indicator */}
                  {selectedTemplate.id === template.id && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute -top-2 -right-2"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <CheckIcon className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="flex flex-col items-center text-center h-full justify-center space-y-2">
                    <div className={`w-12 h-12 bg-gradient-to-r ${template.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                      {template.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{template.name}</h4>
                      <p className="text-xs text-gray-600">{template.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 查看所有模板按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <button 
                onClick={() => {
                  // 跳转到登录页面
                  router.push('/login')
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Templates
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Email Preview - 更详细的预览 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-stretch"
          >
            <motion.div
              key={selectedTemplate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden flex flex-col w-full h-[600px]"
            >
              {/* Email Client Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-gradient-to-r ${selectedTemplate.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                      {selectedTemplate.icon}
                    </div>
                    <div>
                      <div className="text-base font-bold text-gray-900">NovaMail</div>
                      <div className="text-sm text-gray-500">noreply@novamail.world</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 font-medium">Just now</div>
                  </div>
                </div>
              </div>

              {/* Email Content */}
              <div className="p-6 flex-grow flex flex-col">
                {/* Subject Line */}
                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-l-4 border-blue-500">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Subject: </span>
                  <span className="text-base font-bold text-gray-900 ml-2">{selectedTemplate.subject}</span>
                </div>

                {/* Template Features */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-700">Template Features:</span>
                    <span className="text-gray-600">{selectedTemplate.category} Style</span>
                  </div>
                </div>

                {/* Email HTML Preview - 完整展示模板 */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex-grow">
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="ml-4 text-sm text-gray-500 font-medium">Full Template Preview</div>
                    </div>
                  </div>
                  <div className="p-2 h-full overflow-y-auto">
                    <div 
                      className="w-full transform scale-75 origin-top pointer-events-none"
                      dangerouslySetInnerHTML={{ 
                        __html: selectedTemplate.htmlContent.replace(
                          /<a\s+([^>]*?)>/gi, 
                          '<a $1 style="pointer-events: none; cursor: default; text-decoration: none;">'
                        )
                      }}
                      style={{ 
                        userSelect: 'none',
                        '--preview-mode': 'true',
                        minHeight: '800px' // 确保有足够空间显示完整模板
                      } as React.CSSProperties}
                    />
                  </div>
                </div>

                {/* Action Buttons - 首页展示用 */}
                <div className="mt-4 flex space-x-3">
                  <button 
                    onClick={() => {
                      // 首页展示，不跳转到编辑页面
                      console.log('Use template clicked - homepage showcase only')
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  >
                    View Template Details
                  </button>
                  <button 
                    onClick={() => {
                      // 首页展示，不跳转到编辑页面
                      console.log('Preview clicked - homepage showcase only')
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Full Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
