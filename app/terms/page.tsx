'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SparklesIcon } from '@heroicons/react/24/outline'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <Link href="/" className="flex items-center">
              <SparklesIcon className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">NovaMail</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">服务条款</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              最后更新日期：2024年9月28日
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 接受条款</h2>
              <p className="text-gray-700 mb-4">
                欢迎使用NovaMail！这些服务条款（"条款"）构成您与NovaMail之间的法律协议。通过访问或使用我们的服务，您同意受这些条款的约束。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 服务描述</h2>
              <p className="text-gray-700 mb-4">
                NovaMail是一个AI驱动的电子邮件营销平台，为小型企业和创作者提供以下服务：
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>AI邮件内容生成</li>
                <li>用户分段管理</li>
                <li>邮件活动创建和发送</li>
                <li>数据分析和报告</li>
                <li>联系人管理</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 用户账户</h2>
              <p className="text-gray-700 mb-4">
                要使用我们的服务，您需要创建一个账户。您同意：
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>提供准确、完整和最新的信息</li>
                <li>维护账户信息的准确性</li>
                <li>对账户下发生的所有活动负责</li>
                <li>立即通知我们任何未经授权的使用</li>
                <li>不与他人共享您的账户凭据</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 可接受的使用</h2>
              <p className="text-gray-700 mb-4">
                您同意不会将我们的服务用于：
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>发送垃圾邮件或未经请求的邮件</li>
                <li>违反任何适用的法律法规</li>
                <li>侵犯他人的知识产权</li>
                <li>传播恶意软件或有害内容</li>
                <li>进行欺诈或误导性活动</li>
                <li>干扰或破坏我们的服务</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 隐私和数据保护</h2>
              <p className="text-gray-700 mb-4">
                我们重视您的隐私。有关我们如何收集、使用和保护您的信息，请参阅我们的
                <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline">
                  隐私政策
                </Link>。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 知识产权</h2>
              <p className="text-gray-700 mb-4">
                NovaMail及其所有内容、功能和服务的所有权归我们所有，受版权、商标和其他知识产权法保护。未经我们明确书面许可，您不得复制、修改、分发或创建衍生作品。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 服务可用性</h2>
              <p className="text-gray-700 mb-4">
                我们努力保持服务的高可用性，但不保证服务将始终可用或无误。我们保留随时修改、暂停或终止服务的权利，恕不另行通知。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. 免责声明</h2>
              <p className="text-gray-700 mb-4">
                我们的服务按"现状"提供，不提供任何明示或暗示的保证。我们不保证服务的准确性、可靠性或适用性。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. 责任限制</h2>
              <p className="text-gray-700 mb-4">
                在法律允许的最大范围内，NovaMail对因使用或无法使用我们的服务而产生的任何直接、间接、偶然或后果性损害不承担责任。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. 条款修改</h2>
              <p className="text-gray-700 mb-4">
                我们保留随时修改这些条款的权利。修改后的条款将在网站上发布后生效。您继续使用服务即表示接受修改后的条款。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. 联系信息</h2>
              <p className="text-gray-700 mb-4">
                如果您对这些条款有任何疑问，请通过以下方式联系我们：
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  邮箱：legal@novamail.world<br />
                  网站：<Link href="/contact" className="text-primary-600 hover:text-primary-700 underline">联系我们</Link>
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <p className="text-sm text-gray-500">
                本服务条款自2024年9月28日起生效。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
