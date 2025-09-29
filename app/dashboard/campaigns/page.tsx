'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
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
  id: string
  name: string
  status: 'draft' | 'scheduled' | 'sent' | 'paused'
  subject: string
  body: string
  recipients: number
  sentDate?: string
  openRate?: number
  clickRate?: number
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
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])
  const [showDraftsModal, setShowDraftsModal] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.email) {
      fetchCampaigns()
    }
  }, [session])

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/campaigns')
      const data = await response.json()
      
      if (data.success) {
        setCampaigns(data.campaigns)
      }
    } catch (error) {
      console.error('Failed to fetch campaigns:', error)
      toast.error('获取活动列表失败')
    } finally {
      setLoading(false)
    }
  }

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectCampaign = (campaignId: string) => {
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

  const handleDeleteSelected = async () => {
    if (selectedCampaigns.length === 0) {
      toast.error('请选择要删除的活动')
      return
    }
    
    try {
      const response = await fetch('/api/campaigns/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignIds: selectedCampaigns })
      })
      
      const data = await response.json()
      if (data.success) {
        toast.success('活动删除成功')
        setSelectedCampaigns([])
        fetchCampaigns()
      } else {
        toast.error(data.error || '删除失败')
      }
    } catch (error) {
      console.error('Delete campaigns error:', error)
      toast.error('删除活动失败')
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
        return <PlayIcon className="h-4 w-4" />
      case 'sent':
        return <EyeIcon className="h-4 w-4" />
      case 'paused':
        return <PauseIcon className="h-4 w-4" />
      default:
        return <DocumentTextIcon className="h-4 w-4" />
    }
  }

  const handleEditCampaign = (campaignId: string) => {
    setShowDraftsModal(false)
    window.location.href = `/dashboard/campaigns/edit/${campaignId}?mode=draft`
  }

  const handlePublishCampaign = async (campaignId: string) => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/publish`, {
        method: 'POST'
      })
      
      const data = await response.json()
      if (data.success) {
        toast.success('活动发布成功')
        setShowDraftsModal(false)
        fetchCampaigns()
      } else {
        toast.error(data.error || '发布失败')
      }
    } catch (error) {
      console.error('Publish campaign error:', error)
      toast.error('发布活动失败')
    }
  }

  const handleDeleteCampaign = async (campaignId: string) => {
    if (confirm('确定要删除这个草稿活动吗？')) {
      try {
        const response = await fetch('/api/campaigns/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaignIds: [campaignId] })
        })
        
        const data = await response.json()
        if (data.success) {
          toast.success('活动删除成功')
          setShowDraftsModal(false)
          fetchCampaigns()
        } else {
          toast.error(data.error || '删除失败')
        }
      } catch (error) {
        console.error('Delete campaign error:', error)
        toast.error('删除活动失败')
      }
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
        <div 
          className="card cursor-pointer hover:shadow-md transition-shadow duration-200"
          onClick={() => setShowDraftsModal(true)}
        >
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
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    {searchTerm ? 'No campaigns found matching your search.' : 'No campaigns yet. '}
                    {!searchTerm && (
                      <Link href="/dashboard/campaigns/new" className="text-primary-600 hover:text-primary-500">
                        Create your first campaign
                      </Link>
                    )}
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((campaign) => (
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
                    {campaign.status === 'draft' ? '-' : (campaign.openRate && campaign.openRate > 0 ? `${campaign.openRate}%` : '-')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.status === 'draft' ? '-' : (campaign.clickRate && campaign.clickRate > 0 ? `${campaign.clickRate}%` : '-')}
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

      {/* Drafts Modal */}
      {showDraftsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Draft Campaigns</h2>
                <button
                  onClick={() => setShowDraftsModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[60vh]">
              <div className="p-6">
                {campaigns.filter(c => c.status === 'draft').length === 0 ? (
                  <div className="text-center py-12">
                    <PencilIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No draft campaigns</h3>
                    <p className="text-gray-500 mb-6">You haven't created any draft campaigns yet.</p>
                    <Link 
                      href="/dashboard/campaigns/new"
                      className="btn-primary inline-flex items-center"
                      onClick={() => setShowDraftsModal(false)}
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Create Campaign
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {campaigns.filter(c => c.status === 'draft').map((campaign) => (
                      <motion.div
                        key={campaign.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {campaign.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                              {campaign.subject}
                            </p>
                            <div className="flex items-center text-xs text-gray-400">
                              <span>Created {campaign.createdAt}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 ml-4">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                              Draft
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            Recipients: {campaign.recipients.toLocaleString()}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditCampaign(campaign.id)}
                              className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handlePublishCampaign(campaign.id)}
                              className="px-3 py-1 text-xs font-medium text-green-600 hover:text-green-700 border border-green-200 rounded-md hover:bg-green-50 transition-colors"
                            >
                              Publish
                            </button>
                            <button
                              onClick={() => handleDeleteCampaign(campaign.id)}
                              className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-700 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {campaigns.filter(c => c.status === 'draft').length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {campaigns.filter(c => c.status === 'draft').length} draft{campaigns.filter(c => c.status === 'draft').length !== 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => setShowDraftsModal(false)}
                    className="btn-primary"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
