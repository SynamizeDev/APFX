import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Company',
  description:
    'Learn about our mission, values, and what we offer. We empower traders and investors with professional tools, market insights, and education.',
}

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
