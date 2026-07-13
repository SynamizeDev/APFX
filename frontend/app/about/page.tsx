import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import AboutClient from './AboutClient'

export const metadata: Metadata = buildMetadata({
  title: 'Company — Pioneering Institutional Trading',
  description:
    'Learn about APFX — our institutional history, core mission, and commitment to providing premium global trading infrastructure with deep liquidity and tight spreads.',
  path: '/about',
  keywords: ['APFX company', 'about APFX', 'institutional forex broker', 'who is APFX'],
})

export default function AboutPage() {
  return <AboutClient />
}
