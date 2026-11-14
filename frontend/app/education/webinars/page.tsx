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
        url: 'https://www.apfxglobal.com/education/webinars',
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
        canonical: 'https://www.apfxglobal.com/education/webinars',
    },
}

/** Episode 01, 02, and 03 from official APFX YouTube webinar series */
const WEBINAR_VIDEO_IDS = [
    'VVZeIxM6JZ0', // Episode 01 | 5 Trading Concepts Explained | Shiv Prasad Pakale
    '8QSSd7KntU4', // Episode 02 | XAUUSD Trading Blueprint: Market Structure to Trade Setup | Faizan Ahmed
    'R_6imoB9mGM', // Episode 03 | Risk Management in Trading: Protect Your Capital | Abhishek Pandey
]

export default function WebinarsPage() {
    return <WebinarsClient latestVideoIds={WEBINAR_VIDEO_IDS} />
}

