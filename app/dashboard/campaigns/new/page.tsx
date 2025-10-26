'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { 
  SparklesIcon, 
  ArrowRightIcon,
  ArrowLeftIcon,
  XMarkIcon,
  RocketLaunchIcon,
  PencilIcon,
  EyeIcon,
  CheckIcon,
  CpuChipIcon,
  LightBulbIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline'
import { professionalTemplates, type ProfessionalTemplate } from '@/lib/templates'
import AIAssistant from '@/components/AIAssistant'

interface CampaignData {
  templateId: string
  subject: string
  body: string
  businessName: string
  productService: string
  targetUrl: string
  tone: string
  targetAudience: string
  customizations: Record<string, string>
}

export default function NewCampaignPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [campaignData, setCampaignData] = useState<CampaignData>({
    templateId: '',
    subject: '',
    body: '',
    businessName: '',
    productService: '',
    targetUrl: '',
    tone: 'professional',
    targetAudience: '',
    customizations: {}
  })

  useEffect(() => {
    const templateId = searchParams.get('template')
    if (templateId) {
      const index = professionalTemplates.findIndex(t => t.id === templateId)
      if (index !== -1) {
        setCurrentTemplateIndex(index)
      }
    }
  }, [searchParams])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrevTemplate()
      } else if (event.key === 'ArrowRight') {
        handleNextTemplate()
      } else if (event.key === 'Enter' && event.target === document.body) {
        handleUseTemplate()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  const currentTemplate = professionalTemplates[currentTemplateIndex]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Modern': return 'bg-gray-100 text-gray-700'
      case 'Minimal': return 'bg-gray-100 text-gray-700'
      case 'Corporate': return 'bg-gray-100 text-gray-700'
      case 'Creative': return 'bg-gray-100 text-gray-700'
      case 'Elegant': return 'bg-gray-100 text-gray-700'
      case 'Bold': return 'bg-gray-100 text-gray-700'
      case 'Newsletter': return 'bg-gray-100 text-gray-700'
      case 'Product': return 'bg-gray-100 text-gray-700'
      case 'Onboarding': return 'bg-gray-100 text-gray-700'
      case 'Events': return 'bg-gray-100 text-gray-700'
      case 'Sales': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleNextTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev + 1) % professionalTemplates.length)
  }

  const handlePrevTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev - 1 + professionalTemplates.length) % professionalTemplates.length)
  }

  const handleUseTemplate = () => {
    setCampaignData(prev => ({
      ...prev,
      templateId: currentTemplate.id,
      subject: currentTemplate.subject,
      body: currentTemplate.htmlContent
    }))
    // Navigate to the editing page
    router.push(`/dashboard/campaigns/edit?template=${currentTemplate.id}`)
  }

  const handleAITemplateSelect = (template: ProfessionalTemplate) => {
    setCurrentTemplateIndex(professionalTemplates.findIndex(t => t.id === template.id))
    setShowAIAssistant(false)
    toast.success(`Selected ${template.name} template!`)
  }

  const handleSaveTemplate = () => {
    const templateData = {
      name: currentTemplate.name,
      category: currentTemplate.category,
      subject: currentTemplate.subject,
      htmlContent: currentTemplate.htmlContent,
      features: currentTemplate.features,
      savedAt: new Date().toISOString()
    }

    // Create downloadable file
    const dataStr = JSON.stringify(templateData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    // Create download link
    const link = document.createElement('a')
    link.href = url
    link.download = `${currentTemplate.name.replace(/\s+/g, '_')}_template.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success(`Template "${currentTemplate.name}" saved successfully!`)
  }

  const handleCopyHTML = () => {
    navigator.clipboard.writeText(currentTemplate.htmlContent)
    toast.success('HTML code copied to clipboard!')
  }

  const handleCopySubject = () => {
    navigator.clipboard.writeText(currentTemplate.subject)
    toast.success('Subject line copied to clipboard!')
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
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
                <h1 className="text-2xl font-bold text-gray-900">Professional Templates</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {currentTemplateIndex + 1} of {professionalTemplates.length}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevTemplate}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextTemplate}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 重新设计的布局：AI助手在左边，模板在右边 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - AI Assistant */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <CpuChipIcon className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Premium
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Chat with AI for email marketing advice and content ideas
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAIAssistant(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <LightBulbIcon className="w-5 h-5" />
                <span>Ask AI Assistant</span>
              </motion.button>
            </div>

            {/* Template Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleSaveTemplate}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Save Template</p>
                    <p className="text-xs text-gray-500">Download as JSON file</p>
                  </div>
                </button>
                
                <button
                  onClick={handleCopyHTML}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                >
                  <ClipboardDocumentIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Copy HTML</p>
                    <p className="text-xs text-gray-500">Copy HTML code</p>
                  </div>
                </button>
                
                <button
                  onClick={handleCopySubject}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                >
                  <ShareIcon className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Copy Subject</p>
                    <p className="text-xs text-gray-500">Copy subject line</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Template Details and Preview */}
          <div className="lg:col-span-3">
            <motion.div
              key={currentTemplate.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 h-full"
            >
              {/* Template Info Header */}
              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{currentTemplate.name}</h2>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(currentTemplate.category)}`}>
                        {currentTemplate.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {currentTemplate.isPopular && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Popular
                      </span>
                    )}
                    {currentTemplate.isNew && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        New
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{currentTemplate.description}</p>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Features:</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentTemplate.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        <CheckIcon className="w-3 h-3 mr-1 text-green-500" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Subject Line:</h3>
                  <p className="text-sm text-gray-600">{currentTemplate.subject}</p>
                </div>
              </div>

              {/* Template Preview */}
              <div className="p-6">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="ml-4 text-sm text-gray-500 font-medium">Template Preview</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div 
                      className="w-full transform scale-50 origin-top pointer-events-none mx-auto"
                      dangerouslySetInnerHTML={{ 
                        __html: currentTemplate.htmlContent.replace(
                          /<a\s+([^>]*?)>/gi, 
                          '<a $1 style="pointer-events: none; cursor: default; text-decoration: none;">'
                        )
                      }}
                      style={{ 
                        userSelect: 'none',
                        '--preview-mode': 'true',
                        width: '200%',
                        marginLeft: '-50%'
                      } as React.CSSProperties}
                    />
                  </div>
                </div>
              </div>

              {/* Template Selection and Actions */}
              <div className="px-6 py-5 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">All Templates</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {professionalTemplates.map((template, index) => (
                        <motion.div
                          key={template.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          onClick={() => setCurrentTemplateIndex(index)}
                          className={`
                            relative cursor-pointer transition-all duration-300 p-3 rounded-xl border-2 h-20
                            ${currentTemplateIndex === index 
                              ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg shadow-blue-100/50' 
                              : 'border-gray-200 hover:border-blue-300 hover:shadow-lg hover:bg-white hover:shadow-gray-100/50'
                            }
                          `}
                        >
                          {/* Selected Indicator */}
                          {currentTemplateIndex === index && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute -top-1 -right-1"
                            >
                              <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                <CheckIcon className="w-3 h-3 text-white" />
                              </div>
                            </motion.div>
                          )}
                          
                          <div className="flex flex-col items-center text-center h-full justify-center space-y-1">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                              <SparklesIcon className="w-3 h-3 text-white" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-gray-900">{template.name}</h4>
                              <p className="text-xs text-gray-600">{template.category}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ml-6 flex flex-col space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUseTemplate}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      <RocketLaunchIcon className="w-5 h-5" />
                      <span>Use This Template</span>
                    </motion.button>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Use arrow keys to navigate</p>
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={handlePrevTemplate}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <ArrowLeftIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={handleNextTemplate}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <ArrowRightIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {showAIAssistant && (
          <AIAssistant
            onTemplateSelect={handleAITemplateSelect}
            onClose={() => setShowAIAssistant(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}