import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import StatsBar from '@/components/sections/StatsBar'

/**
 * Copy-trading is outside calculators/risk-management layouts; mirror their shell
 * so the page gets the global stats strip, footer, and ticker bottom bar.
 */
export default function CopyTradingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <StatsBar />
            <Footer />
            <BottomBar />
        </>
    )
}
