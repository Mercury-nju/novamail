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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0, width: '100%', height: '100%' }}>
      <head>
        <script 
          src="https://analytics.ahrefs.com/analytics.js" 
          data-key="8ipI/r5zRTqBj/vH7uxp+w" 
          async
        />
      </head>
      <body className={inter.className} style={{ margin: 0, padding: 0, width: '100%', height: '100%' }}>
        <Providers>
          {children}
          <MarketingBanner />
        </Providers>
      </body>
    </html>
  )
}