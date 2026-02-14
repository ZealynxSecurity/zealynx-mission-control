'use client';

import { useState, useEffect } from 'react';
import { 
  Search,
  Filter,
  MessageCircle,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Users,
  Zap,
  TrendingUp,
  Eye,
  MoreHorizontal
} from 'lucide-react';

interface TelegramDashboardProps {
  className?: string;
}

interface ConversationProps {
  id: string;
  name: string;
  category: string;
  lastMessage: string;
  lastActivity: string;
  unreadCount: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isBot: boolean;
  chatType: 'user' | 'group' | 'channel';
  sentiment: 'positive' | 'neutral' | 'negative';
  businessContext: string;
  avatar?: string;
}

function ConversationCard({ 
  id, 
  name, 
  category, 
  lastMessage, 
  lastActivity, 
  unreadCount, 
  priority, 
  isBot, 
  chatType, 
  sentiment,
  businessContext,
  avatar 
}: ConversationProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-[var(--color-error)]/10 border-[var(--color-error)]/30 text-[var(--color-error)]';
      case 'high': return 'bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30 text-[var(--color-warning)]';
      case 'medium': return 'bg-[var(--color-info)]/10 border-[var(--color-info)]/30 text-[var(--color-info)]';
      default: return 'bg-[var(--color-text-subtle)]/10 border-[var(--color-text-subtle)]/30 text-[var(--color-text-subtle)]';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-[var(--color-success)]';
      case 'negative': return 'text-[var(--color-error)]';
      default: return 'text-[var(--color-text-subtle)]';
    }
  };

  const getChatIcon = () => {
    switch (chatType) {
      case 'group': return <Users size={16} />;
      case 'channel': return <MessageCircle size={16} />;
      default: return <User size={16} />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-error)] text-white text-xs font-medium rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
          {isBot && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--color-info)] text-white rounded-full flex items-center justify-center">
              <Zap size={10} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <h3 className="font-semibold text-[var(--color-text-primary)] truncate">
                {name}
              </h3>
              <div className="flex items-center gap-1 text-[var(--color-text-subtle)]">
                {getChatIcon()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${getSentimentColor(sentiment)}`}>
                ●
              </span>
              <span className="text-xs text-[var(--color-text-subtle)]">
                {formatTimeAgo(lastActivity)}
              </span>
            </div>
          </div>

          {/* Category and Priority */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] rounded-full">
              {category}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(priority)}`}>
              {priority}
            </span>
            <span className="text-xs text-[var(--color-text-subtle)]">
              {businessContext}
            </span>
          </div>

          {/* Last Message */}
          <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-2">
            {lastMessage}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="btn btn-ghost btn-sm">
                <Eye size={14} />
                View
              </button>
              <button className="btn btn-ghost btn-sm">
                <MessageCircle size={14} />
                Reply
              </button>
            </div>
            <button className="p-1 rounded text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CategoryStatsProps {
  category: string;
  count: number;
  urgent: number;
  color: string;
}

function CategoryStats({ category, count, urgent, color }: CategoryStatsProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-3 h-3 rounded-full bg-${color}-500`}></div>
        <span className="text-xs text-[var(--color-text-subtle)]">
          {urgent > 0 && `${urgent} urgent`}
        </span>
      </div>
      <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
        {category}
      </h4>
      <p className="text-2xl font-bold text-[var(--color-text-primary)]">
        {count}
      </p>
      <p className="text-xs text-[var(--color-text-muted)]">
        conversations
      </p>
    </div>
  );
}

export function TelegramDashboard({ className = '' }: TelegramDashboardProps) {
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<ConversationProps[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Mock data - in real app this would come from your Telegram scanner
  useEffect(() => {
    const mockConversations: ConversationProps[] = [
      {
        id: '1',
        name: 'Monadex Protocol',
        category: 'Act ZLX clie',
        lastMessage: 'Final audit report delivered. Payment pending confirmation.',
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        unreadCount: 0,
        priority: 'medium',
        isBot: false,
        chatType: 'user',
        sentiment: 'positive',
        businessContext: 'Active Client'
      },
      {
        id: '2',
        name: 'Harbor Finance',
        category: 'Pot ZLX clie',
        lastMessage: 'Interested in Sway audit for launch next month. What\'s your capacity?',
        lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        unreadCount: 2,
        priority: 'high',
        isBot: false,
        chatType: 'user',
        sentiment: 'positive',
        businessContext: 'Hot Lead'
      },
      {
        id: '3',
        name: 'Lido Finance Team',
        category: 'Act ZLX clie',
        lastMessage: 'Thanks for the comprehensive security review. Everything looks solid.',
        lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        unreadCount: 0,
        priority: 'low',
        isBot: false,
        chatType: 'group',
        sentiment: 'positive',
        businessContext: 'Completed Project'
      },
      {
        id: '4',
        name: 'DeFi Alliance',
        category: 'BD',
        lastMessage: 'We\'d love to discuss partnership opportunities for our portfolio companies.',
        lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        unreadCount: 1,
        priority: 'urgent',
        isBot: false,
        chatType: 'user',
        sentiment: 'positive',
        businessContext: 'Partnership'
      },
      {
        id: '5',
        name: 'Web3 Security Chat',
        category: 'Uncategorized',
        lastMessage: 'Has anyone worked with Zealynx? Looking for audit recommendations.',
        lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        unreadCount: 3,
        priority: 'medium',
        isBot: false,
        chatType: 'group',
        sentiment: 'neutral',
        businessContext: 'Industry Discussion'
      },
    ];
    
    setConversations(mockConversations);
    setFilteredConversations(mockConversations);
  }, []);

  // Filter conversations based on search and filters
  useEffect(() => {
    let filtered = conversations;

    if (searchQuery) {
      filtered = filtered.filter(conv => 
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(conv => conv.category === selectedCategory);
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(conv => conv.priority === selectedPriority);
    }

    setFilteredConversations(filtered);
  }, [conversations, searchQuery, selectedCategory, selectedPriority]);

  const categories = [...new Set(conversations.map(c => c.category))];
  const categoryStats = categories.map(category => ({
    category,
    count: conversations.filter(c => c.category === category).length,
    urgent: conversations.filter(c => c.category === category && (c.priority === 'urgent' || c.priority === 'high')).length,
    color: 'teal' // You could make this dynamic based on category
  }));

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  const urgentCount = conversations.filter(c => c.priority === 'urgent').length;
  const highPriorityCount = conversations.filter(c => c.priority === 'high').length;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
              <MessageCircle size={20} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Total Conversations</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {conversations.length}
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Active business discussions
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-error)]/10 border border-[var(--color-error)]/20">
              <AlertCircle size={20} className="text-[var(--color-error)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Unread Messages</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {totalUnread}
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Requiring attention
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/20">
              <Clock size={20} className="text-[var(--color-warning)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Urgent Priority</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {urgentCount}
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Immediate response needed
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-success)]/10 border border-[var(--color-success)]/20">
              <TrendingUp size={20} className="text-[var(--color-success)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">High Priority</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {highPriorityCount}
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Important discussions
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-subtle)]" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-subtle)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/20"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categoryStats.map((stat, index) => (
          <CategoryStats
            key={stat.category}
            category={stat.category}
            count={stat.count}
            urgent={stat.urgent}
            color={stat.color}
          />
        ))}
      </div>

      {/* Conversations List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="heading-sm">
            Conversations ({filteredConversations.length})
          </h3>
          <div className="flex items-center gap-2">
            <button className="btn btn-secondary btn-sm">
              <Filter size={14} />
              Advanced Filters
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredConversations.map((conversation) => (
            <ConversationCard key={conversation.id} {...conversation} />
          ))}
        </div>

        {filteredConversations.length === 0 && (
          <div className="card text-center py-12">
            <MessageCircle size={48} className="mx-auto text-[var(--color-text-subtle)] mb-4" />
            <h4 className="heading-sm mb-2">No conversations found</h4>
            <p className="text-[var(--color-text-muted)]">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}