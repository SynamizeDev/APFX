import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import StocksClient from './StocksClient'

export const metadata: Metadata = buildMetadata({
  title: 'Global Stock CFD Trading — 1000+ Shares with Low Commission',
  description:
    'Trade 1000+ global stocks as CFDs with institutional-grade execution. Access NYSE, NASDAQ, LSE, and ASX listed companies with competitive pricing and deep liquidity.',
  path: '/products/stocks',
  keywords: [
    'stock CFD trading',
    'share trading',
    'US stocks broker',
    'NYSE CFD',
    'NASDAQ stocks',
    'global equities',
    'low commission stocks',
  ],
})

export default function StocksPage() {
  return <StocksClient />
}
