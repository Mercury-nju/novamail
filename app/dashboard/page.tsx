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
  EyeIcon,
  EyeSlashIcon,
  CameraIcon,
  DocumentDuplicateIcon,
  PlusIcon
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
        setStep(3)
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
      navigator.clipboard.writeText(campaignData.body)
      toast.success('Content copied to clipboard!')
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">AI Email Generator</h1>
              <p className="text-blue-100">Create professional emails with AI assistance</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <DocumentTextIcon className="h-5 w-5" />
                History ({emailHistory.length})
              </button>
              <button
                onClick={handleNewEmail}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                New Email
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-lg border border-gray-200">
          {/* Progress Bar */}
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Step {step} of 3</span>
              <span className="text-sm text-gray-500">{progress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Tell us about your email</h2>
                  <p className="text-gray-600">Provide some details to help AI generate the perfect email for you</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What's the purpose of this email?
                    </label>
                    <textarea
                      value={campaignData.purpose}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, purpose: e.target.value }))}
                      placeholder="e.g., Announce our new product launch, Send monthly newsletter, Follow up with customers..."
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleNext}
                    disabled={!campaignData.purpose || !campaignData.businessName}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose your style</h2>
                  <p className="text-gray-600">Select the email mode and style that best fits your needs</p>
                </div>

                <div className="space-y-8">
                  {/* Email Mode Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Email Mode</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setEmailMode('simple')}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                          emailMode === 'simple'
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <DocumentTextIcon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                          <h4 className="font-semibold text-gray-800">Simple Email</h4>
                          <p className="text-sm text-gray-600 mt-1">Clean, straightforward content</p>
                        </div>
                      </button>
                      <button
                        onClick={() => setEmailMode('professional')}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                          emailMode === 'professional'
                            ? 'border-purple-500 bg-purple-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <SparklesIcon className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                          <h4 className="font-semibold text-gray-800">Professional Template</h4>
                          <p className="text-sm text-gray-600 mt-1">Rich, branded templates</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Professional Templates */}
                  {emailMode === 'professional' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Template</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {['newsletter', 'announcement', 'welcome', 'follow-up', 'promotion', 'event'].map((template) => (
                          <button
                            key={template}
                            onClick={() => handleProTemplateClick(template)}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                              selectedTemplate === template
                                ? 'border-purple-500 bg-purple-50 shadow-lg'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-center">
                              <div className="h-12 w-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mb-2 flex items-center justify-center">
                                <DocumentTextIcon className="h-6 w-6 text-purple-500" />
                              </div>
                              <h4 className="font-medium text-gray-800 capitalize">{template.replace('-', ' ')}</h4>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tone Style */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tone & Style</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['friendly', 'professional', 'casual', 'formal'].map((tone) => (
                        <button
                          key={tone}
                          onClick={() => setToneStyle(tone)}
                          className={`p-3 rounded-lg border transition-all duration-200 ${
                            toneStyle === tone
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {tone.charAt(0).toUpperCase() + tone.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={generateEmailContent}
                    disabled={isGenerating}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="h-5 w-5" />
                        Generate Email
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
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Review & Export</h2>
                  <p className="text-gray-600">Your AI-generated email is ready!</p>
                </div>

                <div className="space-y-6">
                  {/* Subject Line */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                    <input
                      type="text"
                      value={campaignData.subject}
                      onChange={(e) => setCampaignData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  {/* Preview Toggle */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      {showPreview ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </button>
                  </div>

                  {/* Email Preview */}
                  {showPreview && (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                        <h4 className="font-medium text-gray-700">Email Preview</h4>
                      </div>
                      <div
                        ref={emailPreviewRef}
                        className="p-6 bg-white min-h-[400px]"
                        dangerouslySetInnerHTML={{ __html: campaignData.body }}
                      />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button
                      onClick={saveAsImage}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <CameraIcon className="h-5 w-5" />
                      Save as Image
                    </button>
                    <button
                      onClick={copyContent}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <DocumentDuplicateIcon className="h-5 w-5" />
                      Copy Content
                    </button>
                    <button
                      onClick={exportHTML}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <DocumentTextIcon className="h-5 w-5" />
                      Export HTML
                    </button>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleNewEmail}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Create New Email
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* History Sidebar */}
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Email History</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
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
                    <div key={email.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-gray-800 mb-1">{email.subject}</h4>
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

        {/* Pro Template Modal */}
        {showProTemplateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
              <div className="text-center">
                <SparklesIcon className="h-16 w-16 mx-auto mb-4 text-purple-500" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Professional Templates</h3>
                <p className="text-gray-600 mb-6">
                  Professional templates are available for Pro users. Upgrade to unlock premium email templates and advanced features.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowProTemplateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowProTemplateModal(false)
                      router.push('/pricing')
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                  >
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}