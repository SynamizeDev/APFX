'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustStats } from '@/components/TrustStats';
import { VideoGrid } from '@/components/VideoGrid';
import { MediaCoverageSection } from '@/components/MediaCoverageSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { SubmitModalPlaceholder } from '@/components/SubmitModalPlaceholder';
import { VideoTestimonial } from '@/types/testimonial';
import { AlertCircle } from 'lucide-react';

interface ReviewsClientPageProps {
  initialTestimonials: VideoTestimonial[];
  dataSource: 'youtube_api' | 'youtube_rss' | 'mock_fallback';
  error?: string;
}

export const ReviewsClientPage: React.FC<ReviewsClientPageProps> = ({
  initialTestimonials,
  dataSource,
  error,
}) => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const scrollToGrid = () => {
    const gridEl = document.getElementById('reviews-grid');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#03050A] text-slate-300 flex flex-col font-['Manrope'] selection:bg-[#36F936] selection:text-[#03050A]">
      {/* Dev Environment Notice if Fallback is active */}
      {dataSource === 'mock_fallback' && error && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-xs text-amber-300 flex items-center justify-center gap-2 font-mono">
          <AlertCircle size={14} className="shrink-0" />
          <span>YouTube Playlist Notice: {error}</span>
        </div>
      )}

      {/* Top Header */}
      <Header onOpenSubmitModal={() => setIsSubmitModalOpen(true)} />

      <main className="flex-1">
        {/* Hero Banner */}
        <Hero onScrollToVideos={scrollToGrid} />

        {/* Key Metrics / Trust Bar */}
        <TrustStats />

        {/* Main Video Showcase Grid with Filtering & Search */}
        <VideoGrid initialTestimonials={initialTestimonials} />

        {/* Media Coverage / PR Articles Section */}
        <MediaCoverageSection />

        {/* Share Experience CTA */}
        <CTASection onOpenSubmitModal={() => setIsSubmitModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Placeholder Modal for Review Submission */}
      <SubmitModalPlaceholder
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />
    </div>
  );
};
