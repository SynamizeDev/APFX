import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
    title: 'Company — APFX',
    description:
        'Learn about APFX’s institutional history, our core mission, and our commitment to providing premium global trading infrastructure.',
}

export default function AboutPage() {
    return <AboutClient />
}
