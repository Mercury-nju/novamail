'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  EyeIcon,
  PencilIcon,
  XMarkIcon,
  RocketLaunchIcon,
  TagIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

interface Template {
  id: string
  name: string
  description: string
  category: string
  preview: string
  isAI: boolean
}

interface CampaignData {
  purpose: string
  subject: string
  body: string
  businessName: string
  productService: string
  targetUrl: string
  tone: string
  targetAudience: string
}

export default function NewCampaignPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [campaignData, setCampaignData] = useState<CampaignData>({
    purpose: '',
    subject: '',
    body: '',
    businessName: '',
    productService: '',
    targetUrl: '',
    tone: 'friendly',
    targetAudience: ''
  })

  const templates: Template[] = [
    {
      id: 'product-launch',
      name: '产品发布',
      description: '新产品发布通知，包含产品介绍和优惠信息',
      category: '营销',
      preview: '🎉 新产品发布！限时优惠等你来',
      isAI: true
    },
    {
      id: 'customer-care',
      name: '客户关怀',
      description: '客户关怀邮件，提升客户满意度和忠诚度',
      category: '客户关怀',
      preview: '感谢您的支持，专属优惠为您准备',
      isAI: true
    },
    {
      id: 'holiday-greeting',
      name: '节日祝福',
      description: '节日祝福邮件，营造温馨氛围',
      category: '节日',
      preview: '🎊 新年快乐！新年特惠活动开始',
      isAI: true
    },
    {
      id: 'newsletter',
      name: '新闻通讯',
      description: '定期新闻通讯，分享行业动态和公司新闻',
      category: '通讯',
      preview: '📰 本月新闻：行业动态与公司更新',
      isAI: true
    },
    {
      id: 'promotion',
      name: '促销活动',
      description: '促销活动通知，吸引客户参与',
      category: '营销',
      preview: '🔥 限时促销！错过再等一年',
      isAI: true
    },
    {
      id: 'welcome',
      name: '欢迎邮件',
      description: '新用户欢迎邮件，介绍产品和服务',
      category: '欢迎',
      preview: '👋 欢迎加入我们！开始您的旅程',
      isAI: true
    }
  ]

  const tones = [
    { value: 'friendly', label: '友好亲切', description: '温暖、亲切的语调' },
    { value: 'professional', label: '专业正式', description: '正式、专业的商务语调' },
    { value: 'casual', label: '轻松随意', description: '轻松、随意的日常语调' },
    { value: 'enthusiastic', label: '热情洋溢', description: '充满活力和热情的语调' },
    { value: 'persuasive', label: '说服力强', description: '具有说服力和吸引力的语调' }
  ]

  const progress = ((step - 1) / 3) * 100

  const generateEmailContent = async () => {
    if (!selectedTemplate || !campaignData.purpose || !campaignData.businessName) {
      toast.error('请填写必要信息')
      return
    }

    setIsGenerating(true)
    
    try {
      const response = await fetch('https://novamail-api.lihongyangnju.workers.dev/api/ai/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: selectedTemplate,
          purpose: campaignData.purpose,
          businessName: campaignData.businessName,
          productService: campaignData.productService,
          targetUrl: campaignData.targetUrl,
          tone: campaignData.tone,
          targetAudience: campaignData.targetAudience
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setCampaignData(prev => ({
          ...prev,
          subject: result.subject,
          body: result.body
        }))
        setStep(3)
        toast.success('AI 邮件生成成功！')
      } else {
        throw new Error(result.error || '生成失败')
      }
    } catch (error) {
      console.error('Generate email error:', error)
      toast.error('AI 邮件生成失败，请重试')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push('/dashboard/campaigns')
    }
  }

  const handleSave = () => {
    toast.success('邮件已保存为草稿！')
    router.push('/dashboard/campaigns')
  }

  const handleSend = () => {
    toast.success('邮件发送成功！')
    router.push('/dashboard/campaigns')
  }

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <SparklesIcon className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">AI 邮件生成</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                步骤 {step} / 3
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Template Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">选择邮件模板</h2>
                <p className="text-lg text-gray-600">AI 将根据您选择的模板生成精美的邮件内容</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    {template.isAI && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <SparklesIcon className="h-3 w-3 mr-1" />
                          AI
                        </span>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <TagIcon className="h-3 w-3 mr-1" />
                        {template.category}
                      </span>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 font-medium">{template.preview}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!selectedTemplate}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  下一步
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Campaign Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">填写邮件信息</h2>
                <p className="text-lg text-gray-600">提供详细信息，AI 将为您生成个性化邮件内容</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
                <div className="space-y-6">
                  {/* Template Info */}
                  {selectedTemplateData && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <SparklesIcon className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-blue-900">已选择模板：{selectedTemplateData.name}</h3>
                          <p className="text-sm text-blue-700">{selectedTemplateData.description}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">邮件目的 *</label>
                      <input
                        type="text"
                        value={campaignData.purpose}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, purpose: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="例如：推广新产品、客户关怀、节日祝福"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">公司/品牌名称 *</label>
                      <input
                        type="text"
                        value={campaignData.businessName}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, businessName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="您的公司或品牌名称"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">产品/服务</label>
                    <input
                      type="text"
                      value={campaignData.productService}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, productService: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="要推广的产品或服务"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">目标链接</label>
                    <input
                      type="url"
                      value={campaignData.targetUrl}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, targetUrl: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">目标受众</label>
                    <input
                      type="text"
                      value={campaignData.targetAudience}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, targetAudience: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="例如：年轻用户、企业客户、VIP会员"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">邮件语调</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {tones.map((tone) => (
                        <button
                          key={tone.value}
                          onClick={() => setCampaignData(prev => ({ ...prev, tone: tone.value }))}
                          className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                            campaignData.tone === tone.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-gray-900">{tone.label}</div>
                          <div className="text-sm text-gray-600">{tone.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  上一步
                </button>
                <button
                  onClick={generateEmailContent}
                  disabled={isGenerating || !campaignData.purpose || !campaignData.businessName}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      AI 生成中...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-5 w-5 mr-2" />
                      生成邮件
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review and Edit */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">预览和编辑</h2>
                <p className="text-lg text-gray-600">AI 已为您生成邮件内容，您可以进一步编辑和优化</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Email Preview */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">邮件预览</h3>
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      {showPreview ? '隐藏' : '显示'}预览
                    </button>
                  </div>

                  {showPreview && (
                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">主题</label>
                        <input
                          type="text"
                          value={campaignData.subject}
                          onChange={(e) => setCampaignData(prev => ({ ...prev, subject: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
                        <textarea
                          value={campaignData.body}
                          onChange={(e) => setCampaignData(prev => ({ ...prev, body: e.target.value }))}
                          rows={12}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">操作选项</h3>
                    <div className="space-y-4">
                      <button
                        onClick={handleSave}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <DocumentTextIcon className="h-5 w-5 mr-2" />
                        保存为草稿
                      </button>
                      
                      <button
                        onClick={handleSend}
                        className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <RocketLaunchIcon className="h-5 w-5 mr-2" />
                        立即发送
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">邮件信息</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">模板：</span>
                        <span className="font-medium">{selectedTemplateData?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">目的：</span>
                        <span className="font-medium">{campaignData.purpose}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">语调：</span>
                        <span className="font-medium">{tones.find(t => t.value === campaignData.tone)?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">品牌：</span>
                        <span className="font-medium">{campaignData.businessName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  上一步
                </button>
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <DocumentTextIcon className="h-5 w-5 mr-2" />
                    保存草稿
                  </button>
                  <button
                    onClick={handleSend}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <RocketLaunchIcon className="h-5 w-5 mr-2" />
                    发送邮件
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}