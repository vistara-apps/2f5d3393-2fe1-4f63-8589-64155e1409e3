'use client';

import { useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { MarketplaceFilter as FilterType, Asset } from '@/lib/types';
import { ASSET_TYPES } from '@/lib/constants';

interface MarketplaceFilterProps {
  variant?: 'type' | 'price' | 'tags';
  onFilterChange?: (filters: FilterType) => void;
  initialFilters?: FilterType;
}

export function MarketplaceFilter({ 
  variant = 'type', 
  onFilterChange,
  initialFilters = {}
}: MarketplaceFilterProps) {
  const [filters, setFilters] = useState<FilterType>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1]);

  const updateFilters = (newFilters: Partial<FilterType>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const clearFilters = () => {
    const cleared = {};
    setFilters(cleared);
    onFilterChange?.(cleared);
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof FilterType];
    return value !== undefined && value !== '' && 
           (Array.isArray(value) ? value.length > 0 : true);
  });

  return (
    <div className="glass-card p-4">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <input
          type="text"
          placeholder="Search assets..."
          value={filters.searchQuery || ''}
          onChange={(e) => updateFilters({ searchQuery: e.target.value })}
          className="w-full pl-10 pr-4 py-2 bg-surface/50 border border-accent/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filters</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-text-secondary hover:text-accent transition-colors text-sm"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-6 border-t border-accent/20 pt-4">
          {/* Asset Type Filter */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">Asset Type</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(ASSET_TYPES).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => updateFilters({ 
                    assetType: filters.assetType === key ? undefined : key as Asset['assetType']
                  })}
                  className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                    filters.assetType === key
                      ? 'bg-accent/20 border-accent/50 text-accent'
                      : 'bg-surface/30 border-accent/20 text-text-secondary hover:border-accent/40'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">
              Price Range: {priceRange[0].toFixed(3)} - {priceRange[1].toFixed(3)} ETH
            </h4>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.001"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const newRange: [number, number] = [Number(e.target.value), priceRange[1]];
                    setPriceRange(newRange);
                    updateFilters({ priceRange: newRange });
                  }}
                  className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.001"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const newRange: [number, number] = [priceRange[0], Number(e.target.value)];
                    setPriceRange(newRange);
                    updateFilters({ priceRange: newRange });
                  }}
                  className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div className="flex justify-between text-xs text-text-secondary">
                <span>0 ETH</span>
                <span>1 ETH</span>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">Sort By</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'newest', label: 'Newest' },
                { key: 'popular', label: 'Popular' },
                { key: 'price_low', label: 'Price: Low to High' },
                { key: 'price_high', label: 'Price: High to Low' }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => updateFilters({ 
                    sortBy: option.key as FilterType['sortBy']
                  })}
                  className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                    filters.sortBy === option.key
                      ? 'bg-accent/20 border-accent/50 text-accent'
                      : 'bg-surface/30 border-accent/20 text-text-secondary hover:border-accent/40'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">Popular Tags</h4>
            <div className="flex flex-wrap gap-2">
              {['business', 'corporate', 'modern', 'cinematic', 'upbeat', 'professional'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    const currentTags = filters.tags || [];
                    const newTags = currentTags.includes(tag)
                      ? currentTags.filter(t => t !== tag)
                      : [...currentTags, tag];
                    updateFilters({ tags: newTags });
                  }}
                  className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
                    filters.tags?.includes(tag)
                      ? 'bg-accent/20 border-accent/50 text-accent'
                      : 'bg-surface/30 border-accent/20 text-text-secondary hover:border-accent/40'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-accent/20">
          <div className="flex flex-wrap gap-2">
            {filters.assetType && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                {ASSET_TYPES[filters.assetType]}
                <button
                  onClick={() => updateFilters({ assetType: undefined })}
                  className="hover:text-accent/80"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-accent/20 text-accent text-xs rounded-full"
              >
                #{tag}
                <button
                  onClick={() => {
                    const newTags = filters.tags?.filter(t => t !== tag) || [];
                    updateFilters({ tags: newTags.length > 0 ? newTags : undefined });
                  }}
                  className="hover:text-accent/80"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: rgb(var(--color-accent));
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: rgb(var(--color-accent));
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
