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

  // Mock data - 在实际应用中，这里应该从API获取
  const mockCampaigns: Campaign[] = [
    {
      id: 1,
      name: 'Black Friday Sale',
      status: 'sent',
      subject: '🔥 50% Off Everything - Black Friday Special!',
      body: `Hi there!

Hope you're doing great! 👋

我是NovaMail的团队，想和你分享一个关于black friday sale的特别消息。

我们的产品是一个强大的AI邮件营销平台，帮助您轻松创建、发送和分析邮件活动。

想了解更多？点击下面了解更多！

Thanks for being awesome!
NovaMail Team

P.S. If this isn't your thing, no worries at all. Just let us know and we'll stop sending these updates.

---
Unsubscribe | Update preferences`,
      recipients: 1250,
      sentDate: '2024-11-24',
      openRate: 28.4,
      clickRate: 4.2,
      createdAt: '2024-11-20',
      userSegment: 'active-users',
      goal: 'promotional',
      style: 'casual',
      layout: 'image-text',
      businessName: 'NovaMail',
      productService: 'AI邮件营销平台'
    },
    {
      id: 2,
      name: 'Product Launch Announcement',
      status: 'draft',
      subject: 'Introducing Our New Product Line',
      body: `尊敬的付费用户，

您好！

我是NovaMail的代表，特此向您传达关于product launch的重要信息。

我们即将推出全新的产品功能，包括更智能的AI内容生成、更丰富的模板库和更详细的数据分析。

我们相信这将为您带来巨大价值。如需了解更多信息或有问题咨询，请随时与我们联系。

此致
敬礼！

NovaMail团队

---
您可以随时取消订阅这些邮件。`,
      recipients: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: '2024-11-22',
      userSegment: 'paid-users',
      goal: 'announcement',
      style: 'formal',
      layout: 'text-only',
      businessName: 'NovaMail',
      productService: 'AI邮件营销平台'
    },
    {
      id: 3,
      name: 'Weekly Newsletter',
      status: 'sent',
      subject: 'Weekly Updates & Industry Insights',
      body: `Hi 活跃用户!

作为我们的活跃用户，我们很高兴与您分享关于weekly updates的特别信息。

本周我们为您准备了最新的行业洞察、产品更新和营销技巧分享。

✨ 专为活跃用户设计的功能
✨ 为什么这对您很重要
✨ 如何开始使用

准备好体验不同了吗？点击下面了解更多！

Best regards,
NovaMail Team

---
您收到此邮件是因为您订阅了我们的更新。点击这里取消订阅。`,
      recipients: 2100,
      sentDate: '2024-11-20',
      openRate: 22.1,
      clickRate: 2.8,
      createdAt: '2024-11-18',
      userSegment: 'active-users',
      goal: 'newsletter',
      style: 'promotional',
      layout: 'image-heavy',
      businessName: 'NovaMail',
      productService: 'AI邮件营销平台'
    },
    {
      id: 4,
      name: 'Holiday Greetings',
      status: 'scheduled',
      subject: 'Happy Holidays from Our Team!',
      body: `Hello 新用户,

I hope this email finds you well. I wanted to reach out to share some important information about holiday greetings.

We've been working hard to bring you something valuable, and I'm pleased to announce that holiday greetings is now ready.

Here's what you need to know:
• What it is and why it matters
• How it can benefit you
• Next steps to get involved

I believe this will be of great value to you. Please let me know if you have any questions.

Warm regards,
NovaMail Team

---
You can unsubscribe from these emails at any time.`,
      recipients: 1800,
      sentDate: '2024-12-25',
      openRate: 0,
      clickRate: 0,
      createdAt: '2024-11-25',
      userSegment: 'new-users',
      goal: 'greeting',
      style: 'formal',
      layout: 'text-only',
      businessName: 'NovaMail',
      productService: 'AI邮件营销平台'
    },
    {
      id: 5,
      name: 'Customer Feedback Request',
      status: 'paused',
      subject: 'How was your experience?',
      body: `Hi 沉默用户!

Hope you're doing great! 👋

我是NovaMail的团队，想和你分享一个关于customer feedback的特别消息。

我们非常重视您的使用体验，希望能听到您的声音。

想了解更多？点击下面了解更多！

Thanks for being awesome!
NovaMail Team

P.S. If this isn't your thing, no worries at all. Just let us know and we'll stop sending these updates.

---
Unsubscribe | Update preferences`,
      recipients: 500,
      openRate: 0,
      clickRate: 0,
      createdAt: '2024-11-23',
      userSegment: 'silent-users',
      goal: 'feedback',
      style: 'casual',
      layout: 'image-text',
      businessName: 'NovaMail',
      productService: 'AI邮件营销平台'
    }
  ]

  useEffect(() => {
    const campaignId = parseInt(params.id as string)
    const foundCampaign = mockCampaigns.find(c => c.id === campaignId)
    setCampaign(foundCampaign || null)
  }, [params.id])

  const handleResend = async () => {
    if (!campaign) return

    setIsResending(true)
    try {
      // 模拟重新发送
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('邮件重新发送成功！')
    } catch (error) {
      toast.error('重新发送失败，请重试')
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
                    __html: campaign.body.replace(/\n/g, '<br>') 
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
                      __html: campaign.body.replace(/\n/g, '<br>') 
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

