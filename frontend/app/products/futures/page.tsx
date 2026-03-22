import type { Metadata } from 'next'
import FuturesPage from './FuturesPage'

export const metadata: Metadata = {
  title: 'Futures Trading',
  description:
    'Learn how futures contracts work—margin, expiry, risks, and basic strategies. Educational content only; no live prices.',
}

export default function FuturesProductPage() {
  return <FuturesPage />
}
