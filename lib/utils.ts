import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DealStage, TaskStatus, TaskPriority, TelegramCategory } from '@/types/database';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date and time utilities
export function formatTimeAgo(dateString: string): string {
  const now = Date.now();
  const date = new Date(dateString).getTime();
  const diffMs = now - date;
  
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return new Date(dateString).toLocaleDateString();
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Number formatting
export function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`;
}

// Text utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

// Telegram category styling (Zealynx branded)
export function getTelegramCategoryStyle(category: TelegramCategory) {
  const categoryMap = {
    'Act ZLX clie': { 
      label: 'Active Client',
      className: 'bg-green-500/20 text-green-300 border-green-500/30',
      priority: 1
    },
    'Pot ZLX clie': { 
      label: 'Potential Client',
      className: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      priority: 2
    },
    'Enreach lead': {
      label: 'Enreach Lead',
      className: 'bg-purple-500/20 text-purple-300 border-purple-500/30', 
      priority: 3
    },
    'BD': { 
      label: 'Business Dev',
      className: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      priority: 4
    },
    'Audits': {
      label: 'Active Audit',
      className: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      priority: 5
    },
    'Immunefi': { 
      label: 'Immunefi',
      className: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      priority: 6
    },
    'Team': { 
      label: 'Team',
      className: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      priority: 7
    },
    'Other': { 
      label: 'Other',
      className: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      priority: 8
    },
    'Spam': { 
      label: 'Spam',
      className: 'bg-red-500/20 text-red-300 border-red-500/30',
      priority: 9
    },
  };
  
  return categoryMap[category] || categoryMap.Other;
}

// Deal stage styling
export function getDealStageStyle(stage: DealStage) {
  const stageMap = {
    'prospects': {
      label: 'Prospects',
      className: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    },
    'qualification': {
      label: 'Qualification', 
      className: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    'proposal': {
      label: 'Proposal',
      className: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    'negotiation': {
      label: 'Negotiation',
      className: 'bg-violet-500/20 text-violet-300 border-violet-500/30'
    },
    'closed-won': {
      label: 'Won',
      className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    'closed-lost': {
      label: 'Lost',
      className: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
  };
  
  return stageMap[stage];
}

// Task status styling
export function getTaskStatusStyle(status: TaskStatus) {
  const statusMap = {
    'pending': {
      label: 'Pending',
      className: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    },
    'in-progress': {
      label: 'In Progress',
      className: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    'completed': {
      label: 'Completed',
      className: 'bg-green-500/20 text-green-300 border-green-500/30'
    },
    'overdue': {
      label: 'Overdue',
      className: 'bg-red-500/20 text-red-300 border-red-500/30'
    },
    'cancelled': {
      label: 'Cancelled',
      className: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    },
  };
  
  return statusMap[status];
}

// Task priority styling  
export function getTaskPriorityStyle(priority: TaskPriority) {
  const priorityMap = {
    'low': {
      label: 'Low',
      className: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
      icon: '⚪'
    },
    'medium': {
      label: 'Medium',
      className: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      icon: '🟡'
    },
    'high': {
      label: 'High',
      className: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      icon: '🟠'
    },
    'urgent': {
      label: 'Urgent',
      className: 'bg-red-500/20 text-red-300 border-red-500/30',
      icon: '🔴'
    },
  };
  
  return priorityMap[priority];
}

// System health utilities
export function getSystemHealthStyle(status: string) {
  const healthMap = {
    'healthy': {
      label: 'All Systems Operational',
      className: 'bg-green-500/20 text-green-300 border-green-500/30',
      icon: '✅'
    },
    'warning': {
      label: 'Some Issues Detected',
      className: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      icon: '⚠️'
    },
    'critical': {
      label: 'Critical Issues',
      className: 'bg-red-500/20 text-red-300 border-red-500/30',
      icon: '🚨'
    },
  };
  
  return healthMap[status as keyof typeof healthMap] || healthMap.warning;
}

// Priority calculation for conversations (Matthew's scoring system)
export function calculateConversationPriority(
  category: TelegramCategory,
  lastActivity: string,
  unreadCount: number,
  sentimentScore?: number
): number {
  const categoryBase = getTelegramCategoryStyle(category);
  const priorityBase = (10 - categoryBase.priority) * 10; // 90 for highest priority categories
  
  // Recency boost (0-20 points)
  const hoursSinceActivity = Math.floor((Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60));
  const recencyScore = Math.max(20 - hoursSinceActivity, 0);
  
  // Unread boost (0-15 points) 
  const unreadScore = Math.min(unreadCount * 3, 15);
  
  // Sentiment boost (-10 to +10 points)
  const sentimentBoost = sentimentScore ? sentimentScore * 10 : 0;
  
  const totalScore = priorityBase + recencyScore + unreadScore + sentimentBoost;
  return Math.max(Math.min(Math.round(totalScore), 100), 0);
}

// Generate semantic search content for embedding
export function generateEmbeddingContent(entity: any, type: string): string {
  switch (type) {
    case 'conversation':
      return `${entity.name} ${entity.category} ${entity.last_message || ''} ${entity.conversation_data?.business_context || ''}`;
    
    case 'deal':
      return `${entity.title} ${entity.company || ''} ${entity.description || ''} ${entity.deal_data?.audit_type || ''}`;
      
    case 'task':
      return `${entity.title} ${entity.description || ''} ${entity.task_data?.progress_notes || ''}`;
      
    case 'contact':
      return `${entity.name} ${entity.company || ''} ${entity.role || ''} ${entity.contact_data?.notes || ''}`;
      
    default:
      return JSON.stringify(entity);
  }
}

// Mobile-first responsive utilities
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function getViewportHeight(): number {
  if (typeof window === 'undefined') return 800;
  return window.innerHeight;
}

// Zealynx theme utilities
export function getZealynxGradient(opacity = 1): string {
  return `linear-gradient(135deg, rgba(19, 183, 193, ${opacity}) 0%, rgba(99, 219, 229, ${opacity * 0.8}) 100%)`;
}

export function getZealynxShadow(): string {
  return '0 0 20px rgba(19, 183, 193, 0.15)';
}