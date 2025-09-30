'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  EyeIcon,
  PencilIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import DOMPurify from 'dompurify'

interface Campaign {
  id: number
  name: string
  status: 'draft' | 'scheduled' | 'sent' | 'paused'
  subject: string
  body: string
  recipients: number
  sentDate?: string
  openRate: number
  clickRate: number
  createdAt: string
  userSegment?: string
  goal?: string
  style?: string
  layout?: string
  images?: string[]
  businessName?: string
  productService?: string
}

export default function CampaignDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [isResending, setIsResending] = useState(false)
  
  const campaignId = params.id as string

  useEffect(() => {
    if (campaignId) {
      fetchCampaign()
    }
  }, [campaignId])

  const fetchCampaign = async () => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`)
      const data = await response.json()
      if (data.success && data.campaign) {
        setCampaign(data.campaign)
      } else {
        toast.error('Campaign not found')
        router.push('/dashboard/campaigns')
      }
    } catch (error) {
      console.error('Failed to fetch campaign:', error)
      toast.error('Failed to load campaign')
      router.push('/dashboard/campaigns')
    }
  }

  const handleResend = async () => {
    if (!campaign) return

    setIsResending(true)
    try {
      const response = await fetch(`/api/campaigns/${campaign.id}/resend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      const data = await response.json()
      if (data.success) {
        toast.success('Campaign resent successfully!')
      } else {
        toast.error(data.error || 'Failed to resend campaign')
      }
    } catch (error) {
      console.error('Failed to resend campaign:', error)
      toast.error('Failed to resend campaign, please try again')
    } finally {
      setIsResending(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <EyeIcon className="h-3 w-3" />
      case 'draft':
        return <DocumentTextIcon className="h-3 w-3" />
      case 'scheduled':
        return <CalendarDaysIcon className="h-3 w-3" />
      case 'paused':
        return <PencilIcon className="h-3 w-3" />
      default:
        return <DocumentTextIcon className="h-3 w-3" />
    }
  }

  if (!campaign) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">活动未找到</h2>
          <p className="text-gray-600 mb-4">请检查活动ID是否正确</p>
          <Link href="/dashboard/campaigns" className="btn-primary">
            返回活动列表
          </Link>
        </div>
      </div>
    )
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
            <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
            <p className="mt-1 text-sm text-gray-600">
              创建于 {campaign.createdAt}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          {campaign.status === 'sent' && (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="btn-primary flex items-center disabled:opacity-50"
            >
              <PaperAirplaneIcon className="h-4 w-4 mr-2" />
              {isResending ? '重新发送中...' : '重新发送'}
            </button>
          )}
          {campaign.status === 'draft' && (
            <Link
              href={`/dashboard/campaigns/${campaign.id}/edit`}
              className="btn-primary flex items-center"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              编辑
            </Link>
          )}
        </div>
      </div>

      {/* Campaign Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                {getStatusIcon(campaign.status)}
                <span className="ml-1">{campaign.status}</span>
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Status</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Recipients</p>
              <p className="text-2xl font-semibold text-gray-900">{campaign.recipients.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Open Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{campaign.openRate}%</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Click Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{campaign.clickRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Preview */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">邮件预览</h2>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                主题行
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                {campaign.subject}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邮件内容
              </label>
              <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 min-h-[300px]">
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(campaign.body.replace(/\n/g, '<br>'))
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">活动详情</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  用户分层
                </label>
                <div className="p-2 bg-gray-50 rounded-lg">
                  {campaign.userSegment || '未设置'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮件目标
                </label>
                <div className="p-2 bg-gray-50 rounded-lg">
                  {campaign.goal || '未设置'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮件风格
                </label>
                <div className="p-2 bg-gray-50 rounded-lg">
                  {campaign.style || '未设置'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  布局类型
                </label>
                <div className="p-2 bg-gray-50 rounded-lg">
                  {campaign.layout || '未设置'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  公司名称
                </label>
                <div className="p-2 bg-gray-50 rounded-lg">
                  {campaign.businessName || '未设置'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  产品介绍
                </label>
                <div className="p-2 bg-gray-50 rounded-lg">
                  {campaign.productService || '未设置'}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Preview */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">移动端预览</h2>
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="max-w-sm mx-auto bg-white border border-gray-300 rounded-lg shadow-sm">
                <div className="p-3 border-b border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">From: {campaign.businessName}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {campaign.subject}
                  </div>
                </div>
                <div className="p-3 min-h-[200px]">
                  <div 
                    className="prose prose-xs max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: DOMPurify.sanitize(campaign.body.replace(/\n/g, '<br>'))
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

