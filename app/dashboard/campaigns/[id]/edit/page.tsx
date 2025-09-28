'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeftIcon,
  PaperAirplaneIcon,
  EyeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface EmailContent {
  subject: string
  body: string
  style: 'formal' | 'casual' | 'promotional'
}

interface CampaignData {
  name: string
  userSegment: string
  customUserSegment: string
  goal: string
  customGoal: string
  targetAudience: string
  style: 'casual' | 'formal' | 'promotional'
  subject: string
  body: string
  recipients: string[]
  selectedContacts: number[]
}

export default function EditCampaignPage() {
  const router = useRouter()
  const params = useParams()
  const campaignId = params.id

  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: '',
    userSegment: '',
    customUserSegment: '',
    goal: '',
    customGoal: '',
    targetAudience: '',
    style: 'casual',
    subject: '',
    body: '',
    recipients: [],
    selectedContacts: []
  })
  
  const [customSegment, setCustomSegment] = useState({
    name: '',
    description: '',
    template: ''
  })
  
  const [customSegments, setCustomSegments] = useState<Array<{
    id: string
    name: string
    description: string
    template: string
  }>>([])
  
  const [customGoal, setCustomGoal] = useState({
    name: '',
    description: ''
  })
  
  const [customGoals, setCustomGoals] = useState<Array<{
    id: string
    name: string
    description: string
  }>>([])

  const [generatedOptions, setGeneratedOptions] = useState<EmailContent[]>([])

  // User segments
  const userSegments = [
    {
      id: 'new-users',
      name: '新用户',
      description: 'Recently registered users who need onboarding',
      template: 'Welcome and introduction to your platform'
    },
    {
      id: 'silent-users',
      name: '沉默用户',
      description: 'Users who haven\'t engaged recently',
      template: 'Re-engagement and reactivation campaign'
    },
    {
      id: 'paid-users',
      name: '付费用户',
      description: 'Premium subscribers and paying customers',
      template: 'Exclusive offers and premium content'
    },
    {
      id: 'active-users',
      name: '活跃用户',
      description: 'Regularly engaged and active users',
      template: 'Feature updates and community content'
    },
    {
      id: 'churned-users',
      name: '流失用户',
      description: 'Users who have stopped using the service',
      template: 'Win-back campaign with special incentives'
    }
  ]

  const campaignGoals = {
    'new-users': [
      '欢迎新用户',
      '产品介绍',
      '使用指南',
      '首次优惠'
    ],
    'silent-users': [
      '重新激活',
      '特别优惠',
      '产品更新',
      '用户调研'
    ],
    'paid-users': [
      '专属优惠',
      '高级功能',
      '会员福利',
      '续费提醒'
    ],
    'active-users': [
      '功能更新',
      '社区活动',
      '用户反馈',
      '推荐奖励'
    ],
    'churned-users': [
      '回归优惠',
      '产品改进',
      '个性化服务',
      '重新连接'
    ]
  }

  // Load campaign data on component mount
  useEffect(() => {
    loadCampaignData()
  }, [campaignId])

  const loadCampaignData = async () => {
    try {
      // Simulate loading campaign data
      // In real app, fetch from API
      const mockCampaignData = {
        name: 'Product Launch Announcement',
        userSegment: 'new-users',
        customUserSegment: '',
        goal: '产品介绍',
        customGoal: '',
        targetAudience: 'New users who signed up this week',
        style: 'promotional' as const,
        subject: 'Introducing Our New Product Line',
        body: 'Hi there!\n\nWe are excited to introduce our new product line...',
        recipients: [],
        selectedContacts: []
      }
      
      setCampaignData(mockCampaignData)
      toast.success('Campaign loaded successfully')
    } catch (error) {
      toast.error('Failed to load campaign')
    }
  }

  const handleSaveDraft = async () => {
    if (!campaignData.name) {
      toast.error('Please enter a campaign name')
      return
    }

    setIsSaving(true)
    
    try {
      // Simulate saving draft
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Draft saved successfully!')
    } catch (error) {
      toast.error('Failed to save draft')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSendCampaign = async () => {
    if (!campaignData.subject || !campaignData.body) {
      toast.error('Please complete all required fields')
      return
    }

    setIsSending(true)
    
    try {
      // Simulate sending
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Campaign sent successfully!')
      router.push('/dashboard/campaigns')
    } catch (error) {
      toast.error('Failed to send campaign')
    } finally {
      setIsSending(false)
    }
  }

  const steps = [
    { id: 1, name: 'User Segment', description: 'Select target audience' },
    { id: 2, name: 'Campaign Goal', description: 'Define purpose' },
    { id: 3, name: 'AI Generation', description: 'Generate content' },
    { id: 4, name: 'Review & Send', description: 'Final review' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Edit Campaign
                </h1>
                <p className="text-sm text-gray-500">
                  Campaign ID: {campaignId}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                <DocumentTextIcon className="h-3 w-3 mr-1" />
                Draft
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              {steps.map((stepItem, index) => (
                <div key={stepItem.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step >= stepItem.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepItem.id}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      step >= stepItem.id ? 'text-primary-600' : 'text-gray-500'
                    }`}>
                      {stepItem.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {stepItem.description}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`ml-8 w-16 h-0.5 ${
                      step > stepItem.id ? 'bg-primary-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: User Segment */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-lg font-medium text-gray-900 mb-4">选择用户分层</h2>
              <p className="text-sm text-gray-600 mb-6">选择您要发送邮件的目标用户群体</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  活动名称 *
                </label>
                <input
                  type="text"
                  value={campaignData.name}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  placeholder="输入活动名称"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userSegments.map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => setCampaignData(prev => ({ ...prev, userSegment: segment.id, customUserSegment: '' }))}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      campaignData.userSegment === segment.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900 mb-2">{segment.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{segment.description}</div>
                    <div className="text-xs text-primary-600">{segment.template}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!campaignData.userSegment && !campaignData.customUserSegment}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一步
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Campaign Goal */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-lg font-medium text-gray-900 mb-4">定义邮件目标</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    邮件目标 *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {campaignData.userSegment && campaignGoals[campaignData.userSegment as keyof typeof campaignGoals] && 
                      campaignGoals[campaignData.userSegment as keyof typeof campaignGoals]?.map((goal) => (
                        <button
                          key={goal}
                          onClick={() => setCampaignData(prev => ({ ...prev, goal, customGoal: '' }))}
                          className={`p-3 border rounded-lg text-left transition-colors ${
                            campaignData.goal === goal
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-sm">{goal}</div>
                        </button>
                      ))
                    }
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    邮件风格
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['casual', 'formal', 'promotional'].map((style) => (
                      <button
                        key={style}
                        onClick={() => setCampaignData(prev => ({ ...prev, style: style as any }))}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          campaignData.style === style
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-sm capitalize">{style}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary"
              >
                上一步
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!campaignData.goal && !campaignData.customGoal}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                生成邮件内容
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: AI Generation */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-lg font-medium text-gray-900 mb-4">AI 生成邮件内容</h2>
              <p className="text-sm text-gray-600 mb-6">基于您的设置，AI 将生成个性化的邮件内容</p>

              {!campaignData.subject ? (
                <div className="text-center py-8">
                  <button
                    onClick={() => {
                      // Simulate AI generation
                      const selectedSegment = userSegments.find(s => s.id === campaignData.userSegment)
                      const segmentName = selectedSegment?.name || ''
                      const goalText = campaignData.goal || campaignData.customGoal
                      
                      setCampaignData(prev => ({
                        ...prev,
                        subject: `${segmentName}专属：${goalText}`,
                        body: `Hi there!\n\n作为我们的${segmentName}，我们很高兴与您分享关于${goalText}的特别信息。\n\n${selectedSegment?.template || '定制化内容'}相关的内容：\n\n✨ 专为${segmentName}设计的功能\n✨ 为什么这对您很重要\n✨ 如何开始使用\n\n准备好体验不同了吗？点击下面了解更多。\n\nBest regards,\nThe Team\n\n---\n您收到此邮件是因为您订阅了我们的更新。点击这里取消订阅。`
                      }))
                      toast.success('Email content generated successfully!')
                    }}
                    className="btn-primary"
                  >
                    生成邮件内容
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      邮件主题
                    </label>
                    <input
                      type="text"
                      value={campaignData.subject}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, subject: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      邮件内容
                    </label>
                    <textarea
                      value={campaignData.body}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, body: e.target.value }))}
                      className="input-field"
                      rows={10}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="btn-secondary"
              >
                上一步
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!campaignData.subject || !campaignData.body}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一步
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Review & Send */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Review & Send</h2>
              <p className="text-sm text-gray-600 mb-6">Review your campaign before sending</p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3">Campaign Settings</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div><span className="font-medium">Name:</span> {campaignData.name}</div>
                    <div><span className="font-medium">User Segment:</span> {userSegments.find(s => s.id === campaignData.userSegment)?.name}</div>
                    <div><span className="font-medium">Goal:</span> {campaignData.goal}</div>
                    <div><span className="font-medium">Style:</span> {campaignData.style}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3">Email Content</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div><span className="font-medium">Subject:</span> {campaignData.subject}</div>
                    <div><span className="font-medium">Body:</span></div>
                    <div className="text-sm text-gray-700 whitespace-pre-line bg-white p-3 rounded border">
                      {campaignData.body}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3">Recipients</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        toast.success('Please login to upload files')
                        router.push('/login')
                      }}
                      className="w-full btn-secondary text-sm text-left"
                    >
                      上传邮件列表文件 (CSV)
                    </button>
                    <button
                      onClick={() => {
                        toast.success('Please login to add contacts')
                        router.push('/login')
                      }}
                      className="w-full btn-secondary text-sm text-left"
                    >
                      手动输入邮件地址
                    </button>
                    <button
                      onClick={() => {
                        toast.success('Please login to select contacts')
                        router.push('/login')
                      }}
                      className="w-full btn-secondary text-sm text-left"
                    >
                      从联系人中选择
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="btn-secondary"
              >
                上一步
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPreview(true)}
                  className="btn-secondary flex items-center"
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Preview
                </button>
                <button
                  onClick={handleSaveDraft}
                  disabled={isSaving}
                  className="btn-secondary flex items-center disabled:opacity-50"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  {isSaving ? 'Saving...' : 'Save Draft'}
                </button>
                <button
                  onClick={handleSendCampaign}
                  disabled={isSending}
                  className="btn-primary flex items-center disabled:opacity-50"
                >
                  <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                  {isSending ? 'Sending...' : 'Send Campaign'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Email Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Subject:</div>
                <div className="font-medium">{campaignData.subject}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Body:</div>
                <div className="whitespace-pre-line text-sm">{campaignData.body}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
