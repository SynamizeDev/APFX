import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import MarketplaceClient from './MarketplaceClient'

export const metadata: Metadata = buildMetadata({
  title: 'APFX Marketplace — Trading Robots, Indicators & Plugins',
  description:
    'Browse and deploy professional trading robots (EAs), custom indicators, and platform plugins through the official APFX Marketplace. Automate your strategy with institutional-grade tools.',
  path: '/marketplace',
  keywords: [
    'trading marketplace',
    'forex robots',
    'expert advisors',
    'trading indicators',
    'MT4 plugins',
    'cTrader marketplace',
    'automated trading tools',
  ],
})

export default function MarketplacePage() {
  return <MarketplaceClient />
}
