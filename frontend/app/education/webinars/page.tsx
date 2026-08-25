import type { Metadata } from 'next'
import WebinarsClient from './WebinarsClient'

export const metadata: Metadata = {
    title: 'APFX Global Webinars | Trading Education & Market Insights',
    description:
        'Join APFX Global webinars covering trading platforms, technical analysis, market insights, strategies, and professional trading tools.',
    openGraph: {
        title: 'APFX Global Webinars | Trading Education & Market Insights',
        description:
            'Join APFX Global webinars covering trading platforms, technical analysis, market insights, strategies, and professional trading tools.',
        url: 'https://apfxglobal.com/education/webinars',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'APFX Global Webinars | Trading Education & Market Insights',
        description:
            'Join APFX Global webinars covering trading platforms, technical analysis, market insights, strategies, and professional trading tools.',
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://apfxglobal.com/education/webinars',
    },
}

export default function WebinarsPage() {
    return <WebinarsClient />
}

