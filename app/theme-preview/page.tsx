'use client';

import { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { AppShell } from '../components/AppShell';
import { AssetCard } from '../components/AssetCard';
import { AIGenSlider } from '../components/AIGenSlider';
import { OnChainStatusBadge } from '../components/OnChainStatusBadge';
import { MOCK_ASSETS } from '@/lib/constants';

const themes = [
  { id: 'default', name: 'ChronoCanvas (Default)', description: 'Professional finance theme with gold accents' },
  { id: 'celo', name: 'Celo', description: 'Black background with yellow accents' },
  { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
  { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
  { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue accents' }
];

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();
  const [selectedComponent, setSelectedComponent] = useState('overview');

  const components = [
    { id: 'overview', name: 'Overview' },
    { id: 'cards', name: 'Asset Cards' },
    { id: 'ai-gen', name: 'AI Generation' },
    { id: 'status', name: 'Status Badges' }
  ];

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'cards':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_ASSETS.map((asset) => (
              <AssetCard
                key={asset.assetId}
                asset={asset}
                variant="buyable"
                onPurchase={(id) => console.log('Purchase:', id)}
                onPreview={(id) => console.log('Preview:', id)}
              />
            ))}
          </div>
        );

      case 'ai-gen':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AIGenSlider
              variant="footage"
              onGenerate={(req) => console.log('Generate:', req)}
            />
            <AIGenSlider
              variant="audio"
              onGenerate={(req) => console.log('Generate:', req)}
            />
          </div>
        );

      case 'status':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <h3 className="font-semibold text-text-primary mb-4">Pending Transaction</h3>
              <OnChainStatusBadge
                variant="pending"
                message="Processing your purchase..."
              />
            </div>
            <div className="glass-card p-6">
              <h3 className="font-semibold text-text-primary mb-4">Confirmed Transaction</h3>
              <OnChainStatusBadge
                variant="confirmed"
                txHash="0x1234567890abcdef1234567890abcdef12345678"
                message="Asset purchased successfully!"
              />
            </div>
            <div className="glass-card p-6">
              <h3 className="font-semibold text-text-primary mb-4">Failed Transaction</h3>
              <OnChainStatusBadge
                variant="error"
                message="Transaction failed. Please try again."
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            {/* Color Palette */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Color Palette</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-bg rounded-lg mb-2 mx-auto border border-accent/20"></div>
                  <p className="text-sm text-text-secondary">Background</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-surface rounded-lg mb-2 mx-auto border border-accent/20"></div>
                  <p className="text-sm text-text-secondary">Surface</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-lg mb-2 mx-auto"></div>
                  <p className="text-sm text-text-secondary">Accent</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-text-primary rounded-lg mb-2 mx-auto"></div>
                  <p className="text-sm text-text-secondary">Text Primary</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-text-secondary rounded-lg mb-2 mx-auto"></div>
                  <p className="text-sm text-text-secondary">Text Secondary</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-lg mb-2 mx-auto"></div>
                  <p className="text-sm text-text-secondary">Primary</p>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Typography</h3>
              <div className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-text-primary">Display Heading</h1>
                  <p className="text-sm text-text-secondary">text-4xl font-bold</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">Section Heading</h2>
                  <p className="text-sm text-text-secondary">text-xl font-semibold</p>
                </div>
                <div>
                  <p className="text-base font-light text-text-primary">Body text with light weight for readability</p>
                  <p className="text-sm text-text-secondary">text-base font-light</p>
                </div>
                <div>
                  <p className="text-sm font-normal text-text-secondary">Caption text for additional information</p>
                  <p className="text-sm text-text-secondary">text-sm font-normal</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">Primary Button</button>
                <button className="btn-secondary">Secondary Button</button>
                <button className="btn-primary opacity-50 cursor-not-allowed">Disabled Button</button>
              </div>
            </div>

            {/* Cards */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Cards & Surfaces</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card p-4">
                  <h4 className="font-semibold text-text-primary mb-2">Glass Card</h4>
                  <p className="text-text-secondary">Semi-transparent card with backdrop blur</p>
                </div>
                <div className="metric-card">
                  <h4 className="font-semibold text-text-primary mb-2">Metric Card</h4>
                  <p className="text-text-secondary">Card with hover effects for metrics</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="border-b border-accent/20 bg-surface/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Theme Preview</h1>
              <p className="text-text-secondary">Preview ChronoCanvas components across different themes</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id as any)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                    theme === themeOption.id
                      ? 'bg-accent/20 border-accent/50 text-accent'
                      : 'bg-surface/30 border-accent/20 text-text-secondary hover:border-accent/40'
                  }`}
                  title={themeOption.description}
                >
                  {themeOption.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Component Navigation */}
          <div className="lg:w-64">
            <div className="glass-card p-4">
              <h3 className="font-semibold text-text-primary mb-4">Components</h3>
              <nav className="space-y-2">
                {components.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => setSelectedComponent(component.id)}
                    className={`nav-item w-full justify-start ${
                      selectedComponent === component.id ? 'active' : ''
                    }`}
                  >
                    {component.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Component Preview */}
          <div className="flex-1">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
}
