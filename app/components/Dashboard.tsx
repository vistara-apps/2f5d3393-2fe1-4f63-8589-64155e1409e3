'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Video, 
  Users, 
  Plus,
  Eye,
  Download,
  Clock
} from 'lucide-react';
import { VideoProject, Asset } from '@/lib/types';
import { MOCK_PROJECTS, MOCK_ASSETS } from '@/lib/constants';
import { AssetCard } from './AssetCard';

export function Dashboard() {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [recentAssets, setRecentAssets] = useState<Asset[]>([]);
  const [stats, setStats] = useState({
    totalEarnings: 0.234,
    totalViews: 1247,
    activeProjects: 3,
    assetsOwned: 12
  });

  useEffect(() => {
    // Simulate loading data
    setProjects(MOCK_PROJECTS);
    setRecentAssets(MOCK_ASSETS.slice(0, 2));
  }, []);

  const handleCreateProject = () => {
    // This would navigate to project creation
    console.log('Create new project');
  };

  const handleViewProject = (projectId: string) => {
    console.log('View project:', projectId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Welcome back, Creator! 👋
          </h1>
          <p className="text-text-secondary">
            Here's what's happening with your video projects and assets.
          </p>
        </div>
        <button
          onClick={handleCreateProject}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-xs text-text-secondary">+12.5%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary mb-1">
              {stats.totalEarnings.toFixed(3)} ETH
            </p>
            <p className="text-sm text-text-secondary">Total Earnings</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs text-text-secondary">+8.2%</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary mb-1">
              {stats.totalViews.toLocaleString()}
            </p>
            <p className="text-sm text-text-secondary">Total Views</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xs text-text-secondary">+2</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary mb-1">
              {stats.activeProjects}
            </p>
            <p className="text-sm text-text-secondary">Active Projects</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs text-text-secondary">+3</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary mb-1">
              {stats.assetsOwned}
            </p>
            <p className="text-sm text-text-secondary">Assets Owned</p>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Recent Projects</h2>
          <button className="text-accent hover:text-accent/80 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.projectId}
              className="flex items-center justify-between p-4 bg-surface/30 rounded-lg hover:bg-surface/50 transition-colors cursor-pointer"
              onClick={() => handleViewProject(project.projectId)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className={`status-badge ${
                    project.status === 'completed' ? 'status-confirmed' :
                    project.status === 'generating' ? 'status-pending' :
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {project.status === 'generating' && <Clock className="w-3 h-3" />}
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </div>
                  <p className="text-xs text-text-secondary mt-1">
                    {project.creationDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Assets */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Recent Assets</h2>
          <button className="text-accent hover:text-accent/80 text-sm font-medium">
            Browse Marketplace
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentAssets.map((asset) => (
            <AssetCard
              key={asset.assetId}
              asset={asset}
              variant="preview"
              onPreview={(assetId) => console.log('Preview asset:', assetId)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Video className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold text-text-primary mb-2">Create Video</h3>
          <p className="text-sm text-text-secondary mb-4">
            Start a new video project with AI assistance
          </p>
          <button className="btn-secondary w-full">Get Started</button>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="font-semibold text-text-primary mb-2">Browse Trending</h3>
          <p className="text-sm text-text-secondary mb-4">
            Discover popular assets and templates
          </p>
          <button className="btn-secondary w-full">Explore</button>
        </div>

        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Download className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="font-semibold text-text-primary mb-2">Sell Assets</h3>
          <p className="text-sm text-text-secondary mb-4">
            Upload and monetize your creations
          </p>
          <button className="btn-secondary w-full">Upload</button>
        </div>
      </div>
    </div>
  );
}
