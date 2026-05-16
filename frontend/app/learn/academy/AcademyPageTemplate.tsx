'use client'

import InnerPageHero from '@/components/layout/InnerPageHero'
import AcademyTabNav from '@/components/navigation/AcademyTabNav'
import styles from './AcademyPage.module.css'
import { Play, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'

interface AcademyPageProps {
    title: string
    description: string
    videoTitle: string
    steps: { title: string; description: string }[]
    relatedLinks: { label: string; href: string }[]
}

export default function AcademyPage({ title, description, videoTitle, steps, relatedLinks }: AcademyPageProps) {
    return (
        <div className={styles.page}>
            <InnerPageHero
                title="APFX"
                accent="Academy"
                description={description}
                breadcrumbs={[
                    { label: 'Learn', href: '/learn/blog' },
                    { label: 'Academy', href: '/learn/academy/open-account' },
                    { label: title }
                ]}
            />
            <AcademyTabNav />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.videoWrapper}>
                            <div className={styles.videoPlaceholder}>
                                <div className={styles.playButton}>
                                    <Play size={32} fill="currentColor" />
                                </div>
                                <span style={{ color: 'var(--color-text-3)', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    Watch: {videoTitle}
                                </span>
                            </div>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.content}>
                                <h2>Step-by-Step Guide</h2>
                                <p>
                                    Follow these simple steps to master {title.toLowerCase()}. Our institutional-grade 
                                    platform is designed for efficiency and ease of use.
                                </p>

                                <div className={styles.stepList}>
                                    {steps.map((step, i) => (
                                        <div key={i} className={styles.step}>
                                            <div className={styles.stepNumber}>{i + 1}</div>
                                            <div className={styles.stepContent}>
                                                <h3>{step.title}</h3>
                                                <p>{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <aside className={styles.sidebar}>
                                <div className={styles.card}>
                                    <h3>Quick Actions</h3>
                                    <ul className={styles.cardList}>
                                        <li>
                                            <Link href="https://portal.apfx.com/register" className={styles.cardLink}>
                                                <CheckCircle2 size={16} className={styles.accent} />
                                                Open Live Account
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="https://portal.apfx.com/deposit" className={styles.cardLink}>
                                                <CheckCircle2 size={16} className={styles.accent} />
                                                Make a Deposit
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/support" className={styles.cardLink}>
                                                <CheckCircle2 size={16} className={styles.accent} />
                                                Contact Support
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className={styles.card}>
                                    <h3>Related Tutorials</h3>
                                    <ul className={styles.cardList}>
                                        {relatedLinks.map((link, i) => (
                                            <li key={i}>
                                                <Link href={link.href} className={styles.cardLink}>
                                                    <ArrowRight size={16} />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <BottomBar />
        </div>
    )
}
