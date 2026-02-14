'use client';

import KanbanBoard from '@/components/ui/KanbanBoard';
import { StatusCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusIcon,
  FunnelIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function CRMPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient">
              CRM Pipeline
            </h1>
            <p className="text-text-secondary">
              Manage 52 qualified deals with real-time pipeline insights and forecasting
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              leftIcon={<ArrowPathIcon className="w-4 h-4" />}
            >
              Sync
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              leftIcon={<FunnelIcon className="w-4 h-4" />}
            >
              Filter
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              leftIcon={<PlusIcon className="w-4 h-4" />}
            >
              New Deal
            </Button>
          </div>
        </div>
      </div>

      {/* Pipeline Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Total Pipeline"
          value="$280k"
          subtitle="52 active deals"
          status="info"
          trend={{
            value: 8,
            isPositive: true,
            label: "vs last month"
          }}
          icon={<ClipboardDocumentListIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Weighted Value"
          value="$185k"
          subtitle="Probability-adjusted"
          status="success"
          trend={{
            value: 15,
            isPositive: true,
            label: "improvement"
          }}
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Win Rate"
          value="68%"
          subtitle="Last 90 days"
          status="success"
          trend={{
            value: 5,
            isPositive: true,
            label: "quarter growth"
          }}
          icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Active Prospects"
          value="28"
          subtitle="In qualification/proposal"
          status="warning"
          icon={<UserGroupIcon className="w-6 h-6" />}
        />
      </div>

      {/* Stage Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Velocity */}
        <div className="bg-background-secondary rounded-lg p-6 border border-border-color">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Pipeline Velocity</h3>
            <ChartBarIcon className="w-5 h-5 text-zealynx-500" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Avg Time to Close</span>
              <span className="text-text-primary font-medium">28 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Qualification → Proposal</span>
              <span className="text-text-primary font-medium">3.2 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Proposal → Negotiation</span>
              <span className="text-text-primary font-medium">8.7 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Negotiation → Closing</span>
              <span className="text-text-primary font-medium">12.1 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Closing → Won</span>
              <span className="text-text-primary font-medium">4.0 days</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-background-secondary rounded-lg p-6 border border-border-color">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
            <Button variant="ghost" size="xs">View All</Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-status-success rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">
                  <span className="font-medium">Harbor Finance</span> moved to Proposal
                </p>
                <p className="text-xs text-text-muted">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-status-info rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">
                  <span className="font-medium">Aurora Labs</span> contract sent for review
                </p>
                <p className="text-xs text-text-muted">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-status-warning rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">
                  <span className="font-medium">Bastion Wallet</span> signature pending
                </p>
                <p className="text-xs text-text-muted">3 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-status-success rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">
                  <span className="font-medium">Monadex Protocol</span> marked as Won
                </p>
                <p className="text-xs text-text-muted">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Kanban Pipeline */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Pipeline Overview</h2>
        <KanbanBoard />
      </div>

      {/* Revenue Forecast */}
      <div className="bg-background-secondary rounded-lg p-6 border border-border-color">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Revenue Forecast</h3>
          <div className="flex gap-2">
            <Button size="xs" variant="ghost">Q1</Button>
            <Button size="xs" variant="primary">Q2</Button>
            <Button size="xs" variant="ghost">Q3</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary mb-1">$142k</div>
            <div className="text-sm text-text-muted">Expected (70%+ probability)</div>
            <div className="text-xs text-status-success mt-1">+18% vs target</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-zealynx-500 mb-1">$95k</div>
            <div className="text-sm text-text-muted">Conservative (90%+ probability)</div>
            <div className="text-xs text-text-primary mt-1">Above min goal</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-status-warning mb-1">$220k</div>
            <div className="text-sm text-text-muted">Best Case (if all close)</div>
            <div className="text-xs text-status-success mt-1">+65% upside</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-text-muted text-sm py-4">
        <p>
          Pipeline data synced with Enreach • Last update: 15 min ago • 
          Next forecast: <span className="text-zealynx-500">Weekly review Monday</span>
        </p>
      </div>
    </div>
  );
}