import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// 支持的语言列表
export const supportedLocales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
]

// 根据国家代码获取语言
export const getLanguageByCountry = (countryCode: string): string => {
  const countryLanguageMap: { [key: string]: string } = {
    'US': 'en', 'GB': 'en', 'AU': 'en', 'CA': 'en',
    'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'SG': 'zh',
    'JP': 'ja',
    'KR': 'ko',
    'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es',
    'FR': 'fr', 'BE': 'fr',
    'DE': 'de', 'AT': 'de', 'CH': 'de'
  }
  
  return countryLanguageMap[countryCode] || 'en'
}

// 获取用户地理位置
export const getUserLocation = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return data.country_code || 'US'
  } catch (error) {
    console.error('Failed to get user location:', error)
    return 'US'
  }
}

// 翻译函数
export const useTranslation = () => {
  const [translations, setTranslations] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [locale, setLocale] = useState('en')

  useEffect(() => {
    // 从localStorage获取保存的语言设置
    const savedLocale = localStorage.getItem('novaMail-locale') || 'en'
    setLocale(savedLocale)
    
    const loadTranslations = async (targetLocale: string) => {
      try {
        console.log(`Loading translations for locale: ${targetLocale}`)
        const response = await fetch(`/locales/${targetLocale}/common.json`)
        
        if (!response.ok) {
          throw new Error(`Failed to load translations: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Loaded translations:', data)
        setTranslations(data)
        setLocale(targetLocale)
      } catch (error) {
        console.error('Failed to load translations:', error)
        // 回退到英文
        try {
          console.log('Falling back to English translations')
          const response = await fetch('/locales/en/common.json')
          if (response.ok) {
            const data = await response.json()
            setTranslations(data)
            setLocale('en')
          } else {
            // 如果连英文都加载失败，使用硬编码的英文翻译
            console.log('Using hardcoded English translations')
            setTranslations(getHardcodedTranslations('en'))
            setLocale('en')
          }
        } catch (fallbackError) {
          console.error('Failed to load fallback translations:', fallbackError)
          setTranslations(getHardcodedTranslations('en'))
          setLocale('en')
        }
      } finally {
        setLoading(false)
      }
    }

    // 初始加载
    loadTranslations(savedLocale)

    // 监听语言变化事件
    const handleLanguageChange = (event: CustomEvent) => {
      const newLocale = event.detail.locale
      setLoading(true)
      loadTranslations(newLocale)
    }

    window.addEventListener('languageChanged', handleLanguageChange as EventListener)
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener)
    }
  }, [])

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.')
    let value = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return fallback || key
      }
    }
    
    return typeof value === 'string' ? value : (fallback || key)
  }

  return { t, loading, locale }
}

// 硬编码的英文翻译作为后备
function getHardcodedTranslations(locale: string) {
  if (locale === 'zh') {
    return {
      nav: { home: '首页', features: '功能', pricing: '价格', about: '关于', contact: '联系', login: '登录', register: '注册', dashboard: '控制台' },
      hero: { title: 'AI驱动的邮件营销助手', subtitle: '使用AI创建精美的专业邮件模板并发送给您的受众', cta: '免费开始', learnMore: '了解更多' },
      dashboard: { title: '控制台', welcome: '欢迎使用NovaMail', createEmail: '创建邮件' },
      editor: { title: '邮件编辑器', aiAssistant: 'AI助手', chatPlaceholder: '描述您想要创建的邮件内容...', saveDraft: '保存草稿' },
      common: { loading: '加载中...', error: '错误', success: '成功', save: '保存', cancel: '取消' }
    }
  }
  
  return {
    nav: { home: 'Home', features: 'Features', pricing: 'Pricing', about: 'About', contact: 'Contact', login: 'Login', register: 'Register', dashboard: 'Dashboard' },
    hero: { title: 'AI-Powered Email Marketing Assistant', subtitle: 'Create stunning professional email templates with AI and send them to your audience', cta: 'Get Started Free', learnMore: 'Learn More' },
    dashboard: { title: 'Dashboard', welcome: 'Welcome to NovaMail', createEmail: 'Create Email' },
    editor: { title: 'Email Editor', aiAssistant: 'AI Assistant', chatPlaceholder: 'Describe the email content you want to create...', saveDraft: 'Save Draft' },
    common: { loading: 'Loading...', error: 'Error', success: 'Success', save: 'Save', cancel: 'Cancel' }
  }
}

// 语言切换函数
export const changeLanguage = (locale: string) => {
  // 保存到localStorage
  localStorage.setItem('novaMail-locale', locale)
  // 触发自定义事件来通知组件重新加载翻译
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { locale } }))
}

// 自动检测并设置语言
export const useAutoLanguageDetection = () => {
  const [detecting, setDetecting] = useState(false)

  useEffect(() => {
    const detectAndSetLanguage = async () => {
      // 检查是否已经设置过语言
      const savedLocale = localStorage.getItem('novaMail-locale')
      if (savedLocale || detecting) return
      
      setDetecting(true)
      try {
        const countryCode = await getUserLocation()
        const suggestedLanguage = getLanguageByCountry(countryCode)
        
        if (suggestedLanguage !== 'en' && supportedLocales.some(l => l.code === suggestedLanguage)) {
          // 直接自动切换到检测到的语言
          console.log(`Auto-switching to ${suggestedLanguage} for country ${countryCode}`)
          changeLanguage(suggestedLanguage)
        }
      } catch (error) {
        console.error('Language detection failed:', error)
      } finally {
        setDetecting(false)
      }
    }

    detectAndSetLanguage()
  }, [detecting])

  return { detecting }
}
