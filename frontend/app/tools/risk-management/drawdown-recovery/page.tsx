import type { Metadata } from 'next'
import { buildMetadata, buildSoftwareAppJsonLd } from '@/lib/seo'
import DrawdownRecoveryClient from './DrawdownRecoveryClient'

export const metadata: Metadata = buildMetadata({
  title: 'Drawdown Recovery Calculator — How Much to Win Back Losses',
  description:
    'Find out exactly how much return you need to recover from a drawdown. This asymmetric loss recovery calculator shows why controlling drawdown is the key to long-term profitability.',
  path: '/tools/risk-management/drawdown-recovery',
  keywords: [
    'drawdown recovery calculator',
    'account recovery calculator',
    'trading loss recovery',
    'drawdown calculator',
    'how to recover trading losses',
    'forex drawdown',
  ],
})

const jsonLd = buildSoftwareAppJsonLd({
  name: 'APFX Drawdown Recovery Calculator',
  description:
    'Calculate the percentage gain required to recover from any trading account drawdown.',
  path: '/tools/risk-management/drawdown-recovery',
})

export default function DrawdownRecoveryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DrawdownRecoveryClient />
    </>
  )
}
