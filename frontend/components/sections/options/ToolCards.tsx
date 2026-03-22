'use client';

import Link from 'next/link';
import { BarChart3, Calculator, TrendingUp, Activity } from 'lucide-react';
import styles from './ToolCards.module.css';

const TOOLS = [
    { label: 'Calculators', href: '/tools/calculators', icon: BarChart3 },
    { label: 'Risk tools', href: '/tools/risk-management', icon: TrendingUp },
    { label: 'Copy trading', href: '/tools/copy-trading', icon: Calculator },
    { label: 'Margin calc', href: '/tools/calculators/margin', icon: Activity },
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
