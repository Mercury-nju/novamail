'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SparklesIcon, 
  UserGroupIcon,
  EnvelopeIcon,
  ChartBarIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  RocketLaunchIcon,
  TagIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Contact {
  id: string
  name: string
  email: string
  tags: string[]
  status: 'new' | 'active' | 'silent'
  lastContact?: string
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  preview: string
  category: string
  isAI: boolean
}

export default function Dashboard() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [stats, setStats] = useState({
    totalContacts: 0,
    activeContacts: 0,
    emailsSent: 0,
    openRate: 0
  })

  useEffect(() => {
    // 模拟数据加载
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    // 模拟联系人数据
    const mockContacts: Contact[] = [
      { id: '1', name: '张三', email: 'zhangsan@example.com', tags: ['新用户'], status: 'new', lastContact: '2024-01-15' },
      { id: '2', name: '李四', email: 'lisi@example.com', tags: ['活跃用户', 'VIP'], status: 'active', lastContact: '2024-01-14' },
      { id: '3', name: '王五', email: 'wangwu@example.com', tags: ['沉默用户'], status: 'silent', lastContact: '2023-12-20' },
      { id: '4', name: '赵六', email: 'zhaoliu@example.com', tags: ['新用户'], status: 'new', lastContact: '2024-01-16' },
      { id: '5', name: '钱七', email: 'qianqi@example.com', tags: ['活跃用户'], status: 'active', lastContact: '2024-01-13' }
    ]

    // 模拟模板数据
    const mockTemplates: EmailTemplate[] = [
      {
        id: '1',
        name: '产品发布通知',
        subject: '🎉 新产品发布！限时优惠等你来',
        preview: '我们很高兴地宣布，全新产品正式发布...',
        category: '营销',
        isAI: true
      },
      {
        id: '2',
        name: '客户关怀邮件',
        subject: '感谢您的支持，专属优惠为您准备',
        preview: '亲爱的客户，感谢您一直以来的信任...',
        category: '客户关怀',
        isAI: true
      },
      {
        id: '3',
        name: '节日祝福',
        subject: '🎊 新年快乐！新年特惠活动开始',
        preview: '值此新春佳节，我们为您准备了...',
        category: '节日',
        isAI: true
      }
    ]

    setContacts(mockContacts)
    setTemplates(mockTemplates)
    setStats({
      totalContacts: mockContacts.length,
      activeContacts: mockContacts.filter(c => c.status === 'active').length,
      emailsSent: 156,
      openRate: 24.5
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800'
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'silent': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return '新用户'
      case 'active': return '活跃用户'
      case 'silent': return '沉默用户'
      default: return '未知'
    }
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
                <h1 className="text-2xl font-bold text-gray-900">NovaMail</h1>
              </div>
              <div className="hidden md:block">
                <span className="text-sm text-gray-600">AI 驱动的电子邮件营销助手</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/campaigns/new"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                创建邮件
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来！</h2>
          <p className="text-lg text-gray-600">使用 AI 技术创建精美的邮件模板，提升您的营销效果</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总联系人</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalContacts}</p>
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
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">活跃用户</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeContacts}</p>
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
                <EnvelopeIcon className="h-6 w-6 text-purple-600" />
                              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">已发送邮件</p>
                <p className="text-2xl font-bold text-gray-900">{stats.emailsSent}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">打开率</p>
                <p className="text-2xl font-bold text-gray-900">{stats.openRate}%</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Templates Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <SparklesIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI 邮件模板</h3>
              </div>
              <Link
                href="/dashboard/campaigns/new"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                查看全部
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
                    </div>

            <div className="space-y-4">
              {templates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        {template.isAI && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <SparklesIcon className="h-3 w-3 mr-1" />
                            AI 生成
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{template.subject}</p>
                      <p className="text-xs text-gray-500">{template.preview}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                            </div>
              ))}
                          </div>

            <div className="mt-6">
              <Link
                href="/dashboard/campaigns/new"
                className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <SparklesIcon className="h-5 w-5 mr-2" />
                使用 AI 创建新模板
              </Link>
            </div>
          </motion.div>

          {/* Contacts Management Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                  <UserGroupIcon className="h-5 w-5 text-white" />
                          </div>
                <h3 className="text-xl font-bold text-gray-900">联系人管理</h3>
                        </div>
              <Link
                href="/dashboard/contacts"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                管理全部
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
                  </div>

            {/* Contact Tags */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">用户分类</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <TagIcon className="h-3 w-3 mr-1" />
                  新用户 ({contacts.filter(c => c.status === 'new').length})
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <TagIcon className="h-3 w-3 mr-1" />
                  活跃用户 ({contacts.filter(c => c.status === 'active').length})
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  <TagIcon className="h-3 w-3 mr-1" />
                  沉默用户 ({contacts.filter(c => c.status === 'silent').length})
                </span>
              </div>
            </div>

            {/* Recent Contacts */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">最近联系人</h4>
              {contacts.slice(0, 4).map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {contact.name.charAt(0)}
                      </span>
                    </div>
                            <div>
                      <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.email}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                    {getStatusText(contact.status)}
                  </span>
                </div>
              ))}
                      </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/dashboard/contacts"
                className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <UserGroupIcon className="h-5 w-5 mr-2" />
                管理联系人
              </Link>
              <Link
                href="/dashboard/contacts"
                className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                导入联系人
              </Link>
            </div>
          </motion.div>
      </div>

        {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">快速操作</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/dashboard/campaigns/new"
              className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all duration-200 group"
            >
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <SparklesIcon className="h-6 w-6 text-blue-600" />
                </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-900">AI 生成邮件</h4>
                <p className="text-sm text-gray-600">使用 AI 创建精美模板</p>
                  </div>
            </Link>

            <Link
              href="/dashboard/contacts"
              className="flex items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:from-green-100 hover:to-blue-100 transition-all duration-200 group"
            >
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <UserGroupIcon className="h-6 w-6 text-green-600" />
                          </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-900">管理联系人</h4>
                <p className="text-sm text-gray-600">导入和分类联系人</p>
              </div>
            </Link>

            <Link
              href="/dashboard/analytics"
              className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200 group"
            >
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-900">查看分析</h4>
                <p className="text-sm text-gray-600">邮件效果数据分析</p>
              </div>
            </Link>
          </div>
        </motion.div>
        </div>
    </div>
  )
}