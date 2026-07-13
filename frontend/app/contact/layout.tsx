import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Contact APFX — 24/5 Global Support & Institutional Relations',
  description:
    'Get in touch with APFX global support team or our institutional relations desk. Available 24/5 via live chat, email, and dedicated account manager lines.',
  path: '/contact',
  keywords: ['contact APFX', 'forex broker support', 'trading support', 'APFX help'],
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
