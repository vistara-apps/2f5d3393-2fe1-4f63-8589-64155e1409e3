export interface User {
  userId: string;
  walletAddress: string;
  profileInfo: {
    displayName: string;
    avatar?: string;
    bio?: string;
  };
  reputationScore: number;
}

export interface VideoProject {
  projectId: string;
  userId: string;
  templateId?: string;
  customizations: {
    style?: string;
    keywords?: string[];
    duration?: number;
    colors?: string[];
  };
  generatedAssets: string[];
  status: 'draft' | 'generating' | 'completed' | 'published';
  creationDate: Date;
  title: string;
  description?: string;
}

export interface Asset {
  assetId: string;
  uploaderId: string;
  assetType: 'template' | 'music' | 'effect' | 'footage' | 'plugin';
  metadata: {
    title: string;
    description: string;
    tags: string[];
    duration?: number;
    resolution?: string;
    fileSize: number;
    previewUrl: string;
    downloadUrl: string;
  };
  onChainId?: string;
  price: number;
  royaltyPercentage: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Transaction {
  transactionId: string;
  fromUserId: string;
  toUserId: string;
  assetId: string;
  amount: number;
  timestamp: Date;
  onChainTxHash?: string;
  status: 'pending' | 'confirmed' | 'failed';
  type: 'purchase' | 'royalty' | 'listing';
}

export interface AIGenerationRequest {
  type: 'footage' | 'audio' | 'effect';
  prompt: string;
  style?: string;
  duration?: number;
  quality?: 'standard' | 'premium';
  userId: string;
}

export interface MarketplaceFilter {
  assetType?: Asset['assetType'];
  priceRange?: [number, number];
  tags?: string[];
  sortBy?: 'newest' | 'popular' | 'price_low' | 'price_high';
  searchQuery?: string;
}
