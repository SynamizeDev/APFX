'use client';

import React, { useState, useMemo } from 'react';
import { VideoTestimonial, ReviewCategory, ReviewSortOption } from '../types/testimonial';
import { VideoTestimonialCard } from './VideoTestimonialCard';
import { FilterBar } from './FilterBar';
import { SearchBar } from './SearchBar';
import { VideoModal } from './VideoModal';
import { SearchX, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface VideoGridProps {
  initialTestimonials: VideoTestimonial[];
}

export const VideoGrid: React.FC<VideoGridProps> = ({ initialTestimonials }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ReviewCategory>('All');
  const [activeSort, setActiveSort] = useState<ReviewSortOption>('latest');
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);

  const categories: ReviewCategory[] = [
    'All',
    'Trading',
    'API & Execution',
    'Institutional',
    'Education',
  ];

  // Filtering & Sorting Logic
  const filteredTestimonials = useMemo(() => {
    return initialTestimonials
      .filter((video) => {
        // Category match
        if (activeCategory !== 'All' && video.category !== activeCategory) {
          return false;
        }

        // Search match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = video.title.toLowerCase().includes(q);
          const matchName = video.clientName ? video.clientName.toLowerCase().includes(q) : false;
          const matchCountry = video.country ? video.country.toLowerCase().includes(q) : false;
          const matchBody = video.body.toLowerCase().includes(q);
          return matchTitle || matchName || matchCountry || matchBody;
        }

        return true;
      })
      .sort((a, b) => {
        if (activeSort === 'featured') {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
        if (activeSort === 'latest') {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        }
        if (activeSort === 'highest') {
          return (b.rating || 0) - (a.rating || 0);
        }
        return 0;
      });
  }, [initialTestimonials, activeCategory, searchQuery, activeSort]);

  return (
    <section id="reviews-grid" className="py-16 bg-[#03050A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#36F936] text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles size={14} />
              <span>Trader Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Explore authentic video reviews from institutional partners, professional traders, and active forex investors.
            </p>
          </div>

          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Filter Bar */}
        <FilterBar
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          activeSort={activeSort}
          onSelectSort={setActiveSort}
          categories={categories}
        />

        {/* Video Grid Container with AnimatePresence */}
        {filteredTestimonials.length > 0 ? (
          <motion.div
            layout
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredTestimonials.map((testimonial, idx) => (
                <VideoTestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  onSelect={setSelectedVideo}
                  index={idx}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty Search State */
          <div className="mt-16 py-16 text-center rounded-2xl bg-[#0B111E]/40 border border-[#1A2235] max-w-xl mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-white/5 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <SearchX size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No video testimonials found</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              We couldn't find any reviews matching "{searchQuery}". Try clearing filters or searching for terms like "Trading", "Liquidity", or "Execution".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Video Modal Player */}
      <VideoModal
        testimonial={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
};
