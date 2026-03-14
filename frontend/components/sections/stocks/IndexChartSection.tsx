'use client';

import { useState } from 'react';
import MarketChart from '@/components/ui/MarketChart';
import styles from './IndexChartSection.module.css';

const TIMEFRAMES = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'] as const;

export default function IndexChartSection() {
    const [timeframe, setTimeframe] = useState<string>('1W');
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>NIFTY50</h2>
            <div className={styles.timeframeRow}>
                {TIMEFRAMES.map((tf) => (
                    <button
                        key={tf}
                        type="button"
                        className={`${styles.timeframeBtn} ${timeframe === tf ? styles.timeframeBtnActive : ''}`}
                        onClick={() => setTimeframe(tf)}
                    >
                        {tf}
                    </button>
                ))}
            </div>
            <div className={styles.chartWrap}>
                <MarketChart symbol="Nifty 50" timeframe={timeframe} />
            </div>
        </section>
    );
}
