'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const faqCategories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: '🚀'
  },
  {
    id: 'email-campaigns',
    name: 'Email Campaigns',
    icon: '📧'
  },
  {
    id: 'contacts',
    name: 'Contacts',
    icon: '👥'
  },
  {
    id: 'templates',
    name: 'Templates',
    icon: '🎨'
  },
  {
    id: 'ai-features',
    name: 'AI Features',
    icon: '🤖'
  },
  {
    id: 'billing',
    name: 'Billing',
    icon: '💳'
  },
  {
    id: 'technical',
    name: 'Technical',
    icon: '⚙️'
  }
]

const faqs = {
  'getting-started': [
    {
      question: 'How do I create my first email campaign?',
      answer: 'To create your first email campaign, go to the Dashboard and click "Create Campaign". Choose between Simple Email or Professional Templates, fill in your campaign information, and let our AI generate content for you. Then review, edit if needed, and send to your recipients.'
    },
    {
      question: 'What is the difference between Simple Email and Professional Templates?',
      answer: 'Simple Email creates clean, text-based emails perfect for personal messages and newsletters. Professional Templates offer rich, visually appealing designs with gradients, buttons, and advanced layouts for marketing campaigns and business communications.'
    },
    {
      question: 'How do I import my contact list?',
      answer: 'You can import contacts in several ways: 1) Go to Contacts page and click "Import Contacts", 2) Upload CSV, TXT, or Excel files, 3) Manually add contacts one by one, or 4) Import from existing campaigns. We support various formats including Excel (.xlsx, .xls).'
    },
    {
      question: 'Do I need to configure SMTP to send emails?',
      answer: 'Yes, you need to configure your SMTP settings to send emails. Go to Settings > Email Configuration and set up your email provider (Gmail, Outlook, Yahoo, or custom SMTP). We provide detailed guides for each provider.'
    }
  ],
  'email-campaigns': [
    {
      question: 'How many emails can I send per month?',
      answer: 'The limit depends on your plan: Free (1,000 emails), Pro (25,000 emails), Enterprise (Unlimited). You can check your current usage in the Dashboard analytics section.'
    },
    {
      question: 'Can I schedule emails to be sent later?',
      answer: 'Yes, you can schedule campaigns to be sent at a specific date and time. In the campaign creation process, you\'ll find scheduling options in the final step before sending.'
    },
    {
      question: 'How do I track email performance?',
      answer: 'Our analytics dashboard shows open rates, click rates, delivery status, and engagement metrics. You can view detailed reports for each campaign and track performance over time.'
    },
    {
      question: 'What happens if my email bounces?',
      answer: 'Bounced emails are automatically tracked and marked in your contact list. We provide bounce reasons and help you clean your list. High bounce rates may affect your sender reputation.'
    }
  ],
  'contacts': [
    {
      question: 'How do I organize my contacts into groups?',
      answer: 'You can create custom contact groups (segments) in the Contacts page. Click "Manage Groups" to create, edit, or delete groups. You can then assign contacts to groups or move multiple contacts at once.'
    },
    {
      question: 'What contact statuses are available?',
      answer: 'Contacts can have three statuses: Active (can receive emails), Unsubscribed (opted out), and Bounced (email delivery failed). You can change contact statuses individually or in bulk.'
    },
    {
      question: 'Can I export my contact list?',
      answer: 'Yes, you can export your contacts in CSV format. Go to the Contacts page, select the contacts you want to export, and click the export button. You can export all contacts or filtered results.'
    },
    {
      question: 'How do I handle unsubscribe requests?',
      answer: 'Unsubscribe requests are automatically processed. Contacts who unsubscribe are marked as "Unsubscribed" and won\'t receive future emails. You can view unsubscribe statistics in your analytics.'
    }
  ],
  'templates': [
    {
      question: 'What professional templates are available?',
      answer: 'We offer four professional templates: Modern Promo (blue gradient), Newsletter (green), E-commerce (orange), and Event Invite (pink). Each template has unique styling and is optimized for different types of campaigns.'
    },
    {
      question: 'Can I customize the professional templates?',
      answer: 'Yes, you can edit the AI-generated content within templates. The templates provide the visual structure, and you can modify text, colors, and content to match your brand and message.'
    },
    {
      question: 'Are templates mobile-responsive?',
      answer: 'All our professional templates are fully responsive and optimized for mobile devices. They automatically adapt to different screen sizes for the best viewing experience.'
    },
    {
      question: 'Can I create my own custom templates?',
      answer: 'Currently, we offer the four professional templates mentioned above. Custom template creation is available for Enterprise customers. Contact us for more information about custom template development.'
    }
  ],
  'ai-features': [
    {
      question: 'How does AI email generation work?',
      answer: 'Our AI analyzes your campaign information (business type, products/services, target audience) and generates relevant email content. It creates both subject lines and email body content that matches your selected template style.'
    },
    {
      question: 'Can I edit the AI-generated content?',
      answer: 'Absolutely! The AI-generated content is fully editable. You can modify the subject line, edit the email body text, and customize any part of the generated content to match your specific needs.'
    },
    {
      question: 'What AI model does NovaMail use?',
      answer: 'We use advanced AI technology to generate email content. The AI is trained on best practices for email marketing and creates engaging, professional content tailored to your business needs.'
    },
    {
      question: 'Is AI generation available for all plans?',
      answer: 'Yes, AI email generation is available for all plans including Free. However, Professional Templates (which work with AI) are available for Pro and Enterprise plans only.'
    }
  ],
  'billing': [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All payments are processed securely through our payment partners.'
    },
    {
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle. You\'ll only pay the prorated difference.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for new customers. If you\'re not satisfied with our service, contact our support team within 30 days of your first payment for a full refund.'
    },
    {
      question: 'How does the free plan work?',
      answer: 'The free plan includes 500 contacts, 1,000 emails per month, 2 campaigns per month, and basic features. It\'s perfect for getting started with email marketing.'
    }
  ],
  'technical': [
    {
      question: 'What SMTP settings do I need?',
      answer: 'You need to configure: SMTP server host, port (usually 587), your email address, and app password. We provide detailed setup guides for Gmail, Outlook, Yahoo, and other providers in Settings > Email Configuration.'
    },
    {
      question: 'Why is my email not sending?',
      answer: 'Common issues include: incorrect SMTP settings, using regular password instead of app password, firewall blocking SMTP ports, or exceeding sending limits. Check your SMTP configuration and test the connection.'
    },
    {
      question: 'How do I test my SMTP connection?',
      answer: 'Go to Settings > Email Configuration and click "Test Connection". This will verify your SMTP settings and ensure emails can be sent successfully.'
    },
    {
      question: 'What file formats can I import?',
      answer: 'We support CSV, TXT, and Excel files (.xlsx, .xls) for contact imports. CSV files should have headers (name, email, segment). TXT files can have one email per line or "name,email" format.'
    }
  ]
}

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('getting-started')
  const [openFaqs, setOpenFaqs] = useState<number[]>([])

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions and get the support you need
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <nav className="space-y-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {faqCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>
              
              <div className="space-y-4">
                {faqs[activeCategory as keyof typeof faqs]?.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {openFaqs.includes(index) ? (
                        <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {openFaqs.includes(index) && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="mailto:contact@novamail.com"
                className="inline-flex items-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}