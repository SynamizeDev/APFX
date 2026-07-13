import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import FuturesPage from './FuturesPage'

export const metadata: Metadata = buildMetadata({
  title: 'Futures CFD Trading — Institutional Market Access',
  description:
    'Trade global futures contracts as CFDs with deep liquidity, competitive margins, and institutional-grade execution. Access energy, agricultural, metal, and financial futures from one account.',
  path: '/products/futures',
  keywords: [
    'futures trading',
    'futures CFD',
    'commodity futures',
    'financial futures',
    'institutional futures',
    'crude oil futures',
    'gold futures',
  ],
})

export default function FuturesProductPage() {
  return <FuturesPage />
}
