'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  SparklesIcon,
  HomeIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { fetchUserSubscription } from '@/lib/permissions'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Contacts', href: '/dashboard/contacts', icon: UserGroupIcon },
  { name: 'Campaigns', href: '/dashboard/campaigns', icon: EnvelopeIcon },
  { name: 'Templates', href: '/dashboard/templates', icon: DocumentTextIcon },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCardIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
  { name: 'Pricing', href: '/pricing', icon: CurrencyDollarIcon },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  
  // 认证状态检查
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  
  // 订阅状态
  const [userSubscription, setUserSubscription] = useState<any>(null)

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const userToken = localStorage.getItem('user-token')
        const userEmail = localStorage.getItem('user-email')
        
        console.log('Dashboard auth check - token:', userToken, 'email:', userEmail)
        
        if (userToken && userEmail) {
          setIsAuthenticated(true)
          console.log('User authenticated:', userEmail)
          
          // 获取用户订阅状态
          const loadSubscription = async () => {
            try {
              const subscription = await fetchUserSubscription(userEmail)
              if (subscription) {
                setUserSubscription(subscription)
                console.log('User subscription loaded:', subscription)
              }
            } catch (error) {
              console.error('Failed to load subscription:', error)
            }
          }
          loadSubscription()
          
        } else {
          setIsAuthenticated(false)
          console.log('User not authenticated, redirecting to login')
          router.push('/login')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
    
    // 定期刷新订阅状态
    const subscriptionInterval = setInterval(async () => {
      const userEmail = localStorage.getItem('user-email')
      if (userEmail) {
        try {
          const subscription = await fetchUserSubscription(userEmail)
          if (subscription) {
            setUserSubscription(subscription)
            console.log('Subscription refreshed:', subscription)
          }
        } catch (error) {
          console.error('Failed to refresh subscription:', error)
        }
      }
    }, 30000) // 每30秒刷新一次
    
    // 清理定时器
    return () => clearInterval(subscriptionInterval)
  }, [router])


  // 显示加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // 未认证用户重定向
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    // 清理所有认证数据
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-email')
      localStorage.removeItem('user-name')
      localStorage.removeItem('user-id')
      localStorage.removeItem('user-picture')
      localStorage.removeItem('auth-provider')
    }
    
    toast.success('Logged out successfully')
    setIsAuthenticated(false)
    router.push('/')
  }

  // 获取用户显示信息（静态导出模式）
  const getUserDisplayName = () => {
    if (typeof window !== 'undefined') {
      const userName = localStorage.getItem('user-name')
      const userEmail = localStorage.getItem('user-email')
      return userName || userEmail || 'Guest User'
    }
    return 'Guest User'
  }

  const getUserInitials = () => {
    const name = getUserDisplayName()
    if (name.includes('@')) {
      return name.charAt(0).toUpperCase()
    }
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center group" onClick={() => setSidebarOpen(false)}>
              <span className="text-xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                NovaMail
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  id={`nav-link-${item.name.toLowerCase()}`}
                  className={`group flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700 transition-colors'}`} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                  )}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200 group"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center group">
              <span className="text-xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                NovaMail
              </span>
            </Link>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  id={`nav-link-${item.name.toLowerCase()}`}
                  className={`group flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700 transition-colors'}`} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                  )}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200 group"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-8 lg:w-px lg:bg-gradient-to-b lg:from-transparent lg:via-gray-300 lg:to-transparent" />
              <div className="flex items-center gap-x-3">
                {/* User Avatar */}
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 shadow-lg">
                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                      <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{getUserInitials()}</span>
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                {/* User Info */}
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-semibold text-gray-900">{getUserDisplayName()}</span>
                  {userSubscription && (
                    userSubscription.plan === 'pro' ? (
                      <motion.span
                        className="inline-flex items-center rounded-md bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        ⭐ PRO
                      </motion.span>
                    ) : (
                      <span className="text-[10px] font-medium text-gray-500">
                        Free
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

    </div>
  )
}
