'use client'

import React, { useState } from 'react'
import { Settings, X, Moon, Sun, Zap, ZapOff, LayoutDashboard, Eye } from 'lucide-react'
import { usePreferences } from '@/context/PreferencesContext'
import styles from './PreferencesPanel.module.css'

export default function PreferencesPanel() {
    const [isOpen, setIsOpen] = useState(false)
    const { 
        theme, setTheme, 
        animationsEnabled, setAnimationsEnabled, 
        kpiMode, setKpiMode 
    } = usePreferences()

    return (
        <div className={styles.container}>
            {/* Trigger Button */}
            <button 
                className={`${styles.trigger} ${isOpen ? styles.active : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open Preferences"
            >
                {isOpen ? <X size={20} /> : <Settings size={20} />}
            </button>

            {/* Panel */}
            {isOpen && (
                <div className={styles.panel}>
                    <div className={styles.header}>
                        <h3 className={styles.title}>Preferences</h3>
                    </div>

                    <div className={styles.options}>
                        {/* Theme Toggle */}
                        <div className={styles.option}>
                            <div className={styles.optionInfo}>
                                <div className={styles.icon}>
                                    {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                                </div>
                                <span>Theme</span>
                            </div>
                            <button 
                                className={`${styles.toggle} ${theme === 'light' ? styles.toggleOn : ''}`}
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            >
                                <div className={styles.toggleKnob} />
                            </button>
                        </div>

                        {/* Animations Toggle */}
                        <div className={styles.option}>
                            <div className={styles.optionInfo}>
                                <div className={styles.icon}>
                                    {animationsEnabled ? <Zap size={16} /> : <ZapOff size={16} />}
                                </div>
                                <span>Animations</span>
                            </div>
                            <button 
                                className={`${styles.toggle} ${animationsEnabled ? styles.toggleOn : ''}`}
                                onClick={() => setAnimationsEnabled(!animationsEnabled)}
                            >
                                <div className={styles.toggleKnob} />
                            </button>
                        </div>

                        {/* KPI Mode Toggle */}
                        <div className={styles.option}>
                            <div className={styles.optionInfo}>
                                <div className={styles.icon}>
                                    {kpiMode ? <LayoutDashboard size={16} /> : <Eye size={16} />}
                                </div>
                                <span>KPI Mode</span>
                            </div>
                            <button 
                                className={`${styles.toggle} ${kpiMode ? styles.toggleOn : ''}`}
                                onClick={() => setKpiMode(!kpiMode)}
                            >
                                <div className={styles.toggleKnob} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
