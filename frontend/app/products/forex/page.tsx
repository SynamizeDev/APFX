import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import ForexPage from './ForexPage'

export const metadata: Metadata = buildMetadata({
  title: 'Forex CFD Trading — 70+ Currency Pairs, Institutional Spreads',
  description:
    'Trade 70+ Forex currency pairs with institutional-grade liquidity and raw spreads from 0.0 pips. EUR/USD, GBP/USD, USD/JPY, and exotic pairs with deep pool execution.',
  path: '/products/forex',
  keywords: [
    'forex trading',
    'currency pairs',
    'EUR/USD trading',
    'forex broker',
    'raw spread forex',
    'low spread forex',
    'institutional forex',
  ],
})

export default function ProductsForexPage() {
  return <ForexPage />
}
