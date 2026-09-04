'use client'

import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import LazyChatWidget from '@/components/ui/LazyChatWidget'
import BackToTop from '@/components/ui/BackToTop'
import CookieConsent from '@/components/ui/CookieConsent'
import PageTransition from '@/components/animations/PageTransition'

export function RouteMain({ children }: { children: React.ReactNode }) {
    return (
        <main
            id="main-content"
            className="main-wrapper"
            style={{
                paddingTop: '72px',
                // paddingBottom: '38px',
                position: 'relative',
                isolation: 'isolate',
            }}
        >
            <PageTransition>{children}</PageTransition>
            <CookieConsent />
        </main>
    )
}

export function RouteFloatingActions() {
    return (
        <>
            <BackToTop />
            <LazyChatWidget />
        </>
    )
}

export function RouteFooter() {
    return (
        <>
            <Footer />
            {/* <BottomBar /> */}
        </>
    )
}

