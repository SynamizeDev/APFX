'use client';

import Link from 'next/link';
import { BarChart3, Calculator, TrendingUp, Activity } from 'lucide-react';
import styles from './ToolCards.module.css';

const TOOLS = [
    { label: 'Options Chain', href: '/products/options/NIFTY', icon: BarChart3 },
    { label: 'Strategy Builder', href: '/products/options/strategy-builder', icon: TrendingUp },
    { label: 'Payoff Calculator', href: '/products/options/payoff-calculator', icon: Calculator },
    { label: 'IV Analysis', href: '/products/options/iv-analysis', icon: Activity },
];

export default function ToolCards() {
    return (
        <div className={styles.grid}>
            {TOOLS.map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href} className={styles.card}>
                    <Icon size={24} className={styles.icon} />
                    <span className={styles.label}>{label}</span>
                </Link>
            ))}
        </div>
    );
}
