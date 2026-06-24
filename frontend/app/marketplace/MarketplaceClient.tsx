'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InnerPageHero from '@/components/layout/InnerPageHero'
import styles from './Marketplace.module.css'

type TabId = 'bots' | 'indicators' | 'plugins'

const WIDGET_URLS: Record<TabId, string> = {
    bots: 'https://widgets.ctrader.com/bots?theme=dark&lang=en',
    indicators: 'https://widgets.ctrader.com/indicators?theme=dark&lang=en',
    plugins: 'https://widgets.ctrader.com/plugins?theme=dark&lang=en',
}

const TABS: { id: TabId; label: string }[] = [
    { id: 'bots',       label: 'cBots' },
    { id: 'indicators', label: 'Indicators' },
    { id: 'plugins',    label: 'Plugins' },
]

export default function MarketplaceClient() {
    const [activeTab, setActiveTab] = useState<TabId>('bots')
    const [iframeLoading, setIframeLoading] = useState(true)

    const handleTabChange = (id: TabId) => {
        if (id !== activeTab) {
            setActiveTab(id)
            setIframeLoading(true)
        }
    }

    const activeTabInfo = TABS.find((t) => t.id === activeTab)!

    return (
        <div className={styles.page}>
            <InnerPageHero
                title="APFX Marketplace"
                badge="Powered by cTrader"
                subtitle="Discover professional trading robots, indicators, and plugins."
                breadcrumbs={[]}
                omitBottomBorder={true}
            />

            <main className={styles.main}>
                {/* ── Tabs ──────────────────────────────────── */}
                <section className={styles.tabsSection} aria-label="Marketplace categories">
                    <div className={styles.tabsContainer}>
                        <div className={styles.tabsWrapper} role="tablist">
                            {TABS.map((tab) => {
                                const isActive = activeTab === tab.id
                                return (
                                    <button
                                        key={tab.id}
                                        role="tab"
                                        aria-selected={isActive}
                                        aria-controls={`panel-${tab.id}`}
                                        id={`tab-${tab.id}`}
                                        className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''}`}
                                        onClick={() => handleTabChange(tab.id)}
                                    >
                                        <span className={styles.tabLabel}>{tab.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTabGlow"
                                                className={styles.activeGlow}
                                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Widget Container ──────────────────────── */}
                <section
                    id={`panel-${activeTab}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${activeTab}`}
                    className={styles.gridSection}
                >
                    <div className={styles.gridContainer}>
                        <div className={styles.iframeWrapper}>
                            {/* Loading Skeleton */}
                            <AnimatePresence>
                                {iframeLoading && (
                                    <motion.div
                                        className={styles.skeletonContainer}
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className={styles.skeletonGrid}>
                                            {Array.from({ length: 12 }).map((_, index) => (
                                                <div key={index} className={styles.skeletonCard}>
                                                    <div className={styles.skeletonImage} />
                                                    <div className={styles.skeletonContent}>
                                                        <div className={styles.skeletonTitle} />
                                                        <div className={styles.skeletonText1} />
                                                        <div className={styles.skeletonText2} />
                                                        <div className={styles.skeletonFooter} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* cTrader Marketplace Iframe */}
                            <iframe
                                key={activeTab}
                                src={WIDGET_URLS[activeTab]}
                                className={styles.widgetIframe}
                                onLoad={() => setIframeLoading(false)}
                                title={`cTrader ${activeTabInfo.label} Widget`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
