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

const PLAYLIST_ID = 'PLaEUDg617YTM'

/** Fetch the 3 latest video IDs from the YouTube playlist RSS feed (server-side). */
async function getLatestVideoIds(count = 3): Promise<string[]> {
    try {
        const res = await fetch(
            `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`,
            { next: { revalidate: 3600 } } // revalidate every hour
        )
        if (!res.ok) return []
        const xml = await res.text()
        // Extract video IDs from <yt:videoId>...</yt:videoId> tags
        const ids: string[] = []
        const regex = /<yt:videoId>([^<]+)<\/yt:videoId>/g
        let match: RegExpExecArray | null
        while ((match = regex.exec(xml)) !== null && ids.length < count) {
            ids.push(match[1])
        }
        return ids
    } catch {
        return []
    }
}

export default async function WebinarsPage() {
    const latestVideoIds = await getLatestVideoIds(3)
    return <WebinarsClient latestVideoIds={latestVideoIds} />
}

