import type { Metadata } from 'next'
import TermsClient from './TermsClient'

export const metadata: Metadata = {
    title: 'Terms of Service — APFX',
    description:
        'Read the terms and conditions governing your access to and use of APFX’s services and trading platforms.',
}

export default function TermsPage() {
    return <TermsClient />
}
