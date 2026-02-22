'use client'

import { BarChart3, TrendingUp, Globe, Smartphone } from 'lucide-react'
import styles from './TradingPlatforms.module.css'

const PLATFORMS = [
    {
        icon: <BarChart3 size={24} />,
        name: 'MetaTrader 4',
        desc: 'The world\'s most popular platform for forex traders. Advanced charting, indicators, and EAs.',
    },
    {
        icon: <TrendingUp size={24} />,
        name: 'MetaTrader 5',
        desc: 'The powerful successor to MT4. More timeframes, more order types, and multi-asset trading.',
    },
    {
        icon: <Globe size={24} />,
        name: 'WebTrader',
        desc: 'Access the markets directly from any web browser without downloading any software.',
    },
    {
        icon: <Smartphone size={24} />,
        name: 'Mobile App',
        desc: 'Full trading functionality on the go. Available for iOS and Android with real-time sync.',
    },
]

export default function TradingPlatforms() {
    return (
        <section className={styles.section} aria-labelledby="platforms-heading">
            <div className={styles.inner}>
                <div className={styles.content}>
                    <span className={styles.eyebrow}>Award-Winning Tech</span>
                    <h2 id="platforms-heading" className={styles.title}>
                        Master the Markets on Any Device
                    </h2>
                    <p className={styles.desc}>
                        Whether you are a scalper, a news trader, or a long-term investor,
                        our suite of platforms provides the stability and tools you need.
                    </p>

                    <div className={styles.platformsGrid}>
                        {PLATFORMS.map((p) => (
                            <div key={p.name} className={styles.platformItem}>
                                <span className={styles.platformIcon} aria-hidden="true">
                                    {p.icon}
                                </span>
                                <h3 className={styles.platformName}>{p.name}</h3>
                                <p className={styles.platformDesc}>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.visual} aria-hidden="true">
                    <div className={styles.mockupContainer}>
                        {/* Desktop Mockup */}
                        <div className={`${styles.mockup} ${styles.mockupDesktop}`}>
                            <div style={{ padding: '0.75rem', background: '#1A2235', borderBottom: '1px solid #2A3245', display: 'flex', gap: '0.4rem' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }}></div>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }}></div>
                            </div>
                            <div style={{ height: '300px', background: '#0B0F1A', padding: '1.5rem' }}>
                                <div style={{ width: '40%', height: '12px', background: '#1A2235', marginBottom: '1rem' }}></div>
                                <div style={{ display: 'flex', gap: '1rem', height: '100px' }}>
                                    <div style={{ flex: 1, background: '#1A2235', borderRadius: '4px' }}></div>
                                    <div style={{ flex: 1, background: '#1A2235', borderRadius: '4px' }}></div>
                                </div>
                                <div style={{ marginTop: '1.5rem', width: '100%', height: '80px', background: 'rgba(0,200,150,0.05)', border: '1px solid rgba(0,200,150,0.1)', borderRadius: '4px' }}></div>
                            </div>
                        </div>

                        {/* Mobile Mockup */}
                        <div className={`${styles.mockup} ${styles.mockupMobile}`} style={{ background: '#03050A', borderColor: '#2A3245' }}>
                            <div style={{ height: '200px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <div style={{ width: '60%', height: '8px', background: '#1A2235', borderRadius: '4px' }}></div>
                                <div style={{ width: '100%', height: '120px', background: 'rgba(0,200,150,0.1)', borderRadius: '8px', border: '1px solid rgba(0,200,150,0.2)' }}></div>
                                <div style={{ width: '40%', height: '8px', background: '#1A2235', borderRadius: '4px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
