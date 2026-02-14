'use client';

import ConversationList from '@/components/ui/ConversationList';
import { StatusCard } from '@/components/ui/Card';
import { 
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UsersIcon,
  BellIcon
} from '@heroicons/react/24/outline';

export default function TelegramPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gradient">
          Telegram Management
        </h1>
        <p className="text-text-secondary">
          Real-time monitoring and AI-powered categorization of 195+ business conversations
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Total Conversations"
          value="195"
          subtitle="Active business discussions"
          status="info"
          icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Unread Messages"
          value="6"
          subtitle="Requiring attention"
          status="warning"
          trend={{
            value: 2,
            isPositive: false,
            label: "from yesterday"
          }}
          icon={<BellIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Urgent Priority"
          value="4"
          subtitle="Need immediate response"
          status="error"
          icon={<ExclamationTriangleIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Response Rate"
          value="85.4%"
          subtitle="Last 7 days average"
          status="success"
          trend={{
            value: 12,
            isPositive: true,
            label: "improvement"
          }}
          icon={<UsersIcon className="w-6 h-6" />}
        />
      </div>

      {/* Main Conversation List */}
      <ConversationList />
      
      {/* System Status Footer */}
      <div className="text-center text-text-muted text-sm py-4">
        <p>
          Last scan: 2 minutes ago • Scanner: <span className="text-status-success">Active</span> • 
          Auto-refresh: <span className="text-zealynx-500">Enabled</span>
        </p>
      </div>
    </div>
  );
}