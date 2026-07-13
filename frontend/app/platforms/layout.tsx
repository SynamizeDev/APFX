import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Trading Platforms — Web Terminal, Mobile & cTrader',
  description:
    'Access global markets from any device with APFX trading platforms. Advanced Web Terminal, full TradingView integration, WebTrader, cTrader, and mobile apps for iOS and Android.',
  path: '/platforms',
  keywords: [
    'trading platform',
    'cTrader',
    'web trading terminal',
    'forex trading app',
    'APFX platform',
    'mobile trading',
  ],
})

export default function PlatformsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
