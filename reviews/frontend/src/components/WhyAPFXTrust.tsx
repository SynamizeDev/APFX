import React from 'react';
import { ShieldCheck, Zap, Lock, Scale } from 'lucide-react';

export const WhyAPFXTrust: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Verified Trading Proof',
      description:
        'Every featured testimonial is tied to verified live trading accounts and execution logs to ensure absolute transparency and authenticity.',
    },
    {
      icon: Zap,
      title: 'Ultra-Low Latency',
      description:
        'Traders highlight our sub-10ms order execution and deep liquidity pools aggregated from Tier-1 global prime brokers.',
    },
    {
      icon: Lock,
      title: 'Segregated Client Funds',
      description:
        'Client security is non-negotiable. All trader capital is held in segregated accounts at AA-rated global banking institutions.',
    },
    {
      icon: Scale,
      title: 'Zero Dealing Desk Intervention',
      description:
        'Pure ECN/STP execution ensures zero price manipulation, zero requotes, and symmetric slippage handling on all orders.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#03050A] via-[#070B14] to-[#03050A] border-t border-b border-[#1A2235]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#36F936] text-xs font-bold uppercase tracking-widest bg-[#36F936]/10 px-3 py-1 rounded-full border border-[#36F936]/20">
            Institutional Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight mt-4">
            Why APFX Global Reviews Matter
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            In financial markets, trust is earned through execution consistency. Here is why active traders and institutional managers choose APFX Global.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0B111E] border border-[#1A2235] hover:border-[#36F936]/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#36F936]/10 text-[#36F936] border border-[#36F936]/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#36F936] group-hover:text-[#03050A] transition-all duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-['Space_Grotesk']">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
