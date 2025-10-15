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
  EyeIcon,
  EyeSlashIcon,
  CameraIcon,
  DocumentDuplicateIcon,
  PlusIcon,
  ArrowLeftIcon,
  CpuChipIcon,
  PaintBrushIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

interface EmailHistory {
  id: string
  subject: string
  businessName: string
  emailMode: 'simple' | 'professional'
  selectedTemplate?: string
  toneStyle: string
  createdAt: string
  body: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [currentMode, setCurrentMode] = useState<'text' | 'template' | null>(null)
  const [step, setStep] = useState(1)
  const [emailMode, setEmailMode] = useState<'simple' | 'professional'>('simple')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
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
  const [emailHistory, setEmailHistory] = useState<EmailHistory[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const progress = ((step - 1) / 2) * 100

  useEffect(() => {
    fetchEmailHistory()
  }, [])

  const fetchEmailHistory = async () => {
    try {
      const userId = localStorage.getItem('user-id') || localStorage.getItem('user-email') || 'default_user'
      const response = await fetch(`https://novamail.world/api/campaigns/history?userId=${userId}`)
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setEmailHistory(data.data.emails || [])
        }
      }
    } catch (error) {
      console.error('Failed to fetch email history:', error)
    }
  }

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
        setStep(currentMode === 'text' ? 3 : 2)
        toast.success('Email generated successfully!')
        fetchEmailHistory()
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
    }
  }

  const handleNewEmail = () => {
    setCurrentMode(null)
    setStep(1)
    setCampaignData({
      purpose: '',
      subject: '',
      body: '',
      businessName: '',
      productService: '',
      targetUrl: ''
    })
    setShowPreview(false)
    setSelectedTemplate('')
    setEmailMode('simple')
    setToneStyle('friendly')
  }

  const saveAsImage = async () => {
    if (!emailPreviewRef.current) return

    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const rect = emailPreviewRef.current.getBoundingClientRect()
      canvas.width = rect.width * 2
      canvas.height = rect.height * 2
      ctx.scale(2, 2)

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('width', rect.width.toString())
      svg.setAttribute('height', rect.height.toString())
      
      const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
      foreignObject.setAttribute('width', '100%')
      foreignObject.setAttribute('height', '100%')
      
      const clonedContent = emailPreviewRef.current.cloneNode(true) as HTMLElement
      clonedContent.style.width = rect.width + 'px'
      clonedContent.style.height = rect.height + 'px'
      
      foreignObject.appendChild(clonedContent)
      svg.appendChild(foreignObject)

      const svgData = new XMLSerializer().serializeToString(svg)
      const img = new Image()
      
      img.onload = () => {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, rect.width, rect.height)
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `email-${Date.now()}.png`
            a.click()
            URL.revokeObjectURL(url)
            toast.success('Email saved as image!')
          }
        })
      }
      
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
    } catch (error) {
      console.error('Error saving image:', error)
      toast.error('Failed to save image')
    }
  }

  const copyContent = () => {
    if (campaignData.body) {
      if (currentMode === 'text') {
        // For text emails, copy as plain text
        navigator.clipboard.writeText(campaignData.body)
        toast.success('Text content copied to clipboard!')
      } else {
        // For template emails, copy HTML content
        navigator.clipboard.writeText(campaignData.body)
        toast.success('Template content copied to clipboard!')
      }
    }
  }

  const exportHTML = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${campaignData.subject}</title>
</head>
<body>
    ${campaignData.body}
</body>
</html>`
    
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `email-${Date.now()}.html`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('HTML exported!')
  }

  const handleProTemplateClick = (template: string) => {
    const userId = localStorage.getItem('user-id') || localStorage.getItem('user-email')
    const userSubscription = localStorage.getItem('user-subscription')
    
    if (userSubscription !== 'pro' && userSubscription !== 'enterprise') {
      setShowProTemplateModal(true)
      return
    }
    
    setSelectedTemplate(template)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  AI Email Studio
                </h1>
                <p className="text-sm text-gray-500">Create stunning emails with AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 text-gray-700"
              >
                <DocumentTextIcon className="h-4 w-4" />
                <span className="text-sm font-medium">History ({emailHistory.length})</span>
              </button>
              <button
                onClick={handleNewEmail}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <PlusIcon className="h-4 w-4" />
                <span className="text-sm font-medium">New Email</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex items-center justify-center p-8">
            <div className="w-full max-w-6xl">
              <AnimatePresence mode="wait">
                {!currentMode && (
                  <motion.div
                    key="mode-selection"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mb-12"
                    >
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
                        Choose Your Creation Mode
                      </h2>
                      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Select the perfect approach to craft your email masterpiece
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                      {/* Text Email Mode */}
                      <motion.button
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        onClick={() => {
                          setCurrentMode('text')
                          setEmailMode('simple')
                        }}
                        className="group relative p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200/50 hover:border-blue-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative">
                          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <DocumentTextIcon className="h-10 w-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-3">Text Email</h3>
                          <p className="text-gray-600 mb-6 text-lg">
                            Clean, professional text-based emails powered by AI
                          </p>
                          <div className="space-y-2 text-left">
                            {['AI-powered content generation', 'Customizable tone & style', 'Perfect for business communications', 'Export to multiple formats'].map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2 text-gray-600">
                                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.button>

                      {/* Template Email Mode */}
                      <motion.button
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        onClick={() => {
                          setCurrentMode('template')
                          setEmailMode('professional')
                        }}
                        className="group relative p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200/50 hover:border-purple-300/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative">
                          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <SparklesIcon className="h-10 w-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-3">Professional Template</h3>
                          <p className="text-gray-600 mb-6 text-lg">
                            Rich, branded HTML templates for stunning campaigns
                          </p>
                          <div className="space-y-2 text-left">
                            {['Rich HTML templates', 'Branded designs', 'Multiple template options', 'Pro feature'].map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2 text-gray-600">
                                <CheckCircleIcon className="h-4 w-4 text-purple-500" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Text Email Flow */}
                {currentMode === 'text' && (
                  <motion.div
                    key="text-flow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl shadow-blue-500/5"
                  >
                    {/* Progress Bar */}
                    <div className="px-8 pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-700">Step {step} of 3</span>
                        <span className="text-sm text-gray-500">{progress}% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    <div className="p-8">
                      {step === 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-8"
                        >
                          <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-800 mb-3">Tell us about your email</h3>
                            <p className="text-gray-600 text-lg">Provide details to help AI create the perfect email</p>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                What's the purpose of this email?
                              </label>
                              <textarea
                                value={campaignData.purpose}
                                onChange={(e) => setCampaignData(prev => ({ ...prev, purpose: e.target.value }))}
                                placeholder="e.g., Announce our new product launch, Send monthly newsletter, Follow up with customers..."
                                className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50/50"
                                rows={4}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                  Business/Company Name
                                </label>
                                <input
                                  type="text"
                                  value={campaignData.businessName}
                                  onChange={(e) => setCampaignData(prev => ({ ...prev, businessName: e.target.value }))}
                                  placeholder="e.g., NovaMail, TechCorp..."
                                  className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                  Product/Service
                                </label>
                                <input
                                  type="text"
                                  value={campaignData.productService}
                                  onChange={(e) => setCampaignData(prev => ({ ...prev, productService: e.target.value }))}
                                  placeholder="e.g., AI Email Generator, SaaS Platform..."
                                  className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Target URL (Optional)
                              </label>
                              <input
                                type="url"
                                value={campaignData.targetUrl}
                                onChange={(e) => setCampaignData(prev => ({ ...prev, targetUrl: e.target.value }))}
                                placeholder="https://your-website.com"
                                className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <button
                              onClick={handleNext}
                              disabled={!campaignData.purpose || !campaignData.businessName}
                              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                            >
                              <span>Next</span>
                              <ArrowRightIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-8"
                        >
                          <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-800 mb-3">Choose your style</h3>
                            <p className="text-gray-600 text-lg">Select the tone and style that best fits your needs</p>
                          </div>

                          <div className="space-y-8">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-4">Tone & Style</h4>
                              <div className="space-y-4">
                                {/* Preset tone buttons - only show if no custom tone is entered */}
                                {!toneStyle || ['friendly', 'professional', 'casual', 'formal'].includes(toneStyle) ? (
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {['friendly', 'professional', 'casual', 'formal'].map((tone) => (
                                      <button
                                        key={tone}
                                        onClick={() => setToneStyle(tone)}
                                        className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                                          toneStyle === tone
                                            ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                                            : 'border-gray-200 hover:border-gray-300 bg-white'
                                        }`}
                                      >
                                        <div className="text-center">
                                          <PaintBrushIcon className="h-6 w-6 mx-auto mb-2" />
                                          <span className="font-medium">{tone.charAt(0).toUpperCase() + tone.slice(1)}</span>
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="font-medium text-blue-800">Custom Tone Selected</p>
                                        <p className="text-sm text-blue-600">"{toneStyle}"</p>
                                      </div>
                                      <button
                                        onClick={() => setToneStyle('')}
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                      >
                                        <XMarkIcon className="h-5 w-5" />
                                      </button>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Custom tone input */}
                                <div>
                                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Or enter custom tone description
                                  </label>
                                  <input
                                    type="text"
                                    value={toneStyle}
                                    onChange={(e) => setToneStyle(e.target.value)}
                                    placeholder="e.g., enthusiastic, diplomatic, encouraging..."
                                    className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <button
                              onClick={handleBack}
                              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors flex items-center space-x-2"
                            >
                              <ArrowLeftIcon className="h-5 w-5" />
                              <span>Back</span>
                            </button>
                            <button
                              onClick={generateEmailContent}
                              disabled={isGenerating}
                              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                            >
                              {isGenerating ? (
                                <>
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                  <span>Generating...</span>
                                </>
                              ) : (
                                <>
                                  <CpuChipIcon className="h-5 w-5" />
                                  <span>Generate Email</span>
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-8 h-full flex flex-col"
                        >
                          <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-800 mb-3">Your email is ready!</h3>
                            <p className="text-gray-600 text-lg">Here's your AI-generated email</p>
                          </div>

                          <div className="space-y-6 flex-1 flex flex-col">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">Subject Line</label>
                              <input
                                type="text"
                                value={campaignData.subject}
                                onChange={(e) => setCampaignData(prev => ({ ...prev, subject: e.target.value }))}
                                className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50/50"
                              />
                            </div>

                            {/* Editable Email Content */}
                            <div className="flex-1 flex flex-col">
                              <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg flex-1 flex flex-col">
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-gray-700">Email Content</h4>
                                    <button
                                      onClick={copyContent}
                                      className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                                    >
                                      <DocumentDuplicateIcon className="h-4 w-4" />
                                      <span>Copy Text</span>
                                    </button>
                                  </div>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                  <textarea
                                    value={campaignData.body}
                                    onChange={(e) => setCampaignData(prev => ({ ...prev, body: e.target.value }))}
                                    className="w-full h-full p-6 border-0 resize-none focus:ring-0 focus:outline-none bg-white"
                                    placeholder="Your email content will appear here..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-center pt-4">
                            <button
                              onClick={handleNewEmail}
                              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                            >
                              <RocketLaunchIcon className="h-5 w-5" />
                              <span>Create New Email</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Template Email Flow */}
                {currentMode === 'template' && (
                  <motion.div
                    key="template-flow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl shadow-purple-500/5"
                  >
                    <div className="p-8">
                      {step === 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-8"
                        >
                          <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-800 mb-3">Choose Professional Template</h3>
                            <p className="text-gray-600 text-lg">Select a template that matches your brand and purpose</p>
                          </div>

                          <div className="space-y-8">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-6">Available Templates</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {['newsletter', 'announcement', 'welcome', 'follow-up', 'promotion', 'event'].map((template) => (
                                  <button
                                    key={template}
                                    onClick={() => handleProTemplateClick(template)}
                                    className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                                      selectedTemplate === template
                                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                    }`}
                                  >
                                    <div className="text-center">
                                      <div className="h-16 w-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-3 flex items-center justify-center">
                                        <DocumentTextIcon className="h-8 w-8 text-purple-500" />
                                      </div>
                                      <h5 className="font-semibold text-gray-800 capitalize">{template.replace('-', ' ')}</h5>
                                      <p className="text-xs text-gray-500 mt-1">Professional template</p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 mb-4">Tone & Style</h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['friendly', 'professional', 'casual', 'formal'].map((tone) => (
                                  <button
                                    key={tone}
                                    onClick={() => setToneStyle(tone)}
                                    className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                                      toneStyle === tone
                                        ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                    }`}
                                  >
                                    <div className="text-center">
                                      <PaintBrushIcon className="h-6 w-6 mx-auto mb-2" />
                                      <span className="font-medium">{tone.charAt(0).toUpperCase() + tone.slice(1)}</span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <button
                              onClick={() => setCurrentMode(null)}
                              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors flex items-center space-x-2"
                            >
                              <ArrowLeftIcon className="h-5 w-5" />
                              <span>Back to Mode Selection</span>
                            </button>
                            <button
                              onClick={generateEmailContent}
                              disabled={isGenerating || !selectedTemplate}
                              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                            >
                              {isGenerating ? (
                                <>
                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                  <span>Generating...</span>
                                </>
                              ) : (
                                <>
                                  <SparklesIcon className="h-5 w-5" />
                                  <span>Generate Template Email</span>
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-8 h-full flex flex-col"
                        >
                          <div className="text-center mb-8">
                            <h3 className="text-3xl font-bold text-gray-800 mb-3">Your template is ready!</h3>
                            <p className="text-gray-600 text-lg">Here's your professional template email</p>
                          </div>

                          <div className="space-y-6 flex-1 flex flex-col">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">Subject Line</label>
                              <input
                                type="text"
                                value={campaignData.subject}
                                onChange={(e) => setCampaignData(prev => ({ ...prev, subject: e.target.value }))}
                                className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50/50"
                              />
                            </div>

                            {/* Editable Template Display */}
                            <div className="flex-1 flex flex-col">
                              <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg flex-1 flex flex-col">
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-gray-700">Professional Template</h4>
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={copyContent}
                                        className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                                      >
                                        <DocumentDuplicateIcon className="h-4 w-4" />
                                        <span>Copy</span>
                                      </button>
                                      <button
                                        onClick={saveAsImage}
                                        className="flex items-center space-x-1 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                                      >
                                        <CameraIcon className="h-4 w-4" />
                                        <span>Save</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                  <textarea
                                    value={campaignData.body}
                                    onChange={(e) => setCampaignData(prev => ({ ...prev, body: e.target.value }))}
                                    className="w-full h-full p-6 border-0 resize-none focus:ring-0 focus:outline-none bg-white"
                                    placeholder="Your template content will appear here..."
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-center pt-4">
                            <button
                              onClick={handleNewEmail}
                              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                            >
                              <RocketLaunchIcon className="h-5 w-5" />
                              <span>Create New Email</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* History Sidebar */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 h-full w-80 bg-white/90 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto border-l border-gray-200/50"
            >
              <div className="p-6 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">Email History</h3>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                {emailHistory.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <DocumentTextIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No emails generated yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {emailHistory.map((email) => (
                      <div key={email.id} className="p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                        <h4 className="font-semibold text-gray-800 mb-1">{email.subject}</h4>
                        <p className="text-sm text-gray-600 mb-2">{email.businessName}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className={`px-2 py-1 rounded-full ${
                            email.emailMode === 'professional' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {email.emailMode}
                          </span>
                          <span>{new Date(email.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pro Template Modal */}
        {showProTemplateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <SparklesIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Professional Templates</h3>
                <p className="text-gray-600 mb-6">
                  Professional templates are available for Pro users. Upgrade to unlock premium email templates and advanced features.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowProTemplateModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowProTemplateModal(false)
                      router.push('/pricing')
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                  >
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}