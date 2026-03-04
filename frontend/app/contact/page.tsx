import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
    title: 'Contact Us — APFX',
    description:
        'Get in touch with APFX’s 24/5 support team or contact our global offices for institutional inquiries.',
}

export default function ContactPage() {
    return <ContactClient />
}
