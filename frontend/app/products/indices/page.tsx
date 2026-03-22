import type { Metadata } from 'next'
import IndicesPage from './IndicesPage'

export const metadata: Metadata = {
  title: 'Indices Trading',
  description:
    'Benchmarks, macro behavior, and index products—methodology, sessions, and risk habits. APFX; educational only.',
}

export default function IndicesProductPage() {
  return <IndicesPage />
}
