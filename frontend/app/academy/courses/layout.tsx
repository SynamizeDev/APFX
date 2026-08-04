import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Trading & Investing Insights — APFX Courses',
  description:
    'Expert trading education, strategies, market analysis, and platform guides. Learn Forex fundamentals, technical analysis, risk management, and how to use professional trading tools.',
  path: '/academy/courses',
  keywords: [
    'trading blog',
    'forex education',
    'trading strategies',
    'market analysis',
    'technical analysis',
    'risk management guide',
    'forex tips',
  ],
})

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
