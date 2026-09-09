'use client';

import React from 'react';
import { X, Sparkles, MessageSquarePlus, ShieldCheck } from 'lucide-react';

interface SubmitModalPlaceholderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitModalPlaceholder: React.FC<SubmitModalPlaceholderProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0B111E] border border-[#1A2235] shadow-2xl p-6 sm:p-8 animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#36F936]/10 text-[#36F936] border border-[#36F936]/20 flex items-center justify-center mx-auto mb-5 shadow-[0_0_25px_rgba(54,249,54,0.2)]">
            <MessageSquarePlus size={32} />
          </div>

          <span className="text-xs font-bold text-[#36F936] uppercase tracking-widest bg-[#36F936]/10 px-3 py-1 rounded-full border border-[#36F936]/20">
            Submit Your Review
          </span>

          <h3 className="text-2xl font-bold text-white mt-4 font-['Space_Grotesk']">
            Share Your APFX Trading Experience
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
            Direct client review submissions and video upload verification will open shortly! We invite active account holders and institutional partners to submit recorded video feedback for verification.
          </p>

          {/* Feature Highlights */}
          <div className="mt-6 p-4 rounded-xl bg-[#03050A] border border-[#1A2235] text-left space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#36F936]" />
              <span>Verified Account badge upon review approval</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#FFB800]" />
              <span>Eligible for monthly trader spotlight & rewards</span>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#36F936] hover:bg-[#28D128] text-[#03050A] font-bold text-sm shadow-[0_0_20px_rgba(54,249,54,0.3)] transition-all"
            >
              Got it
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
