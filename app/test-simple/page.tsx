'use client'

import { useState } from 'react'
import { useTranslation, changeLanguage } from '@/lib/i18n'

export default function TestSimplePage() {
  const { t, locale } = useTranslation()
  const [testLocale, setTestLocale] = useState(locale)

  const handleLanguageChange = (newLocale: string) => {
    console.log('Changing language to:', newLocale)
    setTestLocale(newLocale)
    changeLanguage(newLocale)
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Simple Language Test</h1>
        
        {/* Current Status */}
        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <p><strong>Current Locale:</strong> {locale}</p>
          <p><strong>Test Locale:</strong> {testLocale}</p>
          <p><strong>Translation Test:</strong> {t('nav.home', 'Home')}</p>
        </div>

        {/* Language Buttons */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Change Language</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-4 py-2 rounded-lg border-2 ${
                locale === 'en' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              🇺🇸 English
            </button>
            <button
              onClick={() => handleLanguageChange('zh')}
              className={`px-4 py-2 rounded-lg border-2 ${
                locale === 'zh' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              🇨🇳 中文
            </button>
            <button
              onClick={() => handleLanguageChange('ja')}
              className={`px-4 py-2 rounded-lg border-2 ${
                locale === 'ja' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              🇯🇵 日本語
            </button>
          </div>
        </div>

        {/* Translation Tests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Navigation</h3>
            <p>Home: {t('nav.home', 'Home')}</p>
            <p>Features: {t('nav.features', 'Features')}</p>
            <p>Pricing: {t('nav.pricing', 'Pricing')}</p>
            <p>About: {t('nav.about', 'About')}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Hero Section</h3>
            <p>Title: {t('hero.title', 'AI-Powered Email Marketing Assistant')}</p>
            <p>Subtitle: {t('hero.subtitle', 'Create stunning professional email templates')}</p>
            <p>CTA: {t('hero.cta', 'Get Started Free')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
