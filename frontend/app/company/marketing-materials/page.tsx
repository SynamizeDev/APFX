'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Download,
    Search,
    Play,
    Image as ImageIcon,
    FileText,
    Monitor,
    TrendingUp,
    CheckCircle,
    ArrowRight,
    Layout,
    Presentation,
    Folder,
    Maximize2
} from 'lucide-react'
import styles from './MarketingMaterials.module.css'

// --- Mock Data ---

const FEATURED_RESOURCES = [
    {
        title: 'Complete Brand Kit',
        desc: 'Logos, color palettes, and typography guidelines in one zip file.',
        meta: 'Updated: Oct 2024 • 15MB',
        icon: <Layout size={24} />,
    },
    {
        title: 'Social Media Creatives',
        desc: 'High-converting posts, stories, and reels templates for Instagram & FB.',
        meta: '124 Assets • 45MB',
        icon: <ImageIcon size={24} />,
    },
    {
        title: 'Trading Banners',
        desc: 'Animated and static HTML5/Web banners in all standard ad sizes.',
        meta: '25 Sizes • 12MB',
        icon: <Monitor size={24} />,
    },
    {
        title: 'IB & Affiliate Resources',
        desc: 'Email templates, landing page copy, and conversion-focused assets.',
        meta: '15 Documents • 2MB',
        icon: <TrendingUp size={24} />,
    },
]

const LIBRARY_CATEGORIES = ['All', 'Logos', 'Banners', 'Social Media', 'Videos', 'Presentations', 'PDFs']

const ASSET_LIBRARY = [
    { title: 'APFX Logo Pack (Dark/Light)', format: 'ZIP / SVG / PNG', category: 'Logos' },
    { title: 'Q4 Promo Banners', format: 'ZIP / HTML5', category: 'Banners' },
    { title: 'Platform Walkthrough', format: 'MP4 / 4K', category: 'Videos' },
    { title: 'Instagram Story Templates', format: 'PSD / Canva', category: 'Social Media' },
    { title: 'Partnership Deck 2025', format: 'PDF / PPTX', category: 'Presentations' },
    { title: 'Crypto CFD Promo', format: 'MP4 / 1080p', category: 'Videos' },
    { title: 'Welcome Email Series', format: 'DOCX / PDF', category: 'PDFs' },
    { title: 'Brand Mascot 3D Assets', format: 'ZIP / PNG', category: 'Logos' },
]

const CAMPAIGN_KITS = [
    {
        title: 'Welcome Campaign Kit',
        desc: 'Everything you need to onboard new traders. Includes 5 email templates, 10 social posts, and 3 landing page variations.',
        tags: ['Onboarding', 'Social', 'Email'],
    },
    {
        title: 'Trading Competition Kit',
        desc: 'High-urgency promotional assets for the upcoming global trading championship.',
        tags: ['Promo', 'Urgency', 'Banners'],
    },
    {
        title: '100% Bonus Promotion Kit',
        desc: 'Compliance-approved marketing materials for deposit bonus campaigns across multiple regions.',
        tags: ['Bonus', 'Acquisition', 'Multi-language'],
    },
]

export default function MarketingMaterialsPage() {
    const [activeFilter, setActiveFilter] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredAssets = ASSET_LIBRARY.filter((asset) => {
        const matchesCat = activeFilter === 'All' || asset.category === activeFilter
        const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCat && matchesSearch
    })

    return (
        <div className={styles.pageWrapper}>
            {/* Custom Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBg} />
                <div className={styles.heroGlow} />
                
                <div className={styles.heroContent}>
                    <motion.span 
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Partner Resource Center
                    </motion.span>
                    <motion.h1 
                        className={styles.heroTitle}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Marketing Materials
                    </motion.h1>
                    <motion.p 
                        className={styles.heroDesc}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Access institutional-grade APFX promotional assets, branded content, campaign creatives, and partner resources to accelerate your growth.
                    </motion.p>

                    <motion.div 
                        className={styles.heroStats}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>1,200+</span>
                            <span className={styles.statLabel}>Available Assets</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>Daily</span>
                            <span className={styles.statLabel}>Updates</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>15+</span>
                            <span className={styles.statLabel}>Languages</span>
                        </div>
                    </motion.div>

                    <motion.div 
                        className={styles.heroActions}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button className={styles.btnPrimary}>
                            <Download size={18} />
                            Download Brand Kit
                        </button>
                        <button className={styles.btnSecondary}>
                            Partner Portal
                            <ArrowRight size={18} />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Featured Resources */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Featured Resources</h2>
                    <p className={styles.sectionDesc}>
                        Quick access to our most downloaded institutional marketing suites.
                    </p>
                </div>

                <div className={styles.featuredGrid}>
                    {FEATURED_RESOURCES.map((card, idx) => (
                        <div key={idx} className={styles.featureCard}>
                            <div className={styles.featureThumb}>
                                <div className={styles.featureIcon}>{card.icon}</div>
                            </div>
                            <div className={styles.featureBody}>
                                <div>
                                    <h3 className={styles.featureTitle}>{card.title}</h3>
                                    <p className={styles.featureDesc}>{card.desc}</p>
                                </div>
                                <div className={styles.featureAction}>
                                    <span>{card.meta}</span>
                                    <Download size={16} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Asset Library */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Asset Library</h2>
                    <p className={styles.sectionDesc}>
                        Browse our complete collection of approved promotional materials.
                    </p>
                </div>

                <div className={styles.libraryControls}>
                    <div className={styles.searchBar}>
                        <Search size={18} color="var(--color-text-2)" />
                        <input 
                            type="text" 
                            placeholder="Search for banners, logos, videos..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className={styles.filterPills}>
                        {LIBRARY_CATEGORIES.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`${styles.filterPill} ${activeFilter === cat ? styles.active : ''}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.libraryGrid}>
                    <AnimatePresence>
                        {filteredAssets.map((asset, idx) => (
                            <motion.div 
                                key={`${asset.title}-${idx}`}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className={styles.assetCard}
                            >
                                <div className={styles.assetThumb}>
                                    <Folder size={32} color="rgba(255,255,255,0.2)" />
                                    <div className={styles.assetOverlay}>
                                        <button className={`${styles.assetHoverBtn} ${styles.secondary}`} aria-label="Preview">
                                            <Maximize2 size={16} />
                                        </button>
                                        <button className={styles.assetHoverBtn} aria-label="Download">
                                            <Download size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.assetInfo}>
                                    <h4 className={styles.assetTitle} title={asset.title}>{asset.title}</h4>
                                    <span className={styles.assetFormat}>{asset.format}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* Campaign Kits */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Campaign Kits</h2>
                    <p className={styles.sectionDesc}>
                        Ready-to-deploy marketing bundles for specific promotions and events.
                    </p>
                </div>

                <div className={styles.campaignKitGrid}>
                    {CAMPAIGN_KITS.map((kit, idx) => (
                        <div key={idx} className={styles.kitCard}>
                            <div className={styles.kitInfo}>
                                <h3 className={styles.kitTitle}>{kit.title}</h3>
                                <p className={styles.kitDesc}>{kit.desc}</p>
                                <div className={styles.kitTags}>
                                    {kit.tags.map(tag => (
                                        <span key={tag} className={styles.kitTag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.kitAction}>
                                <button className={styles.btnSecondary}>
                                    <Download size={16} />
                                    Download Kit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Brand Guidelines */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Brand Guidelines</h2>
                    <p className={styles.sectionDesc}>
                        Ensure your promotional efforts meet our institutional standards.
                    </p>
                </div>

                <div className={styles.guidelineGrid}>
                    <div className={styles.guideCard}>
                        <div className={styles.guideHeader}>
                            <div className={styles.guideIcon}><Layout size={20} /></div>
                            <h3 className={styles.guideTitle}>Logo Usage</h3>
                        </div>
                        <div className={styles.guideList}>
                            <div className={styles.guideItem}>
                                <CheckCircle size={16} className={styles.guideCheck} />
                                <span>Always maintain a clear space around the logo.</span>
                            </div>
                            <div className={styles.guideItem}>
                                <CheckCircle size={16} className={styles.guideCheck} />
                                <span>Use the dark variation on light backgrounds.</span>
                            </div>
                            <div className={styles.guideItem}>
                                <CheckCircle size={16} className={styles.guideCheck} />
                                <span>Do not distort or change the logo colors.</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.guideCard}>
                        <div className={styles.guideHeader}>
                            <div className={styles.guideIcon}><Presentation size={20} /></div>
                            <h3 className={styles.guideTitle}>Typography</h3>
                        </div>
                        <div className={styles.guideList}>
                            <div className={styles.guideItem}>
                                <CheckCircle size={16} className={styles.guideCheck} />
                                <span>Primary Font: Inter / Outfit</span>
                            </div>
                            <div className={styles.guideItem}>
                                <CheckCircle size={16} className={styles.guideCheck} />
                                <span>Use varying weights to establish clear hierarchy.</span>
                            </div>
                            <div className={styles.guideItem}>
                                <CheckCircle size={16} className={styles.guideCheck} />
                                <span>Ensure high contrast for readability.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner Support */}
            <section className={styles.section}>
                <div className={styles.supportBlock}>
                    <h2 className={styles.supportTitle}>Need Custom Marketing Assets?</h2>
                    <p className={styles.supportDesc}>
                        Our marketing team can provide tailored promotional materials, localized content, and custom banners to support your top-tier campaigns.
                    </p>
                    <button className={styles.btnPrimary}>
                        Contact Marketing Team
                        <ArrowRight size={18} />
                    </button>
                </div>
            </section>

        </div>
    )
}
