import type { Metadata } from 'next'
import CryptocurrenciesPage from './CryptocurrenciesPage'

export const metadata: Metadata = {
  title: 'Cryptocurrency Trading',
  description:
    'Learn how digital assets and crypto trading work—basics, risks, and risk management. Educational content only; no live prices.',
}

export default function CryptocurrenciesProductPage() {
  return <CryptocurrenciesPage />
}
