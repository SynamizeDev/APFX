'use client'

import styles from './ZeroFeesBlock.module.css'

const ITEMS = [
    { value: '0', label: '0 Hidden Fees, MTF at just 10.95% p.a.' },
    { value: '0', label: 'Maintenance Fees' },
    { value: '0', label: 'Account Opening Fees' },
] as const

export default function ZeroFeesBlock({ embedded }: { embedded?: boolean }) {
    return (
        <section
            className={embedded ? `${styles.section} ${styles.embedded}` : styles.section}
            aria-label="Zero fees"
        >
            <div className={styles.grid}>
                {ITEMS.map((item, i) => (
                    <div key={i} className={styles.item}>
                        <span className={styles.value} aria-hidden="true">
                            {item.value}
                        </span>
                        <p className={styles.label}>{item.label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
