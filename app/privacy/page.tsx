import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '隐私政策 - NovaMail',
  description: 'NovaMail 隐私政策和数据保护声明',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">隐私政策</h1>
          <p className="text-gray-600 mt-2">最后更新：2025年1月</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            
            <h2>1. 引言</h2>
            <p>
              NovaMail（以下简称"我们"、"我们的"或"服务"）致力于保护您的隐私。本隐私政策说明了我们如何收集、使用、存储和保护您的个人信息。
            </p>

            <h2>2. 信息收集</h2>
            <h3>2.1 您提供的信息</h3>
            <p>我们可能收集以下信息：</p>
            <ul>
              <li>账户信息（姓名、电子邮件地址、密码）</li>
              <li>联系信息（电话号码、地址）</li>
              <li>支付信息（信用卡信息、账单地址）</li>
              <li>营销活动内容</li>
              <li>客户联系列表</li>
            </ul>

            <h3>2.2 自动收集的信息</h3>
            <p>我们可能自动收集：</p>
            <ul>
              <li>设备信息（IP地址、浏览器类型、操作系统）</li>
              <li>使用数据（页面访问、点击、时间戳）</li>
              <li>Cookie和类似技术</li>
              <li>日志文件</li>
            </ul>

            <h2>3. 信息使用</h2>
            <p>我们使用收集的信息用于：</p>
            <ul>
              <li>提供和改进我们的服务</li>
              <li>处理交易和发送通知</li>
              <li>客户支持和沟通</li>
              <li>安全监控和欺诈预防</li>
              <li>法律合规</li>
              <li>营销和推广（经您同意）</li>
            </ul>

            <h2>4. 信息共享</h2>
            <h3>4.1 第三方服务提供商</h3>
            <p>
              我们可能与可信的第三方服务提供商共享信息，以帮助我们运营服务，包括：
            </p>
            <ul>
              <li>支付处理商</li>
              <li>云存储服务</li>
              <li>分析服务</li>
              <li>客户支持工具</li>
            </ul>

            <h3>4.2 法律要求</h3>
            <p>
              在法律要求或保护我们的权利时，我们可能会披露您的信息。
            </p>

            <h2>5. 数据安全</h2>
            <p>
              我们实施适当的技术和组织措施来保护您的个人信息，包括：
            </p>
            <ul>
              <li>数据加密（传输和存储）</li>
              <li>访问控制和身份验证</li>
              <li>定期安全审计</li>
              <li>员工培训和保密协议</li>
            </ul>

            <h2>6. 数据保留</h2>
            <p>
              我们仅在必要期间保留您的个人信息，或根据法律要求保留。当不再需要时，我们会安全删除或匿名化处理。
            </p>

            <h2>7. 您的权利</h2>
            <p>根据适用法律，您可能有权：</p>
            <ul>
              <li>访问您的个人信息</li>
              <li>更正不准确的信息</li>
              <li>删除您的个人信息</li>
              <li>限制处理</li>
              <li>数据可移植性</li>
              <li>反对处理</li>
            </ul>

            <h2>8. Cookie政策</h2>
            <h3>8.1 我们使用的Cookie类型</h3>
            <ul>
              <li><strong>必要Cookie：</strong>网站正常运行所必需</li>
              <li><strong>功能Cookie：</strong>记住您的偏好设置</li>
              <li><strong>分析Cookie：</strong>帮助我们了解网站使用情况</li>
              <li><strong>营销Cookie：</strong>用于个性化广告</li>
            </ul>

            <h3>8.2 Cookie管理</h3>
            <p>
              您可以通过浏览器设置管理Cookie偏好。请注意，禁用某些Cookie可能影响网站功能。
            </p>

            <h2>9. 国际数据传输</h2>
            <p>
              您的信息可能会被传输到您所在国家/地区以外的地方进行处理。我们会确保适当的保护措施到位。
            </p>

            <h2>10. 儿童隐私</h2>
            <p>
              我们的服务不面向13岁以下的儿童。我们不会故意收集儿童的个人信息。
            </p>

            <h2>11. 第三方链接</h2>
            <p>
              我们的服务可能包含指向第三方网站的链接。我们不对这些网站的隐私做法负责。
            </p>

            <h2>12. 营销通信</h2>
            <p>
              我们可能会向您发送营销通信。您可以随时通过以下方式选择退出：
            </p>
            <ul>
              <li>点击电子邮件中的取消订阅链接</li>
              <li>在账户设置中更新偏好</li>
              <li>直接联系我们</li>
            </ul>

            <h2>13. 隐私政策更新</h2>
            <p>
              我们可能会不时更新本隐私政策。重大变更将通过电子邮件或网站通知您。
            </p>

            <h2>14. 数据保护官</h2>
            <p>
              如果您对数据处理有任何疑问，请联系我们的数据保护官：
            </p>
            <ul>
              <li>邮箱：contact@novamail.com (实际接收：lihongyangnju@gmail.com)</li>
            </ul>

            <h2>15. 监管机构</h2>
            <p>
              如果您认为我们违反了数据保护法律，您有权向相关监管机构投诉。
            </p>

            <div className="mt-12 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                本隐私政策自2025年1月起生效。通过使用NovaMail服务，您确认已阅读、理解并同意本隐私政策。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}