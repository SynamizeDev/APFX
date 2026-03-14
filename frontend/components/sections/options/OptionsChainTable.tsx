'use client';

import type { StrikeRow } from '@/lib/options/types';
import styles from './OptionsChainTable.module.css';

interface OptionsChainTableProps {
    rows: StrikeRow[];
    spot: number;
}

function isAtm(strike: number, spot: number): boolean {
    const step = 50;
    return Math.abs(strike - spot) < step;
}

export default function OptionsChainTable({ rows, spot }: OptionsChainTableProps) {
    return (
        <div className={styles.wrap}>
            <div className={styles.table}>
                <div className={styles.thead}>
                    <div className={styles.th}>PUTS</div>
                    <div className={styles.thCenter}>Strike</div>
                    <div className={styles.th}>CALLS</div>
                </div>
                <div className={styles.theadSub}>
                    <div className={styles.thSub}>OI | Chg | IV% | LTP</div>
                    <div className={styles.thSubCenter} />
                    <div className={styles.thSub}>LTP | IV% | Chg | OI</div>
                </div>
                {rows.map((row) => {
                    const atm = isAtm(row.strike, spot);
                    return (
                        <div
                            key={row.strike}
                            className={`${styles.row} ${atm ? styles.rowAtm : ''}`}
                        >
                            <div className={styles.cell}>
                                <span className={styles.ltp}>{row.pe.ltp}</span>
                                <span className={styles.oi}>{row.pe.oi.toLocaleString()}</span>
                                <span className={row.pe.changeInOi >= 0 ? styles.chgUp : styles.chgDown}>
                                    {row.pe.changeInOi >= 0 ? '+' : ''}{row.pe.changeInOi}
                                </span>
                                <span className={styles.iv}>{row.pe.iv}%</span>
                            </div>
                            <div className={styles.strike}>{row.strike}</div>
                            <div className={styles.cell}>
                                <span className={styles.ltp}>{row.ce.ltp}</span>
                                <span className={styles.iv}>{row.ce.iv}%</span>
                                <span className={row.ce.changeInOi >= 0 ? styles.chgUp : styles.chgDown}>
                                    {row.ce.changeInOi >= 0 ? '+' : ''}{row.ce.changeInOi}
                                </span>
                                <span className={styles.oi}>{row.ce.oi.toLocaleString()}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
