'use client';

import Link from 'next/link';
import { ArrowRight, Phone, Download } from 'lucide-react';
import styles from './MFCTASection.module.css';

export default function MFCTASection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>Ready to Start Investing?</h2>
                    <p className={styles.desc}>
                        Open an account, book a free consultation, or download our investment guide. 
                        Our team will help you choose the right funds for your goals.
                    </p>
                    <div className={styles.actions}>
                        <Link href="/contact" className={styles.primary}>
                            Start Investing <ArrowRight size={18} />
                        </Link>
                        <Link href="/contact" className={styles.secondary}>
                            <Phone size={18} /> Book a Consultation
                        </Link>
                        <a href="#" className={styles.tertiary} onClick={(e) => e.preventDefault()}>
                            <Download size={18} /> Download Investment Guide
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
