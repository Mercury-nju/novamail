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
  TagIcon
} from '@heroicons/react/24/outline'

interface Campaign {
  id: string
  subject: string
  template: string
  templateName: string
  status: 'draft' | 'sent' | 'scheduled'
  createdAt: string
  sentAt?: string
  recipients: number
  openRate?: number
  clickRate?: number
  businessName: string
  purpose: string
  tone: string
}

export default function CampaignsPage() {
  const router = useRouter()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [showPreview, setShowPreview] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'draft' | 'sent' | 'scheduled'>('all')

  useEffect(() => {
    loadCampaigns()
  }, [])

  const loadCampaigns = () => {
    // 模拟数据
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        subject: '🎉 新产品发布！限时优惠等你来',
        template: 'product-launch',
        templateName: '产品发布',
        status: 'sent',
        createdAt: '2024-01-15T10:30:00Z',
        sentAt: '2024-01-15T10:30:00Z',
        recipients: 1250,
        openRate: 24.5,
        clickRate: 8.2,
        businessName: 'NovaMail',
        purpose: '推广新产品',
        tone: 'enthusiastic'
      },
      {
        id: '2',
        subject: '感谢您的支持，专属优惠为您准备',
        template: 'customer-care',
        templateName: '客户关怀',
        status: 'sent',
        createdAt: '2024-01-14T14:20:00Z',
        sentAt: '2024-01-14T14:20:00Z',
        recipients: 850,
        openRate: 32.1,
        clickRate: 12.5,
        businessName: 'NovaMail',
        purpose: '客户关怀',
        tone: 'friendly'
      },
      {
        id: '3',
        subject: '🎊 新年快乐！新年特惠活动开始',
        template: 'holiday-greeting',
        templateName: '节日祝福',
        status: 'draft',
        createdAt: '2024-01-13T09:15:00Z',
        recipients: 0,
        businessName: 'NovaMail',
        purpose: '节日祝福',
        tone: 'friendly'
      },
      {
        id: '4',
        subject: '📰 本月新闻：行业动态与公司更新',
        template: 'newsletter',
        templateName: '新闻通讯',
        status: 'scheduled',
        createdAt: '2024-01-12T16:45:00Z',
        recipients: 2100,
        businessName: 'NovaMail',
        purpose: '新闻通讯',
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
    return date.toLocaleDateString('zh-CN', {
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
        return '已发送'
      case 'draft':
        return '草稿'
      case 'scheduled':
        return '已安排'
      default:
        return '未知'
    }
  }

  const getToneText = (tone: string) => {
    const tones: Record<string, string> = {
      'friendly': '友好亲切',
      'professional': '专业正式',
      'casual': '轻松随意',
      'enthusiastic': '热情洋溢',
      'persuasive': '说服力强'
    }
    return tones[tone] || tone
  }

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== campaignId))
    toast.success('活动已删除')
  }

  const handleSendCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(c => 
      c.id === campaignId 
        ? { ...c, status: 'sent' as const, sentAt: new Date().toISOString() }
        : c
    ))
    toast.success('邮件发送成功！')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载活动中...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">邮件活动</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard/campaigns/new')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                创建新活动
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
                <p className="text-sm font-medium text-gray-600">总活动</p>
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
                <p className="text-sm font-medium text-gray-600">已发送</p>
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
                <p className="text-sm font-medium text-gray-600">草稿</p>
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
                <p className="text-sm font-medium text-gray-600">AI 生成</p>
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
            <span className="text-sm font-medium text-gray-700">筛选：</span>
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
                {filterType === 'all' ? '全部' : getStatusText(filterType)}
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
                        AI 生成
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
                      <span className="font-medium">目的：</span>
                      {campaign.purpose}
                    </div>
                    <div>
                      <span className="font-medium">语调：</span>
                      {getToneText(campaign.tone)}
                    </div>
                    <div>
                      <span className="font-medium">品牌：</span>
                      {campaign.businessName}
                    </div>
                  </div>

                  {campaign.status === 'sent' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">收件人：</span>
                        <span className="font-medium">{campaign.recipients.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">打开率：</span>
                        <span className="font-medium text-green-600">{campaign.openRate}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">点击率：</span>
                        <span className="font-medium text-blue-600">{campaign.clickRate}%</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>创建于 {formatDate(campaign.createdAt)}</span>
                    </div>
                    {campaign.sentAt && (
                      <div className="flex items-center space-x-1">
                        <RocketLaunchIcon className="h-4 w-4" />
                        <span>发送于 {formatDate(campaign.sentAt)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-6">
                  <button
                    onClick={() => setShowPreview(showPreview === campaign.id ? null : campaign.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="预览"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  
                  {campaign.status === 'draft' && (
                    <button
                      onClick={() => router.push(`/dashboard/campaigns/edit/${campaign.id}`)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="编辑"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  )}
                  
                  {campaign.status === 'draft' && (
                    <button
                      onClick={() => handleSendCampaign(campaign.id)}
                      className="p-2 text-green-400 hover:text-green-600 transition-colors"
                      title="发送"
                    >
                      <RocketLaunchIcon className="h-5 w-5" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="删除"
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
                      <h4 className="font-medium text-gray-900 mb-2">邮件预览</h4>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium mb-1">主题：{campaign.subject}</p>
                        <p className="text-gray-500">这是一封由 AI 生成的 {campaign.templateName} 邮件...</p>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">还没有邮件活动</h3>
            <p className="text-gray-600 mb-6">使用 AI 创建您的第一个邮件活动</p>
            <button
              onClick={() => router.push('/dashboard/campaigns/new')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <SparklesIcon className="h-5 w-5 mr-2" />
              创建新活动
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}