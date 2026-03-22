import type { Metadata } from 'next'
import FuturesPage from './FuturesPage'

export const metadata: Metadata = {
  title: 'Futures Trading',
  description:
    'Contracts, margin, rolls, and curve vocabulary—futures education for disciplined prep. APFX; educational only.',
}

export default function FuturesProductPage() {
  return <FuturesPage />
}
