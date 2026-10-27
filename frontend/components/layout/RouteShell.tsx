'use client'

import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import LazyChatWidget from '@/components/ui/LazyChatWidget'
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
        </main>
    )
}

export function RouteFloatingActions() {
    return (
        <>
            <LazyChatWidget />
            <CookieConsent />
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

