'use client';

import { useState } from 'react';
import { Card, ConversationCard } from './Card';
import { Button } from './Button';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Mock conversation data (in real app, this would come from props/API)
const mockConversations = [
  {
    id: '1',
    name: 'Harbor Finance',
    avatar: null,
    lastMessage: 'Interested in Sway audit for launch next month. What\'s your capacity?',
    timestamp: '6h ago',
    unreadCount: 2,
    priority: 'urgent' as const,
    status: 'online' as const,
    category: 'Pot ZLX clie'
  },
  {
    id: '2', 
    name: 'Monadex Protocol',
    avatar: null,
    lastMessage: 'Final audit report delivered. Payment pending confirmation.',
    timestamp: '2h ago',
    unreadCount: 0,
    priority: 'high' as const,
    status: 'away' as const,
    category: 'Act ZLX clie'
  },
  {
    id: '3',
    name: 'Lido Finance Team',
    avatar: null,
    lastMessage: 'Thanks for the comprehensive security review. Everything looks solid.',
    timestamp: '12h ago',
    unreadCount: 0,
    priority: 'low' as const,
    status: 'offline' as const,
    category: 'Act ZLX clie'
  },
  {
    id: '4',
    name: 'BadgerDAO',
    avatar: null,
    lastMessage: 'Ready for the next phase of the audit. When can we schedule?',
    timestamp: '1d ago',
    unreadCount: 1,
    priority: 'medium' as const,
    status: 'online' as const,
    category: 'Act ZLX clie'
  },
  {
    id: '5',
    name: 'Immunefi Partnership',
    avatar: null,
    lastMessage: 'New bounty program details attached. Review when you have time.',
    timestamp: '2d ago',
    unreadCount: 0,
    priority: 'low' as const,
    status: 'offline' as const,
    category: 'BD'
  }
];

// Filter types
const filterOptions = [
  { id: 'all', label: 'All Conversations', count: mockConversations.length },
  { id: 'unread', label: 'Unread', count: mockConversations.filter(c => c.unreadCount > 0).length },
  { id: 'urgent', label: 'Urgent', count: mockConversations.filter(c => c.priority === 'urgent').length },
  { id: 'active', label: 'Active Clients', count: mockConversations.filter(c => c.category === 'Act ZLX clie').length },
  { id: 'potential', label: 'Potential Clients', count: mockConversations.filter(c => c.category === 'Pot ZLX clie').length },
];

// Category badges
const categoryColors = {
  'Act ZLX clie': 'bg-status-success/20 text-status-success',
  'Pot ZLX clie': 'bg-status-warning/20 text-status-warning', 
  'BD': 'bg-status-info/20 text-status-info',
  'Zealynx': 'bg-zealynx-500/20 text-zealynx-500',
};

// Priority icons
const priorityIcons = {
  urgent: ExclamationTriangleIcon,
  high: ClockIcon,
  medium: ChatBubbleLeftRightIcon,
  low: CheckCircleIcon,
};

interface ConversationListProps {
  className?: string;
}

export default function ConversationList({ className = '' }: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  // Filter conversations based on search and active filter
  const filteredConversations = mockConversations.filter(conversation => {
    // Search filter
    const matchesSearch = conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    let matchesFilter = true;
    switch (activeFilter) {
      case 'unread':
        matchesFilter = conversation.unreadCount > 0;
        break;
      case 'urgent':
        matchesFilter = conversation.priority === 'urgent';
        break;
      case 'active':
        matchesFilter = conversation.category === 'Act ZLX clie';
        break;
      case 'potential':
        matchesFilter = conversation.category === 'Pot ZLX clie';
        break;
    }
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">
            Conversations ({filteredConversations.length})
          </h2>
          <p className="text-text-secondary">
            Real-time monitoring of 195+ business conversations
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" leftIcon={<FunnelIcon className="w-4 h-4" />}>
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <div className="p-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-color rounded-lg text-text-primary placeholder-text-muted focus:ring-2 focus:ring-zealynx-500 focus:border-zealynx-500 transition-colors"
            />
          </div>
        </div>
      </Card>

      {/* Filter Tabs */}
      <Card>
        <div className="p-2">
          <div className="flex flex-wrap gap-1">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-zealynx-500 text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-background-hover'
                }`}
              >
                {filter.label}
                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.id
                    ? 'bg-white/20'
                    : 'bg-background-tertiary'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Conversation List */}
      <div className="space-y-2">
        {filteredConversations.length === 0 ? (
          <Card>
            <div className="p-8 text-center">
              <ChatBubbleLeftRightIcon className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                No conversations found
              </h3>
              <p className="text-text-secondary">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          </Card>
        ) : (
          filteredConversations.map((conversation) => {
            const PriorityIcon = priorityIcons[conversation.priority];
            return (
              <div 
                key={conversation.id}
                className={`relative ${selectedConversation === conversation.id ? 'ring-2 ring-zealynx-500 rounded-lg' : ''}`}
              >
                <ConversationCard
                  name={conversation.name}
                  avatar={conversation.avatar || undefined}
                  lastMessage={conversation.lastMessage}
                  timestamp={conversation.timestamp}
                  unreadCount={conversation.unreadCount}
                  priority={conversation.priority}
                  status={conversation.status}
                  category={conversation.category}
                  onClick={() => setSelectedConversation(
                    selectedConversation === conversation.id ? null : conversation.id
                  )}
                />
                
                {/* Priority Indicator */}
                {conversation.priority === 'urgent' && (
                  <div className="absolute top-2 left-2 w-3 h-3 bg-status-error rounded-full animate-pulse" />
                )}
                
                {/* Category Badge */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    categoryColors[conversation.category as keyof typeof categoryColors] || 'bg-background-tertiary text-text-muted'
                  }`}>
                    {conversation.category}
                  </span>
                </div>
                
                {/* Expanded Actions */}
                {selectedConversation === conversation.id && (
                  <Card className="mt-2 animate-slide-up">
                    <div className="p-4 border-t border-border-color bg-background-tertiary/50">
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="primary">
                          Reply
                        </Button>
                        <Button size="sm" variant="secondary">
                          Mark as Read
                        </Button>
                        <Button size="sm" variant="ghost">
                          Archive
                        </Button>
                        <Button size="sm" variant="ghost">
                          Priority
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Summary Footer */}
      {filteredConversations.length > 0 && (
        <Card variant="glass">
          <div className="p-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">
                Showing {filteredConversations.length} of {mockConversations.length} conversations
              </span>
              <div className="flex gap-4">
                <span className="text-status-error">
                  {mockConversations.filter(c => c.priority === 'urgent').length} urgent
                </span>
                <span className="text-status-warning">
                  {mockConversations.filter(c => c.unreadCount > 0).length} unread  
                </span>
                <span className="text-status-success">
                  {mockConversations.filter(c => c.status === 'online').length} online
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}