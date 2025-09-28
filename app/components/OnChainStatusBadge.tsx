'use client';

import { CheckCircle, Clock, AlertCircle, ExternalLink } from 'lucide-react';

interface OnChainStatusBadgeProps {
  variant: 'pending' | 'confirmed' | 'error';
  txHash?: string;
  message?: string;
  explorerUrl?: string;
}

export function OnChainStatusBadge({ 
  variant, 
  txHash, 
  message,
  explorerUrl = 'https://basescan.org/tx/'
}: OnChainStatusBadgeProps) {
  const config = {
    pending: {
      icon: Clock,
      label: 'Pending',
      description: message || 'Transaction is being processed...',
      className: 'status-badge status-pending'
    },
    confirmed: {
      icon: CheckCircle,
      label: 'Confirmed',
      description: message || 'Transaction confirmed on-chain',
      className: 'status-badge status-confirmed'
    },
    error: {
      icon: AlertCircle,
      label: 'Failed',
      description: message || 'Transaction failed',
      className: 'status-badge status-error'
    }
  };

  const { icon: Icon, label, description, className } = config[variant];

  return (
    <div className="space-y-2">
      <div className={className}>
        <Icon className="w-3 h-3" />
        <span>{label}</span>
      </div>
      
      <p className="text-xs text-text-secondary">
        {description}
      </p>

      {txHash && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary font-mono">
            {txHash.slice(0, 6)}...{txHash.slice(-4)}
          </span>
          <a
            href={`${explorerUrl}${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
          >
            View
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}
