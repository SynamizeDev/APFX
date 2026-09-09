'use client';

import React, { useState } from 'react';
import { VideoTestimonial } from '../types/testimonial';
import { RatingStars } from './RatingStars';
import { Play, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoTestimonialCardProps {
  testimonial: VideoTestimonial;
  onSelect: (testimonial: VideoTestimonial) => void;
  index?: number;
}

export const VideoTestimonialCard: React.FC<VideoTestimonialCardProps> = ({
  testimonial,
  onSelect,
  index = 0,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(
    testimonial.thumbnailUrl || `https://img.youtube.com/vi/${testimonial.youtubeId}/hqdefault.jpg`
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.04, 0.25),
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => onSelect(testimonial)}
      className="group relative rounded-2xl bg-[#0B111E] border border-[#1A2235] hover:border-[#36F936]/40 overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(54,249,54,0.15)] transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* ── Thumbnail Container with Play Overlay ── */}
      <div className="relative aspect-video w-full bg-[#03050A] overflow-hidden">
        {/* YouTube Cover Image */}
        <img
          src={imgSrc}
          alt={testimonial.title}
          loading="lazy"
          onError={() => {
            // Fallback to standard YouTube thumbnail format if custom URL fails
            setImgSrc(`https://img.youtube.com/vi/${testimonial.youtubeId}/hqdefault.jpg`);
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 opacity-90 group-hover:opacity-100"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B111E] via-transparent to-black/30 pointer-events-none" />

        {/* Play Button Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-[#36F936] text-[#03050A] flex items-center justify-center shadow-[0_0_25px_rgba(54,249,54,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(54,249,54,0.6)] transition-all duration-300">
            <Play size={24} className="fill-current ml-1" />
          </div>
        </div>

        {/* Badges on Top */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {testimonial.category ? (
            <span className="px-2.5 py-1 rounded-md bg-[#03050A]/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-slate-200">
              {testimonial.category}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-md bg-[#03050A]/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-slate-300">
              Video Review
            </span>
          )}
          {testimonial.featured && (
            <span className="px-2.5 py-1 rounded-md bg-[#C9A84C]/90 text-[#03050A] text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Sparkles size={11} />
              <span>Featured</span>
            </span>
          )}
        </div>

        {/* Video Duration Badge */}
        {testimonial.duration && (
          <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-slate-300 flex items-center gap-1 pointer-events-none">
            <Clock size={11} />
            <span>{testimonial.duration}</span>
          </div>
        )}
      </div>

      {/* ── Card Content Body ── */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Verified Indicator */}
          <div className="flex items-center justify-between mb-2">
            {testimonial.rating ? (
              <RatingStars rating={testimonial.rating} size={15} showNumeric />
            ) : (
              <span className="text-[11px] text-slate-500 font-mono">YouTube Testimonial</span>
            )}
            {testimonial.verified && (
              <div className="flex items-center gap-1 text-[#36F936] text-[11px] font-medium bg-[#36F936]/10 px-2 py-0.5 rounded-full border border-[#36F936]/20">
                <CheckCircle2 size={12} />
                <span>Verified Client</span>
              </div>
            )}
          </div>

          {/* Testimonial Title */}
          <h3 className="text-base font-bold text-white group-hover:text-[#36F936] transition-colors duration-200 line-clamp-2 leading-snug mb-2 font-['Space_Grotesk']">
            "{testimonial.title}"
          </h3>

          {/* Testimonial Snippet */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {testimonial.body}
          </p>
        </div>

        {/* ── Client Details Footer ── */}
        <div className="pt-3 border-t border-[#1A2235] flex items-center justify-between text-xs text-slate-400">
          <div>
            <div className="font-semibold text-slate-200 truncate max-w-[170px]">
              {testimonial.clientName || 'APFX Trader'}
            </div>
            {testimonial.role && (
              <div className="text-[11px] text-slate-500 truncate max-w-[170px]">{testimonial.role}</div>
            )}
          </div>
          <div className="text-right">
            {testimonial.country && (
              <div className="font-medium text-slate-300">{testimonial.country}</div>
            )}
            {testimonial.tradingAccountId && (
              <div className="text-[10px] font-mono text-slate-500">{testimonial.tradingAccountId}</div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
