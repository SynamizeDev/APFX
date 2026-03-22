'use client';

import Link from 'next/link';
import type { UnderlyingInfo } from '@/lib/options/types';
import styles from './UnderlyingChips.module.css';

interface UnderlyingChipsProps {
    underlyings: UnderlyingInfo[];
}

export default function UnderlyingChips({ underlyings }: UnderlyingChipsProps) {
    return (
        <div className={styles.wrapper}>
            {underlyings.map((u) => (
                <Link
                    key={u.symbol}
                    href="/tools/calculators"
                    className={styles.chip}
                >
                    <span className={styles.name}>{u.name}</span>
                    <span className={styles.spot}>{u.spot.toLocaleString('en-IN')}</span>
                    <span className={u.up ? styles.up : styles.down}>
                        {u.up ? '+' : ''}{u.changePercent.toFixed(2)}%
                    </span>
                </Link>
            ))}
        </div>
    );
}
