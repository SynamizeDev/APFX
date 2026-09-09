import React from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#03050A] border-t border-[#1A2235] text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center">
              <Link href="/" aria-label="APFX Home" className="inline-block">
                <Logo size="sm" />
              </Link>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              The official client review and video testimonial platform for APFX Global Markets. Built to provide transparent, verifiable performance feedback from retail, prop, and institutional traders worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">
              APFX Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://app.apfxglobal.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Main Trading Platform
                </a>
              </li>
              <li>
                <a href="https://apfxglobal.com/accounts" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Account Types & Spreads
                </a>
              </li>
              <li>
                <a href="https://apfxglobal.com/academy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Trading Academy
                </a>
              </li>
              <li>
                <a href="https://apfxglobal.com/support" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Client Support 24/7
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://apfxglobal.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://apfxglobal.com/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="https://apfxglobal.com/risk-disclosure" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  High Risk Disclaimer
                </a>
              </li>
              <li>
                <a href="https://apfxglobal.com/aml-kyc-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  AML / KYC Policy
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Risk Disclaimer */}
        <div className="pt-8 border-t border-[#1A2235]/60 text-[11px] text-slate-500 leading-relaxed space-y-3">
          <p>
            <strong className="text-slate-400">Risk Warning:</strong> Trading Foreign Exchange (Forex) and Contracts for Difference (CFDs) on margin carries a high level of risk and may not be suitable for all investors. Testimonials displayed on this website represent individual experiences and do not guarantee future performance or profits.
          </p>
          <p className="flex justify-between items-center text-[10px] text-slate-600">
            <span>© {new Date().getFullYear()} APFX Global Markets Ltd. All rights reserved.</span>
            <span>reviews.apfxglobal.com</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
