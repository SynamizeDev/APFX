import type { Metadata } from 'next'
import CryptocurrenciesPage from './CryptocurrenciesPage'

export const metadata: Metadata = {
  title: 'Cryptocurrency CFD Trading - Bitcoin, Ethereum & Altcoins',
  description:
    'Trade major cryptocurrencies with institutional liquidity. 24/7 access to Bitcoin, ETH, and other digital assets as CFDs with tight spreads.',
}

export default function CryptocurrenciesProductPage() {
  return <CryptocurrenciesPage />
}
