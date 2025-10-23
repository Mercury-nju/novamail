'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  PlusIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface Domain {
  id: string
  domain: string
  status: 'pending' | 'verified' | 'failed'
  verificationRecords: {
    spf: boolean
    dkim: boolean
    dmarc: boolean
  }
  emailAliases: string[]
  createdAt: string
}

export default function DomainManagementPage() {
  const [domains, setDomains] = useState<Domain[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAddDomain, setShowAddDomain] = useState(false)
  const [newDomain, setNewDomain] = useState('')

  // 获取用户域名列表
  const fetchDomains = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/domains')
      if (response.ok) {
        const data = await response.json()
        setDomains(data.domains || [])
      }
      } catch (error) {
        console.error('Failed to fetch domains:', error)
        toast.error('获取域名列表失败')
      } finally {
        setIsLoading(false)
      }
  }

  // 添加新域名
  const handleAddDomain = async () => {
    if (!newDomain.trim()) {
      toast.error('请输入域名')
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch('/api/domains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: newDomain.trim()
        })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('域名添加成功，请配置DNS记录')
        setNewDomain('')
        setShowAddDomain(false)
        fetchDomains()
      } else {
        toast.error(result.error || '添加域名失败')
      }
    } catch (error) {
      console.error('Failed to add domain:', error)
      toast.error('添加域名失败')
    } finally {
      setIsLoading(false)
    }
  }

  // 验证域名
  const handleVerifyDomain = async (domainId: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/domains/${domainId}/verify`, {
        method: 'POST'
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('域名验证成功！')
        fetchDomains()
      } else {
        toast.error(result.error || '域名验证失败')
      }
    } catch (error) {
      console.error('Failed to verify domain:', error)
      toast.error('域名验证失败')
    } finally {
      setIsLoading(false)
    }
  }

  // 添加邮箱别名
  const handleAddEmailAlias = async (domainId: string, alias: string) => {
    try {
      const response = await fetch(`/api/domains/${domainId}/aliases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alias: alias
        })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success('邮箱别名添加成功')
        fetchDomains()
      } else {
        toast.error(result.error || '添加邮箱别名失败')
      }
    } catch (error) {
      console.error('Failed to add email alias:', error)
      toast.error('添加邮箱别名失败')
    }
  }

  useEffect(() => {
    fetchDomains()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return '已验证'
      case 'failed':
        return '验证失败'
      default:
        return '待验证'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">域名管理</h1>
          <p className="mt-2 text-gray-600">
            配置您的域名以使用自己的邮箱地址发送邮件，提升品牌专业度
          </p>
        </div>

        {/* 添加域名按钮 */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddDomain(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            添加域名
          </button>
        </div>

        {/* 添加域名模态框 */}
        {showAddDomain && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">添加域名</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    域名地址
                  </label>
                  <input
                    type="text"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    placeholder="例如：yourcompany.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddDomain(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleAddDomain}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? '添加中...' : '添加域名'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 域名列表 */}
        <div className="space-y-6">
          {domains.length === 0 ? (
            <div className="text-center py-12">
              <GlobeAltIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">暂无域名</h3>
              <p className="mt-1 text-sm text-gray-500">
                添加您的域名以使用自己的邮箱地址发送邮件
              </p>
            </div>
          ) : (
            domains.map((domain) => (
              <div key={domain.id} className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <GlobeAltIcon className="h-6 w-6 text-gray-400 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{domain.domain}</h3>
                      <div className="flex items-center mt-1">
                        {getStatusIcon(domain.status)}
                        <span className="ml-2 text-sm text-gray-600">
                          {getStatusText(domain.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {domain.status === 'pending' && (
                    <button
                      onClick={() => handleVerifyDomain(domain.id)}
                      disabled={isLoading}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                    >
                      验证域名
                    </button>
                  )}
                </div>

                {/* DNS记录状态 */}
                {domain.status === 'pending' && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">DNS记录配置</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          domain.verificationRecords.spf ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <span className="text-sm text-gray-600">SPF记录</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          domain.verificationRecords.dkim ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <span className="text-sm text-gray-600">DKIM记录</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          domain.verificationRecords.dmarc ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <span className="text-sm text-gray-600">DMARC记录</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 邮箱别名 */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">邮箱别名</h4>
                  <div className="space-y-2">
                    {domain.emailAliases.map((alias, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        <span className="text-sm text-gray-600">{alias}</span>
                        <span className="text-xs text-green-600">已配置</span>
                      </div>
                    ))}
                    {domain.status === 'verified' && (
                      <button
                        onClick={() => {
                          const alias = prompt('请输入邮箱别名（如：noreply）')
                          if (alias) {
                            handleAddEmailAlias(domain.id, `${alias}@${domain.domain}`)
                          }
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + 添加邮箱别名
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">域名配置说明</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>1. <strong>添加域名</strong>：输入您要使用的域名（如：yourcompany.com）</p>
            <p>2. <strong>配置DNS记录</strong>：按照提示在您的域名DNS中添加相应的记录</p>
            <p>3. <strong>验证域名</strong>：点击验证按钮，系统会自动检查DNS配置</p>
            <p>4. <strong>配置邮箱别名</strong>：验证成功后，可以添加邮箱别名（如：noreply@yourcompany.com）</p>
            <p>5. <strong>开始使用</strong>：在发送邮件时选择您的邮箱地址</p>
          </div>
        </div>
      </div>
    </div>
  )
}
