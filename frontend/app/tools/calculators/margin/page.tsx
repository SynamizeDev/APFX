import type { Metadata } from 'next'
import { buildMetadata, buildSoftwareAppJsonLd } from '@/lib/seo'
import MarginCalculatorClient from './MarginCalculatorClient'

export const metadata: Metadata = buildMetadata({
  title: 'Forex Margin Calculator — Required Margin by Lot Size',
  description:
    'Calculate the required margin for any Forex trade instantly. Input currency pair, lot size, and leverage to determine your exact margin requirement before entering a position.',
  path: '/tools/calculators/margin',
  keywords: [
    'margin calculator',
    'forex margin',
    'required margin calculator',
    'lot size margin',
    'leverage calculator',
    'forex position margin',
  ],
})

const jsonLd = buildSoftwareAppJsonLd({
  name: 'APFX Forex Margin Calculator',
  description:
    'Calculate required margin for Forex trades by currency pair, lot size, and leverage.',
  path: '/tools/calculators/margin',
})

export default function MarginCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarginCalculatorClient />
    </>
  )
}
