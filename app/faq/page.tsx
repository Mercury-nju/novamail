import { Metadata } from 'next'
import BackgroundAnimations from '@/components/BackgroundAnimations'

export const metadata: Metadata = {
  title: '常见问题 - NovaMail',
  description: 'NovaMail 常见问题解答',
}

export default function FAQPage() {
  const faqs = [
    {
      category: "账户与注册",
      questions: [
        {
          question: "如何注册NovaMail账户？",
          answer: "点击首页的\"开始使用\"按钮，使用您的邮箱地址注册。注册后您将收到确认邮件，点击链接即可激活账户。"
        },
        {
          question: "忘记密码怎么办？",
          answer: "在登录页面点击\"忘记密码\"，输入您的邮箱地址，我们将发送重置密码的链接到您的邮箱。"
        },
        {
          question: "可以删除账户吗？",
          answer: "可以。在账户设置中选择\"删除账户\"，系统会要求您确认操作。请注意，删除账户后所有数据将无法恢复。"
        }
      ]
    },
    {
      category: "邮件发送",
      questions: [
        {
          question: "如何创建邮件营销活动？",
          answer: "登录后进入\"活动\"页面，点击\"新建活动\"，选择邮件类型（简单邮件或专业模板），填写活动信息，添加收件人，然后发送。"
        },
        {
          question: "支持哪些邮件格式？",
          answer: "我们支持HTML邮件、纯文本邮件，以及响应式设计模板，确保在各种设备上都能完美显示。"
        },
        {
          question: "如何导入联系人？",
          answer: "在\"联系人\"页面点击\"导入\"，支持CSV、Excel文件格式。请确保文件包含姓名和邮箱地址列。"
        },
        {
          question: "发送邮件有限制吗？",
          answer: "免费用户每月可发送1000封邮件，付费用户根据套餐不同有不同的发送限制。"
        }
      ]
    },
    {
      category: "模板与设计",
      questions: [
        {
          question: "如何使用专业模板？",
          answer: "在创建活动时选择\"专业模板\"，浏览我们提供的模板库，选择适合的模板，然后自定义内容。"
        },
        {
          question: "可以自定义模板吗？",
          answer: "可以。选择模板后，您可以修改文字、图片、颜色等元素，创建符合您品牌风格的邮件。"
        },
        {
          question: "模板是否支持移动设备？",
          answer: "是的，所有专业模板都是响应式设计，在手机、平板和电脑上都能完美显示。"
        }
      ]
    },
    {
      category: "数据分析",
      questions: [
        {
          question: "如何查看邮件发送统计？",
          answer: "在\"分析\"页面可以查看邮件打开率、点击率、退订率等详细统计数据。"
        },
        {
          question: "统计数据多久更新一次？",
          answer: "统计数据实时更新，您可以随时查看最新的邮件表现数据。"
        },
        {
          question: "可以导出数据报告吗？",
          answer: "可以。在分析页面点击\"导出报告\"，选择时间范围和格式，即可下载详细的数据报告。"
        }
      ]
    },
    {
      category: "技术支持",
      questions: [
        {
          question: "遇到技术问题如何解决？",
          answer: "首先查看帮助文档，如果问题仍未解决，请发送邮件至 contact@novamail.com 或使用联系我们页面的表单。"
        },
        {
          question: "支持哪些浏览器？",
          answer: "我们支持Chrome、Firefox、Safari、Edge等主流浏览器的最新版本。"
        },
        {
          question: "数据安全如何保障？",
          answer: "我们采用企业级加密技术，严格遵循数据保护法规，定期进行安全审计，确保您的数据安全可靠。"
        }
      ]
    },
    {
      category: "付费与套餐",
      questions: [
        {
          question: "如何升级到付费套餐？",
          answer: "在\"定价\"页面选择适合的套餐，点击\"立即升级\"，完成支付后即可享受更多功能。"
        },
        {
          question: "支持哪些支付方式？",
          answer: "我们支持信用卡、支付宝、微信支付等多种支付方式。"
        },
        {
          question: "可以随时取消订阅吗？",
          answer: "可以。在账户设置中点击\"取消订阅\"，您的账户将在当前计费周期结束后降级为免费版。"
        },
        {
          question: "退款政策是什么？",
          answer: "我们提供7天无理由退款。如果您在7天内对服务不满意，可以申请全额退款。"
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <BackgroundAnimations variant="default" particleCount={8} />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">常见问题</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              找不到您需要的答案？请查看我们的常见问题解答
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">还有其他问题？</h2>
          <p className="text-gray-600 mb-6">
            如果这里没有找到您需要的答案，请随时联系我们
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              联系我们
            </a>
            <a
              href="mailto:contact@novamail.com"
              className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              发送邮件
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
