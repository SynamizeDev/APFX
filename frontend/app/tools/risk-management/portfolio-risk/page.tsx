import type { Metadata } from 'next'
import { buildMetadata, buildSoftwareAppJsonLd } from '@/lib/seo'
import PortfolioRiskClient from './PortfolioRiskClient'

export const metadata: Metadata = buildMetadata({
  title: 'Portfolio Risk Calculator — Multi-Position Risk Exposure',
  description:
    'Analyse total risk exposure across all open positions in your portfolio. Identify correlated risks, aggregate exposure, and ensure your portfolio stays within institutional risk limits.',
  path: '/tools/risk-management/portfolio-risk',
  keywords: [
    'portfolio risk calculator',
    'multi-position risk',
    'aggregate risk exposure',
    'portfolio risk management',
    'forex portfolio analysis',
    'correlated positions risk',
  ],
})

const jsonLd = buildSoftwareAppJsonLd({
  name: 'APFX Portfolio Risk Calculator',
  description:
    'Analyse total risk exposure across multiple open trading positions in your portfolio.',
  path: '/tools/risk-management/portfolio-risk',
})

export default function PortfolioRiskPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioRiskClient />
    </>
  )
}
