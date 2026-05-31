'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import LazyChatWidget from '@/components/ui/LazyChatWidget'
import BackToTop from '@/components/ui/BackToTop'
import CookieConsent from '@/components/ui/CookieConsent'
import PageTransition from '@/components/animations/PageTransition'

const MINIMAL_CHROME_ROUTES = new Set(['/coming-soon'])

export function RouteMain({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isMinimal = MINIMAL_CHROME_ROUTES.has(pathname)

    return (
        <main
            id="main-content"
            className="main-wrapper"
            style={{
                paddingTop: '72px',
                paddingBottom: isMinimal ? 0 : '38px',
                position: 'relative',
                isolation: 'isolate',
            }}
        >
            <PageTransition>{children}</PageTransition>
            {!isMinimal && <CookieConsent />}
        </main>
    )
}

export function RouteFloatingActions() {
    const pathname = usePathname()
    if (MINIMAL_CHROME_ROUTES.has(pathname)) return null

    return (
        <>
            <BackToTop />
            <LazyChatWidget />
        </>
    )
}

export function RouteFooter() {
    const pathname = usePathname()
    if (MINIMAL_CHROME_ROUTES.has(pathname)) return null

    return (
        <>
            <Footer />
            <BottomBar />
        </>
    )
}
