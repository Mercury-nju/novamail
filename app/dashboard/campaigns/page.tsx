'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PlayIcon,
  PauseIcon,
  DocumentTextIcon
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

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([])

  // Mock data
  const [campaigns, setCampaigns] = useState<Campaign[]>([
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
  ])

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectCampaign = (campaignId: number) => {
    setSelectedCampaigns(prev =>
      prev.includes(campaignId)
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    )
  }

  const handleSelectAll = () => {
    if (selectedCampaigns.length === filteredCampaigns.length) {
      setSelectedCampaigns([])
    } else {
      setSelectedCampaigns(filteredCampaigns.map(campaign => campaign.id))
    }
  }

  const handleDeleteSelected = () => {
    if (selectedCampaigns.length === 0) {
      toast.error('Please select campaigns to delete')
      return
    }
    
    setCampaigns(prev => prev.filter(campaign => !selectedCampaigns.includes(campaign.id)))
    setSelectedCampaigns([])
    toast.success(`${selectedCampaigns.length} campaigns deleted`)
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
        return <PlayIcon className="h-4 w-4" />
      case 'sent':
        return <EyeIcon className="h-4 w-4" />
      case 'paused':
        return <PauseIcon className="h-4 w-4" />
      default:
        return <DocumentTextIcon className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="mt-1 text-sm text-gray-600">
            Create and manage your email campaigns
          </p>
        </div>
        <Link href="/dashboard/campaigns/new" className="btn-primary flex items-center">
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Campaign
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <PencilIcon className="h-8 w-8 text-gray-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Drafts</p>
              <p className="text-2xl font-semibold text-gray-900">
                {campaigns.filter(c => c.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <PlayIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Scheduled</p>
              <p className="text-2xl font-semibold text-gray-900">
                {campaigns.filter(c => c.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <EyeIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Sent</p>
              <p className="text-2xl font-semibold text-gray-900">
                {campaigns.filter(c => c.status === 'sent').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <PauseIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Paused</p>
              <p className="text-2xl font-semibold text-gray-900">
                {campaigns.filter(c => c.status === 'paused').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="btn-secondary flex items-center">
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filter
            </button>
            {selectedCampaigns.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete ({selectedCampaigns.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="card">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedCampaigns.length === filteredCampaigns.length && filteredCampaigns.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Open Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Click Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedCampaigns.includes(campaign.id)}
                      onChange={() => handleSelectCampaign(campaign.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {campaign.subject}
                      </div>
                      <div className="text-xs text-gray-400">
                        Created {campaign.createdAt}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {getStatusIcon(campaign.status)}
                      <span className="ml-1">{campaign.status}</span>
                    </span>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.status === 'draft' ? '-' : campaign.recipients.toLocaleString()}
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.status === 'draft' ? '-' : (campaign.openRate > 0 ? `${campaign.openRate}%` : '-')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.status === 'draft' ? '-' : (campaign.clickRate > 0 ? `${campaign.clickRate}%` : '-')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/campaigns/${campaign.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      {campaign.status === 'draft' ? (
                        <Link
                          href={`/dashboard/campaigns/${campaign.id}/edit`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Link>
                      ) : (
                        <button className="text-gray-600 hover:text-gray-900">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
