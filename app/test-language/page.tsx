'use client'

import { useTranslation, changeLanguage, supportedLocales } from '@/lib/i18n'

export default function TestLanguagePage() {
  const { t, locale } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t('test.title', 'Language Test Page')}
          </h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {t('test.currentLanguage', 'Current Language')}: {locale}
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {supportedLocales.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    locale === lang.code
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Navigation</h3>
              <p>Home: {t('nav.home', 'Home')}</p>
              <p>Features: {t('nav.features', 'Features')}</p>
              <p>Pricing: {t('nav.pricing', 'Pricing')}</p>
              <p>Login: {t('nav.login', 'Login')}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Hero Section</h3>
              <p>Title: {t('hero.title', 'Hero Title')}</p>
              <p>Subtitle: {t('hero.subtitle', 'Hero Subtitle')}</p>
              <p>CTA: {t('hero.cta', 'Get Started')}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Dashboard</h3>
              <p>Title: {t('dashboard.title', 'Dashboard')}</p>
              <p>Welcome: {t('dashboard.welcome', 'Welcome')}</p>
              <p>Create Email: {t('dashboard.createEmail', 'Create Email')}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Features</h3>
              <p>Title: {t('features.title', 'Features Title')}</p>
              <p>Subtitle: {t('features.subtitle', 'Features Subtitle')}</p>
              <p>Simple: {t('features.simple', 'Simple & Effective')}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Common</h3>
              <p>Email: {t('common.email', 'Email')}</p>
              <p>Password: {t('common.password', 'Password')}</p>
              <p>Loading: {t('common.loading', 'Loading...')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
