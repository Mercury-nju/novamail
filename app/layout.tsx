import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import MarketingBanner from '@/components/MarketingBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NovaMail',
  description: 'Your AI Copilot for Email Marketing. Writes, designs, and sends stunning campaigns — all in minutes. Track results instantly and grow your audience effortlessly.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo-icon.svg',
  },
}

// 生成静态参数用于国际化
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'ja' },
    { locale: 'ko' },
    { locale: 'es' },
    { locale: 'fr' },
    { locale: 'de' }
  ]
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = params?.locale || 'en'
  
  return (
    <html lang={locale}>
      <head>
        <script 
          src="https://analytics.ahrefs.com/analytics.js" 
          data-key="8ipI/r5zRTqBj/vH7uxp+w" 
          async
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <MarketingBanner />
        </Providers>
      </body>
    </html>
  )
}