import type { Metadata } from 'next'
import HomeClient from './HomeClient'
import { buildMetadata } from '@/lib/seo'

/* =========================================================
   APFX — Homepage
   Server Component: exports Metadata for SSR, renders client shell
   ========================================================= */

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'APFX: Institutional Forex & CFD Trading Platform',
    description:
      'Trade Forex, Indices, Commodities, and digital assets securely with institutional execution and 24/7 support on APFX Global.',
    path: '/',
    keywords: [
      'forex broker',
      'CFD trading',
      'online trading platform',
      'forex trading',
      'APFX',
      'institutional trading',
      'global markets',
      'commodities trading',
      'indices trading',
      'metals trading',
    ],
  }),
  // `absolute` bypasses the root layout template ('%s | APFX')
  // without this, the title would render as:
  // 'APFX: Institutional Forex & CFD Trading Platform | APFX'
  title: {
    absolute: 'APFX: Institutional Forex & CFD Trading Platform',
  },
}

export default function HomePage() {
  return <HomeClient />
}
