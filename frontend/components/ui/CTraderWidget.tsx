'use client';

import React, { useEffect, useRef, useState } from 'react';
import { initializeWidget } from '@/lib/ctrader/initialize';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CTraderWidget.module.css';

interface CTraderWidgetProps {
    route: string;
    theme?: 'light' | 'dark';
    language?: string;
    appConfig?: Record<string, any>;
    className?: string;
}

export default function CTraderWidget({
    route,
    theme = 'dark',
    language = 'en',
    appConfig = {},
    className = ''
}: CTraderWidgetProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerId] = useState(`ctrader-${Math.random().toString(36).substr(2, 9)}`);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!containerRef.current) return;
        
        containerRef.current.id = containerId;

        // Initialize widget
        initializeWidget({
            containerId,
            route,
            theme,
            language,
            appConfig
        }).then(() => {
            // Widget script loaded and init called. Give it a brief moment to render 
            // before removing the loading state to prevent flash of empty content
            setTimeout(() => setIsLoading(false), 500);
        });

        // Cleanup on unmount
        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [containerId, route, theme, language, appConfig]);

    return (
        <div className={`${styles.wrapper} ${className}`}>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className={styles.loader}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.spinner}></div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div ref={containerRef} className={styles.container} />
        </div>
    );
}
