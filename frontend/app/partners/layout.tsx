import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Partner with APFX — Affiliate, IB & White Label Programs',
  description:
    'Join the APFX partner program as an affiliate, introducing broker (IB), content creator, or white-label partner. Earn competitive commissions by connecting traders to institutional-grade markets.',
  path: '/partners',
  keywords: [
    'forex affiliate program',
    'introducing broker',
    'IB program',
    'APFX partners',
    'forex partnership',
    'white label forex',
  ],
})

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
