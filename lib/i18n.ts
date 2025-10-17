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
    'FR': 'fr', 'BE': 'fr', 'CH': 'fr', 'CA': 'fr',
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
    
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${savedLocale}/common.json`)
        const data = await response.json()
        setTranslations(data)
      } catch (error) {
        console.error('Failed to load translations:', error)
        // 回退到英文
        try {
          const response = await fetch('/locales/en/common.json')
          const data = await response.json()
          setTranslations(data)
        } catch (fallbackError) {
          console.error('Failed to load fallback translations:', fallbackError)
        }
      } finally {
        setLoading(false)
      }
    }

    loadTranslations()
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

// 语言切换函数
export const changeLanguage = (locale: string) => {
  // 保存到localStorage
  localStorage.setItem('novaMail-locale', locale)
  // 重新加载页面以应用新语言
  window.location.reload()
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
          // 询问用户是否切换到检测到的语言
          const shouldSwitch = confirm(
            `We detected you're from ${countryCode}. Would you like to switch to ${supportedLocales.find(l => l.code === suggestedLanguage)?.name}?`
          )
          
          if (shouldSwitch) {
            changeLanguage(suggestedLanguage)
          }
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
