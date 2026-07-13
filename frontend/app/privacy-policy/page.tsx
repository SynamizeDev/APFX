import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import PrivacyPolicyClient from './PrivacyPolicyClient'

export const metadata: Metadata = buildMetadata({
  // Title excludes "APFX" — template adds it: "Privacy Policy | APFX"
  title: 'Privacy Policy',
  description:
    'Read the APFX privacy policy to understand how we collect, use, store, and protect your personal and financial information in compliance with global data protection regulations.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />
}
