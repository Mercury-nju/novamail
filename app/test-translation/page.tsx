'use client'

import { useTranslation, changeLanguage, supportedLocales } from '@/lib/i18n'
import { useState } from 'react'

export default function TestTranslationPage() {
  const { t, loading, locale } = useTranslation()
  const [testLocale, setTestLocale] = useState(locale)

  const handleLanguageChange = (newLocale: string) => {
    setTestLocale(newLocale)
    changeLanguage(newLocale)
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Translation Test Page</h1>
        
        {/* Debug Info */}
        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Current Locale:</strong> {locale}
            </div>
            <div>
              <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Test Locale:</strong> {testLocale}
            </div>
            <div>
              <strong>Translations Loaded:</strong> {Object.keys(t).length > 0 ? 'Yes' : 'No'}
            </div>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Language Switcher</h2>
          <div className="flex flex-wrap gap-2">
            {supportedLocales.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  language.code === locale
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {language.flag} {language.name}
              </button>
            ))}
          </div>
        </div>

        {/* Translation Tests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <div className="space-y-2">
              <p><strong>Home:</strong> {t('nav.home')}</p>
              <p><strong>Features:</strong> {t('nav.features')}</p>
              <p><strong>Pricing:</strong> {t('nav.pricing')}</p>
              <p><strong>About:</strong> {t('nav.about')}</p>
              <p><strong>Contact:</strong> {t('nav.contact')}</p>
              <p><strong>Login:</strong> {t('nav.login')}</p>
              <p><strong>Register:</strong> {t('nav.register')}</p>
              <p><strong>Dashboard:</strong> {t('nav.dashboard')}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
            <div className="space-y-2">
              <p><strong>Title:</strong> {t('hero.title')}</p>
              <p><strong>Subtitle:</strong> {t('hero.subtitle')}</p>
              <p><strong>CTA:</strong> {t('hero.cta')}</p>
              <p><strong>Learn More:</strong> {t('hero.learnMore')}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Dashboard</h3>
            <div className="space-y-2">
              <p><strong>Title:</strong> {t('dashboard.title')}</p>
              <p><strong>Welcome:</strong> {t('dashboard.welcome')}</p>
              <p><strong>Create Email:</strong> {t('dashboard.createEmail')}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Editor</h3>
            <div className="space-y-2">
              <p><strong>Title:</strong> {t('editor.title')}</p>
              <p><strong>AI Assistant:</strong> {t('editor.aiAssistant')}</p>
              <p><strong>Chat Placeholder:</strong> {t('editor.chatPlaceholder')}</p>
              <p><strong>Save Draft:</strong> {t('editor.saveDraft')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
