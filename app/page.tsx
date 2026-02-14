'use client';

import { 
  Card, 
  CardContent, 
  StatusCard, 
  ConversationCard, 
  ActionCard 
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UsersIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

export default function OverviewPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gradient">
          Mission Control Overview
        </h1>
        <p className="text-text-secondary">
          Real-time business intelligence across all Zealynx operations
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Revenue YTD"
          value="$133,470"
          subtitle="33% above target"
          status="success"
          trend={{
            value: 12,
            isPositive: true,
            label: "vs last month"
          }}
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Active Clients"
          value="30"
          subtitle="Lido, BadgerDAO, Monadex..."
          status="success"
          icon={<UsersIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Pipeline Deals"
          value="52"
          subtitle="$280k potential value"
          status="info"
          trend={{
            value: 8,
            isPositive: true,
            label: "new this week"
          }}
          icon={<ClipboardDocumentListIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="System Health"
          value="99.9%"
          subtitle="All systems operational"
          status="success"
          icon={<CheckCircleIcon className="w-6 h-6" />}
        />
      </div>

      {/* Critical Alerts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">
            Critical Alerts
          </h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ActionCard
            title="Harbor Finance - Hot Lead"
            description="Sway audit request for next month launch. Awaiting response for 8 hours."
            icon={<ExclamationTriangleIcon className="w-6 h-6" />}
            variant="warning"
            action={{
              label: "Follow Up",
              onClick: () => console.log("Navigate to Harbor Finance")
            }}
          />
          
          <ActionCard
            title="Monadex Payment Pending"
            description="Final audit report delivered. Payment confirmation required."
            icon={<ClockIcon className="w-6 h-6" />}
            variant="info"
            action={{
              label: "Check Status",
              onClick: () => console.log("Navigate to Monadex")
            }}
          />
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Telegram Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-zealynx-500" />
              <h3 className="text-lg font-semibold text-text-primary">
                Telegram Activity
              </h3>
              <div className="bg-status-error text-white text-xs font-medium px-2 py-1 rounded-full">
                6 urgent
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = '/telegram'}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            <ConversationCard
              name="Harbor Finance"
              lastMessage="Interested in Sway audit for launch next month. What's your capacity?"
              timestamp="6h ago"
              unreadCount={2}
              priority="urgent"
              status="online"
              category="Pot ZLX clie"
            />
            
            <ConversationCard
              name="Monadex Protocol"
              lastMessage="Final audit report delivered. Payment pending confirmation."
              timestamp="2h ago"
              priority="high"
              status="away"
              category="Act ZLX clie"
            />
            
            <ConversationCard
              name="Lido Finance Team"
              lastMessage="Thanks for the comprehensive security review. Everything looks solid."
              timestamp="12h ago"
              priority="low"
              status="offline"
              category="Act ZLX clie"
            />
          </div>
        </div>

        {/* System Status */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <ChartBarIcon className="w-5 h-5 text-zealynx-500" />
            <h3 className="text-lg font-semibold text-text-primary">
              System Status
            </h3>
          </div>
          
          <div className="space-y-3">
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-text-primary">Telegram Scanner</h4>
                    <p className="text-sm text-text-secondary">Last scan: 2 min ago</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-status-success rounded-full"></div>
                    <span className="text-sm font-medium text-status-success">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-text-primary">Enreach Integration</h4>
                    <p className="text-sm text-text-secondary">Sync: 15 min ago</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-status-success rounded-full"></div>
                    <span className="text-sm font-medium text-status-success">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-text-primary">Database</h4>
                    <p className="text-sm text-text-secondary">Response: 45ms</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-status-success rounded-full"></div>
                    <span className="text-sm font-medium text-status-success">Healthy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="secondary" 
            fullWidth 
            leftIcon={<ChatBubbleLeftRightIcon className="w-4 h-4" />}
            onClick={() => window.location.href = '/telegram'}
          >
            Manage Conversations
          </Button>
          
          <Button 
            variant="secondary" 
            fullWidth
            leftIcon={<ClipboardDocumentListIcon className="w-4 h-4" />}
            onClick={() => window.location.href = '/crm'}
          >
            Update Pipeline
          </Button>
          
          <Button 
            variant="secondary" 
            fullWidth
            leftIcon={<ChartBarIcon className="w-4 h-4" />}
            onClick={() => window.location.href = '/enreach'}
          >
            View Analytics
          </Button>
          
          <Button 
            variant="secondary" 
            fullWidth
            leftIcon={<CalendarIcon className="w-4 h-4" />}
            onClick={() => window.location.href = '/calendar'}
          >
            Schedule Review
          </Button>
        </div>
      </div>

      {/* Footer Stats */}
      <Card variant="glass" className="mt-8">
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div>
              <p className="text-text-secondary text-sm">
                Studio deployment: <span className="text-zealynx-500 font-medium">studio.zealynx.io</span>
              </p>
              <p className="text-text-muted text-xs mt-1">
                Last updated: {new Date().toLocaleString()}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-text-primary">195+</div>
                <div className="text-xs text-text-muted">Conversations</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-text-primary">24</div>
                <div className="text-xs text-text-muted">Campaigns</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-text-primary">52</div>
                <div className="text-xs text-text-muted">Deals</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}