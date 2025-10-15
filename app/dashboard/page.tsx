'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DocumentTextIcon, 
  SparklesIcon, 
  DocumentDuplicateIcon, 
  CameraIcon, 
  RocketLaunchIcon,
  PaintBrushIcon,
  XMarkIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface CampaignData {
  subject: string
  body: string
  purpose: string
  businessName: string
  productService: string
  targetUrl: string
}

export default function Dashboard() {
  const [campaignData, setCampaignData] = useState<CampaignData>({
    subject: '',
    body: '',
    purpose: '',
    businessName: '',
    productService: '',
    targetUrl: ''
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [toneStyle, setToneStyle] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [emailMode, setEmailMode] = useState<'simple' | 'professional'>('simple')
  const [showProTemplateModal, setShowProTemplateModal] = useState(false)
  const [showTemplatePreview, setShowTemplatePreview] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState('')
  const [emailHistory, setEmailHistory] = useState<any[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // Load email history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('email-history')
    if (savedHistory) {
      try {
        setEmailHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Failed to load email history:', error)
      }
    }
  }, [])

  const handleNewEmail = () => {
    setCampaignData({
      subject: '',
      body: '',
      purpose: '',
      businessName: '',
      productService: '',
      targetUrl: ''
    })
    setToneStyle('')
    setSelectedTemplate('')
    setEmailMode('simple')
    setShowProTemplateModal(false)
    setShowTemplatePreview(false)
  }

  const handleProTemplateClick = (template: string) => {
    const userId = localStorage.getItem('user-id') || localStorage.getItem('user-email')
    const userSubscription = localStorage.getItem('user-subscription')
    
    // 特殊用户：2945235656@qq.com 获得企业级权限
    const isSpecialUser = userId === '2945235656@qq.com'
    
    if (!isSpecialUser && userSubscription !== 'pro' && userSubscription !== 'enterprise') {
      setShowProTemplateModal(true)
      return
    }
    
    setSelectedTemplate(template)
    setEmailMode('professional')
  }

  const handleTemplatePreview = (template: string) => {
    setPreviewTemplate(template)
    setShowTemplatePreview(true)
  }

  const generateEmailContent = async () => {
    if (!campaignData.purpose || !campaignData.businessName) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsGenerating(true)
    
    try {
      // 获取用户邮箱
      const userEmail = localStorage.getItem('user-id') || localStorage.getItem('user-email') || '2945235656@qq.com'
      
      const response = await fetch('/api/ai/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          purpose: campaignData.purpose,
          businessName: campaignData.businessName,
          productService: campaignData.productService,
          targetUrl: campaignData.targetUrl,
          toneStyle: toneStyle,
          template: selectedTemplate,
          emailMode: emailMode,
          email: userEmail
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate email')
      }

      const data = await response.json()
      
      setCampaignData(prev => ({
        ...prev,
        subject: data.subject || '',
        body: data.body || ''
      }))

      // Save to history
      const newEmail = {
        id: Date.now(),
        subject: data.subject || '',
        body: data.body || '',
        purpose: campaignData.purpose,
        businessName: campaignData.businessName,
        template: selectedTemplate,
        mode: emailMode,
        createdAt: new Date().toISOString()
      }
      
      const updatedHistory = [newEmail, ...emailHistory]
      setEmailHistory(updatedHistory)
      localStorage.setItem('email-history', JSON.stringify(updatedHistory))

      toast.success('Email generated successfully!')
    } catch (error) {
      console.error('Error generating email:', error)
      toast.error('Failed to generate email. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(campaignData.body)
      toast.success('Content copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy content:', error)
      toast.error('Failed to copy content')
    }
  }

  const saveAsImage = async () => {
    try {
      // Create a temporary div with the email content
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = campaignData.body
      tempDiv.style.cssText = `
        position: absolute;
        top: -9999px;
        left: -9999px;
        width: 800px;
        padding: 40px;
        background: white;
        font-family: Arial, sans-serif;
        font-size: 14px;
        line-height: 1.6;
        color: #333;
      `
      document.body.appendChild(tempDiv)

      // Convert to canvas using html2canvas alternative
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 800
      canvas.height = tempDiv.scrollHeight

      // Create SVG with foreignObject
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('width', '800')
      svg.setAttribute('height', tempDiv.scrollHeight.toString())
      
      const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
      foreignObject.setAttribute('width', '100%')
      foreignObject.setAttribute('height', '100%')
      foreignObject.appendChild(tempDiv.cloneNode(true))
      svg.appendChild(foreignObject)

      // Convert SVG to image
      const svgData = new XMLSerializer().serializeToString(svg)
      const img = new Image()
      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `email-${Date.now()}.png`
            a.click()
            URL.revokeObjectURL(url)
            toast.success('Image saved successfully!')
          }
        }, 'image/png')
      }
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
      
      document.body.removeChild(tempDiv)
    } catch (error) {
      console.error('Failed to save as image:', error)
      toast.error('Failed to save as image')
    }
  }

  const fetchMembershipInfo = () => {
    const userId = localStorage.getItem('user-id') || localStorage.getItem('user-email')
    const userSubscription = localStorage.getItem('user-subscription')
    
    if (userId === '2945235656@qq.com') {
      toast.success('You have Enterprise access (99-year membership)!')
    } else if (userSubscription === 'pro' || userSubscription === 'enterprise') {
      toast.success(`You have ${userSubscription} access!`)
    } else {
      toast.error('You have free access. Upgrade to Pro for professional templates!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            AI Email Studio
          </h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 text-gray-700 text-sm"
            >
              <DocumentTextIcon className="h-4 w-4" />
              <span>History ({emailHistory.length})</span>
            </button>
            <button
              onClick={fetchMembershipInfo}
              className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 text-sm"
            >
              <SparklesIcon className="h-4 w-4" />
              <span>Membership</span>
            </button>
            <button
              onClick={handleNewEmail}
              className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 text-sm"
            >
              <PlusIcon className="h-4 w-4" />
              <span>New Email</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Direct Email Generation Interface */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl shadow-blue-500/5">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">AI Email Generator</h2>
                <p className="text-gray-600 text-lg">Choose your email type and create professional emails with AI</p>
              </div>

              {/* Email Type Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Choose Email Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {/* Text Email Option */}
                  <div
                    className={`p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer ${
                      emailMode === 'simple'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg'
                    }`}
                    onClick={() => {
                      setEmailMode('simple')
                      setSelectedTemplate('')
                    }}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                        <DocumentTextIcon className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Text Email</h4>
                      <p className="text-gray-600 mb-4">Clean, professional text-based emails</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          <span>Free to use</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          <span>AI-powered content</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          <span>Customizable tone</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Template Option */}
                  <div
                    className={`p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer ${
                      emailMode === 'professional'
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg'
                    }`}
                    onClick={() => {
                      setEmailMode('professional')
                      setSelectedTemplate('')
                    }}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                        <SparklesIcon className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Professional Templates</h4>
                      <p className="text-gray-600 mb-4">Rich, branded HTML templates</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center justify-center space-x-2">
                          <SparklesIcon className="h-4 w-4 text-purple-500" />
                          <span>Pro/Enterprise required</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <SparklesIcon className="h-4 w-4 text-purple-500" />
                          <span>Multiple templates</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <SparklesIcon className="h-4 w-4 text-purple-500" />
                          <span>Branded designs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Email Form - Only show if simple mode is selected */}
              {emailMode === 'simple' && (
                <div className="space-y-8">
                  {/* Email Details Section */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Email Details</h4>
                    
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

                  {/* Tone & Style Section */}
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
              )}

              {/* Professional Template Form - Only show if professional mode is selected */}
              {emailMode === 'professional' && (
                <div className="space-y-8">
                  {/* Email Details Section */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Email Details</h4>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        What's the purpose of this email?
                      </label>
                      <textarea
                        value={campaignData.purpose}
                        onChange={(e) => setCampaignData(prev => ({ ...prev, purpose: e.target.value }))}
                        placeholder="e.g., Announce our new product launch, Send monthly newsletter, Follow up with customers..."
                        className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-gray-50/50"
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
                          className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50/50"
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
                          className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50/50"
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
                        className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50/50"
                      />
                    </div>
                  </div>

                  {/* Professional Templates Section */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-6">Choose Professional Template</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { id: 'newsletter', name: 'Newsletter', icon: '📰', color: 'from-blue-500 to-cyan-500', bgColor: 'from-blue-50 to-cyan-50', description: 'Weekly updates & insights' },
                        { id: 'announcement', name: 'Announcement', icon: '📢', color: 'from-purple-500 to-pink-500', bgColor: 'from-purple-50 to-pink-50', description: 'Important company news' },
                        { id: 'welcome', name: 'Welcome', icon: '👋', color: 'from-green-500 to-emerald-500', bgColor: 'from-green-50 to-emerald-50', description: 'Onboarding & greetings' },
                        { id: 'follow-up', name: 'Follow-up', icon: '🔄', color: 'from-orange-500 to-red-500', bgColor: 'from-orange-50 to-red-50', description: 'Customer engagement' },
                        { id: 'promotion', name: 'Promotion', icon: '🎯', color: 'from-yellow-500 to-orange-500', bgColor: 'from-yellow-50 to-orange-50', description: 'Sales & marketing' },
                        { id: 'event', name: 'Event', icon: '🎉', color: 'from-indigo-500 to-purple-500', bgColor: 'from-indigo-50 to-purple-50', description: 'Events & invitations' }
                      ].map((template) => (
                        <div
                          key={template.id}
                          className={`group relative p-6 rounded-3xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                            selectedTemplate === template.id
                              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          {/* Template Header */}
                          <div className="text-center mb-6">
                            <div className={`h-20 w-full bg-gradient-to-br ${template.bgColor} rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden`}>
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                              <div className="text-4xl relative z-10">{template.icon}</div>
                              <div className={`absolute top-2 right-2 w-3 h-3 bg-gradient-to-r ${template.color} rounded-full animate-pulse`}></div>
                            </div>
                            <h5 className="font-bold text-gray-800 text-lg mb-1">{template.name}</h5>
                            <p className="text-sm text-gray-500">{template.description}</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleProTemplateClick(template.id)}
                              className={`flex-1 px-4 py-2 bg-gradient-to-r ${template.color} text-white rounded-xl hover:shadow-lg transition-all duration-200 text-sm font-medium`}
                            >
                              Select
                            </button>
                            <button
                              onClick={() => handleTemplatePreview(template.id)}
                              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm font-medium"
                            >
                              Preview
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tone & Style Section */}
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
                      ) : (
                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-purple-800">Custom Tone Selected</p>
                              <p className="text-sm text-purple-600">"{toneStyle}"</p>
                            </div>
                            <button
                              onClick={() => setToneStyle('')}
                              className="text-purple-600 hover:text-purple-800 transition-colors"
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
                          className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center mt-8">
                <button
                  onClick={generateEmailContent}
                  disabled={isGenerating || !campaignData.purpose || !campaignData.businessName || (emailMode === 'professional' && !selectedTemplate)}
                  className={`px-8 py-3 text-white rounded-2xl hover:shadow-xl transition-all duration-200 shadow-lg flex items-center space-x-2 ${
                    emailMode === 'simple'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                      : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-5 w-5" />
                      <span>{emailMode === 'simple' ? 'Generate Text Email' : 'Generate Template Email'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Email Result Display */}
          {campaignData.body && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl shadow-green-500/5"
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-3">Your email is ready!</h3>
                  <p className="text-gray-600 text-lg">Here's your AI-generated email</p>
                </div>

                <div className="space-y-6">
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
                  <div className="w-full">
                    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-700">Email Content</h4>
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
                      <div className="bg-white">
                        <textarea
                          value={campaignData.body}
                          onChange={(e) => setCampaignData(prev => ({ ...prev, body: e.target.value }))}
                          className="w-full p-6 border-0 resize-none focus:ring-0 focus:outline-none bg-white min-h-[400px]"
                          placeholder="Your email content will appear here..."
                          rows={Math.max(15, campaignData.body.split('\n').length)}
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
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Pro Template Modal */}
      {showProTemplateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <SparklesIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Professional Templates</h3>
              <p className="text-gray-600 mb-6">
                Professional templates are available with Pro or Enterprise membership. Upgrade to access beautiful, branded email templates.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowProTemplateModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowProTemplateModal(false)
                    // Here you would typically redirect to pricing or payment
                    toast.success('Redirecting to upgrade...')
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Preview Modal */}
      {showTemplatePreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Template Preview</h3>
              <button
                onClick={() => setShowTemplatePreview(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {previewTemplate === 'newsletter' && 'Newsletter Template'}
                  {previewTemplate === 'announcement' && 'Announcement Template'}
                  {previewTemplate === 'welcome' && 'Welcome Template'}
                  {previewTemplate === 'follow-up' && 'Follow-up Template'}
                  {previewTemplate === 'promotion' && 'Promotion Template'}
                  {previewTemplate === 'event' && 'Event Template'}
                </h4>
                <p className="text-gray-600">
                  {previewTemplate === 'newsletter' && 'Perfect for weekly updates and company insights'}
                  {previewTemplate === 'announcement' && 'Ideal for important company news and announcements'}
                  {previewTemplate === 'welcome' && 'Great for onboarding new customers and team members'}
                  {previewTemplate === 'follow-up' && 'Excellent for customer engagement and relationship building'}
                  {previewTemplate === 'promotion' && 'Designed for sales campaigns and marketing promotions'}
                  {previewTemplate === 'event' && 'Perfect for event invitations and RSVP management'}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h5 className="font-semibold text-gray-700 mb-3">Sample Subject:</h5>
                <p className="text-gray-600 mb-4">
                  {previewTemplate === 'newsletter' && 'Weekly Update: Latest News & Insights from Our Team'}
                  {previewTemplate === 'announcement' && 'Important Announcement: New Product Launch'}
                  {previewTemplate === 'welcome' && 'Welcome to Our Platform - Let\'s Get Started!'}
                  {previewTemplate === 'follow-up' && 'Following Up: How Can We Help You Succeed?'}
                  {previewTemplate === 'promotion' && 'Limited Time Offer: 50% Off Premium Features'}
                  {previewTemplate === 'event' && 'You\'re Invited: Annual Company Conference 2024'}
                </p>

                <h5 className="font-semibold text-gray-700 mb-3">Sample Content Preview:</h5>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 space-y-2">
                    {previewTemplate === 'newsletter' && (
                      <>
                        <p>Dear [Name],</p>
                        <p>Welcome to this week's newsletter! We're excited to share the latest updates, insights, and news from our team.</p>
                        <p><strong>This Week's Highlights:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>New feature releases and improvements</li>
                          <li>Industry insights and trends</li>
                          <li>Customer success stories</li>
                          <li>Upcoming events and webinars</li>
                        </ul>
                        <p>Thank you for being part of our community!</p>
                        <p>Best regards,<br/>The Team</p>
                      </>
                    )}
                    {previewTemplate === 'announcement' && (
                      <>
                        <p>Dear Team,</p>
                        <p>We're thrilled to announce an exciting new development that will significantly impact our business and our customers.</p>
                        <p><strong>What's New:</strong></p>
                        <p>We're launching a revolutionary new product that addresses the key challenges our customers face. This represents months of research, development, and dedication from our entire team.</p>
                        <p><strong>Key Benefits:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Improved efficiency and productivity</li>
                          <li>Enhanced user experience</li>
                          <li>Better integration capabilities</li>
                        </ul>
                        <p>We're excited to share more details in the coming weeks.</p>
                        <p>Best regards,<br/>Leadership Team</p>
                      </>
                    )}
                    {previewTemplate === 'welcome' && (
                      <>
                        <p>Welcome [Name]!</p>
                        <p>We're absolutely delighted to have you join our community. You've just taken the first step toward an incredible journey with us.</p>
                        <p><strong>Getting Started:</strong></p>
                        <ol className="list-decimal list-inside ml-4 space-y-1">
                          <li>Complete your profile setup</li>
                          <li>Explore our platform features</li>
                          <li>Join our community discussions</li>
                          <li>Attend your first webinar</li>
                        </ol>
                        <p>If you have any questions, our support team is here to help!</p>
                        <p>Welcome aboard!<br/>The Team</p>
                      </>
                    )}
                    {previewTemplate === 'follow-up' && (
                      <>
                        <p>Hi [Name],</p>
                        <p>I hope this email finds you well. I wanted to follow up on our recent conversation and see how things are progressing.</p>
                        <p><strong>How We Can Help:</strong></p>
                        <p>Based on our discussion, I believe we can provide significant value in several key areas:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Streamlining your current processes</li>
                          <li>Reducing operational costs</li>
                          <li>Improving team productivity</li>
                        </ul>
                        <p>Would you be available for a brief call this week to discuss next steps?</p>
                        <p>Looking forward to hearing from you,<br/>[Your Name]</p>
                      </>
                    )}
                    {previewTemplate === 'promotion' && (
                      <>
                        <p>Don't Miss Out!</p>
                        <p>For a limited time only, we're offering an exclusive discount that you won't want to miss.</p>
                        <p><strong>Special Offer:</strong></p>
                        <p>Get 50% off our premium features - but hurry, this offer expires soon!</p>
                        <p><strong>What You Get:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Advanced analytics and reporting</li>
                          <li>Priority customer support</li>
                          <li>Exclusive features and tools</li>
                          <li>Custom integrations</li>
                        </ul>
                        <p>This is a limited-time offer - act now!</p>
                        <p>Best regards,<br/>Sales Team</p>
                      </>
                    )}
                    {previewTemplate === 'event' && (
                      <>
                        <p>You're Invited!</p>
                        <p>We're excited to invite you to our upcoming event that promises to be both informative and engaging.</p>
                        <p><strong>Event Details:</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li><strong>Date:</strong> [Event Date]</li>
                          <li><strong>Time:</strong> [Event Time]</li>
                          <li><strong>Location:</strong> [Event Location]</li>
                          <li><strong>Duration:</strong> [Event Duration]</li>
                        </ul>
                        <p><strong>What to Expect:</strong></p>
                        <p>Join us for an exciting day filled with presentations, networking opportunities, and valuable insights from industry experts.</p>
                        <p>Please RSVP by [RSVP Date] to secure your spot.</p>
                        <p>We look forward to seeing you there!<br/>Event Team</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowTemplatePreview(false)}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}