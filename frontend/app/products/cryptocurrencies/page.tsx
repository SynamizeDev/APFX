import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import CryptocurrenciesPage from './CryptocurrenciesPage'

export const metadata: Metadata = buildMetadata({
  title: 'Cryptocurrency CFD Trading — Bitcoin, Ethereum & Altcoins',
  description:
    'Trade major cryptocurrencies as CFDs with institutional liquidity. 24/7 access to Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), Solana (SOL), and 50+ digital assets with tight spreads.',
  path: '/products/cryptocurrencies',
  keywords: [
    'cryptocurrency trading',
    'Bitcoin CFD',
    'Ethereum trading',
    'crypto broker',
    'BTC/USD',
    'ETH/USD',
    'digital assets trading',
    '24/7 crypto',
  ],
})

export default function CryptocurrenciesProductPage() {
  return <CryptocurrenciesPage />
}
