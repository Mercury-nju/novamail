'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface EmailConfig {
  domain: string
  prefixes: string[]
  selectedPrefix: string
}

export default function EmailDomainPage() {
  const [config, setConfig] = useState<EmailConfig>({
    domain: '',
    prefixes: ['support', 'marketing', 'sales', 'info', 'noreply'],
    selectedPrefix: 'support'
  })
  const [isLoading, setIsLoading] = useState(false)

  // 加载用户配置
  useEffect(() => {
    const savedConfig = localStorage.getItem('emailDomainConfig')
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  // 保存配置
  const handleSave = () => {
    if (!config.domain.trim()) {
      toast.error('请输入您的域名')
      return
    }

    try {
      localStorage.setItem('emailDomainConfig', JSON.stringify(config))
      toast.success('域名配置保存成功！')
    } catch (error) {
      toast.error('保存配置失败')
    }
  }

  // 添加邮箱前缀
  const handleAddPrefix = () => {
    const newPrefix = prompt('请输入新的邮箱前缀（如：hello）')
    if (newPrefix && newPrefix.trim()) {
      setConfig(prev => ({
        ...prev,
        prefixes: [...prev.prefixes, newPrefix.trim()]
      }))
    }
  }

  // 删除邮箱前缀
  const handleRemovePrefix = (prefix: string) => {
    setConfig(prev => ({
      ...prev,
      prefixes: prev.prefixes.filter(p => p !== prefix)
    }))
  }

  const displayEmail = config.domain ? `${config.selectedPrefix}@${config.domain}` : ''

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">邮箱域名配置</h1>
          <p className="mt-2 text-gray-600">
            配置您的域名，让收件人看到您的企业邮箱地址
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {/* 域名配置 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              您的域名 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={config.domain}
                onChange={(e) => setConfig(prev => ({ ...prev, domain: e.target.value }))}
                placeholder="yourcompany.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              输入您的域名，不需要包含 www 或 http://
            </p>
          </div>

          {/* 邮箱前缀配置 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              邮箱前缀
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
              {config.prefixes.map((prefix) => (
                <div key={prefix} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={prefix}
                    name="prefix"
                    value={prefix}
                    checked={config.selectedPrefix === prefix}
                    onChange={(e) => setConfig(prev => ({ ...prev, selectedPrefix: e.target.value }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor={prefix} className="text-sm text-gray-700">
                    {prefix}
                  </label>
                  {config.prefixes.length > 1 && (
                    <button
                      onClick={() => handleRemovePrefix(prefix)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleAddPrefix}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + 添加自定义前缀
            </button>
          </div>

          {/* 预览效果 */}
          {displayEmail && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">预览效果</h3>
              <div className="text-sm text-blue-800">
                <p><strong>发件人显示：</strong>{displayEmail}</p>
                <p><strong>收件人看到：</strong>{displayEmail}</p>
                <p><strong>回复地址：</strong>{displayEmail}</p>
              </div>
            </div>
          )}

          {/* 保存按钮 */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={!config.domain.trim() || isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '保存中...' : '保存配置'}
            </button>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-green-900 mb-2">使用说明</h3>
          <div className="text-sm text-green-800 space-y-2">
            <p>1. <strong>配置域名</strong>：输入您的域名（如：yourcompany.com）</p>
            <p>2. <strong>选择前缀</strong>：选择或添加邮箱前缀（如：support、marketing）</p>
            <p>3. <strong>保存配置</strong>：点击保存按钮保存您的设置</p>
            <p>4. <strong>发送邮件</strong>：在发送邮件时，系统会自动使用您配置的邮箱地址</p>
            <p>5. <strong>显示效果</strong>：收件人将看到您的企业邮箱地址，而不是NovaMail的地址</p>
          </div>
        </div>
      </div>
    </div>
  )
}
