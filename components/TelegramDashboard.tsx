'use client';

import { useState, useEffect } from 'react';
import { formatTimeAgo, formatNumber } from '@/lib/utils';
import { TELEGRAM_CONFIG } from '@/lib/constants';
import type { TelegramConversation } from '@/types/database';

interface TelegramDashboardProps {
  className?: string;
}

// Mock data representing Carlos's actual Telegram structure
const MOCK_CONVERSATIONS: TelegramConversation[] = [
  {
    id: '1',
    telegram_id: 'chat_001',
    name: 'Monadex Protocol',
    category: 'Act ZLX clie',
    last_message: 'Final audit report delivered. Payment pending.',
    last_activity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
    unread_count: 0,
    priority_score: 90,
    is_bot: false,
    chat_type: 'user',
    conversation_data: {
      total_messages: 45,
      sentiment_score: 0.8,
      business_context: 'audit client',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    telegram_id: 'chat_002', 
    name: 'Harbor Finance',
    category: 'Pot ZLX clie',
    last_message: 'Interested in Sway audit for launch next month. What\'s your capacity?',
    last_activity: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6h ago
    unread_count: 2,
    priority_score: 70,
    is_bot: false,
    chat_type: 'user',
    conversation_data: {
      total_messages: 12,
      sentiment_score: 0.0,
      business_context: 'potential client',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    telegram_id: 'chat_003',
    name: 'DeFi Yield Protocol',
    category: 'Enreach lead',
    last_message: 'Thanks for reaching out! We need a Solidity audit before mainnet.',
    last_activity: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12h ago
    unread_count: 1,
    priority_score: 60,
    is_bot: false,
    chat_type: 'user',
    conversation_data: {
      total_messages: 8,
      sentiment_score: 0.6,
      business_context: 'enreach lead',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    telegram_id: 'chat_004',
    name: 'Aurora Partnership',
    category: 'BD',
    last_message: 'Let\'s schedule a call next week to discuss the partnership terms.',
    last_activity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1d ago
    unread_count: 0,
    priority_score: 30,
    is_bot: false,
    chat_type: 'user',
    conversation_data: {
      total_messages: 15,
      sentiment_score: 0.8,
      business_context: 'business development',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    telegram_id: 'chat_005',
    name: 'Urgent Smart Contract Issue',
    category: 'Act ZLX clie',
    last_message: 'URGENT: Found potential vulnerability in production contract. Can you review ASAP?',
    last_activity: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30m ago
    unread_count: 3,
    priority_score: 100,
    is_bot: false,
    chat_type: 'user',
    conversation_data: {
      total_messages: 67,
      sentiment_score: -0.5,
      business_context: 'emergency audit',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function TelegramDashboard({ className = '' }: TelegramDashboardProps) {
  const [conversations, setConversations] = useState<TelegramConversation[]>(MOCK_CONVERSATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter conversations based on category and search
  const filteredConversations = conversations.filter(conv => {
    const matchesCategory = selectedCategory === 'all' || conv.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conv.last_message && conv.last_message.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (conv.conversation_data.business_context && conv.conversation_data.business_context.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Sort by priority and recency
  const sortedConversations = [...filteredConversations].sort((a, b) => {
    // Higher priority score comes first
    if (a.priority_score !== b.priority_score) {
      return b.priority_score - a.priority_score;
    }
    return new Date(b.last_activity).getTime() - new Date(a.last_activity).getTime();
  });

  // Calculate category stats
  const categoryStats = TELEGRAM_CONFIG.categories.map(category => ({
    category,
    count: conversations.filter(c => c.category === category).length,
    urgent: conversations.filter(c => c.category === category && c.priority_score >= 90).length,
  }));

  // Mock refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      // Add slight variation to demonstrate live updates
      setConversations(prev => prev.map(conv => ({
        ...conv,
        unread_count: Math.max(0, conv.unread_count + Math.floor(Math.random() * 3 - 1))
      })));
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">💬</span>
            <div>
              <p className="caption">Total Conversations</p>
              <p className="text-2xl font-semibold text-slate-100">
                {formatNumber(conversations.length)}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Actively monitored by Elliot AI
          </p>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🚨</span>
            <div>
              <p className="caption">Urgent Attention</p>
              <p className="text-2xl font-semibold text-red-400">
                {conversations.filter(c => c.priority_score >= 90).length}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            High priority score (&gt;90)
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📈</span>
            <div>
              <p className="caption">High Priority Score</p>
              <p className="text-2xl font-semibold text-teal-400">
                {conversations.filter(c => c.priority_score >= 70).length}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            AI-scored business potential
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">✉️</span>
            <div>
              <p className="caption">Unread Messages</p>
              <p className="text-2xl font-semibold text-amber-400">
                {conversations.reduce((sum, c) => sum + c.unread_count, 0)}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Across all conversations
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              selectedCategory === 'all'
                ? 'bg-teal-500 text-white border-teal-500'
                : 'bg-slate-800 text-slate-300 border-slate-600 hover:border-slate-500'
            }`}
          >
            All ({conversations.length})
          </button>
          {TELEGRAM_CONFIG.categories.slice(0, 5).map(category => {
            const stat = categoryStats.find(s => s.category === category);
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  selectedCategory === category
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-slate-800 text-slate-300 border-slate-600 hover:border-slate-500'
                }`}
              >
                {category} ({stat?.count || 0})
                {stat && stat.urgent > 0 && (
                  <span className="ml-1 text-red-400">🚨</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:border-teal-500 focus:outline-none"
          />
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
          >
            {isRefreshing ? '🔄' : '↻'}
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-3">
        {sortedConversations.map((conversation, index) => (
          <ConversationCard
            key={conversation.id}
            conversation={conversation}
            delay={index * 50}
          />
        ))}

        {sortedConversations.length === 0 && (
          <div className="card text-center py-12">
            <span className="text-4xl mb-4 block">🔍</span>
            <h3 className="heading-sm mb-2">No conversations found</h3>
            <p className="text-slate-400">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-component for conversation cards
interface ConversationCardProps {
  conversation: TelegramConversation;
  delay?: number;
}

function ConversationCard({ conversation, delay = 0 }: ConversationCardProps) {
  const getPriorityColor = (score: number) => {
    if (score >= 90) return 'text-red-500 border-red-500/30 bg-red-500/5';
    if (score >= 70) return 'text-orange-500 border-orange-500/30 bg-orange-500/5';
    if (score >= 50) return 'text-yellow-500 border-yellow-500/30 bg-yellow-500/5';
    return 'text-gray-500 border-gray-500/30 bg-gray-500/5';
  };

  const getPriorityLabel = (score: number) => {
    if (score >= 90) return 'urgent';
    if (score >= 70) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  };

  const getSentimentEmoji = (score?: number) => {
    if (!score) return '😐';
    if (score > 0.3) return '😊';
    if (score < -0.3) return '😟';
    return '😐';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Act ZLX clie': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Pot ZLX clie': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Enreach lead': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'BD': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Audits': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div
      className={`card hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 ${
        conversation.priority_score >= 90 ? 'border-l-red-500' :
        conversation.priority_score >= 70 ? 'border-l-orange-500' :
        conversation.priority_score >= 50 ? 'border-l-yellow-500' :
        'border-l-gray-500'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0 flex-1">
              <h3 className="heading-sm truncate">
                {conversation.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`status-indicator text-xs ${getCategoryColor(conversation.category)}`}>
                  {conversation.category}
                </span>
                <span className={`status-indicator text-xs ${getPriorityColor(conversation.priority_score)}`}>
                  {getPriorityLabel(conversation.priority_score)}
                </span>
                {conversation.priority_score >= 70 && (
                  <span className="status-indicator text-xs bg-teal-500/20 text-teal-300 border-teal-500/30">
                    Score: {conversation.priority_score}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>{getSentimentEmoji(conversation.conversation_data.sentiment_score)}</span>
              <span>{formatTimeAgo(conversation.last_activity)}</span>
              {conversation.unread_count > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                  {conversation.unread_count}
                </span>
              )}
            </div>
          </div>
          
          <p className="text-slate-300 text-sm line-clamp-2 mb-2">
            {conversation.last_message || 'No recent messages'}
          </p>
          
          {conversation.conversation_data.business_context && (
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded border border-slate-600">
                {conversation.conversation_data.business_context}
              </span>
              <span className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded border border-slate-600">
                {conversation.conversation_data.total_messages} messages
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}