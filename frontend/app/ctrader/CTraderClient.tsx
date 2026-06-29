'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Zap, BarChart3, Layers, Settings, Monitor, Smartphone, Apple, Chrome, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import styles from './CTrader.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CTraderClient() {
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Experience section cards staggered animation
        gsap.fromTo('.glass-card', 
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.exp-trigger',
                    start: 'top 90%',
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            }
        );

        // Advantages grid items
        gsap.fromTo('.adv-card',
            { y: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.adv-trigger',
                    start: 'top 90%',
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            }
        );

    }, { scope: containerRef });

    return (
        <div className={styles.page} ref={containerRef}>
            <main className={styles.main}>
                {/* Page header section */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>cTrader Web Terminal</h1>
                        <p className={styles.heroSubtitle}>
                            Access live markets, manage positions, and execute trades directly from your browser.
                        </p>
                    </div>
                </section>

                {/* Contained terminal card */}
                <section className={styles.terminalSection}>
                    <div className={styles.terminalContainer}>
                        <div className={styles.terminalCard}>
                            <div className={styles.terminalHeader}>
                                <div className={styles.terminalDots}>
                                    <span className={styles.dot} style={{ background: '#ff5f57' }} />
                                    <span className={styles.dot} style={{ background: '#febc2e' }} />
                                    <span className={styles.dot} style={{ background: '#28c840' }} />
                                </div>
                                <span className={styles.terminalLabel}>APFX · cTrader Web</span>
                            </div>

                            <div className={styles.widgetWrapper}>
                                {!loaded && (
                                    <div className={styles.loader}>
                                        <div className={styles.spinner}></div>
                                        <p className={styles.loaderText}>Loading terminal…</p>
                                    </div>
                                )}
                                <iframe
                                    src="https://app.apfxglobal.com/?lang=en&theme=dark&u=falmoguera&leftPanelOpen=false&sidebarCollapsed=true"
                                    className={styles.iframe}
                                    onLoad={() => {
                                        setLoaded(true);
                                        setTimeout(() => ScrollTrigger.refresh(), 500);
                                    }}
                                    allow="clipboard-read; clipboard-write"
                                    title="APFX cTrader Web Terminal"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Section 1: The APFX Trading Experience ── */}
                <section className={`${styles.experienceSection} exp-trigger`}>
                    <div className={styles.experienceContainer}>
                        <div className={styles.experienceText}>
                            <span className={styles.sectionLabel}>The APFX Experience</span>
                            <h2 className={styles.experienceTitle}>Designed for Every Trading Style</h2>
                            <p className={styles.experienceDesc}>
                                Whether you're a day trader, swing trader, scalper, or long-term investor, cTrader provides the flexibility, speed, and professional tools needed to trade confidently across global markets.
                            </p>
                        </div>
                        <div className={styles.experienceVisual}>
                            <div className={`${styles.glassCard} ${styles.card1} glass-card`}>
                                <div className={styles.glassIcon}><Zap size={24} /></div>
                                <div className={styles.glassText}>
                                    <span className={styles.glassTitle}>Fast Execution</span>
                                    <span className={styles.glassSubtitle}>Ultra-low latency routing</span>
                                </div>
                            </div>
                            <div className={`${styles.glassCard} ${styles.card2} glass-card`}>
                                <div className={styles.glassIcon}><Layers size={24} /></div>
                                <div className={styles.glassText}>
                                    <span className={styles.glassTitle}>Multi-Asset Trading</span>
                                    <span className={styles.glassSubtitle}>Forex, Indices, Commodities</span>
                                </div>
                            </div>
                            <div className={`${styles.glassCard} ${styles.card3} glass-card`}>
                                <div className={styles.glassIcon}><BarChart3 size={24} /></div>
                                <div className={styles.glassText}>
                                    <span className={styles.glassTitle}>Advanced Charts</span>
                                    <span className={styles.glassSubtitle}>Professional analysis tools</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Section 2: Platform Advantages ── */}
                <section className={`${styles.advantagesSection} adv-trigger`}>
                    <div className={styles.advantagesContainer}>
                        <span className={styles.sectionLabel} style={{ textAlign: 'center', display: 'block' }}>Platform Features</span>
                        <h2 className={styles.experienceTitle} style={{ textAlign: 'center', marginTop: '1rem' }}>Platform Advantages</h2>
                        
                        <div className={styles.advantagesGrid}>
                            <div className={`${styles.advantageCard} adv-card`}>
                                <Settings className={styles.advantageIcon} size={32} />
                                <h3 className={styles.advantageTitle}>Automated Trading</h3>
                                <p className={styles.advantageDesc}>
                                    Develop and run algorithmic trading strategies seamlessly using cTrader Automate.
                                </p>
                            </div>
                            <div className={`${styles.advantageCard} adv-card`}>
                                <ShieldCheck className={styles.advantageIcon} size={32} />
                                <h3 className={styles.advantageTitle}>Transparent Pricing</h3>
                                <p className={styles.advantageDesc}>
                                    View full market depth and institutional-grade pricing with complete transparency.
                                </p>
                            </div>
                            <div className={`${styles.advantageCard} adv-card`}>
                                <Activity className={styles.advantageIcon} size={32} />
                                <h3 className={styles.advantageTitle}>Multiple Timeframes</h3>
                                <p className={styles.advantageDesc}>
                                    Analyze markets using numerous chart intervals suited to every trading strategy.
                                </p>
                            </div>
                            <div className={`${styles.advantageCard} adv-card`}>
                                <BarChart3 className={styles.advantageIcon} size={32} />
                                <h3 className={styles.advantageTitle}>Professional Tools</h3>
                                <p className={styles.advantageDesc}>
                                    Access integrated market analysis, watchlists, advanced order types, and risk management.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Section 4: Call to Action ── */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaBg} />
                    <div className={styles.ctaContainer}>
                        <h2 className={styles.ctaTitle}>Ready to Experience Professional Trading?</h2>
                        <p className={styles.ctaDesc}>
                            Open your APFX trading account and unlock the complete cTrader ecosystem with institutional-grade trading technology.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link href="https://portal.apfxglobal.com/signup" className={styles.btnPrimary} target="_blank" rel="noopener noreferrer">
                                Open Live Account
                            </Link>
                            <a href="#top" className={styles.btnSecondary} onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                                Launch Web Terminal
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

