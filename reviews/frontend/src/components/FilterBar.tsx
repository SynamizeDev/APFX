'use client';

import React from 'react';
import { ReviewCategory, ReviewSortOption } from '../types/testimonial';
import { SlidersHorizontal, Sparkles, Clock, Star } from 'lucide-react';

interface FilterBarProps {
  activeCategory: ReviewCategory;
  onSelectCategory: (category: ReviewCategory) => void;
  activeSort: ReviewSortOption;
  onSelectSort: (sort: ReviewSortOption) => void;
  categories: ReviewCategory[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeCategory,
  onSelectCategory,
  activeSort,
  onSelectSort,
  categories,
}) => {
  const sortOptions: { id: ReviewSortOption; label: string; icon: React.ElementType }[] = [
    { id: 'featured', label: 'Featured', icon: Sparkles },
    { id: 'latest', label: 'Latest', icon: Clock },
    { id: 'highest', label: 'Highest Rated', icon: Star },
  ];

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 border-b border-[#1A2235]">
      
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-[#36F936] text-[#03050A] shadow-[0_0_15px_rgba(54,249,54,0.3)] font-bold'
                  : 'bg-[#0B111E] text-slate-300 hover:text-white hover:bg-[#121A2C] border border-[#1A2235]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Sort Selector Buttons */}
      <div className="flex items-center gap-1.5 bg-[#0B111E] p-1 rounded-xl border border-[#1A2235] text-xs w-full md:w-auto justify-end">
        <div className="flex items-center gap-1 text-slate-400 px-2.5 font-medium border-r border-[#1A2235]">
          <SlidersHorizontal size={14} />
          <span>Sort:</span>
        </div>
        {sortOptions.map((option) => {
          const Icon = option.icon;
          const isActive = activeSort === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelectSort(option.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-white/10 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Icon size={13} className={isActive ? 'text-[#36F936]' : ''} />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
