import type { Metadata } from 'next'
import CryptocurrenciesPage from './CryptocurrenciesPage'

export const metadata: Metadata = {
  title: 'Cryptocurrency Trading',
  description:
    'Ledgers, liquidity, and rules—crypto education with tech context, custody, and scenarios. APFX; educational only.',
}

export default function CryptocurrenciesProductPage() {
  return <CryptocurrenciesPage />
}
