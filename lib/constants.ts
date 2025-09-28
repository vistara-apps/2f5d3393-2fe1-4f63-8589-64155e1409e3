export const ASSET_TYPES = {
  template: 'Video Template',
  music: 'Background Music',
  effect: 'Visual Effect',
  footage: 'Stock Footage',
  plugin: 'Plugin/Tool'
} as const;

export const PROJECT_STATUS = {
  draft: 'Draft',
  generating: 'Generating',
  completed: 'Completed',
  published: 'Published'
} as const;

export const TRANSACTION_STATUS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  failed: 'Failed'
} as const;

export const AI_GENERATION_TYPES = {
  footage: 'Video Footage',
  audio: 'Background Audio',
  effect: 'Visual Effect'
} as const;

export const QUALITY_TIERS = {
  standard: { name: 'Standard', credits: 1 },
  premium: { name: 'Premium', credits: 3 }
} as const;

export const MOCK_ASSETS = [
  {
    assetId: '1',
    uploaderId: 'user1',
    assetType: 'template' as const,
    metadata: {
      title: 'Modern Business Intro',
      description: 'Professional business introduction template with clean animations',
      tags: ['business', 'corporate', 'intro', 'professional'],
      duration: 15,
      resolution: '1920x1080',
      fileSize: 25600000,
      previewUrl: '/api/preview/1',
      downloadUrl: '/api/download/1'
    },
    price: 0.05,
    royaltyPercentage: 10,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isActive: true
  },
  {
    assetId: '2',
    uploaderId: 'user2',
    assetType: 'music' as const,
    metadata: {
      title: 'Upbeat Corporate',
      description: 'Energetic background music perfect for business presentations',
      tags: ['upbeat', 'corporate', 'energetic', 'background'],
      duration: 120,
      fileSize: 8400000,
      previewUrl: '/api/preview/2',
      downloadUrl: '/api/download/2'
    },
    price: 0.03,
    royaltyPercentage: 15,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    isActive: true
  },
  {
    assetId: '3',
    uploaderId: 'user3',
    assetType: 'effect' as const,
    metadata: {
      title: 'Particle Explosion',
      description: 'Dynamic particle explosion effect for dramatic transitions',
      tags: ['particles', 'explosion', 'transition', 'dramatic'],
      duration: 3,
      resolution: '1920x1080',
      fileSize: 15200000,
      previewUrl: '/api/preview/3',
      downloadUrl: '/api/download/3'
    },
    price: 0.02,
    royaltyPercentage: 20,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    isActive: true
  }
];

export const MOCK_PROJECTS = [
  {
    projectId: '1',
    userId: 'current-user',
    title: 'Product Launch Video',
    description: 'Marketing video for new product launch',
    templateId: '1',
    customizations: {
      style: 'modern',
      keywords: ['product', 'launch', 'innovation'],
      duration: 30,
      colors: ['#ffd700', '#1e293b']
    },
    generatedAssets: ['asset1', 'asset2'],
    status: 'completed' as const,
    creationDate: new Date('2024-01-16')
  },
  {
    projectId: '2',
    userId: 'current-user',
    title: 'Social Media Promo',
    description: 'Short promotional video for social media',
    customizations: {
      style: 'vibrant',
      keywords: ['social', 'promo', 'engaging'],
      duration: 15,
      colors: ['#ffd700', '#6366f1']
    },
    generatedAssets: [],
    status: 'generating' as const,
    creationDate: new Date('2024-01-17')
  }
];
