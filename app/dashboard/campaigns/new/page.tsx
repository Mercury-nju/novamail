'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  SparklesIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ArrowLeftIcon,
  EyeIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface EmailContent {
  subject: string
  body: string
  style: 'formal' | 'casual' | 'promotional'
}

export default function NewCampaignPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  
  const [campaignData, setCampaignData] = useState({
    name: '',
    userSegment: '',
    customUserSegment: '',
    goal: '',
    customGoal: '',
    targetAudience: '',
    style: 'casual' as EmailContent['style'],
    subject: '',
    body: '',
    recipients: [] as string[],
    selectedContacts: [] as number[]
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

  const handleConfirmCustomSegment = () => {
    if (!customSegment.name.trim()) {
      toast.error('请输入用户分层名称')
      return
    }
    
    const newSegment = {
      id: `custom-${Date.now()}`,
      name: customSegment.name,
      description: customSegment.description,
      template: customSegment.template
    }
    
    setCustomSegments(prev => [...prev, newSegment])
    setCampaignData(prev => ({ ...prev, customUserSegment: newSegment.id }))
    setCustomSegment({ name: '', description: '', template: '' })
    toast.success('自定义用户分层添加成功！')
  }

  const handleConfirmCustomGoal = () => {
    if (!customGoal.name.trim()) {
      toast.error('请输入邮件目标名称')
      return
    }
    
    const newGoal = {
      id: `custom-goal-${Date.now()}`,
      name: customGoal.name,
      description: customGoal.description
    }
    
    setCustomGoals(prev => [...prev, newGoal])
    setCampaignData(prev => ({ ...prev, customGoal: newGoal.id }))
    setCustomGoal({ name: '', description: '' })
    toast.success('自定义邮件目标添加成功！')
  }

  const handleGenerateEmail = async () => {
    const hasUserSegment = campaignData.userSegment || campaignData.customUserSegment
    const hasGoal = campaignData.goal || campaignData.customGoal
    
    if (!hasUserSegment || !hasGoal) {
      toast.error('Please select or define user segment and goal')
      return
    }

    setIsGenerating(true)
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate segment-specific content
      const selectedSegment = userSegments.find(s => s.id === campaignData.userSegment)
      const selectedCustomSegment = customSegments.find(s => s.id === campaignData.customUserSegment)
      const selectedCustomGoal = customGoals.find(g => g.id === campaignData.customGoal)
      const segmentName = campaignData.userSegment ? selectedSegment?.name || '' : selectedCustomSegment?.name || ''
      const goalText = campaignData.goal || selectedCustomGoal?.name || ''
      
      // Generate content based on selected style
      const generateContentByStyle = (style: string) => {
        const baseContent = {
          segmentName,
          goalText,
          template: selectedSegment?.template || selectedCustomSegment?.template || '定制化内容'
        }

        switch (style) {
          case 'casual':
            return {
              subject: `Hey! Check out ${goalText}`,
              body: `Hi!

Hope you're doing great! 👋

I wanted to drop you a quick note about ${goalText.toLowerCase()}. We just launched something pretty cool that I think you'd be interested in.

Here's the deal:
• It's awesome (obviously!)
• It's designed with people like you in mind
• It's easy to get started

Want to check it out? Just click the link below.

Thanks for being awesome!
The Team

P.S. If this isn't your thing, no worries at all. Just let us know and we'll stop sending these updates.

---
Unsubscribe | Update preferences`,
              style: 'casual' as const
            }
          case 'formal':
            return {
              subject: `Update: ${goalText}`,
              body: `Hello,

I hope this email finds you well. I wanted to reach out to share some important information about ${goalText.toLowerCase()}.

We've been working hard to bring you something valuable, and I'm pleased to announce that ${goalText} is now ready.

Here's what you need to know:
• What it is and why it matters
• How it can benefit you
• Next steps to get involved

I believe this will be of great value to you. Please let me know if you have any questions.

Warm regards,
The Team

---
You can unsubscribe from these emails at any time.`,
              style: 'formal' as const
            }
          case 'promotional':
            return {
              subject: `${segmentName}专属：${goalText}`,
              body: `Hi there!

作为我们的${segmentName}，我们很高兴与您分享关于${goalText}的特别信息。

${baseContent.template}相关的内容：

✨ 专为${segmentName}设计的功能
✨ 为什么这对您很重要
✨ 如何开始使用

准备好体验不同了吗？点击下面了解更多。

Best regards,
The Team

---
您收到此邮件是因为您订阅了我们的更新。点击这里取消订阅。`,
              style: 'promotional' as const
            }
          default:
            return {
              subject: `Update: ${goalText}`,
              body: `Hello,

I hope this email finds you well. I wanted to reach out to share some important information about ${goalText.toLowerCase()}.

We've been working hard to bring you something valuable, and I'm pleased to announce that ${goalText} is now ready.

Here's what you need to know:
• What it is and why it matters
• How it can benefit you
• Next steps to get involved

I believe this will be of great value to you. Please let me know if you have any questions.

Warm regards,
The Team

---
You can unsubscribe from these emails at any time.`,
              style: 'formal' as const
            }
        }
      }

      const mockOptions: EmailContent[] = [
        generateContentByStyle(campaignData.style),
        generateContentByStyle(campaignData.style),
        generateContentByStyle(campaignData.style)
      ]
      
      setGeneratedOptions(mockOptions)
      toast.success('Email content generated successfully!')
    } catch (error) {
      toast.error('Failed to generate email content')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSelectOption = (option: EmailContent) => {
    setCampaignData(prev => ({
      ...prev,
      subject: option.subject,
      body: option.body,
      style: option.style
    }))
    setStep(4)
  }

  const handleSaveDraft = async () => {
    if (!campaignData.name) {
      toast.error('Please enter a campaign name')
      return
    }

    // Check if user is logged in
    const isLoggedIn = false // In real app, check auth state
    
    if (!isLoggedIn) {
      toast.success('Redirecting to login...')
      router.push('/login')
      return
    }

    setIsSaving(true)
    
    try {
      // Simulate saving draft
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Draft saved successfully!')
      router.push('/dashboard/campaigns')
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

    // Check if user is logged in
    const isLoggedIn = false // In real app, check auth state
    
    if (!isLoggedIn) {
      toast.success('Redirecting to login...')
      router.push('/login')
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
      'Welcome and onboarding',
      'Feature introduction',
      'Getting started guide',
      'First success milestone'
    ],
    'silent-users': [
      'Re-engagement',
      'Feature reminder',
      'Special offer',
      'Community invitation'
    ],
    'paid-users': [
      'Exclusive content',
      'Premium features',
      'VIP benefits',
      'Loyalty rewards'
    ],
    'active-users': [
      'Feature updates',
      'Community highlights',
      'Advanced tips',
      'Feedback request'
    ],
    'churned-users': [
      'Win-back offer',
      'What\'s new',
      'Special discount',
      'Feedback survey'
    ]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Campaign</h1>
            <p className="mt-1 text-sm text-gray-600">
              Try our AI email generator - login required to send
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="card">
        <div className="flex items-center justify-between">
          {steps.map((stepItem, index) => (
            <div key={stepItem.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= stepItem.id ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step > stepItem.id ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepItem.id
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  step >= stepItem.id ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {stepItem.name}
                </p>
                <p className="text-xs text-gray-500">{stepItem.description}</p>
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

      {/* Step 1: User Segment Selection */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">选择用户分层</h2>
            <p className="text-sm text-gray-600 mb-6">选择您要发送邮件的目标用户群体</p>
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
              
              {/* Custom User Segments */}
              {customSegments.map((segment) => (
                <button
                  key={segment.id}
                  onClick={() => setCampaignData(prev => ({ ...prev, userSegment: '', customUserSegment: segment.id }))}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    campaignData.customUserSegment === segment.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900 mb-2">{segment.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{segment.description}</div>
                  <div className="text-xs text-primary-600">{segment.template}</div>
                </button>
              ))}
              
              {/* Custom User Segment Input Card */}
              {campaignData.customUserSegment === 'editing' && (
                <div className="p-4 border border-primary-500 bg-primary-50 rounded-lg">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={customSegment.name}
                      onChange={(e) => setCustomSegment(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full font-medium text-gray-900 bg-transparent border-none outline-none"
                      placeholder="用户分层名称"
                    />
                    <textarea
                      value={customSegment.description}
                      onChange={(e) => setCustomSegment(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full text-sm text-gray-600 bg-transparent border-none outline-none resize-none"
                      rows={2}
                      placeholder="简述这个用户群体"
                    />
                    <input
                      type="text"
                      value={customSegment.template}
                      onChange={(e) => setCustomSegment(prev => ({ ...prev, template: e.target.value }))}
                      className="w-full text-xs text-primary-600 bg-transparent border-none outline-none"
                      placeholder="邮件目的/模板"
                    />
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleConfirmCustomSegment}
                        className="px-3 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700"
                      >
                        确认添加
                      </button>
                      <button
                        onClick={() => {
                          setCampaignData(prev => ({ ...prev, customUserSegment: '' }))
                          setCustomSegment({ name: '', description: '', template: '' })
                        }}
                        className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Add Custom User Segment Button */}
              {campaignData.customUserSegment !== 'editing' && (
                <button
                  onClick={() => setCampaignData(prev => ({ ...prev, customUserSegment: 'editing' }))}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center transition-colors hover:border-primary-400 hover:bg-primary-50"
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div className="font-medium text-gray-700 text-sm">添加自定义用户分层</div>
                    <div className="text-xs text-gray-500 mt-1">创建您自己的用户群体</div>
                  </div>
                </button>
              )}
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
                  
                  {/* Custom Goals */}
                  {customGoals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setCampaignData(prev => ({ ...prev, goal: '', customGoal: goal.id }))}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        campaignData.customGoal === goal.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{goal.name}</div>
                      {goal.description && (
                        <div className="text-xs text-gray-500 mt-1">{goal.description}</div>
                      )}
                    </button>
                  ))}
                  
                  {/* Custom Goal Input Card */}
                  {campaignData.customGoal === 'editing' && (
                    <div className="p-3 border border-primary-500 bg-primary-50 rounded-lg">
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={customGoal.name}
                          onChange={(e) => setCustomGoal(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full font-medium text-sm bg-transparent border-none outline-none"
                          placeholder="邮件目标名称"
                        />
                        <textarea
                          value={customGoal.description}
                          onChange={(e) => setCustomGoal(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full text-xs text-gray-600 bg-transparent border-none outline-none resize-none"
                          rows={2}
                          placeholder="详细描述邮件目的"
                        />
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={handleConfirmCustomGoal}
                            className="px-2 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700"
                          >
                            确认添加
                          </button>
                          <button
                            onClick={() => {
                              setCampaignData(prev => ({ ...prev, customGoal: '' }))
                              setCustomGoal({ name: '', description: '' })
                            }}
                            className="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                          >
                            取消
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Add Custom Goal Button */}
                  {campaignData.customGoal !== 'editing' && (
                    <button
                      onClick={() => setCampaignData(prev => ({ ...prev, customGoal: 'editing' }))}
                      className="p-3 border-2 border-dashed border-gray-300 rounded-lg text-center transition-colors hover:border-primary-400 hover:bg-primary-50"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <div className="font-medium text-gray-700 text-xs">自定义目标</div>
                      </div>
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  邮件风格
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'formal', label: '正式', desc: '专业语调' },
                    { value: 'casual', label: '轻松', desc: '友好随和' },
                    { value: 'promotional', label: '促销', desc: '销售导向' }
                  ].map((style) => (
                    <button
                      key={style.value}
                      onClick={() => setCampaignData(prev => ({ ...prev, style: style.value as EmailContent['style'] }))}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        campaignData.style === style.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{style.label}</div>
                      <div className="text-xs text-gray-500">{style.desc}</div>
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
          className="space-y-6"
        >
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">AI-Generated Content</h2>
              <button
                onClick={handleGenerateEmail}
                disabled={isGenerating}
                className="btn-primary flex items-center disabled:opacity-50"
              >
                <SparklesIcon className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate New Options'}
              </button>
            </div>

            {generatedOptions.length > 0 ? (
              <div className="space-y-4">
                {generatedOptions.map((option, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{option.subject}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {option.style}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-4 whitespace-pre-line">
                      {option.body.substring(0, 200)}...
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSelectOption(option)}
                        className="btn-primary text-sm"
                      >
                        Use This Option
                      </button>
                      <button
                        onClick={() => setShowPreview(true)}
                        className="btn-secondary text-sm flex items-center"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Click "Generate New Options" to create AI-powered email content</p>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="btn-secondary"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={!campaignData.subject || !campaignData.body}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Review
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 4: Review & Send */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Preview */}
            <div className="card">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Email Preview</h2>
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={campaignData.subject}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, subject: e.target.value }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Body
                  </label>
                  <textarea
                    value={campaignData.body}
                    onChange={(e) => setCampaignData(prev => ({ ...prev, body: e.target.value }))}
                    className="input-field"
                    rows={12}
                  />
                </div>
              </div>
            </div>

            {/* Recipients & Settings */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recipients</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">All Active Contacts</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">2,847</span>
                  </div>
                  <button className="w-full btn-secondary text-sm">
                    Select Specific Contacts
                  </button>
                </div>
              </div>

              <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Campaign Settings</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">选择发送对象</h3>
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Include unsubscribe link</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Track delivery and reply rates</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Send immediately</span>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(3)}
              className="btn-secondary"
            >
              Back
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
                {isSending ? 'Sending...' : 'Login to Send'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

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
