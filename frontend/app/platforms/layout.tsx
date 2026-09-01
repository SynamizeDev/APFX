import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'APFX Trading Platforms — Advanced Web Terminal & cTrader App',
  description:
    'Trade your way with APFX trading platforms. Trade directly in your browser with our Advanced Web Terminal or trade on the go with the APFX cTrader App for iOS and Android.',
  path: '/platforms',
  keywords: [
    'APFX trading platforms',
    'Advanced Web Terminal',
    'APFX cTrader App',
    'browser trading',
    'mobile trading app',
    'APFX cTrader',
  ],
})

export default function PlatformsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

