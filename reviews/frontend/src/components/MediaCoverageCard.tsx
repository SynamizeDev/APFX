'use client';

import React, { useMemo } from 'react';
import { MediaCoverageItem } from '@/data/mediaCoverage';
import { ExternalLink, Lock, Eye, Sparkles, ArrowUpRight } from 'lucide-react';

interface MediaCoverageCardProps {
  item: MediaCoverageItem;
}

export const MediaCoverageCard: React.FC<MediaCoverageCardProps> = ({ item }) => {
  // Extract clean domain from the article URL
  const domain = useMemo(() => {
    try {
      const url = new URL(item.articleUrl);
      return url.hostname.replace('www.', '');
    } catch {
      return 'newsportal.com';
    }
  }, [item.articleUrl]);

  // Generate 2-letter monogram for the publication
  const monogram = useMemo(() => {
    return item.publicationName
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  }, [item.publicationName]);

  return (
    <a
      href={item.articleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-2xl bg-[#0B111E] border border-[#1A2235] hover:border-[#36F936]/60 overflow-hidden shadow-md hover:shadow-[0_12px_35px_rgba(54,249,54,0.18)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 cursor-pointer block text-left"
    >
      {/* ── CARD HEADER: PUBLICATION BRANDING ── */}
      <div className="p-4 pb-3 flex items-center justify-between gap-3 border-b border-[#1A2235]/70">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#36F936]/20 via-[#36F936]/10 to-transparent border border-[#36F936]/30 flex items-center justify-center font-bold text-xs text-[#36F936] font-mono shadow-[0_0_12px_rgba(54,249,54,0.12)] shrink-0 group-hover:scale-105 group-hover:bg-[#36F936] group-hover:text-[#03050A] transition-all duration-300">
            {monogram || 'PR'}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#36F936] transition-colors duration-200 truncate font-['Space_Grotesk']">
              {item.publicationName}
            </h4>
            <span className="text-[11px] text-slate-400 block font-mono truncate">
              {domain}
            </span>
          </div>
        </div>

        {/* External Link Action Cue */}
        <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#36F936] border border-white/10 group-hover:border-[#36F936] flex items-center justify-center text-slate-400 group-hover:text-[#03050A] transition-all duration-200 shrink-0">
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* ── BROWSER / ARTICLE PREVIEW CANVAS ── */}
      <div className="relative mx-3.5 my-3 rounded-xl bg-[#070B14] border border-[#1A2235] overflow-hidden shadow-inner">
        {/* Minimal Browser Top Bar */}
        <div className="px-3 py-1.5 bg-[#03050A]/90 border-b border-[#1A2235]/80 flex items-center justify-between gap-2 select-none">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#FF5F56]/80 inline-block" />
            <span className="w-2 h-2 rounded-full bg-[#FFBD2E]/80 inline-block" />
            <span className="w-2 h-2 rounded-full bg-[#27C93F]/80 inline-block" />
          </div>

          <div className="flex-1 max-w-[170px] mx-auto px-2 py-0.5 rounded bg-[#0B111E] border border-[#1A2235] flex items-center justify-center gap-1 text-[9px] font-mono text-slate-400 truncate">
            <Lock size={9} className="text-[#36F936] shrink-0" />
            <span className="truncate">{domain}</span>
          </div>

          <span className="text-[9px] font-mono text-[#36F936] font-semibold">HTTPS</span>
        </div>

        {/* News Article Visual Preview Content */}
        <div className="p-3.5 bg-gradient-to-br from-[#0B111E] via-[#070B14] to-[#03050A] relative overflow-hidden flex flex-col justify-between min-h-[105px]">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#36F936]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#36F936]/20 transition-all duration-500" />

          {/* Release Badge */}
          <div className="relative z-10 flex items-center gap-1.5 text-[10px] font-bold text-[#36F936] font-mono uppercase tracking-wider mb-2">
            <Sparkles size={11} />
            <span>Featured Press Release</span>
          </div>

          {/* Article Title */}
          <h5 className="relative z-10 text-xs sm:text-[13px] font-bold text-white group-hover:text-[#36F936] transition-colors duration-200 line-clamp-2 leading-snug font-['Space_Grotesk'] mb-2">
            APFX Global: Powering Modern Trading with AI Automation & Advanced Technology
          </h5>

          {/* Summary snippet */}
          <p className="relative z-10 text-[11px] text-slate-400 line-clamp-1">
            Global media feature highlighting execution speed, institutional liquidity & client transparency.
          </p>
        </div>
      </div>

      {/* ── CARD FOOTER: METRICS & READ BUTTON ── */}
      <div className="px-4 py-3 bg-[#0B111E] border-t border-[#1A2235]/70 flex items-center justify-between text-xs">
        {/* Reach and Domain Authority */}
        <div className="flex items-center gap-3 text-slate-400 text-[11px] font-mono">
          {item.potentialAudience && (
            <span className="flex items-center gap-1" title="Potential Audience">
              <Eye size={12} className="text-slate-500" />
              <span>{item.potentialAudience}</span>
            </span>
          )}
          {item.da && (
            <span title="Domain Authority" className="font-semibold text-slate-300">
              DA {item.da}
            </span>
          )}
        </div>

        {/* Read Article CTA */}
        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#36F936] group-hover:text-white px-3 py-1 rounded-lg bg-[#36F936]/10 group-hover:bg-[#36F936] group-hover:text-[#03050A] border border-[#36F936]/25 transition-all duration-200 shadow-sm">
          <span>Read Article</span>
          <ExternalLink size={12} />
        </span>
      </div>
    </a>
  );
};
