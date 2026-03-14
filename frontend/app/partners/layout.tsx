import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Become a Partner',
  description:
    'Join our partner program as an affiliate, IB, content creator, or business partner. Earn commissions by referring traders and promoting our platform.',
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
