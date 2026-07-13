import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import TermsOfServiceClient from './TermsOfServiceClient'

export const metadata: Metadata = buildMetadata({
  // Title excludes "APFX" — template adds it: "Terms & Conditions | APFX"
  title: 'Terms & Conditions',
  description:
    'The comprehensive legal framework governing your use of APFX Global Markets services and trading platform. Transparent and fair terms for professional and retail traders.',
  path: '/terms-of-service',
})

export default function TermsOfServicePage() {
  return <TermsOfServiceClient />
}
