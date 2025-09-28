'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeftIcon,
  PencilIcon,
  DocumentTextIcon,
  EyeIcon,
  PaperAirplaneIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Campaign {
  id: number
  name: string
  status: 'draft' | 'scheduled' | 'sent' | 'paused'
  subject: string
  body: string
  userSegment: string
  goal: string
  style: string
  recipients: number
  sentDate?: string
  createdAt: string
  openRate?: number
  clickRate?: number
}

export default function CampaignDetailPage() {
  const router = useRouter()
  const params = useParams()
  const campaignId = params.id

  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCampaign()
  }, [campaignId])

  const loadCampaign = async () => {
    try {
      // Simulate loading campaign data
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockCampaign: Campaign = {
        id: Number(campaignId),
        name: 'Product Launch Announcement',
        status: 'draft',
        subject: 'Introducing Our New Product Line',
        body: 'Hi there!\n\nWe are excited to introduce our new product line that will revolutionize the way you work.\n\nKey features:\n• Advanced AI integration\n• Seamless user experience\n• 24/7 customer support\n\nGet started today with our special launch offer!\n\nBest regards,\nThe Team',
        userSegment: 'new-users',
        goal: '产品介绍',
        style: 'promotional',
        recipients: 0,
        createdAt: '2024-11-22'
      }
      
      setCampaign(mockCampaign)
    } catch (error) {
      toast.error('Failed to load campaign')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCampaign = async () => {
    if (!confirm('Are you sure you want to delete this campaign?')) {
      return
    }

    try {
      // Simulate deletion
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Campaign deleted successfully')
      router.push('/dashboard/campaigns')
    } catch (error) {
      toast.error('Failed to delete campaign')
    }
  }

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-orange-100 text-orange-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'sent':
        return 'bg-green-100 text-green-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: Campaign['status']) => {
    switch (status) {
      case 'draft':
        return <DocumentTextIcon className="h-4 w-4" />
      case 'scheduled':
        return <PaperAirplaneIcon className="h-4 w-4" />
      case 'sent':
        return <EyeIcon className="h-4 w-4" />
      case 'paused':
        return <PencilIcon className="h-4 w-4" />
      default:
        return <DocumentTextIcon className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading campaign...</p>
        </div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign not found</h1>
          <p className="text-gray-600 mb-6">The campaign you're looking for doesn't exist.</p>
          <Link href="/dashboard/campaigns" className="btn-primary">
            Back to Campaigns
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {campaign.name}
                </h1>
                <p className="text-sm text-gray-500">
                  Created on {new Date(campaign.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                {getStatusIcon(campaign.status)}
                <span className="ml-1 capitalize">{campaign.status}</span>
              </span>
              {campaign.status === 'draft' && (
                <Link
                  href={`/dashboard/campaigns/${campaign.id}/edit`}
                  className="btn-primary flex items-center"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h2 className="text-lg font-medium text-gray-900 mb-4">Campaign Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{campaign.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Segment</label>
                  <p className="text-gray-900 capitalize">{campaign.userSegment.replace('-', ' ')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
                  <p className="text-gray-900">{campaign.goal}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
                  <p className="text-gray-900 capitalize">{campaign.style}</p>
                </div>
              </div>
            </motion.div>

            {/* Email Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h2 className="text-lg font-medium text-gray-900 mb-4">Email Content</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <p className="text-gray-900 font-medium">{campaign.subject}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm text-gray-900 font-mono">
                      {campaign.body}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                    {getStatusIcon(campaign.status)}
                    <span className="ml-1 capitalize">{campaign.status}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Recipients</span>
                  <span className="text-sm font-medium text-gray-900">
                    {campaign.recipients.toLocaleString()}
                  </span>
                </div>
                {campaign.sentDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sent Date</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(campaign.sentDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                {campaign.status === 'draft' && (
                  <Link
                    href={`/dashboard/campaigns/${campaign.id}/edit`}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Continue Editing
                  </Link>
                )}
                <button
                  onClick={() => {
                    // Simulate preview
                    toast.success('Preview opened in new tab')
                  }}
                  className="w-full btn-secondary flex items-center justify-center"
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Preview Email
                </button>
                <button
                  onClick={handleDeleteCampaign}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete Campaign
                </button>
              </div>
            </motion.div>

            {/* Statistics (if sent) */}
            {campaign.status === 'sent' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="card"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Open Rate</span>
                    <span className="text-sm font-medium text-gray-900">
                      {campaign.openRate ? `${campaign.openRate}%` : '-'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Click Rate</span>
                    <span className="text-sm font-medium text-gray-900">
                      {campaign.clickRate ? `${campaign.clickRate}%` : '-'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
