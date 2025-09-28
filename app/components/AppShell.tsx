'use client';

import { useState } from 'react';
import { 
  Video, 
  ShoppingBag, 
  Sparkles, 
  User, 
  Menu,
  X,
  Home,
  TrendingUp
} from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'create', label: 'Create', icon: Video },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'ai-studio', label: 'AI Studio', icon: Sparkles },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  const shellClasses = variant === 'glass' 
    ? 'min-h-screen bg-gradient-to-br from-bg via-surface/50 to-bg backdrop-blur-sm'
    : 'min-h-screen bg-bg';

  return (
    <div className={shellClasses}>
      {/* Mobile Header */}
      <div className="lg:hidden bg-surface/80 backdrop-blur-sm border-b border-accent/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-bg" />
            </div>
            <h1 className="text-xl font-bold text-gradient">ChronoCanvas</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Wallet>
              <ConnectWallet>
                <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 border border-accent/20 rounded-lg">
                  <Avatar className="w-6 h-6" />
                  <Name className="text-sm font-medium" />
                </div>
              </ConnectWallet>
            </Wallet>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-text-secondary hover:text-text-primary"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mt-4 pb-4 border-t border-accent/20 pt-4">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`nav-item w-full justify-start ${
                      activeTab === item.id ? 'active' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 bg-surface/50 border-r border-accent/20 min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-bg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">ChronoCanvas</h1>
                <p className="text-xs text-text-secondary">AI Video Platform</p>
              </div>
            </div>

            <nav className="space-y-2 mb-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`nav-item w-full justify-start ${
                      activeTab === item.id ? 'active' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-accent/20 pt-4">
              <Wallet>
                <ConnectWallet>
                  <div className="flex items-center gap-3 p-3 bg-accent/5 border border-accent/20 rounded-lg hover:bg-accent/10 transition-colors">
                    <Avatar className="w-8 h-8" />
                    <div className="flex-1 min-w-0">
                      <Name className="text-sm font-medium block truncate" />
                      <p className="text-xs text-text-secondary">Connected</p>
                    </div>
                  </div>
                </ConnectWallet>
              </Wallet>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:p-6 p-4">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
