'use client';

import type { DashboardIndexItem } from './types';
import styles from './IndexSummaryCards.module.css';

function formatValue(value: number): string {
    if (value >= 1000) return value.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    return value.toFixed(2);
}

export default function IndexSummaryCards({ indices }: { indices: DashboardIndexItem[] }) {
    return (
        <div className={styles.wrapper}>
            {indices.map((idx) => (
                <div key={idx.name} className={styles.card}>
                    <div className={styles.name}>{idx.name}</div>
                    <div className={styles.value}>{formatValue(idx.value)}</div>
                    <span className={`${styles.change} ${idx.up ? styles.changeUp : styles.changeDown}`}>
                        {idx.up ? '+' : ''}{idx.changePercent.toFixed(2)}%
                    </span>
                </div>
            ))}
        </div>
    );
}
