import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press & Media',
  description:
    'Official announcements, media coverage, press releases, and press kit. Contact our media team for interviews and partnerships.',
}

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
