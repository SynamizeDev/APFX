'use client';

import { useState } from 'react';
import type { DashboardStockItem } from './types';
import styles from './SectionWithTabs.module.css';

export interface TabConfig {
    key: string;
    label: string;
}

interface SectionWithTabsProps {
    title: string;
    viewAllHref?: string;
    tabs: TabConfig[];
    itemsByTab: Record<string, DashboardStockItem[]>;
}

function formatPrice(price: number): string {
    if (price >= 1000) return price.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    if (price < 1) return price.toFixed(2);
    return price.toFixed(2);
}

export default function SectionWithTabs({ title, viewAllHref, tabs, itemsByTab }: SectionWithTabsProps) {
    const [activeKey, setActiveKey] = useState(tabs[0]?.key ?? '');
    const items = itemsByTab[activeKey] ?? [];

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {viewAllHref && (
                    <a href={viewAllHref} className={styles.viewAll}>
                        View All
                    </a>
                )}
            </div>
            <div className={styles.tabs} role="tablist">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={activeKey === tab.key}
                        className={`${styles.tabBtn} ${activeKey === tab.key ? styles.tabBtnActive : ''}`}
                        onClick={() => setActiveKey(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className={styles.grid}>
                {items.map((item) => (
                    <div key={`${item.name}-${item.price}`} className={styles.card}>
                        <div className={styles.cardName} title={item.name}>{item.name}</div>
                        <div className={styles.cardPrice}>{formatPrice(item.price)}</div>
                        <span className={`${styles.cardChange} ${item.up ? styles.cardChangeUp : styles.cardChangeDown}`}>
                            {item.up ? '+' : ''}{item.changePercent.toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
