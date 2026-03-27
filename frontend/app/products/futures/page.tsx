import type { Metadata } from 'next'
import FuturesPage from './FuturesPage'

export const metadata: Metadata = {
  title: 'Futures CFD Trading - Institutional Market Access',
  description:
    'Efficiently trade global futures contracts as CFDs with deep liquidity, institutional-grade execution, and professional trading tools.',
}

export default function FuturesProductPage() {
  return <FuturesPage />
}
