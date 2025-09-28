'use client';

import { useState } from 'react';
import { Play, Download, Heart, Eye, Clock, DollarSign, User } from 'lucide-react';
import { Asset } from '@/lib/types';
import { ASSET_TYPES } from '@/lib/constants';

interface AssetCardProps {
  asset: Asset;
  variant?: 'preview' | 'buyable' | 'sellable';
  onPurchase?: (assetId: string) => void;
  onPreview?: (assetId: string) => void;
}

export function AssetCard({ 
  asset, 
  variant = 'buyable',
  onPurchase,
  onPreview 
}: AssetCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (!onPurchase) return;
    setIsLoading(true);
    try {
      await onPurchase(asset.assetId);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview(asset.assetId);
    }
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="asset-card group">
      {/* Preview Image/Video */}
      <div className="relative aspect-video bg-surface/50 rounded-lg mb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-2 mx-auto">
              <Play className="w-6 h-6 text-accent" />
            </div>
            <p className="text-xs text-text-secondary">Preview Available</p>
          </div>
        </div>

        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <button
            onClick={handlePreview}
            className="p-2 bg-accent/20 backdrop-blur-sm rounded-full hover:bg-accent/30 transition-colors"
          >
            <Eye className="w-5 h-5 text-accent" />
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 backdrop-blur-sm rounded-full transition-colors ${
              isLiked 
                ? 'bg-red-500/20 text-red-400' 
                : 'bg-accent/20 hover:bg-accent/30 text-accent'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Asset Type Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-accent/20 backdrop-blur-sm text-accent text-xs font-medium rounded-full">
            {ASSET_TYPES[asset.assetType]}
          </span>
        </div>

        {/* Duration Badge */}
        {asset.metadata.duration && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(asset.metadata.duration)}
            </span>
          </div>
        )}
      </div>

      {/* Asset Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-text-primary mb-1 line-clamp-1">
            {asset.metadata.title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2">
            {asset.metadata.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {asset.metadata.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-surface/50 text-text-secondary text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {asset.metadata.tags.length > 3 && (
            <span className="px-2 py-1 bg-surface/50 text-text-secondary text-xs rounded-full">
              +{asset.metadata.tags.length - 3}
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center gap-4">
            {asset.metadata.resolution && (
              <span>{asset.metadata.resolution}</span>
            )}
            <span>{formatFileSize(asset.metadata.fileSize)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>Creator</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-accent/10">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-accent" />
            <span className="font-semibold text-accent">
              {asset.price.toFixed(3)} ETH
            </span>
            {asset.royaltyPercentage > 0 && (
              <span className="text-xs text-text-secondary">
                ({asset.royaltyPercentage}% royalty)
              </span>
            )}
          </div>

          {variant === 'buyable' && (
            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Purchasing...' : 'Buy Now'}
            </button>
          )}

          {variant === 'sellable' && (
            <div className="flex gap-2">
              <button className="btn-secondary text-sm px-3 py-1">
                Edit
              </button>
              <button className="p-2 text-text-secondary hover:text-accent transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          )}

          {variant === 'preview' && (
            <button
              onClick={handlePreview}
              className="btn-secondary text-sm px-4 py-2"
            >
              Preview
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
