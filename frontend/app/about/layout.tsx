import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Company — Pioneering Institutional Trading',
  description:
    'Discover the mission, technology, and global infrastructure behind APFX. We are dedicated to providing traders with institutional-grade liquidity and advanced trading tools.',
  path: '/about',
  keywords: ['APFX company', 'about APFX', 'forex broker company', 'institutional trading firm'],
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
