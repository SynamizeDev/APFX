import type { Metadata } from 'next'
import IndicesPage from './IndicesPage'

export const metadata: Metadata = {
  title: 'Indices Trading',
  description:
    'Learn how market indices work and how traders approach index CFDs and futures—benefits, risks, and risk management. Educational content only.',
}

export default function IndicesProductPage() {
  return <IndicesPage />
}
