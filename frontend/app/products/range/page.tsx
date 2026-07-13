import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import RangePage from './RangePage'

export const metadata: Metadata = buildMetadata({
  title: 'Full Range of Tradeable Markets — Forex, Stocks, Commodities & More',
  description:
    'Explore the full range of institutional trading products available at APFX. Forex, Stocks, Commodities, Indices, Cryptocurrencies, and Futures — all from one professional account.',
  path: '/products/range',
  keywords: [
    'range of markets',
    'APFX products',
    'tradeable assets',
    'multi-asset trading',
    'forex and stocks',
    'all markets broker',
  ],
})

export default function ProductsRangePage() {
  return <RangePage />
}
