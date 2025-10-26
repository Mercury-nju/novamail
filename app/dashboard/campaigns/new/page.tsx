'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  SparklesIcon, 
  ArrowRightIcon,
  ArrowLeftIcon,
  RocketLaunchIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

interface CampaignData {
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
  const [campaignData, setCampaignData] = useState<CampaignData>({
    subject: '',
    body: '',
    businessName: '',
    productService: '',
    targetUrl: '',
    tone: 'professional',
    targetAudience: ''
  })

  const handleBack = () => {
    router.push('/dashboard')
  }

  const handleCreateCampaign = () => {
    if (!campaignData.subject.trim() || !campaignData.body.trim()) {
      toast.error('Please fill in subject and body')
      return
    }
    
    // Navigate to the editing page with campaign data
    const params = new URLSearchParams({
      subject: campaignData.subject,
      body: campaignData.body,
      businessName: campaignData.businessName,
      productService: campaignData.productService,
      targetUrl: campaignData.targetUrl,
      tone: campaignData.tone,
      targetAudience: campaignData.targetAudience
    })
    
    router.push(`/dashboard/campaigns/edit?${params.toString()}`)
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
                <h1 className="text-2xl font-bold text-gray-900">Create New Campaign</h1>
              </div>
            </div>
                    </div>
              </div>
            </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
                <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Your Email Campaign</h2>
            <p className="text-gray-600 text-lg">
              Start with basic information and create your email content
                  </p>
                </div>

          <div className="space-y-6">
            {/* Business Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={campaignData.businessName}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, businessName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your business name"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What you're promoting"
                />
                  </div>
                </div>

            {/* Campaign Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Subject
              </label>
              <input
                type="text"
                value={campaignData.subject}
                onChange={(e) => setCampaignData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email subject line"
              />
                  </div>
                  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={campaignData.targetAudience}
                onChange={(e) => setCampaignData(prev => ({ ...prev, targetAudience: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Who is your target audience?"
              />
                </div>
                
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tone
              </label>
              <select
                value={campaignData.tone}
                onChange={(e) => setCampaignData(prev => ({ ...prev, tone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="persuasive">Persuasive</option>
              </select>
              </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target URL (Optional)
              </label>
              <input
                type="url"
                value={campaignData.targetUrl}
                onChange={(e) => setCampaignData(prev => ({ ...prev, targetUrl: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com"
                    />
                  </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Content
              </label>
              <textarea
                value={campaignData.body}
                onChange={(e) => setCampaignData(prev => ({ ...prev, body: e.target.value }))}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your email content here..."
              />
            </div>
                  </div>
                  
          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                      <button
              onClick={handleBack}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateCampaign}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <RocketLaunchIcon className="h-5 w-5 mr-2" />
              Create Campaign
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </motion.button>
        </div>
        </motion.div>
      </div>
    </div>
  )
}