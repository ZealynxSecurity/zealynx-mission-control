'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  MessageSquare,
  Target,
  Calendar,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface OverviewDashboardProps {
  className?: string;
}

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral' | 'warning';
  icon: React.ComponentType<any>;
  description?: string;
}

function MetricCard({ title, value, change, changeType = 'neutral', icon: Icon, description }: MetricCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-[var(--color-success)]';
      case 'negative': return 'text-[var(--color-error)]';
      case 'warning': return 'text-[var(--color-warning)]';
      default: return 'text-[var(--color-text-subtle)]';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive': return <TrendingUp size={14} />;
      case 'negative': return <TrendingDown size={14} />;
      default: return null;
    }
  };

  return (
    <div className="card hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary-light)]/10 border border-[var(--color-primary)]/20">
          <Icon size={20} className="text-[var(--color-primary)]" />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm font-medium ${getChangeColor()}`}>
            {getChangeIcon()}
            <span>{change}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-[var(--color-text-muted)]">
          {title}
        </h3>
        <p className="text-2xl font-bold text-[var(--color-text-primary)]">
          {value}
        </p>
        {description && (
          <p className="text-xs text-[var(--color-text-subtle)]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'error';
}

function ActivityItem({ title, description, time, type }: ActivityItemProps) {
  const getTypeStyle = () => {
    switch (type) {
      case 'success': return 'bg-[var(--color-success)]/10 border-[var(--color-success)]/30 text-[var(--color-success)]';
      case 'warning': return 'bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30 text-[var(--color-warning)]';
      case 'error': return 'bg-[var(--color-error)]/10 border-[var(--color-error)]/30 text-[var(--color-error)]';
      default: return 'bg-[var(--color-info)]/10 border-[var(--color-info)]/30 text-[var(--color-info)]';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={16} />;
      case 'warning': return <AlertCircle size={16} />;
      case 'error': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-card)] transition-colors">
      <div className={`flex-shrink-0 p-1.5 rounded-lg border ${getTypeStyle()}`}>
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-1">
          {title}
        </h4>
        <p className="text-xs text-[var(--color-text-muted)] mb-2">
          {description}
        </p>
        <p className="text-xs text-[var(--color-text-subtle)]">
          {time}
        </p>
      </div>
    </div>
  );
}

export function OverviewDashboard({ className = '' }: OverviewDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - in real app this would come from your database/API
  const metrics = {
    revenue: {
      current: 133470,
      target: 150000,
      growth: 28.5,
    },
    deals: {
      total: 52,
      active: 25,
      closed: 27,
    },
    conversations: {
      total: 195,
      urgent: 12,
      responseRate: 85.4,
    },
    automation: {
      health: 94.2,
      jobs: 6,
      errors: 2,
    },
  };

  const recentActivity = [
    {
      title: 'New lead from Lido Finance',
      description: 'High-value prospect interested in smart contract audit',
      time: '2 minutes ago',
      type: 'success' as const,
    },
    {
      title: 'Pipeline review completed',
      description: '3 deals moved to negotiation stage',
      time: '15 minutes ago',
      type: 'info' as const,
    },
    {
      title: 'Telegram scanner alert',
      description: 'Urgent message from Monadex team',
      time: '32 minutes ago',
      type: 'warning' as const,
    },
    {
      title: 'Enreach campaign performance',
      description: '12% improvement in response rate this week',
      time: '1 hour ago',
      type: 'success' as const,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Revenue YTD"
          value={formatCurrency(metrics.revenue.current)}
          change={`+${formatPercentage(metrics.revenue.growth)}`}
          changeType="positive"
          icon={DollarSign}
          description={`${formatPercentage((metrics.revenue.current / metrics.revenue.target) * 100)} of target`}
        />
        
        <MetricCard
          title="Active Deals"
          value={metrics.deals.active.toString()}
          change="+3 this week"
          changeType="positive"
          icon={Target}
          description={`${metrics.deals.total} total deals in pipeline`}
        />
        
        <MetricCard
          title="Telegram Conversations"
          value={metrics.conversations.total.toString()}
          change={`${metrics.conversations.urgent} urgent`}
          changeType="neutral"
          icon={MessageSquare}
          description={`${formatPercentage(metrics.conversations.responseRate)} response rate`}
        />
        
        <MetricCard
          title="Automation Health"
          value={formatPercentage(metrics.automation.health)}
          change={metrics.automation.errors > 0 ? `${metrics.automation.errors} errors` : 'All systems operational'}
          changeType={metrics.automation.errors > 0 ? 'warning' : 'positive'}
          icon={Activity}
          description={`${metrics.automation.jobs} active processes`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="heading-sm">Quick Actions</h3>
              <Zap size={18} className="text-[var(--color-primary)]" />
            </div>
            
            <div className="space-y-3">
              <button className="w-full p-3 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white font-medium hover:shadow-lg transition-all">
                Review Urgent Messages ({metrics.conversations.urgent})
              </button>
              
              <button className="w-full p-3 rounded-lg bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-bg-card)] transition-colors">
                Update Pipeline ({metrics.deals.active} active)
              </button>
              
              <button className="w-full p-3 rounded-lg bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-bg-card)] transition-colors">
                Schedule Follow-ups
              </button>
            </div>

            {/* Current Time */}
            <div className="mt-6 pt-4 border-t border-[var(--color-border-primary)]">
              <div className="text-center">
                <p className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">
                  {currentTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-sm">Recent Activity</h3>
              <button className="text-sm text-[var(--color-primary)] hover:underline">
                View all
              </button>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <ActivityItem
                  key={index}
                  title={activity.title}
                  description={activity.description}
                  time={activity.time}
                  type={activity.type}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="heading-sm">System Status</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--color-success)] rounded-full animate-pulse"></div>
            <span className="text-sm text-[var(--color-text-muted)]">All systems operational</span>
          </div>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-[var(--color-text-primary)]">
                Telegram Scanner
              </h4>
              <span className="status-success text-xs">Active</span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">
              Last scan: 2 min ago
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-[var(--color-text-primary)]">
                Enreach Integration
              </h4>
              <span className="status-success text-xs">Active</span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">
              Sync: 15 min ago
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-[var(--color-bg-tertiary)]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-[var(--color-text-primary)]">
                Database
              </h4>
              <span className="status-success text-xs">Healthy</span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">
              Response: 45ms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}