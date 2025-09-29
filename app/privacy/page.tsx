'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SparklesIcon } from '@heroicons/react/24/outline'

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">隐私政策</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              最后更新日期：2024年9月28日
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 引言</h2>
              <p className="text-gray-700 mb-4">
                NovaMail（"我们"、"我们的"或"公司"）致力于保护您的隐私。本隐私政策解释了当您使用我们的AI电子邮件营销平台时，我们如何收集、使用、披露和保护您的信息。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 我们收集的信息</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">2.1 您提供的信息</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>账户信息：</strong>姓名、电子邮件地址、公司名称</li>
                <li><strong>联系信息：</strong>您上传的联系人列表和客户信息</li>
                <li><strong>内容：</strong>您创建的邮件活动、模板和营销内容</li>
                <li><strong>支付信息：</strong>账单地址和支付方式（通过安全的第三方处理器）</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">2.2 自动收集的信息</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>使用数据：</strong>您如何使用我们的服务、功能使用情况</li>
                <li><strong>设备信息：</strong>IP地址、浏览器类型、操作系统</li>
                <li><strong>分析数据：</strong>邮件打开率、点击率、退订率</li>
                <li><strong>Cookie和跟踪技术：</strong>用于改善用户体验</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 信息使用方式</h2>
              <p className="text-gray-700 mb-4">我们使用收集的信息用于：</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>提供、维护和改进我们的服务</li>
                <li>处理您的邮件活动和发送请求</li>
                <li>生成AI驱动的邮件内容建议</li>
                <li>提供客户支持和技术协助</li>
                <li>发送重要的服务更新和通知</li>
                <li>分析使用模式以改进产品功能</li>
                <li>防止欺诈和确保服务安全</li>
                <li>遵守法律义务</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 信息共享</h2>
              <p className="text-gray-700 mb-4">我们不会出售、交易或转让您的个人信息，除非：</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>服务提供商：</strong>与可信的第三方服务提供商共享，以帮助我们运营服务</li>
                <li><strong>法律要求：</strong>当法律要求或保护我们的权利时</li>
                <li><strong>业务转让：</strong>在公司合并、收购或资产出售时</li>
                <li><strong>同意：</strong>在您明确同意的情况下</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 数据安全</h2>
              <p className="text-gray-700 mb-4">
                我们实施适当的技术和组织措施来保护您的个人信息：
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>使用SSL/TLS加密传输数据</li>
                <li>定期安全审计和漏洞评估</li>
                <li>访问控制和身份验证</li>
                <li>数据备份和恢复程序</li>
                <li>员工隐私培训</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 数据保留</h2>
              <p className="text-gray-700 mb-4">
                我们仅在必要期间保留您的个人信息：
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>账户信息：</strong>在您的账户活跃期间</li>
                <li><strong>邮件活动数据：</strong>根据您的订阅计划</li>
                <li><strong>分析数据：</strong>最多24个月</li>
                <li><strong>法律要求：</strong>根据适用法律要求</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 您的权利</h2>
              <p className="text-gray-700 mb-4">根据适用法律，您可能有权：</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>访问您的个人信息</li>
                <li>更正不准确的信息</li>
                <li>删除您的个人信息</li>
                <li>限制处理您的信息</li>
                <li>数据可移植性</li>
                <li>反对处理您的信息</li>
                <li>撤回同意</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookie政策</h2>
              <p className="text-gray-700 mb-4">
                我们使用Cookie和类似技术来：
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>记住您的偏好设置</li>
                <li>分析网站使用情况</li>
                <li>提供个性化体验</li>
                <li>确保服务安全</li>
              </ul>
              <p className="text-gray-700 mb-4">
                您可以通过浏览器设置控制Cookie，但这可能影响某些功能。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. 第三方服务</h2>
              <p className="text-gray-700 mb-4">
                我们的服务可能包含指向第三方网站的链接。我们不对这些网站的隐私做法负责。我们建议您查看这些网站的隐私政策。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. 儿童隐私</h2>
              <p className="text-gray-700 mb-4">
                我们的服务不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. 国际数据传输</h2>
              <p className="text-gray-700 mb-4">
                您的信息可能被传输到您所在国家/地区以外的地方进行处理。我们确保采取适当的保护措施来保护您的信息。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. 隐私政策更新</h2>
              <p className="text-gray-700 mb-4">
                我们可能会不时更新本隐私政策。重大更改将通过电子邮件或网站通知您。我们建议您定期查看本政策。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. 联系我们</h2>
              <p className="text-gray-700 mb-4">
                如果您对本隐私政策有任何疑问或关注，请通过以下方式联系我们：
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  邮箱：privacy@novamail.world<br />
                  网站：<Link href="/contact" className="text-primary-600 hover:text-primary-700 underline">联系我们</Link>
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <p className="text-sm text-gray-500">
                本隐私政策自2024年9月28日起生效。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
