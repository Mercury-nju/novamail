'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  PlusIcon,
  EyeIcon,
  DocumentTextIcon,
  CalendarIcon,
  SparklesIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  RocketLaunchIcon,
  TagIcon,
  StarIcon,
  CursorArrowRaysIcon,
  ExclamationTriangleIcon,
  UserMinusIcon
} from '@heroicons/react/24/outline'

interface Campaign {
  id: string
  subject: string
  template: string
  templateName: string
  status: 'sent' | 'scheduled'
  createdAt: string
  sentAt?: string
  recipients: number
  openRate?: number
  clickRate?: number
  businessName: string
  purpose: string
  tone: string
  events: CampaignEvent[]
}

interface CampaignEvent {
  id: string
  type: 'created' | 'sent' | 'opened' | 'clicked' | 'bounced' | 'unsubscribed'
  timestamp: string
  details: string
  recipientEmail?: string
  metadata?: Record<string, any>
}

export default function CampaignsPage() {
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [showPreview, setShowPreview] = useState<string | null>(null)
  const [showEvents, setShowEvents] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'sent' | 'scheduled'>('all')

  useEffect(() => {
    loadCampaigns()
  }, [])

  const loadCampaigns = () => {
    // Mock data
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        subject: '🚀 Introducing [Product Name] - The Future is Here',
        template: 'product-launch',
        templateName: 'Product Launch',
        status: 'sent',
        createdAt: '2024-01-15T10:30:00Z',
        sentAt: '2024-01-15T10:30:00Z',
        recipients: 1250,
        openRate: 24.5,
        clickRate: 8.2,
        businessName: 'NovaMail',
        purpose: 'Product Launch',
        tone: 'enthusiastic',
        events: [
          {
            id: 'evt_1_1',
            type: 'created',
            timestamp: '2024-01-15T10:30:00Z',
            details: 'Campaign created with Modern Gradient template'
          },
          {
            id: 'evt_1_2',
            type: 'sent',
            timestamp: '2024-01-15T10:30:00Z',
            details: 'Campaign sent to 1,250 recipients',
            metadata: { recipientCount: 1250 }
          },
          {
            id: 'evt_1_3',
            type: 'opened',
            timestamp: '2024-01-15T11:45:00Z',
            details: 'First email opened by user@example.com',
            recipientEmail: 'user@example.com'
          },
          {
            id: 'evt_1_4',
            type: 'clicked',
            timestamp: '2024-01-15T12:15:00Z',
            details: 'CTA button clicked by user@example.com',
            recipientEmail: 'user@example.com',
            metadata: { linkUrl: 'https://example.com/cta' }
          }
        ]
      },
      {
        id: '2',
        subject: 'Welcome to [Company Name] - Let\'s Get Started!',
        template: 'customer-onboarding',
        templateName: 'Customer Onboarding',
        status: 'sent',
        createdAt: '2024-01-14T14:20:00Z',
        sentAt: '2024-01-14T14:20:00Z',
        recipients: 850,
        openRate: 32.1,
        clickRate: 12.5,
        businessName: 'NovaMail',
        purpose: 'Customer Onboarding',
        tone: 'friendly',
        events: [
          {
            id: 'evt_2_1',
            type: 'created',
            timestamp: '2024-01-14T14:20:00Z',
            details: 'Welcome campaign created'
          },
          {
            id: 'evt_2_2',
            type: 'sent',
            timestamp: '2024-01-14T14:20:00Z',
            details: 'Campaign sent to 850 new customers',
            metadata: { recipientCount: 850 }
          },
          {
            id: 'evt_2_3',
            type: 'opened',
            timestamp: '2024-01-14T15:30:00Z',
            details: 'High engagement - 32.1% open rate achieved',
            metadata: { openRate: 32.1 }
          }
        ]
      },
      {
        id: '3',
        subject: 'You\'re Invited: [Event Name] - [Date]',
        template: 'event-invitation',
        templateName: 'Event Invitation',
        status: 'scheduled',
        createdAt: '2024-01-13T09:15:00Z',
        recipients: 500,
        businessName: 'NovaMail',
        purpose: 'Event Invitation',
        tone: 'professional',
        events: [
          {
            id: 'evt_3_1',
            type: 'created',
            timestamp: '2024-01-13T09:15:00Z',
            details: 'Event invitation campaign created and scheduled'
          }
        ]
      },
      {
        id: '4',
        subject: '[Company Name] Monthly Newsletter - [Month Year]',
        template: 'newsletter-professional',
        templateName: 'Professional Newsletter',
        status: 'scheduled',
        createdAt: '2024-01-12T16:45:00Z',
        recipients: 2100,
        businessName: 'NovaMail',
        purpose: 'Newsletter',
        tone: 'professional'
      }
    ]

    setCampaigns(mockCampaigns)
    setLoading(false)
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filter === 'all') return true
    return campaign.status === filter
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent':
        return 'Sent'
      case 'draft':
        return 'Draft'
      case 'scheduled':
        return 'Scheduled'
      default:
        return 'Unknown'
    }
  }

  const getToneText = (tone: string) => {
    const tones: Record<string, string> = {
      'friendly': 'Friendly',
      'professional': 'Professional',
      'casual': 'Casual',
      'enthusiastic': 'Enthusiastic',
      'persuasive': 'Persuasive',
      'authoritative': 'Authoritative'
    }
    return tones[tone] || tone
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'created': return <SparklesIcon className="h-4 w-4" />
      case 'sent': return <RocketLaunchIcon className="h-4 w-4" />
      case 'opened': return <EyeIcon className="h-4 w-4" />
      case 'clicked': return <CursorArrowRaysIcon className="h-4 w-4" />
      case 'bounced': return <ExclamationTriangleIcon className="h-4 w-4" />
      case 'unsubscribed': return <UserMinusIcon className="h-4 w-4" />
      default: return <ClockIcon className="h-4 w-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'created': return 'text-blue-500 bg-blue-50'
      case 'sent': return 'text-green-500 bg-green-50'
      case 'opened': return 'text-purple-500 bg-purple-50'
      case 'clicked': return 'text-orange-500 bg-orange-50'
      case 'bounced': return 'text-red-500 bg-red-50'
      case 'unsubscribed': return 'text-gray-500 bg-gray-50'
      default: return 'text-gray-500 bg-gray-50'
    }
  }

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== campaignId))
    toast.success('Campaign deleted successfully')
  }

  const handleSendCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(c => 
      c.id === campaignId 
        ? { ...c, status: 'sent' as const, sentAt: new Date().toISOString() }
        : c
    ))
    toast.success('Email sent successfully!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading campaigns...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Email Campaigns</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard/campaigns/new')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <RocketLaunchIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sent</p>
                <p className="text-2xl font-bold text-gray-900">{campaigns.filter(c => c.status === 'sent').length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-900">{campaigns.filter(c => c.status === 'draft').length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <SparklesIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">AI Generated</p>
                <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 mb-8"
        >
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            {(['all', 'draft', 'sent', 'scheduled'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterType
                    ? 'bg-blue-100 text-blue-800'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                {filterType === 'all' ? 'All' : getStatusText(filterType)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Campaigns List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {filteredCampaigns.map((campaign) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <SparklesIcon className="h-5 w-5 text-blue-600" />
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        AI Generated
                      </span>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {getStatusText(campaign.status)}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <TagIcon className="h-3 w-3 mr-1" />
                      {campaign.templateName}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.subject}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Purpose:</span>
                      {campaign.purpose}
                    </div>
                    <div>
                      <span className="font-medium">Tone:</span>
                      {getToneText(campaign.tone)}
                    </div>
                    <div>
                      <span className="font-medium">Brand:</span>
                      {campaign.businessName}
                    </div>
                  </div>

                  {campaign.status === 'sent' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Recipients:</span>
                        <span className="font-medium">{campaign.recipients.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Open Rate:</span>
                        <span className="font-medium text-green-600">{campaign.openRate}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Click Rate:</span>
                        <span className="font-medium text-blue-600">{campaign.clickRate}%</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Created {formatDate(campaign.createdAt)}</span>
                    </div>
                    {campaign.sentAt && (
                      <div className="flex items-center space-x-1">
                        <RocketLaunchIcon className="h-4 w-4" />
                        <span>Sent {formatDate(campaign.sentAt)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-6">
                  <button
                    onClick={() => setShowPreview(showPreview === campaign.id ? null : campaign.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Preview"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={() => setShowEvents(showEvents === campaign.id ? null : campaign.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="View Events"
                  >
                    <ClockIcon className="h-5 w-5" />
                  </button>
                  
                  
                  <button
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Preview */}
              <AnimatePresence>
                {showPreview === campaign.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Email Preview</h4>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium mb-1">Subject: {campaign.subject}</p>
                        <p className="text-gray-500">This is an AI-generated {campaign.templateName} email...</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Events Timeline */}
              <AnimatePresence>
                {showEvents === campaign.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                        <ClockIcon className="h-5 w-5 mr-2" />
                        Campaign Events Timeline
                      </h4>
                      <div className="space-y-3">
                        {campaign.events?.map((event, index) => (
                          <div key={event.id} className="flex items-start space-x-3">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getEventColor(event.type)}`}>
                              {getEventIcon(event.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 capitalize">
                                  {event.type.replace('_', ' ')}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(event.timestamp)}
                                </p>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                              {event.recipientEmail && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Recipient: {event.recipientEmail}
                                </p>
                              )}
                              {event.metadata && Object.keys(event.metadata).length > 0 && (
                                <div className="mt-2 text-xs text-gray-500">
                                  {Object.entries(event.metadata).map(([key, value]) => (
                                    <span key={key} className="mr-3">
                                      {key}: {String(value)}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {filteredCampaigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <SparklesIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No email campaigns yet</h3>
            <p className="text-gray-600 mb-6">Create your first professional email campaign using AI</p>
            <button
              onClick={() => router.push('/dashboard/campaigns/new')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <SparklesIcon className="h-5 w-5 mr-2" />
              Create Campaign
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}