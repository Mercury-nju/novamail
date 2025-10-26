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
  CheckIcon
} from '@heroicons/react/24/outline'
import { professionalTemplates, type ProfessionalTemplate } from '@/lib/templates'

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
        {/* 统一的3列布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Template Details */}
          <motion.div
            key={currentTemplate.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
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
            </div>
          </motion.div>

          {/* Right Column - Template Selection & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Template Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Templates</h3>
              <div className="grid grid-cols-2 gap-3">
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

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUseTemplate}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <RocketLaunchIcon className="w-5 h-5 mr-2" />
                  Use This Template
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
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

            {/* Getting Started */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Getting Started</h3>
              <p className="text-sm text-gray-600 mb-4">
                Choose a template and customize it to match your brand perfectly.
              </p>
              <Link
                href="/dashboard/campaigns/new"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Browse all templates
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}