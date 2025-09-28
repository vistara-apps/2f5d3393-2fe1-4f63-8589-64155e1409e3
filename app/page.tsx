'use client';

import { useEffect, useState } from 'react';
import { AppShell } from './components/AppShell';
import { Dashboard } from './components/Dashboard';
import { MarketplaceFilter } from './components/MarketplaceFilter';
import { AssetCard } from './components/AssetCard';
import { AIGenSlider } from './components/AIGenSlider';
import { OnChainStatusBadge } from './components/OnChainStatusBadge';
import { MOCK_ASSETS } from '@/lib/constants';
import { Asset, AIGenerationRequest, MarketplaceFilter as FilterType } from '@/lib/types';

export default function HomePage() {
  const [activeView, setActiveView] = useState('dashboard');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'pending' | 'confirmed' | 'error'>('idle');

  useEffect(() => {
    // Load mock assets
    setAssets(MOCK_ASSETS);
    setFilteredAssets(MOCK_ASSETS);
  }, []);

  const handleFilterChange = (filters: FilterType) => {
    let filtered = [...assets];

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(asset => 
        asset.metadata.title.toLowerCase().includes(query) ||
        asset.metadata.description.toLowerCase().includes(query) ||
        asset.metadata.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply asset type filter
    if (filters.assetType) {
      filtered = filtered.filter(asset => asset.assetType === filters.assetType);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(asset => asset.price >= min && asset.price <= max);
    }

    // Apply tags filter
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(asset => 
        filters.tags!.some(tag => asset.metadata.tags.includes(tag))
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'newest':
          filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          break;
        case 'price_low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'popular':
          // Mock popularity sort
          filtered.sort(() => Math.random() - 0.5);
          break;
      }
    }

    setFilteredAssets(filtered);
  };

  const handlePurchaseAsset = async (assetId: string) => {
    console.log('Purchasing asset:', assetId);
    // This would integrate with smart contracts
    setGenerationStatus('pending');
    
    // Simulate transaction
    setTimeout(() => {
      setGenerationStatus('confirmed');
      setTimeout(() => setGenerationStatus('idle'), 3000);
    }, 2000);
  };

  const handleAIGeneration = async (request: AIGenerationRequest) => {
    console.log('AI Generation request:', request);
    setIsGenerating(true);
    setGenerationStatus('pending');

    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationStatus('confirmed');
      setTimeout(() => setGenerationStatus('idle'), 3000);
    }, 3000);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;

      case 'marketplace':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Asset Marketplace
                </h1>
                <p className="text-text-secondary">
                  Discover and purchase high-quality video assets from creators worldwide.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <MarketplaceFilter onFilterChange={handleFilterChange} />
              </div>
              
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAssets.map((asset) => (
                    <AssetCard
                      key={asset.assetId}
                      asset={asset}
                      variant="buyable"
                      onPurchase={handlePurchaseAsset}
                      onPreview={(assetId) => console.log('Preview:', assetId)}
                    />
                  ))}
                </div>

                {filteredAssets.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-text-secondary">No assets found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'ai-studio':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                AI Studio
              </h1>
              <p className="text-text-secondary">
                Generate unique video assets using artificial intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <AIGenSlider
                variant="footage"
                onGenerate={handleAIGeneration}
              />
              <AIGenSlider
                variant="audio"
                onGenerate={handleAIGeneration}
              />
              <AIGenSlider
                variant="effect"
                onGenerate={handleAIGeneration}
              />
            </div>

            {generationStatus !== 'idle' && (
              <div className="glass-card p-6">
                <h3 className="font-semibold text-text-primary mb-4">Generation Status</h3>
                <OnChainStatusBadge
                  variant={generationStatus as 'pending' | 'confirmed' | 'error'}
                  txHash={generationStatus === 'confirmed' ? '0x1234567890abcdef' : undefined}
                  message={
                    generationStatus === 'pending' ? 'Generating your AI asset...' :
                    generationStatus === 'confirmed' ? 'Asset generated successfully!' :
                    'Generation failed. Please try again.'
                  }
                />
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
            </h2>
            <p className="text-text-secondary">
              This section is coming soon!
            </p>
          </div>
        );
    }
  };

  return (
    <AppShell variant="glass">
      {renderContent()}
    </AppShell>
  );
}
