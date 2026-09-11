'use client';

import React from 'react';
import { ShieldCheck, Play, Star } from 'lucide-react';

interface HeroProps {
  onScrollToVideos: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToVideos }) => {
  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 overflow-hidden bg-gradient-to-b from-[#03050A] via-[#070B14] to-[#03050A] border-b border-[#1A2235]">
      {/* Background Radial Emerald Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-radial from-[#36F936]/10 via-[#36F936]/05 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#36F936]/10 border border-[#36F936]/25 text-[#36F936] text-xs font-semibold tracking-wide uppercase mb-6 shadow-[0_0_15px_rgba(54,249,54,0.15)]">
          <ShieldCheck size={14} />
          <span>100% Verified Trader & Client Video Testimonials</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto font-['Space_Grotesk']">
          Real Experiences.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#36F936] to-emerald-400">
            Real Traders.
          </span>{' '}
          Real Reviews.
        </h1>

        {/* Subtitle Description */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Discover unvarnished video testimonials and trading performance feedback directly from verified APFX Global traders across institutional, professional, and retail markets worldwide.
        </p>

        {/* CTA Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onScrollToVideos}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#36F936] to-[#28D128] text-[#03050A] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(54,249,54,0.3)] hover:shadow-[0_0_45px_rgba(54,249,54,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Play size={18} className="fill-current" />
            <span>Watch Client Reviews</span>
          </button>
        </div>

        {/* Rating Trust Badge */}
        <div className="mt-10 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#0B111E]/80 border border-[#1A2235] backdrop-blur-sm">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-[#FFB800] fill-[#FFB800]" />
            ))}
          </div>
          <span className="text-sm font-bold text-white">4.9 / 5.0</span>
          <span className="text-xs text-slate-400 font-medium border-l border-slate-700 pl-3">
            Based on 500+ Verified Trading Accounts
          </span>
        </div>

      </div>
    </section>
  );
};
