'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { XMarkIcon, ClipboardDocumentIcon, CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function GoogleSetupPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = async (text: string, step: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStep(step)
      setTimeout(() => setCopiedStep(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const setupSteps = [
    {
      title: "1. 前往 Google Cloud Console",
      description: "访问 Google Cloud Console 并创建一个新项目或选择现有项目",
      link: "https://console.cloud.google.com/"
    },
    {
      title: "2. 启用 Google+ API",
      description: "在API库中搜索并启用Google+ API",
      link: "https://console.cloud.google.com/apis/library/plus.googleapis.com"
    },
    {
      title: "3. 创建OAuth 2.0凭据",
      description: "转到凭据 > 创建凭据 > OAuth客户端ID",
      link: "https://console.cloud.google.com/apis/credentials"
    },
    {
      title: "4. 配置OAuth同意屏幕",
      description: "设置应用程序信息，确保选择外部用户类型",
      link: "https://console.cloud.google.com/apis/credentials/consent"
    }
  ]

  const redirectUri = "http://localhost:3000/api/auth/callback/google"

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Google OAuth 设置指南</h1>
                <p className="mt-2 text-primary-100">
                  按照以下步骤配置Google登录功能
                </p>
              </div>
              <a
                href="/login"
                className="text-primary-200 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-8 w-8" />
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* 当前状态信息 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    当前状态：Google OAuth 未配置
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>检测到Google登录失败，因为缺少有效的OAuth凭据。请按照下方步骤完成配置。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 设置步骤 */}
            <div className="space-y-6">
              {setupSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    打开链接
                  </a>
                </motion.div>
              ))}
            </div>

            {/* 重要的重定向URI */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                重要的重定向URI配置
              </h3>
              <p className="text-gray-600 mb-4">
                在Google Cloud Console中，确保添加以下授权重定向URI：
              </p>
              <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg p-3">
                <code className="flex-1 text-sm text-gray-800 font-mono bg-gray-100 p-2 rounded">
                  {redirectUri}
                </code>
                <button
                  onClick={() => copyToClipboard(redirectUri, 999)}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors bg-gray-100 hover:bg-gray-200 rounded"
                >
                  {copiedStep === 999 ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <ClipboardDocumentIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* 环境变量配置 */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                环境变量配置
              </h3>
              <p className="text-gray-600 mb-4">
                获取到客户端ID和密钥后，更新.env文件中的以下变量：
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GOOGLE_CLIENT_ID
                  </label>
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg p-3">
                    <code className="flex-1 text-sm text-gray-800 font-mono bg-gray-100 p-2 rounded">
                      your-google-client-id.apps.googleusercontent.com
                    </code>
                    <button
                      onClick={() => copyToClipboard("GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com", 1)}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      {copiedStep === 1 ? (
                        <CheckIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <ClipboardDocumentIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GOOGLE_CLIENT_SECRET
                  </label>
                  <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg p-3">
                    <code className="flex-1 text-sm text-gray-800 font-mono bg-gray-100 p-2 rounded">
                      your-google-client-secret
                    </code>
                    <button
                      onClick={() => copyToClipboard("GOOGLE_CLIENT_SECRET=your-google-client-secret", 2)}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      {copiedStep === 2 ? (
                        <CheckIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <ClipboardDocumentIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 完成提示 */}
            <div className="mt-8 bg-primary-50 border border-primary-200 rounded-lg p-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-primary-800">
                    设置完成
                  </h3>
                  <div className="mt-2 text-sm text-primary-700">
                    <p>配置完成后重启开发服务器，Google登录功能就可以正常使用了。</p>
                    <p className="mt-1 text-primary-600">
                      重启命令：<code className="bg-primary-100 px-2 py-1 rounded text-primary-800">npm run dev</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 回到登录页 */}
            <div className="mt-8 text-center">
              <a
                href="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
              >
                回到登录页面
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}