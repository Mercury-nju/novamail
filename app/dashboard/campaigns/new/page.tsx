'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
  CameraIcon,
  PhotoIcon
} from '@heroicons/react/24/outline'

export default function NewCampaignPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [emailMode, setEmailMode] = useState<'simple' | 'professional'>('simple')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [previewTemplate, setPreviewTemplate] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showProTemplateModal, setShowProTemplateModal] = useState(false)
  const [toneStyle, setToneStyle] = useState<string>('friendly')
  const [showPreview, setShowPreview] = useState(false)
  const emailPreviewRef = useRef<HTMLDivElement>(null)
  const [campaignData, setCampaignData] = useState({
    purpose: '',
    subject: '',
    body: '',
    businessName: '',
    productService: '',
    targetUrl: ''
  })

  const progress = ((step - 1) / 2) * 100

  const generateEmailContent = async () => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('https://novamail.world/api/ai/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailMode,
          selectedTemplate,
          toneStyle,
          campaignData
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
        toast.success('Email generated successfully!')
      } else {
        throw new Error(result.error || 'Generation failed')
      }
    } catch (error) {
      console.error('Generate email error:', error)
      toast.error('Failed to generate email content')
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
      // Move to campaign list if in first step
      router.push('/dashboard/campaigns')
    }
  }

  const handleSave = () => {
    toast.success('Campaign saved as draft!')
    router.push('/dashboard/campaigns')
  }

  const saveAsImage = async () => {
    if (!emailPreviewRef.current) return

    try {
      // 尝试动态导入html2canvas库
      let html2canvas
      try {
        const module = await import('html2canvas')
        html2canvas = module.default
      } catch (importError) {
        console.warn('html2canvas not available, using fallback method')
        // 如果html2canvas不可用，使用简单的截图方法
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        
        // 将HTML内容转换为图片的简单方法
        const htmlContent = emailPreviewRef.current.innerHTML
        const blob = new Blob([`
          <html>
            <head>
              <style>
                body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                img { max-width: 100%; height: auto; }
              </style>
            </head>
            <body>${htmlContent}</body>
          </html>
        `], { type: 'text/html' })
        
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${campaignData.subject || 'email'}-preview.html`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        
        toast.success('Email exported as HTML file!')
        return
      }
      
      const canvas = await html2canvas(emailPreviewRef.current, {
        background: '#ffffff',
        useCORS: true,
        allowTaint: true
      })
      
      // 创建下载链接
      const link = document.createElement('a')
      link.download = `${campaignData.subject || 'email'}-preview.png`
      link.href = canvas.toDataURL('image/png')
      
      // 触发下载
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success('Email preview saved as image!')
    } catch (error) {
      console.error('Error saving image:', error)
      toast.error('Failed to save image')
    }
  }

  const getUserLimits = () => {
    // Mock user limits - in real app, this would come from user subscription
    return {
      maxEmailsPerMonth: -1, // -1 means unlimited
      maxContacts: -1,
      canUseProfessionalTemplates: true
    }
  }

  const templates = {
    'announcement': {
      name: 'Announcement',
      description: 'Perfect for product launches and important updates',
      preview: 'Important Announcement'
    },
    'newsletter': {
      name: 'Newsletter',
      description: 'Great for regular updates and content sharing',
      preview: 'Monthly Newsletter'
    },
    'promotional': {
      name: 'Promotional',
      description: 'Ideal for sales and marketing campaigns',
      preview: 'Special Offer Inside'
    },
    'welcome': {
      name: 'Welcome',
      description: 'Perfect for onboarding new users',
      preview: 'Welcome to Our Platform'
    },
    'follow-up': {
      name: 'Follow-up',
      description: 'Great for customer engagement and follow-ups',
      preview: 'Following Up on Our Conversation'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        {/* Main Dialog Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">AI Email Generator</h1>
                <p className="text-blue-100">Create professional emails with AI assistance</p>
              </div>
              <button
                onClick={() => router.push('/dashboard/campaigns')}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {/* Enhanced Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700">Step {step} of 3</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full shadow-sm" 
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Step 1: Campaign Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your email</h2>
                  <p className="text-gray-600">Provide some details to help AI generate the perfect email for you</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What's the purpose of this email?
                      </label>
                      <textarea
                        value={campaignData.purpose}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, purpose: e.target.value }))}
                        placeholder="e.g., Announce our new product launch, Send monthly newsletter, Follow up with customers..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Business/Company Name
                        </label>
                        <input
                          type="text"
                          value={campaignData.businessName}
                          onChange={(e) => setCampaignData(prev => ({ ...prev, businessName: e.target.value }))}
                          placeholder="e.g., NovaMail, TechCorp..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product/Service
                        </label>
                        <input
                          type="text"
                          value={campaignData.productService}
                          onChange={(e) => setCampaignData(prev => ({ ...prev, productService: e.target.value }))}
                          placeholder="e.g., AI Email Generator, SaaS Platform..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={campaignData.targetUrl}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, targetUrl: e.target.value }))}
                        placeholder="https://your-website.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

              <div className="flex justify-between items-center">
                <button onClick={handleBack} className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors">← Back</button>
                <button 
                  onClick={handleNext}
                  disabled={!campaignData.purpose.trim()}
                  className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

            {/* Step 2: Email Style & Template */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose your email style</h2>
                  <p className="text-gray-600">Select the perfect template and tone for your message</p>
                </div>
                
                {/* Email Mode Selection */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setEmailMode('simple')}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        emailMode === 'simple'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <DocumentTextIcon className="h-8 w-8 mx-auto mb-3 text-gray-600" />
                        <h3 className="font-medium text-gray-900">Simple Email</h3>
                        <p className="text-sm text-gray-600 mt-1">Clean, straightforward format</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        const limits = getUserLimits()
                        if (!limits.canUseProfessionalTemplates) {
                          setShowProTemplateModal(true)
                          return
                        }
                        setEmailMode('professional')
                      }}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        emailMode === 'professional'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <SparklesIcon className="h-8 w-8 mx-auto mb-3 text-gray-600" />
                        <h3 className="font-medium text-gray-900">Professional Template</h3>
                        <p className="text-sm text-gray-600 mt-1">Beautiful, branded templates</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Professional Templates */}
                {emailMode === 'professional' && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(templates).map(([key, template]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedTemplate(key)
                            setPreviewTemplate(template.preview)
                          }}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedTemplate === key
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <h4 className="font-medium text-gray-900">{template.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tone Style */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tone Style</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['friendly', 'professional', 'casual', 'formal'].map((tone) => (
                      <button
                        key={tone}
                        onClick={() => setToneStyle(tone)}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          toneStyle === tone
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        {tone.charAt(0).toUpperCase() + tone.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

              <div className="flex justify-between items-center">
                <button onClick={handleBack} className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors">← Back</button>
                <button 
                  onClick={generateEmailContent}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-4 w-4" />
                      <span>Generate Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

            {/* Step 3: Review & Export */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Your email is ready!</h2>
                  <p className="text-gray-600">Preview and export your AI-generated email</p>
                </div>
                {/* Email Generated Successfully */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">✅ Email Generated Successfully!</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        {showPreview ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                        <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">Your AI-generated email is ready. Preview it below and export in your preferred format.</p>
                
                  {/* Email Preview */}
                  {showPreview && campaignData.body && (
                    <div className="mb-6">
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/40 shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-gray-900">Email Preview</h4>
                          <button
                            onClick={saveAsImage}
                            className="px-3 py-1 text-sm bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-1"
                          >
                            <CameraIcon className="h-4 w-4" />
                            <span>Save as Image</span>
                          </button>
                        </div>
                        <div 
                          ref={emailPreviewRef}
                          className="bg-white rounded-lg border border-gray-200 p-4 max-h-96 overflow-y-auto shadow-inner"
                          dangerouslySetInnerHTML={{ __html: campaignData.body }}
                        />
                      </div>
                    </div>
                  )}
                
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(campaignData.body);
                        toast.success('Email content copied to clipboard!');
                      }}
                      disabled={!campaignData.body.trim()}
                      className="px-6 py-3 bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy Content</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        const blob = new Blob([campaignData.body], { type: 'text/html' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${campaignData.subject || 'email'}.html`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        toast.success('Email exported as HTML file!');
                      }}
                      disabled={!campaignData.body.trim()}
                      className="px-6 py-3 bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Export HTML</span>
                    </button>

                    <button 
                      onClick={saveAsImage}
                      disabled={!campaignData.body.trim()}
                      className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <PhotoIcon className="h-4 w-4" />
                      <span>Save as Image</span>
                    </button>
                  </div>
              </div>

                {/* Campaign Summary */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Tone Style</div>
                    <div className="text-gray-900 capitalize">{toneStyle}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Email Style</div>
                    <div className="text-gray-900">
                      {emailMode === 'professional' ? 'Professional Template' : 'Simple Email'}
                      {emailMode === 'professional' && selectedTemplate && (
                        <span className="text-xs text-blue-600 ml-1">({selectedTemplate.replace('-', ' ')})</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Business Name</div>
                    <div className="text-gray-900">{campaignData.businessName || 'Not specified'}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Target Link</div>
                    <div className="text-gray-900 text-sm">
                      {campaignData.targetUrl ? (
                        <a href={campaignData.targetUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 break-all">
                          {campaignData.targetUrl}
                        </a>
                      ) : (
                        'No link specified'
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm font-medium text-gray-700 mb-2">Subject Line</div>
                    <div className="text-gray-900">{campaignData.subject}</div>
                  </div>
                </div>
              </div>

                <div className="flex justify-between items-center mt-8">
                  <button onClick={handleBack} className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors">← Back</button>
                  <div className="flex space-x-4">
                    <button onClick={handleSave} className="px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition-colors">Save Draft</button>
                  </div>
                </div>
            </div>
          )}

            {/* Pro Template Modal */}
            {showProTemplateModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 w-full max-w-md shadow-2xl border border-white/20"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Upgrade Required</h3>
                    <button
                      onClick={() => setShowProTemplateModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Professional templates are available for Pro users. Upgrade your plan to access beautiful, branded email templates.
                    </p>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowProTemplateModal(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setShowProTemplateModal(false)
                          router.push('/pricing')
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                      >
                        Upgrade Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}