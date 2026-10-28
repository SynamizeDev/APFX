'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import styles from './CTraderPreview.module.css'

export default function CTraderPreview() {
    const [loaded, setLoaded] = useState(false)

    return (
        <section className={styles.section} aria-labelledby="ctrader-preview-heading">
            <div className={styles.inner}>
                {/* Left 75%: Display the existing live cTrader iframe, large and prominent */}
                <div className={styles.terminalContainer}>
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

                {/* Right 25%: iPhone asset + content block */}
                <div className={styles.contentBlock}>
                    {/* iPhone visual asset */}
                    <div className={styles.phoneAsset}>
                        <Image
                            src="/images/iphone-trading-app.webp"
                            alt="APFX mobile trading app showing live XAUUSD chart"
                            width={1168}
                            height={1346}
                            className={styles.phoneImage}
                            priority={false}
                        />
                    </div>

                    {/* Text content */}
                    <div className={styles.textContent}>
                        <h2 id="ctrader-preview-heading" className={styles.heading}>
                            Trade Anywhere,<br />
                            <span className={styles.headingAccent}>Trade Anytime.</span>
                        </h2>

                        <p className={styles.description}>
                            Access global markets, analyze charts, and manage your trades wherever you are.
                        </p>

                        <Link
                            href="https://app.apfxglobal.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.ctaButton}
                        >
                            <span>Open Live Terminal</span>
                            <ArrowUpRight size={18} className={styles.ctaIcon} aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
