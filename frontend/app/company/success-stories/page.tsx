'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Star,
    Play,
    Globe,
    CheckCircle,
    ArrowRight,
    Users,
    Activity,
    Shield,
    MapPin,
    Zap,
    TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import styles from './SuccessStories.module.css'

// --- Mock Data ---

const METRICS = [
    { value: '4.9/5', label: 'Average Platform Rating', icon: <Star size={24} /> },
    { value: '150+', label: 'Countries Served', icon: <Globe size={24} /> },
    { value: '2M+', label: 'Monthly Active Users', icon: <Users size={24} /> },
    { value: '< 12ms', label: 'Average Execution Speed', icon: <Zap size={24} /> },
]

const CATEGORIES = [
    'Overall Reviews',
    'Copy Trading',
    'PAMM',
    'Deposit & Withdrawal',
    'Customer Support',
    'IB Portal & Partners',
    'Trading Platform',
    'Execution & Spreads'
]

const REVIEWS = [
    {
        name: 'Michael R.',
        role: 'Portfolio Manager',
        country: 'United Kingdom',
        type: 'PAMM Investor',
        verified: true,
        rating: 5,
        text: 'The PAMM infrastructure provided by APFX is unmatched. The granular reporting and automated fee calculations have saved my fund countless hours. Execution is flawless even during high-impact news.',
        category: 'PAMM'
    },
    {
        name: 'Elena S.',
        role: 'Day Trader',
        country: 'Switzerland',
        type: 'Scalper',
        verified: true,
        rating: 5,
        text: 'Spreads are consistently tight, and the liquidity depth is institutional-grade. I rely on micro-second execution for my scalping strategies, and APFX delivers every single time.',
        category: 'Execution & Spreads'
    },
    {
        name: 'David L.',
        role: 'IB Partner',
        country: 'Singapore',
        type: 'Partner',
        verified: true,
        rating: 5,
        text: 'The IB portal is a game changer. Real-time rebate tracking, multi-tier commission structures, and excellent marketing materials. My network has grown 300% since partnering with APFX.',
        category: 'IB Portal & Partners'
    },
    {
        name: 'Sarah M.',
        role: 'Swing Trader',
        country: 'Australia',
        type: 'Copy Trading',
        verified: true,
        rating: 4,
        text: 'I use the copy trading feature to diversify my portfolio. The platform is intuitive, and evaluating strategy managers is straightforward. Withdrawals are processed within hours.',
        category: 'Copy Trading'
    },
    {
        name: 'James K.',
        role: 'Retail Investor',
        country: 'Canada',
        type: 'Long-term Investor',
        verified: true,
        rating: 5,
        text: 'Their customer support is truly enterprise-grade. Any query is resolved promptly by knowledgeable account managers, not just bots. Highly recommend for serious traders.',
        category: 'Customer Support'
    },
    {
        name: 'Ahmed F.',
        role: 'Prop Trader',
        country: 'United Arab Emirates',
        type: 'High Volume Trader',
        verified: true,
        rating: 5,
        text: 'Funding large amounts is seamless and secure. The MT5 integration is perfectly optimized, showing zero latency. APFX is the only broker I trust with my primary capital.',
        category: 'Trading Platform'
    }
]

const VIDEOS = [
    {
        title: 'Why I switched my prop firm to APFX',
        author: 'Marcus T. - Head Trader',
        duration: '4:15',
        category: 'Execution Quality',
        thumb: 'linear-gradient(45deg, #0a1128, #1c2b4a)'
    },
    {
        title: 'Growing an IB network across Southeast Asia',
        author: 'Linda Chen - Master IB',
        duration: '6:30',
        category: 'Partner Growth',
        thumb: 'linear-gradient(45deg, #0f1c18, #18332a)'
    },
    {
        title: 'Managing $5M+ via APFX PAMM',
        author: 'Johannes V. - Fund Manager',
        duration: '5:45',
        category: 'PAMM Strategy',
        thumb: 'linear-gradient(45deg, #1a0f1c, #33182a)'
    }
]

export default function SuccessStoriesPage() {
    const [activeCategory, setActiveCategory] = useState('Overall Reviews')

    const filteredReviews = activeCategory === 'Overall Reviews'
        ? REVIEWS
        : REVIEWS.filter(r => r.category === activeCategory || activeCategory.includes(r.category))

    // Fallback if no exact category match
    const displayReviews = filteredReviews.length > 0 ? filteredReviews : REVIEWS.slice(0, 3)

    return (
        <div className={styles.pageWrapper}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBg} />
                <div className={styles.mapGlow} />
                <div className={styles.heroGlow} />
                
                <div className={styles.heroContent}>
                    <motion.span 
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        APFX Ecosystem
                    </motion.span>
                    <motion.h1 
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Trusted by Performance-Driven Traders Worldwide
                    </motion.h1>
                    <motion.p 
                        className={styles.heroDesc}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Explore real experiences from traders, investors, IB partners, and strategy managers across our high-performance global network.
                    </motion.p>

                    <motion.div 
                        className={styles.heroStats}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {METRICS.map((metric, idx) => (
                            <div key={idx} className={styles.statItem}>
                                <span className={styles.statValue}>{metric.value}</span>
                                <span className={styles.statLabel}>{metric.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div 
                        className={styles.heroActions}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button className={styles.btnPrimary} onClick={() => {
                            document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })
                        }}>
                            Explore Reviews
                        </button>
                        <Link href="https://portal.apfx.com/register" className={styles.btnSecondary}>
                            Join APFX <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Video Testimonials */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Trader Journeys</h2>
                    <p className={styles.sectionDesc}>
                        Watch in-depth stories from professionals who scale their trading operations with our institutional infrastructure.
                    </p>
                </div>

                <div className={styles.videoGrid}>
                    {VIDEOS.map((video, idx) => (
                        <motion.div 
                            key={idx}
                            className={styles.videoCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className={styles.videoThumb} style={{ background: video.thumb }} />
                            <div className={styles.videoOverlay}>
                                <span className={styles.videoBadge}>{video.category}</span>
                                <div className={styles.videoPlay}>
                                    <Play size={24} fill="currentColor" style={{ marginLeft: '4px' }} />
                                </div>
                                <div className={styles.videoInfo}>
                                    <h3 className={styles.videoTitle}>{video.title}</h3>
                                    <span className={styles.videoAuthor}>{video.author} • {video.duration}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Category Filter & Reviews */}
            <section className={styles.section} id="reviews">
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Community Feedback</h2>
                    <p className={styles.sectionDesc}>
                        Unfiltered reviews from our global community of traders and partners.
                    </p>
                </div>

                <div className={styles.categorySystem}>
                    <div className={styles.categoryScroll}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`${styles.categoryTab} ${activeCategory === cat ? styles.active : ''}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.reviewGrid}>
                    <AnimatePresence mode="popLayout">
                        {displayReviews.map((review, idx) => (
                            <motion.div 
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                key={`${review.name}-${idx}`} 
                                className={styles.reviewCard}
                            >
                                <div className={styles.reviewRating}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < review.rating ? "var(--color-accent)" : "transparent"} color={i < review.rating ? "var(--color-accent)" : "rgba(255,255,255,0.2)"} />
                                    ))}
                                </div>
                                <blockquote className={styles.reviewText}>
                                    "{review.text}"
                                </blockquote>
                                <div className={styles.reviewAuthor}>
                                    <div className={styles.authorAvatar}>
                                        {review.name.charAt(0)}
                                    </div>
                                    <div className={styles.authorInfo}>
                                        <span className={styles.authorName}>
                                            {review.name}
                                            {review.verified && <CheckCircle size={14} color="var(--color-accent)" />}
                                        </span>
                                        <span className={styles.authorRole}>{review.role} • {review.type}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* Photo & Community Reviews */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Community at a Glance</h2>
                    <p className={styles.sectionDesc}>
                        Glimpses into the global APFX ecosystem, from trader setups to live events.
                    </p>
                </div>
                <div className={styles.photoGrid}>
                    <div className={styles.photoItem}>
                        <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop" alt="Trading Desk" />
                        <div className={styles.photoOverlay}>
                            <span className={styles.photoAuthor}>London Office Setup</span>
                            <span className={styles.photoDesc}>Multi-monitor APFX MT5 Terminal</span>
                        </div>
                    </div>
                    <div className={styles.photoItem}>
                        <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop" alt="IB Seminar" />
                        <div className={styles.photoOverlay}>
                            <span className={styles.photoAuthor}>Dubai IB Seminar</span>
                            <span className={styles.photoDesc}>Networking with Top Partners</span>
                        </div>
                    </div>
                    <div className={styles.photoItem}>
                        <img src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=600&auto=format&fit=crop" alt="Mobile Trading" />
                        <div className={styles.photoOverlay}>
                            <span className={styles.photoAuthor}>Trading on the Go</span>
                            <span className={styles.photoDesc}>APFX Mobile Experience</span>
                        </div>
                    </div>
                    <div className={styles.photoItem}>
                        <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=600&auto=format&fit=crop" alt="Event" />
                        <div className={styles.photoOverlay}>
                            <span className={styles.photoAuthor}>Global Traders Summit 2024</span>
                            <span className={styles.photoDesc}>Keynote Presentation</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Editorial Spotlight */}
            <section className={styles.section}>
                <div className={styles.editorialCard}>
                    <div className={styles.editorialContent}>
                        <span className={styles.editorialTag}>Strategy Spotlight</span>
                        <h3 className={styles.editorialTitle}>From Retail Trader to Managing $10M+ in PAMM Assets</h3>
                        <p className={styles.editorialQuote}>
                            "APFX provided the regulatory framework and the deep liquidity I needed to scale my algorithmic strategies. Investors trust the platform, which made acquiring capital seamless."
                        </p>
                        <button className={styles.btnSecondary} style={{ width: 'fit-content' }}>
                            Read Full Story
                        </button>
                    </div>
                    <div className={styles.editorialImage} style={{ backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent), url(https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop)' }} />
                </div>
                
                <div className={`${styles.editorialCard} ${styles.reverse}`}>
                    <div className={styles.editorialContent}>
                        <span className={styles.editorialTag}>Partner Success</span>
                        <h3 className={styles.editorialTitle}>Building a Multi-National IB Network</h3>
                        <p className={styles.editorialQuote}>
                            "The transparency of the APFX partner portal is unmatched. Real-time rebate settlements and multi-tier tracking allowed us to focus on growth rather than administration."
                        </p>
                        <button className={styles.btnSecondary} style={{ width: 'fit-content' }}>
                            View Partner Program
                        </button>
                    </div>
                    <div className={styles.editorialImage} style={{ backgroundImage: 'linear-gradient(to left, rgba(0,0,0,0.5), transparent), url(https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=1000&auto=format&fit=crop)' }} />
                </div>
            </section>

            {/* Trust Metrics / Institutional */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Platform Excellence</h2>
                    <p className={styles.sectionDesc}>
                        The underlying metrics that define our institutional-grade trading environment.
                    </p>
                </div>
                <div className={styles.metricsGrid}>
                    <div className={styles.metricCard}>
                        <Activity className={styles.metricIcon} size={32} />
                        <span className={styles.metricValue}>12ms</span>
                        <span className={styles.metricLabel}>Average Execution Time</span>
                    </div>
                    <div className={styles.metricCard}>
                        <Shield className={styles.metricIcon} size={32} />
                        <span className={styles.metricValue}>0</span>
                        <span className={styles.metricLabel}>Requotes in 2024</span>
                    </div>
                    <div className={styles.metricCard}>
                        <TrendingUp className={styles.metricIcon} size={32} />
                        <span className={styles.metricValue}>$5B+</span>
                        <span className={styles.metricLabel}>Monthly Trading Volume</span>
                    </div>
                    <div className={styles.metricCard}>
                        <Users className={styles.metricIcon} size={32} />
                        <span className={styles.metricValue}>5,000+</span>
                        <span className={styles.metricLabel}>Active IB Partners</span>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.section}>
                <div className={styles.ctaBlock}>
                    <div className={styles.ctaGlow} />
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Join the Next Generation of Global Traders</h2>
                        <p className={styles.ctaDesc}>
                            Experience the execution quality, transparency, and premium support that professionals demand.
                        </p>
                        <div className={styles.ctaActions}>
                            <Link href="https://portal.apfx.com/register" className={styles.btnPrimary}>
                                Open Live Account
                            </Link>
                            <Link href="/pamm" className={styles.btnSecondary}>
                                Explore PAMM
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
