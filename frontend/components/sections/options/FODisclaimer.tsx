'use client';

import styles from './FODisclaimer.module.css';

export default function FODisclaimer() {
    return (
        <div className={styles.wrapper} role="region" aria-label="Risk disclaimer">
            <p className={styles.text}>
                F&O trading is risky. You may lose more than your margin. This is for education only and not investment advice.
            </p>
        </div>
    );
}
