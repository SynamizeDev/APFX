import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Trading & Investing Courses — APFX Academy',
  description:
    'Free institutional-grade trading video courses from APFX. Learn Forex basics, cTrader navigation, algo trading with Python, and expert market analysis.',
  path: '/learn/courses',
  keywords: [
    'forex courses',
    'trading courses',
    'cTrader course',
    'algo trading course',
    'free trading education',
    'learn forex',
    'APFX courses',
  ],
})

export default function LearnCoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
