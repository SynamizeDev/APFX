import type { Metadata } from 'next'
import IndicesPage from './IndicesPage'

export const metadata: Metadata = {
  title: 'Global Stock Indices Trading - DAX, NASDAQ, S&P 500',
  description:
    'Trade the world\'s leading stock indices with low latency. Access global benchmarks including Dow Jones, FTSE 100, and more with institutional liquidity.',
}

export default function IndicesProductPage() {
  return <IndicesPage />
}
