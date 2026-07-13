import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import IndicesPage from './IndicesPage'

export const metadata: Metadata = buildMetadata({
  title: 'Stock Indices CFD Trading — DAX, NASDAQ, S&P 500 & More',
  description:
    "Trade the world's leading stock indices as CFDs with low latency. Access S&P 500, NASDAQ 100, DAX 40, FTSE 100, Nikkei 225, and 20+ global benchmarks with institutional liquidity.",
  path: '/products/indices',
  keywords: [
    'indices trading',
    'stock index CFD',
    'S&P 500 trading',
    'NASDAQ CFD',
    'DAX trading',
    'FTSE 100',
    'index CFDs',
  ],
})

export default function IndicesProductPage() {
  return <IndicesPage />
}
