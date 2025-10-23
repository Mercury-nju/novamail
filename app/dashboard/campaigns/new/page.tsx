'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
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
    <div className="min-h-screen bg-white">
          {/* Header */}
      <div className="border-b border-gray-100">
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
              <div className="text-sm text-gray-600">
                {currentTemplateIndex + 1} of {professionalTemplates.length}
              </div>
            </div>
                    </div>
              </div>
            </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-3">Choose Your Template</h2>
          <p className="text-gray-500 max-w-lg mx-auto">Select a design style that matches your brand</p>
                </div>
                
        {/* Template Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
                    <button
            onClick={handlePrevTemplate}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600 hover:shadow-md transition-all duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5" />
                    </button>

                    <button
            onClick={handleNextTemplate}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600 hover:shadow-md transition-all duration-200"
          >
            <ArrowRightIcon className="h-5 w-5" />
                    </button>

          {/* Template Display */}
          <motion.div
            key={currentTemplateIndex}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Template Info */}
              <div className="p-8 lg:p-10">
                <div className="text-center mb-8">
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentTemplate.category)}`}>
                      {currentTemplate.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-light text-gray-900 mb-3">{currentTemplate.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                    {currentTemplate.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="space-y-2">
                    {currentTemplate.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center px-3 py-2 bg-gray-50 rounded-md"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>


                <motion.button 
                  onClick={handleUseTemplate}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-all duration-200"
                >
                  <span>Use This Template</span>
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </motion.button>
                  </div>
                  
              {/* Template Preview */}
              <div className="bg-gray-50 p-6 lg:p-8">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-1">Preview</h4>
                  <p className="text-xs text-gray-500">Email design preview</p>
                </div>
                
                {/* Subject Line Preview */}
                <div className="mb-4">
                  <div className="bg-white rounded border border-gray-200 p-3">
                    <div className="text-xs text-gray-400 mb-1">Subject</div>
                    <div className="text-sm text-gray-900">
                      {currentTemplate.subject}
                    </div>
                  </div>
              </div>

                {/* Email Content Preview */}
                <div className="bg-white rounded border border-gray-200 overflow-hidden">
                  <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-3 max-h-80 overflow-y-auto">
                    <div 
                      className="w-full transform scale-75 origin-top pointer-events-none"
                      dangerouslySetInnerHTML={{ 
                        __html: currentTemplate.htmlContent.replace(
                          /<a\s+([^>]*?)>/gi, 
                          '<a $1 style="pointer-events: none; cursor: default; text-decoration: none;">'
                        )
                      }}
                      style={{ 
                        userSelect: 'none',
                        '--preview-mode': 'true'
                      } as React.CSSProperties}
                    />
                  </div>
                  </div>
                </div>
            </div>
          </motion.div>
                  </div>
                  
        {/* Template Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {professionalTemplates.map((template, index) => (
                      <button
              key={index}
              onClick={() => setCurrentTemplateIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentTemplateIndex
                  ? 'bg-gray-900'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}