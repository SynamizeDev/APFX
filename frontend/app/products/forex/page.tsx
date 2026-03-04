'use client'

import ForexHero from '@/components/sections/forex/ForexHero'
import ForexBasics from '@/components/sections/forex/ForexBasics'
import ForexTerms from '@/components/sections/forex/ForexTerms'
import CTABanner from '@/components/sections/CTABanner'

export default function ForexPage() {
    return (
        <main style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
            <ForexHero />
            <ForexBasics />
            <ForexTerms />
            {/* Reusing existing premium CTA Banner */}
            <CTABanner />
        </main>
    )
}
