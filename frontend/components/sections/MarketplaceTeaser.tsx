'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import styles from './MarketplaceTeaser.module.css'

export default function MarketplaceTeaser() {
    const [loaded, setLoaded] = useState(false)

    return (
        <section className={styles.section} aria-labelledby="marketplace-teaser-heading">
            <div className={styles.inner}>
                {/* Left Column: Content */}
                <div className={styles.content}>
                    <div className={styles.eyebrow}>Powered by cTrader</div>
                    <h2 id="marketplace-teaser-heading" className={styles.title}>
                        Discover the APFX Marketplace
                    </h2>
                    <p className={styles.description}>
                        Browse professional cBots, indicators, and plugins to enhance your trading strategy. Access thousands of community-built and premium trading tools directly from the APFX Marketplace.
                    </p>
                    <div className={styles.actions}>
                        <Link href="/marketplace" className={styles.primaryLink}>
                            Explore Marketplace <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Right Column: Live Marketplace Window */}
                <div className={styles.carouselWrap}>
                    {!loaded && (
                        <div className={styles.loader}>
                            <div className={styles.spinner} />
                            <p className={styles.loaderText}>Loading live marketplace...</p>
                        </div>
                    )}
                    
                    {/* The Live Embedded Widget */}
                    <iframe
                        src="https://widgets.ctrader.com/bots?theme=dark&lang=en"
                        className={styles.iframe}
                        onLoad={() => setLoaded(true)}
                        title="Live cTrader Marketplace Preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        tabIndex={-1}
                    />

                    {/* Massive Transparent Overlay Link */}
                    {/* This prevents scrolling/interacting inside the iframe and acts as a giant button */}
                    <Link href="/marketplace" className={styles.previewOverlay} aria-label="Open Full Marketplace">
                    </Link>
                </div>
            </div>
        </section>
    )
}
