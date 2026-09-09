'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { MediaCoverageItem } from '@/data/mediaCoverage';
import { MediaCoverageCard } from './MediaCoverageCard';
import { X, Search, Newspaper, ExternalLink, Filter } from 'lucide-react';

interface MediaCoverageModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MediaCoverageItem[];
}

export const MediaCoverageModal: React.FC<MediaCoverageModalProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [page, setPage] = useState(1);
  const itemsPerPage = 24;

  // Extract unique media types from source data (only if multiple distinct categories exist)
  const mediaTypes = useMemo(() => {
    const types = new Set(items.map((i) => i.mediaType).filter(Boolean));
    if (types.size <= 1) return [];
    return ['All', ...Array.from(types)];
  }, [items]);

  // Filtered entries
  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (selectedType !== 'All' && mediaTypes.length > 0 && item.mediaType !== selectedType) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = item.publicationName.toLowerCase().includes(q);
        const matchType = item.mediaType.toLowerCase().includes(q);
        const matchUrl = item.articleUrl.toLowerCase().includes(q);
        return matchName || matchType || matchUrl;
      }
      return true;
    });
  }, [items, search, selectedType, mediaTypes]);

  // Reset page on search or type change
  useEffect(() => {
    setPage(1);
  }, [search, selectedType]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-6xl max-h-[90vh] bg-[#070B14] border border-[#1A2235] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#1A2235] flex items-center justify-between bg-[#0B111E]/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#36F936]">
              <Newspaper size={14} />
              <span>Complete Media Directory</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Space_Grotesk'] mt-0.5">
              All 206 Published Media Features
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Browse the complete list of verified news articles and PR releases featuring APFX Global.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="px-6 py-4 bg-[#03050A]/70 border-b border-[#1A2235] flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search publication name..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#0B111E] border border-[#1A2235] rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#36F936]/50 transition-colors"
            />
          </div>

          {/* Media Type Pills (if multiple categories) & Counter */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 justify-between sm:justify-end">
            {mediaTypes.length > 0 && (
              <div className="flex items-center gap-2">
                {mediaTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                      selectedType === type
                        ? 'bg-[#36F936] text-[#03050A] font-bold shadow-[0_0_12px_rgba(54,249,54,0.3)]'
                        : 'bg-[#0B111E] text-slate-300 hover:text-white border border-[#1A2235]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
            <span className="text-xs text-slate-400 font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">
              {filtered.length} {filtered.length === 1 ? 'publication' : 'publications'}
            </span>
          </div>
        </div>

        {/* Scrollable Grid Body */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {displayed.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayed.map((item) => (
                <MediaCoverageCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 text-sm">
              No publications matching your filter criteria.
            </div>
          )}
        </div>

        {/* Modal Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-6 py-3.5 border-t border-[#1A2235] bg-[#0B111E]/80 flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing {(page - 1) * itemsPerPage + 1}–{Math.min(page * itemsPerPage, filtered.length)} of {filtered.length} publications
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="font-mono text-white px-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
