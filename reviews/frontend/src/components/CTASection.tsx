'use client';

import React from 'react';
import { MessageSquarePlus, ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onOpenSubmitModal: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenSubmitModal }) => {
  return (
    <section className="py-20 bg-[#03050A] relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(54,249,54,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0B111E] to-[#070B14] border border-[#1A2235] shadow-2xl relative overflow-hidden">
          
          <div className="w-14 h-14 rounded-2xl bg-[#36F936]/10 text-[#36F936] border border-[#36F936]/25 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(54,249,54,0.2)]">
            <MessageSquarePlus size={28} />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
            Have an Experience with APFX Global?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            We value honest feedback from our trading community. Share your trading, platform, or account manager experience with thousands of global investors.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onOpenSubmitModal}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#36F936] to-[#28D128] text-[#03050A] font-bold text-sm sm:text-base flex items-center gap-2 shadow-[0_0_25px_rgba(54,249,54,0.3)] hover:shadow-[0_0_40px_rgba(54,249,54,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Share Your Experience</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
