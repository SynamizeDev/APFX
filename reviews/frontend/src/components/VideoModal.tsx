'use client';

import React, { useEffect, useState } from 'react';
import { VideoTestimonial } from '../types/testimonial';
import { RatingStars } from './RatingStars';
import { X, CheckCircle2, Share2, ShieldCheck, Copy, Check } from 'lucide-react';

interface VideoModalProps {
  testimonial: VideoTestimonial | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ testimonial, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!testimonial) return;

    // Prevent body scrolling when modal is open
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [testimonial, onClose]);

  if (!testimonial) return null;

  const embedUrl = `https://www.youtube-nocookie.com/embed/${testimonial.youtubeId}?autoplay=1&rel=0`;

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const clientInitial = (testimonial.clientName || 'A').charAt(0).toUpperCase();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-2xl bg-[#0B111E] border border-[#1A2235] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-scale-up flex flex-col max-h-[90vh]"
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2235] bg-[#03050A]">
          <div className="flex items-center gap-2">
            {testimonial.category ? (
              <span className="px-2.5 py-1 rounded bg-[#36F936]/10 text-[#36F936] border border-[#36F936]/20 text-xs font-semibold uppercase">
                {testimonial.category}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10 text-xs font-semibold uppercase">
                Video Testimonial
              </span>
            )}
            {testimonial.verified && (
              <div className="flex items-center gap-1 text-[#36F936] text-xs font-medium">
                <CheckCircle2 size={14} />
                <span>Verified Client Review</span>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close video (Esc)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
            title={testimonial.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Modal Content Footer */}
        <div className="p-6 overflow-y-auto max-h-[35vh]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1A2235]">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk'] leading-tight mb-2">
                "{testimonial.title}"
              </h2>
              <div className="flex items-center gap-3">
                {testimonial.rating ? (
                  <RatingStars rating={testimonial.rating} size={18} showNumeric />
                ) : (
                  <span className="text-xs font-mono text-slate-400">YouTube Playlist Video</span>
                )}
                <span className="text-xs text-slate-400 border-l border-slate-700 pl-3">
                  Published {testimonial.publishedAt}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyShare}
              className="self-start sm:self-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 flex items-center gap-2 transition-colors"
            >
              {copied ? <Check size={14} className="text-[#36F936]" /> : <Share2 size={14} />}
              <span>{copied ? 'Link Copied!' : 'Share Review'}</span>
            </button>
          </div>

          {/* Review Body Details */}
          {testimonial.body && (
            <div className="mt-4">
              <p className="text-sm text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                {testimonial.body}
              </p>
            </div>
          )}

          {/* Client Bio */}
          <div className="mt-6 pt-4 border-t border-[#1A2235]/60 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#36F936]/20 to-emerald-900/40 border border-[#36F936]/30 flex items-center justify-center font-bold text-white text-sm">
                {clientInitial}
              </div>
              <div>
                <div className="font-bold text-white text-sm">
                  {testimonial.clientName || 'APFX Trader'}
                </div>
                {(testimonial.role || testimonial.country) && (
                  <div className="text-slate-400">
                    {[testimonial.role, testimonial.country].filter(Boolean).join(' — ')}
                  </div>
                )}
              </div>
            </div>

            {testimonial.tradingAccountId && (
              <div className="hidden sm:block text-right font-mono text-[11px] text-slate-500">
                Verified Account #{testimonial.tradingAccountId}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
