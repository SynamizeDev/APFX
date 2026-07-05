'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import styles from './CTraderPreview.module.css'

export default function CTraderPreview() {
    const [loaded, setLoaded] = useState(false)

    return (
        <section className={styles.section} aria-labelledby="ctrader-preview-heading">
            <div className={styles.inner}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.eyebrow}>Live Trading Terminal</div>
                    <h2 id="ctrader-preview-heading" className={styles.title}>
                        Trade Live with cTrader
                    </h2>
                    <p className={styles.subtitle}>
                        Access real-time charts, manage positions, and execute trades directly
                        from your browser — no download required.
                    </p>
                    <Link href="/ctrader" className={styles.ctaLink}>
                        Open Full Terminal <ArrowRight size={16} />
                    </Link>
                </header>

                {/* Terminal frame */}
                <div className={styles.frame}>
                    <div className={styles.frameBar}>
                        <div className={styles.dots}>
                            <span className={styles.dot} style={{ background: '#ff5f57' }} />
                            <span className={styles.dot} style={{ background: '#febc2e' }} />
                            <span className={styles.dot} style={{ background: '#28c840' }} />
                        </div>
                        <span className={styles.frameLabel}>APFX · cTrader Web</span>
                    </div>

                    <div className={styles.iframeWrap}>
                        {!loaded && (
                            <div className={styles.loader}>
                                <div className={styles.spinner} />
                                <p className={styles.loaderText}>Loading terminal…</p>
                            </div>
                        )}
                        <iframe
                            src="https://app.apfxglobal.com/?lang=en&theme=dark&u=falmoguera&leftPanelOpen=false&sidebarCollapsed=true"
                            className={styles.iframe}
                            onLoad={() => setLoaded(true)}
                            allow="clipboard-read; clipboard-write"
                            title="APFX cTrader Web Terminal Preview"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
