'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { ExternalLink, PlusCircle } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { usePreferences } from '@/context/PreferencesContext';
import styles from './Header.module.css';

interface HeaderProps {
  onOpenSubmitModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSubmitModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { theme } = usePreferences();
  const isLight = theme === 'light';

  // ── Scroll-driven animations matching main site ─────────────
  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, 150], [0, 1]);

  const headerBgOpacity = useTransform(
    scrollProgress,
    [0.1, 1],
    [0.85, isLight ? 0.9 : 0.95]
  );
  const headerBg = useMotionTemplate`rgba(${isLight ? '255, 255, 255' : '3, 5, 10'}, ${headerBgOpacity})`;

  const headerBorderOpacity = useTransform(scrollProgress, [0, 1], [0.08, 0.12]);
  const headerBorder = useMotionTemplate`rgba(${isLight ? '0, 0, 0' : '255, 255, 255'}, ${headerBorderOpacity})`;

  const headerBlurAmount = useTransform(scrollProgress, [0, 1], [16, 24]);
  const headerBlur = useMotionTemplate`blur(${headerBlurAmount}px)`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      ref={headerRef}
      role="banner"
      className={`global-header ${scrolled ? 'is-scrolled' : 'is-unscrolled'} ${styles.header} ${scrolled ? styles.scrolled : ''}`}
      style={{
        backgroundColor: headerBg,
        borderBottomColor: headerBorder,
        backdropFilter: headerBlur,
        WebkitBackdropFilter: headerBlur,
      }}
    >
      <div className={styles.inner}>
        {/* ── Logo (Exact Parity) ── */}
        <Link href="/" className={styles.logo} aria-label="APFX Global Reviews Home">
          <Logo id="header-logo" size="sm" />
        </Link>

        {/* ── Desktop Navigation Pill (Center) ── */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className={styles.nav}>
            <li>
              <button
                type="button"
                onClick={onOpenSubmitModal}
                className="group flex items-center gap-1.5"
              >
                <PlusCircle size={13} className="opacity-80 group-hover:opacity-100 transition-opacity text-[var(--color-accent)]" />
                <span>Share Experience</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* ── Action Buttons & Theme Toggle (Right) ── */}
        <div className={styles.actions}>
          {/* Main Website CTA (matches main site Register button style) */}
          <a
            href="https://apfxglobal.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSolidWhite}
          >
            <span>Main Website</span>
            <ExternalLink size={13} />
          </a>

          {/* Institutional Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};
