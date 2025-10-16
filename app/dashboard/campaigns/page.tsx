'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { 
  PlusIcon,
  EyeIcon,
  DocumentTextIcon,
  CalendarIcon,
  SparklesIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface EmailHistory {
  id: string
  subject: string
  businessName: string
  emailMode: 'simple' | 'professional'
  selectedTemplate?: string
  toneStyle: string
  createdAt: string
  body: string
}

export default function CampaignsPage() {
  const router = useRouter()
  const [emailHistory, setEmailHistory] = useState<EmailHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [showPreview, setShowPreview] = useState<string | null>(null)

  useEffect(() => {
    fetchEmailHistory()
  }, [])

  const fetchEmailHistory = async () => {
    try {
      setLoading(true)
      
      // 获取用户ID
      const userId = localStorage.getItem('user-id') || localStorage.getItem('user-email') || 'default_user'
      
      const response = await fetch(`https://novamail-api.lihongyangnju.workers.dev/api/campaigns/history?userId=${userId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      if (data.success) {
        setEmailHistory(data.data.emails || [])
      } else {
        throw new Error(data.error || 'Failed to fetch email history')
      }
    } catch (error) {
      console.error('Failed to fetch email history:', error)
      toast.error('Failed to load email history')
    } finally {
      setLoading(false)
    }
  }

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

  const getStatusColor = (emailMode: string) => {
    switch (emailMode) {
      case 'professional':
        return 'bg-purple-100 text-purple-800'
      case 'simple':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTemplateIcon = (emailMode: string) => {
    return emailMode === 'professional' ? SparklesIcon : DocumentTextIcon
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Email History</h1>
              <p className="text-gray-600">View and manage your AI-generated emails</p>
            </div>
            <button
              onClick={() => router.push('/dashboard/campaigns/new')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Generate New Email</span>
            </button>
          </div>

          {/* Email History List */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : emailHistory.length === 0 ? (
            <div className="text-center py-12">
              <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No emails generated yet</h3>
              <p className="text-gray-600 mb-6">Start creating your first AI-generated email</p>
              <button
                onClick={() => router.push('/dashboard/campaigns/new')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Your First Email
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {emailHistory.map((email, index) => {
                const TemplateIcon = getTemplateIcon(email.emailMode)
                return (
                  <motion.div
                    key={email.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
                  >
                    {/* Email Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <TemplateIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 line-clamp-2">{email.subject}</h3>
                          <p className="text-sm text-gray-600">{email.businessName}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(email.emailMode)}`}>
                        {email.emailMode === 'professional' ? 'Professional' : 'Simple'}
                      </span>
                    </div>

                    {/* Email Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>{formatDate(email.createdAt)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <SparklesIcon className="h-4 w-4 mr-2" />
                        <span className="capitalize">{email.toneStyle} tone</span>
                      </div>
                      {email.selectedTemplate && (
                        <div className="flex items-center text-sm text-gray-600">
                          <DocumentTextIcon className="h-4 w-4 mr-2" />
                          <span className="capitalize">{email.selectedTemplate.replace('-', ' ')} template</span>
                        </div>
                      )}
                    </div>

                    {/* Email Preview */}
                    {showPreview === email.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-64 overflow-y-auto"
                      >
                        <div 
                          className="text-sm text-gray-700"
                          dangerouslySetInnerHTML={{ __html: email.body }}
                        />
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowPreview(showPreview === email.id ? null : email.id)}
                        className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span>{showPreview === email.id ? 'Hide' : 'Preview'}</span>
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(email.body)
                          toast.success('Email content copied to clipboard!')
                        }}
                        className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Stats Summary */}
          {emailHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 bg-white rounded-xl border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{emailHistory.length}</div>
                  <div className="text-sm text-gray-600">Total Emails Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {emailHistory.filter(e => e.emailMode === 'professional').length}
                  </div>
                  <div className="text-sm text-gray-600">Professional Templates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {emailHistory.filter(e => e.emailMode === 'simple').length}
                  </div>
                  <div className="text-sm text-gray-600">Simple Emails</div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}