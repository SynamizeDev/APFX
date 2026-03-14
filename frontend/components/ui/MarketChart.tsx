'use client'

import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi } from 'lightweight-charts';
import styles from './MarketChart.module.css';

interface MarketChartProps {
    symbol: string;
    timeframe?: string;
}

export default function MarketChart({ symbol, timeframe = '1D' }: MarketChartProps) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Initialize chart
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#9b9ca2',
                fontFamily: 'JetBrains Mono, monospace',
            },
            grid: {
                vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
                horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
            },
            rightPriceScale: {
                borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            timeScale: {
                borderColor: 'rgba(255, 255, 255, 0.1)',
                timeVisible: timeframe !== '1D',
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
        });

        chartRef.current = chart;

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#00c896', // APFX Acccent Green
            downColor: '#ff4757', // Associated Red
            borderVisible: false,
            wickUpColor: '#00c896',
            wickDownColor: '#ff4757',
        });
        
        seriesRef.current = candlestickSeries;

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        window.addEventListener('resize', handleResize);

        // Fetch historical OHLC data
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/candles?symbol=${encodeURIComponent(symbol)}&timeframe=${encodeURIComponent(timeframe)}`);
                if (!res.ok) throw new Error('Failed to fetch data');
                const json = await res.json();
                
                if (json.data && json.data.length > 0) {
                    candlestickSeries.setData(json.data);
                    chart.timeScale().fitContent();
                    
                    // Optional: Custom formatter for crosshair (to show exact time/price)
                    chart.applyOptions({
                        crosshair: {
                            mode: 0, // CrosshairMode.Normal is 0
                            vertLine: {
                                color: 'rgba(255, 255, 255, 0.2)',
                                labelBackgroundColor: '#1d1e22',
                            },
                            horzLine: {
                                color: 'rgba(255, 255, 255, 0.2)',
                                labelBackgroundColor: '#1d1e22',
                            },
                        },
                    });
                } else {
                    setError('No historical data available.');
                }
            } catch (err: any) {
                console.error("Failed to fetch candle data", err);
                setError(err.message || 'Error loading chart.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [symbol, timeframe]);

    return (
        <div className={styles.container}>
            {loading && !error && <div className={styles.loader}>Loading chart data...</div>}
            {error && <div className={styles.loader} style={{ color: 'var(--color-error)' }}>{error}</div>}
            <div ref={chartContainerRef} className={styles.chart} />
        </div>
    );
}
