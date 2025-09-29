'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeftIcon,
  PaperAirplaneIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import EmailEditor from '@/components/EmailEditor'

interface CampaignData {
  id: number
  name: string
  purpose: string
  subject: string
  body: string
  businessName: string
  productService: string
  recipients: number
  status: string
}

export default function EditCampaignPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const campaignId = params.id as string
  const mode = searchParams.get('mode')

  const [step, setStep] = useState(1)
  const [campaignData, setCampaignData] = useState<CampaignData>({
    id: parseInt(campaignId),
    name: '',
    purpose: '',
    subject: '',
    body: '',
    businessName: '',
    productService: '',
    recipients: 0,
    status: 'draft'
  })

  useEffect(() => {
    if (mode === 'draft') {
      const mockDrafts = [
        {
          id: 2,
          name: 'Product Launch Announcement',
          purpose: 'Announce our new product launch',
          status: 'draft',
          subject: '🚀 Exciting News: Our New Product is Here!',
          body: `Hi there!

We're thrilled to announce the launch of our brand new product, [Product Name]! It's designed to [briefly explain what it does and its main benefit].

Key features include:
- Feature 1
- Feature 2
- Feature 3

Learn more and get started today!

Thanks,
The [Business Name] Team`,
          recipients: 0,
          businessName: 'NovaMail',
          productService: 'AI Email Platform'
        },
        {
          id: 4,
          name: 'Holiday Season Greetings',
          purpose: 'Send holiday greetings to customers',
          status: 'draft',
          subject: '🎄 Happy Holidays from [Business Name]!',
          body: `Dear Customer,

Wishing you and your loved ones a joyful holiday season! We're grateful for your support throughout the year.

As a special thank you, enjoy [offer/discount] on your next purchase.

Happy Holidays!
The [Business Name] Team`,
          recipients: 0,
          businessName: 'NovaMail',
          productService: 'Email Marketing'
        }
      ]
      const draft = mockDrafts.find(d => d.id === parseInt(campaignId))
      if (draft) {
        setCampaignData({
          ...draft,
          purpose: draft.purpose || 'General campaign purpose',
          body: draft.body || '',
          businessName: draft.businessName || '',
          productService: draft.productService || ''
        })
      } else {
        toast.error('Draft not found.')
        router.push('/dashboard/campaigns')
      }
    }
  }, [campaignId, mode, router])

  const progress = ((step - 1) / 1) * 100

  const handleNext = () => {
    if (step === 1 && (!campaignData.name.trim() || !campaignData.purpose.trim())) {
      toast.error('Please fill in Campaign Theme and Purpose')
      return
    }
    if (step === 2 && (!campaignData.subject.trim() || !campaignData.body.trim())) {
      toast.error('Please fill in Subject and Email Body')
      return
    }
    setStep(step + 1)
  }

  const handleSaveDraft = () => {
    toast.success('Campaign draft saved successfully!')
    router.push('/dashboard/campaigns')
  }

  const handlePublish = () => {
    toast.success('Campaign published successfully!')
    router.push('/dashboard/campaigns')
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
            <h1 className="text-2xl font-bold text-gray-900">Edit Campaign</h1>
            <p className="mt-1 text-sm text-gray-600">Step {step} of 2: Email Creation</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-col "
          >
            Save Draft
          </button>
          {step === 2 && (
            <button
              onClick={handlePublish}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
            >
              <PaperAirplaneIcon className="h-4 w-4" />
              <span>Publish Campaign</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <div className="space-y-8">
            {/* Campaign Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <PencilIcon className="h-5 w-5 mr-2 text-blue-600" />
                Campaign Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Theme *
                  </label>
                  <input
                    type="text"
                    value={campaignData.name}
                    onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                    placeholder="Enter campaign theme"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Purpose *
                  </label>
                  <textarea
                    value={campaignData.purpose}
                    onChange={(e) => setCampaignData({ ...campaignData, purpose: e.target.value })}
                    placeholder="What is the purpose of this email campaign?"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={campaignData.businessName}
                    onChange={(e) => setCampaignData({ ...campaignData, businessName: e.target.value })}
                    placeholder="Your business or company name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product/Service Description
                  </label>
                  <textarea
                    value={campaignData.productService}
                    onChange={(e) => setCampaignData({ ...campaignData, productService: e.target.value })}
                    placeholder="Describe your product or service"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={!campaignData.name.trim() || !campaignData.purpose.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Create Content
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            {/* Email Content Creation */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <PencilIcon className="h-5 w-5 mr-2 text-blue-600" />
                Email Content
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    value={campaignData.subject}
                    onChange={(e) => setCampaignData({ ...campaignData, subject: e.target.value })}
                    placeholder="Enter email subject line"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    Email Body *
                  </label>
                  <EmailEditor
                    content={campaignData.body}
                    onChange={(content) => setCampaignData({ ...campaignData, body: content })}
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Desktop Preview */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Desktop Preview</h4>
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="bg-white border border-gray-200 rounded-lg">
                      <div className="border-b border-gray-200 p-4">
                        <div className="text-sm text-gray-600 mb-1">Subject:</div>
                        <div className="font-medium text-gray-900">{campaignData.subject}</div>
                      </div>
                      <div className="p-4">
                        <div className="prose max-w-none text-gray-800"
                             dangerouslySetInnerHTML={{ __html: campaignData.body }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Preview */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Mobile Preview</h4>
                  <div className="w-64 mx-auto border-2 border-gray-800 rounded-lg bg-gray-900">
                    <div className="h-8 bg-gray-800 rounded-t-lg flex items-center justify-center">
                      <div className="w-16 h-3 bg-gray-700 rounded"></div>
                    </div>
                    <div className="bg-white p-3 space-y-2">
                      <div className="text-xs text-gray-600">To:</div>
                      <div className="text-sm font-medium text-gray-900">{campaignData.subject}</div>
                      <div className="text-xs text-gray-500 border-t pt-2 line-clamp-3">
                        <div dangerouslySetInnerHTML={{ __html: campaignData.body.substring(0, 100) + '...' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Campaign Theme</div>
                  <div className="text-gray-900">{campaignData.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Business Name</div>
                  <div className="text-gray-900">{campaignData.businessName || 'Not specified'}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Purpose</div>
                  <div className="text-gray-900">{campaignData.purpose}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Subject Line</div>
                  <div className="text-gray-900">{campaignData.subject}</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back
              </button>
              <div className="space-x-4">
                <button
                  onClick={handleSaveDraft}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition-colors"
                >
                  Save Draft
                </button>
                <button
                  onClick={handlePublish}
                  className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                  <span>Publish Campaign</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}