import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About APFX — Our Mission, Values & Trading Infrastructure',
  description:
    'Learn about APFX — our institutional mission, core values, global infrastructure, and commitment to providing premium trading tools for professional traders and investors worldwide.',
  path: '/about/about-us',
  keywords: ['about APFX', 'APFX mission', 'forex broker history', 'institutional broker'],
})

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
