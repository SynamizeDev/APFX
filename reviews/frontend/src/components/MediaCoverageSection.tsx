'use client';

import React, { useState } from 'react';
import { MEDIA_COVERAGE_DATA } from '@/data/mediaCoverage';
import { MediaCoverageCard } from './MediaCoverageCard';
import { MediaCoverageModal } from './MediaCoverageModal';
import { Newspaper, ArrowRight, ShieldCheck, Globe, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const MediaCoverageSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialItems = MEDIA_COVERAGE_DATA.slice(0, 6);
  const totalCount = MEDIA_COVERAGE_DATA.length;

  return (
    <section id="media-coverage" className="py-20 bg-[#03050A] border-b border-[#1A2235] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-80 bg-gradient-radial from-[#36F936]/05 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#36F936]/10 border border-[#36F936]/25 text-[#36F936] text-xs font-semibold tracking-wide uppercase mb-4 shadow-[0_0_15px_rgba(54,249,54,0.15)]">
            <Newspaper size={14} />
            <span>Institutional Social Proof</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-['Space_Grotesk']">
            Recognized Across{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#36F936] to-emerald-400">
              Leading Media
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Explore published stories and media coverage featuring APFX Global across a growing network of news portals and financial publications.
          </p>

          {/* Micro Trust Proof Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-5 py-2.5 rounded-2xl bg-[#0B111E]/70 border border-[#1A2235] text-xs text-slate-300 font-mono">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#36F936]" />
              <span><strong className="text-white font-bold">{totalCount}</strong> Verified Releases</span>
            </div>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-emerald-400" />
              <span><strong className="text-white font-bold">14.9K+</strong> Peak Reach per Outlet</span>
            </div>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#FFB800]" />
              <span>100% Live Indexed Articles</span>
            </div>
          </div>
        </div>

        {/* Initial Curated Grid (12 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
            >
              <MediaCoverageCard item={item} />
            </motion.div>
          ))}
        </div>

        {/* "View All 206 Publications" CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#0B111E] hover:bg-[#121A2C] text-white border border-[#1A2235] hover:border-[#36F936]/50 font-bold text-sm shadow-lg hover:shadow-[0_0_30px_rgba(54,249,54,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span>View All {totalCount} Media Publications</span>
            <ArrowRight size={16} className="text-[#36F936]" />
          </button>
          <p className="mt-2.5 text-xs text-slate-500 font-mono">
            Search, filter, and access all 206 verified press releases directly
          </p>
        </div>

      </div>

      {/* Full Interactive Search & Discovery Modal */}
      <MediaCoverageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={MEDIA_COVERAGE_DATA}
      />
    </section>
  );
};
