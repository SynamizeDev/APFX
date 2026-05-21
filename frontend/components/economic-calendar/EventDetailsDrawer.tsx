'use client'
// frontend/components/economic-calendar/EventDetailsDrawer.tsx
// Displays rich ForexFactory-style specs & history for an expanded event.

import React from 'react'
import { EconomicEvent } from '@/types/economic'
import styles from './EconomicCalendar.module.css'

interface EventDetailsDrawerProps {
    event: EconomicEvent
}

export default function EventDetailsDrawer({ event }: EventDetailsDrawerProps) {
    return (
        <div className={styles.drawerWrap}>
            <div className={styles.drawerInner}>
                
                {/* Spec Column */}
                <div className={styles.drawerSpecCol}>
                    <h5 className={styles.drawerHeader}>Specifications</h5>
                    <table className={styles.specTable}>
                        <tbody>
                            <tr>
                                <td className={styles.specLabel}>Source</td>
                                <td className={styles.specVal}>{event.dataSource || '—'}</td>
                            </tr>
                            <tr>
                                <td className={styles.specLabel}>Measures</td>
                                <td className={styles.specVal}>{event.description || '—'}</td>
                            </tr>
                            <tr>
                                <td className={styles.specLabel}>Usual Effect</td>
                                <td className={styles.specVal}>
                                    <span className={styles.effectText}>
                                        {event.usualEffect || '—'}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.specLabel}>Frequency</td>
                                <td className={styles.specVal}>{event.frequency || '—'}</td>
                            </tr>
                            <tr>
                                <td className={styles.specLabel}>Next Release</td>
                                <td className={styles.specVal}>{event.nextRelease || '—'}</td>
                            </tr>
                            <tr>
                                <td className={styles.specLabel}>Why Traders Care</td>
                                <td className={styles.specVal}>{event.whyTradersСare || '—'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* History Column */}
                <div className={styles.drawerHistoryCol}>
                    <h5 className={styles.drawerHeader}>Historical Releases</h5>
                    {event.history && event.history.length > 0 ? (
                        <div className={styles.historyTableWrap}>
                            <table className={styles.historyTable}>
                                <thead>
                                    <tr>
                                        <th>Release Date</th>
                                        <th style={{ textAlign: 'right' }}>Actual</th>
                                        <th style={{ textAlign: 'right' }}>Forecast</th>
                                        <th style={{ textAlign: 'right' }}>Previous</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event.history.map((h, index) => (
                                        <tr key={index}>
                                            <td className={styles.histDate}>{h.date}</td>
                                            <td className={styles.histActual}>{h.actual}</td>
                                            <td className={styles.histVal}>{h.forecast}</td>
                                            <td className={styles.histVal}>{h.previous}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className={styles.noHistory}>
                            No historical release data available for this event.
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
