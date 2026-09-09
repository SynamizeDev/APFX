'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Star, Users, Globe, Video } from 'lucide-react';
import { motion, useInView, animate } from 'framer-motion';

interface CountUpProps {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const CountUpNumber: React.FC<CountUpProps> = ({
  to,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 2,
}) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setVal(latest);
      },
    });

    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const TrustStats: React.FC = () => {
  const stats = [
    {
      icon: Star,
      to: 4.9,
      decimals: 1,
      suffix: ' / 5',
      label: 'Average Client Rating',
      subtext: 'Top rated liquidity execution',
      color: 'text-[#FFB800]',
    },
    {
      icon: Users,
      to: 500,
      decimals: 0,
      suffix: '+',
      label: 'Verified Reviews',
      subtext: 'From active live trading accounts',
      color: 'text-[#36F936]',
    },
    {
      icon: Globe,
      to: 45,
      decimals: 0,
      suffix: '+',
      label: 'Countries Represented',
      subtext: 'Global trader community',
      color: 'text-emerald-400',
    },
    {
      icon: Video,
      to: 120,
      decimals: 0,
      suffix: '+',
      label: 'Video Testimonials',
      subtext: 'Real recorded trader feedback',
      color: 'text-amber-400',
    },
  ];

  return (
    <section className="py-10 bg-[#06090D] border-b border-[#1A2235]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-2xl bg-[#0B111E]/60 border border-[#1A2235] hover:border-[#243050] transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
                    <CountUpNumber
                      to={stat.to}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-0.5">{stat.label}</h3>
                <p className="text-xs text-slate-400 font-medium">{stat.subtext}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
