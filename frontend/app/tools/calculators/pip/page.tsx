import type { Metadata } from 'next'
import { buildMetadata, buildSoftwareAppJsonLd } from '@/lib/seo'
import PipCalculatorClient from './PipCalculatorClient'

export const metadata: Metadata = buildMetadata({
  title: 'Free Pip Value Calculator — Forex Pip Calculator Online',
  description:
    'Calculate the exact pip value for any Forex currency pair in seconds. Supports all major and exotic pairs. Free professional pip value calculator from APFX.',
  path: '/tools/calculators/pip',
  keywords: [
    'pip calculator',
    'forex pip value',
    'pip value calculator',
    'how to calculate pips',
    'EUR/USD pip value',
    'free pip calculator',
  ],
})

const jsonLd = buildSoftwareAppJsonLd({
  name: 'APFX Pip Value Calculator',
  description:
    'Calculate pip value for any Forex currency pair. Supports all major, minor, and exotic pairs.',
  path: '/tools/calculators/pip',
})

export default function PipCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PipCalculatorClient />
    </>
  )
}
