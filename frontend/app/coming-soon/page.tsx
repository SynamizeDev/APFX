import type { Metadata } from 'next'
import ComingSoonClient from './ComingSoonClient'

export const metadata: Metadata = {
    title: 'Coming Soon — APFX',
    description:
        'Join the APFX waitlist to receive launch updates and be the first to know when we go live.',
    robots: {
        index: false,
        follow: false,
    },
}

export default function ComingSoonPage() {
    return <ComingSoonClient />
}
