import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Press & Media — APFX News, Announcements & Media Kit',
  description:
    'Official press releases, media coverage, company announcements, and press kit for APFX Global Markets. Contact our media relations team for interviews and partnerships.',
  path: '/about/press',
  keywords: ['APFX press', 'APFX news', 'forex broker news', 'APFX media kit'],
})

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
