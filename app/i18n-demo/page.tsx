'use client'

import { useTranslation, supportedLocales, changeLanguage } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { motion } from 'framer-motion'

export default function I18nDemoPage() {
  const { t, loading, locale } = useTranslation()

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading translations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🌍</span>
              </div>
              <div>
                <h1 className="text-lg font-medium text-gray-900">NovaMail i18n Demo</h1>
                <p className="text-xs text-gray-500">Multi-language Support</p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('hero.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-600 font-medium">
                Current Language: {supportedLocales.find(l => l.code === locale)?.name} {supportedLocales.find(l => l.code === locale)?.flag}
              </span>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('features.aiTemplates.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.aiTemplates.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✏️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('features.easyEditing.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.easyEditing.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('features.analytics.title')}
              </h3>
              <p className="text-gray-600">
                {t('features.analytics.description')}
              </p>
            </motion.div>
          </div>

          {/* Language Examples */}
          <div className="bg-gray-50 rounded-xl p-8 mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Language Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Dashboard</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Title:</span> {t('dashboard.title')}</p>
                  <p><span className="font-medium">Welcome:</span> {t('dashboard.welcome')}</p>
                  <p><span className="font-medium">Create Email:</span> {t('dashboard.createEmail')}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Templates</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Title:</span> {t('templates.title')}</p>
                  <p><span className="font-medium">Select Template:</span> {t('templates.selectTemplate')}</p>
                  <p><span className="font-medium">Use Template:</span> {t('templates.useTemplate')}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Editor</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Title:</span> {t('editor.title')}</p>
                  <p><span className="font-medium">AI Assistant:</span> {t('editor.aiAssistant')}</p>
                  <p><span className="font-medium">Save Draft:</span> {t('editor.saveDraft')}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Common</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Loading:</span> {t('common.loading')}</p>
                  <p><span className="font-medium">Success:</span> {t('common.success')}</p>
                  <p><span className="font-medium">Error:</span> {t('common.error')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Supported Languages */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Supported Languages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {supportedLocales.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    language.code === locale
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{language.flag}</div>
                    <div className="font-medium text-gray-900">{language.name}</div>
                    <div className="text-xs text-gray-500">{language.code.toUpperCase()}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
