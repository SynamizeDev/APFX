'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search reviews by client, country, strategy, or key term..."
        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0B111E] border border-[#1A2235] text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#36F936] focus:ring-1 focus:ring-[#36F936] transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
          title="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
