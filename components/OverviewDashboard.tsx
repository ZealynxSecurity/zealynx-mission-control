'use client';

import { useState, useEffect } from 'react';
import { 
  formatCurrency, 
  formatNumber, 
  formatPercentage, 
  formatTimeAgo,
  getSystemHealthStyle 
} from '@/lib/utils';
import { CURRENT_BUSINESS_METRICS, ZEALYNX_BRAND } from '@/lib/constants';
import type { BusinessMetrics } from '@/types/database';

interface OverviewDashboardProps {
  className?: string;
}

export function OverviewDashboard({ className = '' }: OverviewDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [metrics, setMetrics] = useState<BusinessMetrics>({
    date: new Date().toISOString().split('T')[0],
    ...CURRENT_BUSINESS_METRICS,
    deals_by_stage: {
      prospects: 15,
      qualification: 8, 
      proposal: 12,
      negotiation: 5,
      'closed-won': 10,
      'closed-lost': 2,
    },
    system_health: 'healthy',
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate data refresh
  useEffect(() => {
    const refreshData = () => {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Add slight variation to metrics for live feel
        setMetrics(prev => ({
          ...prev,
          urgent_conversations: Math.max(0, prev.urgent_conversations + Math.floor(Math.random() * 3 - 1)),
          pipeline_value: prev.pipeline_value + Math.floor(Math.random() * 10000 - 5000),
        }));
        setIsLoading(false);
      }, 1000);
    };

    // Initial load
    refreshData();

    // Refresh every 30 seconds
    const refreshInterval = setInterval(refreshData, 30000);

    return () => clearInterval(refreshInterval);
  }, []);

  const systemHealthStyle = getSystemHealthStyle(metrics.system_health);

  // Calculate derived metrics
  const avgDealValue = metrics.pipeline_value / Object.values(metrics.deals_by_stage).reduce((a, b) => a + b, 0);
  const monthlyRunRate = metrics.revenue_ytd / 2; // Assuming 2 months YTD
  const totalActiveDeals = Object.values(metrics.deals_by_stage).reduce((a, b) => a + b, 0);

  // Quick action cards data
  const quickActions: Array<{
    icon: string;
    title: string;
    description: string;
    count: number;
    href: string;
    variant: 'normal' | 'urgent';
  }> = [
    {
      icon: '💬',
      title: 'Urgent Telegram',
      description: 'Review high-priority conversations',
      count: metrics.urgent_conversations,
      href: '/telegram',
      variant: metrics.urgent_conversations > 5 ? 'urgent' : 'normal',
    },
    {
      icon: '🤝',
      title: 'Pipeline Review',
      description: 'Active deals needing attention',
      count: metrics.deals_by_stage.negotiation + metrics.deals_by_stage.proposal,
      href: '/crm',
      variant: 'normal',
    },
    {
      icon: '📅',
      title: 'Today\'s Schedule',
      description: 'Meetings and deadlines',
      count: 3, // Mock data
      href: '/calendar',
      variant: 'normal',
    },
    {
      icon: '🚀',
      title: 'Enreach Campaigns',
      description: 'Active lead generation',
      count: metrics.enreach_campaigns,
      href: '/enreach',
      variant: 'normal',
    },
  ];

  if (isLoading && !metrics.revenue_ytd) {
    return <OverviewSkeleton />;
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header Section */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-zealynx rounded-xl flex items-center justify-center shadow-zealynx">
              <span className="text-white text-xl font-bold">{ZEALYNX_BRAND.emoji}</span>
            </div>
            <div>
              <h1 className="heading-xl zealynx-gradient-text">
                Mission Control
              </h1>
              <p className="subheading">
                Unified business intelligence across all operations
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`status-indicator ${systemHealthStyle.className}`}>
              <span>{systemHealthStyle.icon}</span>
              {systemHealthStyle.label}
            </div>
            {isLoading && (
              <div className="status-indicator info">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                Refreshing data...
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="text-2xl font-mono font-semibold text-text-primary">
              {currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              })}
            </div>
            <div className="text-sm text-text-secondary">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })} UTC
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Revenue YTD"
          value={formatCurrency(metrics.revenue_ytd)}
          change="+15.2%"
          changeType="positive"
          icon="💰"
          delay={0}
        />
        
        <MetricCard
          title="Active Clients"
          value={formatNumber(metrics.active_clients)}
          subtitle={`${formatNumber(30)} total audited`}
          icon="👥"
          delay={100}
        />
        
        <MetricCard
          title="Pipeline Value"
          value={formatCurrency(metrics.pipeline_value)}
          subtitle={`Avg: ${formatCurrency(avgDealValue)} per deal`}
          icon="📈"
          delay={200}
        />
        
        <MetricCard
          title="Monthly Run Rate"
          value={formatCurrency(monthlyRunRate)}
          subtitle={`${formatCurrency(monthlyRunRate * 12)} ARR`}
          icon="📊"
          delay={300}
        />
      </div>

      {/* Operations Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Telegram Operations */}
        <div className="card animate-slide-up animate-delay-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <div>
              <h3 className="heading-sm">Telegram Operations</h3>
              <p className="caption">195+ conversations monitored</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Active Conversations</span>
              <span className="text-2xl font-semibold text-text-primary">
                {formatNumber(metrics.telegram_conversations)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Urgent Attention</span>
              <span className={`text-xl font-semibold ${
                metrics.urgent_conversations > 5 
                  ? 'text-error-500'
                  : metrics.urgent_conversations > 2
                  ? 'text-warning-500'
                  : 'text-success-500'
              }`}>
                {metrics.urgent_conversations}
              </span>
            </div>
            
            <div className="pt-3 border-t border-border-subtle">
              <p className="text-xs text-text-tertiary">
                🤖 Elliot monitors conversations with AI-powered lead scoring
              </p>
            </div>
          </div>
        </div>

        {/* CRM Pipeline */}
        <div className="card animate-slide-up animate-delay-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🤝</span>
            </div>
            <div>
              <h3 className="heading-sm">CRM Pipeline</h3>
              <p className="caption">Active deal management</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Total Deals</span>
              <span className="text-2xl font-semibold text-text-primary">
                {formatNumber(totalActiveDeals)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Conversion Rate</span>
              <span className="text-xl font-semibold text-success-500">
                {formatPercentage(metrics.conversion_rate)}
              </span>
            </div>
            
            <div className="pt-3 border-t border-border-subtle">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-text-tertiary">
                  Proposals: {metrics.deals_by_stage.proposal}
                </div>
                <div className="text-text-tertiary">
                  Negotiating: {metrics.deals_by_stage.negotiation}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="card animate-slide-up animate-delay-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">{systemHealthStyle.icon}</span>
            </div>
            <div>
              <h3 className="heading-sm">System Health</h3>
              <p className="caption">Integration monitoring</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Status</span>
              <span className={`font-semibold ${
                metrics.system_health === 'healthy'
                  ? 'text-success-500'
                  : metrics.system_health === 'warning'
                  ? 'text-warning-500'
                  : 'text-error-500'
              }`}>
                {systemHealthStyle.label}
              </span>
            </div>
            
            <div className="pt-3 border-t border-border-subtle">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-success-500 rounded-full" />
                  <span className="text-text-tertiary">Telegram API</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-success-500 rounded-full" />
                  <span className="text-text-tertiary">Enreach</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-success-500 rounded-full" />
                  <span className="text-text-tertiary">Supabase</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-success-500 rounded-full" />
                  <span className="text-text-tertiary">OpenAI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card animate-slide-up animate-delay-500">
        <div className="mb-6">
          <h3 className="heading-sm mb-2">Quick Actions</h3>
          <p className="caption">Jump to critical areas requiring attention</p>
        </div>
        
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <QuickActionCard key={action.title} action={action} delay={index * 50} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Sub-components
interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  delay?: number;
}

function MetricCard({ 
  title, 
  value, 
  subtitle, 
  change, 
  changeType = 'neutral', 
  icon, 
  delay = 0 
}: MetricCardProps) {
  return (
    <div 
      className="card animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="caption">{title}</p>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-semibold text-text-primary">
          {value}
        </p>
        
        {subtitle && (
          <p className="text-xs text-text-tertiary">
            {subtitle}
          </p>
        )}
        
        {change && (
          <p className={`text-xs font-medium ${
            changeType === 'positive' 
              ? 'text-success-500'
              : changeType === 'negative'
              ? 'text-error-500'
              : 'text-text-tertiary'
          }`}>
            {change} from last month
          </p>
        )}
      </div>
    </div>
  );
}

interface QuickActionCardProps {
  action: {
    icon: string;
    title: string;
    description: string;
    count: number;
    href: string;
    variant: 'normal' | 'urgent';
  };
  delay?: number;
}

function QuickActionCard({ action, delay = 0 }: QuickActionCardProps) {
  return (
    <a
      href={action.href}
      className={`block card-compact interactive-card transition-all duration-200 ${
        action.variant === 'urgent' 
          ? 'border-error-500/30 bg-error-500/5 hover:bg-error-500/10' 
          : 'hover:border-zealynx-500/30'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          action.variant === 'urgent'
            ? 'bg-error-500/20 text-error-300'
            : 'bg-zealynx-500/20 text-zealynx-300'
        }`}>
          <span className="text-xl">{action.icon}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-text-primary truncate">
              {action.title}
            </h4>
            {action.count > 0 && (
              <span className={`status-indicator ${
                action.variant === 'urgent' ? 'error' : 'zealynx'
              }`}>
                {action.count}
              </span>
            )}
          </div>
          <p className="text-xs text-text-tertiary truncate">
            {action.description}
          </p>
        </div>
      </div>
    </a>
  );
}

function OverviewSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="skeleton h-8 w-64" />
          <div className="skeleton h-4 w-48" />
        </div>
        <div className="skeleton h-6 w-24" />
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card">
            <div className="skeleton h-6 w-20 mb-3" />
            <div className="skeleton h-8 w-24 mb-2" />
            <div className="skeleton h-3 w-16" />
          </div>
        ))}
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card">
            <div className="skeleton h-6 w-32 mb-4" />
            <div className="space-y-3">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}