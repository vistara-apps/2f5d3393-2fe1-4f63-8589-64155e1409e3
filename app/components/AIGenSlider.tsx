'use client';

import { useState } from 'react';
import { Sparkles, Wand2, Music, Zap } from 'lucide-react';
import { AIGenerationRequest } from '@/lib/types';
import { AI_GENERATION_TYPES, QUALITY_TIERS } from '@/lib/constants';

interface AIGenSliderProps {
  variant: 'footage' | 'audio' | 'effect';
  onGenerate?: (request: AIGenerationRequest) => void;
}

export function AIGenSlider({ variant, onGenerate }: AIGenSliderProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [duration, setDuration] = useState(10);
  const [quality, setQuality] = useState<'standard' | 'premium'>('standard');
  const [isGenerating, setIsGenerating] = useState(false);

  const icons = {
    footage: Sparkles,
    audio: Music,
    effect: Zap
  };

  const Icon = icons[variant];

  const styles = {
    footage: ['Cinematic', 'Documentary', 'Abstract', 'Corporate', 'Artistic'],
    audio: ['Ambient', 'Upbeat', 'Dramatic', 'Peaceful', 'Electronic'],
    effect: ['Particles', 'Light Rays', 'Smoke', 'Fire', 'Water']
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !onGenerate) return;

    setIsGenerating(true);
    try {
      await onGenerate({
        type: variant,
        prompt: prompt.trim(),
        style,
        duration,
        quality,
        userId: 'current-user' // This would come from auth context
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-bg" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            Generate {AI_GENERATION_TYPES[variant]}
          </h3>
          <p className="text-sm text-text-secondary">
            AI-powered {variant} generation
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Prompt Input */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Describe what you want to create
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Describe your ${variant} idea...`}
            className="w-full px-4 py-3 bg-surface/50 border border-accent/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 resize-none"
            rows={3}
          />
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {styles[variant].map((styleOption) => (
              <button
                key={styleOption}
                onClick={() => setStyle(styleOption)}
                className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                  style === styleOption
                    ? 'bg-accent/20 border-accent/50 text-accent'
                    : 'bg-surface/30 border-accent/20 text-text-secondary hover:border-accent/40'
                }`}
              >
                {styleOption}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Slider */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Duration: {duration}s
          </label>
          <div className="relative">
            <input
              type="range"
              min="5"
              max={variant === 'audio' ? "120" : "30"}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>5s</span>
              <span>{variant === 'audio' ? '120s' : '30s'}</span>
            </div>
          </div>
        </div>

        {/* Quality Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Quality
          </label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(QUALITY_TIERS).map(([key, tier]) => (
              <button
                key={key}
                onClick={() => setQuality(key as 'standard' | 'premium')}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  quality === key
                    ? 'bg-accent/20 border-accent/50'
                    : 'bg-surface/30 border-accent/20 hover:border-accent/40'
                }`}
              >
                <div className="text-left">
                  <div className={`font-medium ${
                    quality === key ? 'text-accent' : 'text-text-primary'
                  }`}>
                    {tier.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {tier.credits} credit{tier.credits > 1 ? 's' : ''}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              Generate {AI_GENERATION_TYPES[variant]}
            </>
          )}
        </button>

        {/* Credits Info */}
        <div className="text-center text-xs text-text-secondary">
          <p>
            This will use {QUALITY_TIERS[quality].credits} generation credit{QUALITY_TIERS[quality].credits > 1 ? 's' : ''}
          </p>
          <p className="mt-1">
            Credits remaining: <span className="text-accent font-medium">12</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: rgb(var(--color-accent));
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: rgb(var(--color-accent));
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
