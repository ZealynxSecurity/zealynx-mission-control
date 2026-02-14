'use client';

import { StatusCard, Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ChartBarIcon,
  EnvelopeIcon,
  UserGroupIcon,
  CursorArrowRaysIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  ArrowPathIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

// Mock Enreach data
const campaignData = [
  {
    id: '1',
    name: 'Q1 Security Awareness Campaign',
    status: 'active',
    sent: 1247,
    opened: 623,
    clicked: 89,
    replied: 23,
    leads: 12,
    budget: 2500,
    spent: 1850,
    startDate: '2026-01-15',
    endDate: '2026-03-31',
    performance: 'excellent'
  },
  {
    id: '2', 
    name: 'DeFi Protocol Outreach',
    status: 'active',
    sent: 892,
    opened: 378,
    clicked: 45,
    replied: 8,
    leads: 3,
    budget: 1800,
    spent: 1200,
    startDate: '2026-02-01',
    endDate: '2026-04-30',
    performance: 'good'
  },
  {
    id: '3',
    name: 'Web3 Wallet Security Series',
    status: 'paused',
    sent: 456,
    opened: 189,
    clicked: 28,
    replied: 5,
    leads: 2,
    budget: 1200,
    spent: 800,
    startDate: '2026-01-20',
    endDate: '2026-03-15',
    performance: 'needs_attention'
  }
];

// Agent performance data
const agentStats = [
  {
    name: 'Agent Alpha',
    contacts: 2847,
    responses: 234,
    responseRate: 8.2,
    leads: 45,
    status: 'active'
  },
  {
    name: 'Agent Beta',
    contacts: 1923,
    responses: 156,
    responseRate: 8.1,
    leads: 28,
    status: 'active'
  },
  {
    name: 'Agent Gamma',
    contacts: 1654,
    responses: 98,
    responseRate: 5.9,
    leads: 15,
    status: 'needs_optimization'
  }
];

export default function EnreachPage() {
  const totalSent = campaignData.reduce((sum, campaign) => sum + campaign.sent, 0);
  const totalOpened = campaignData.reduce((sum, campaign) => sum + campaign.opened, 0);
  const totalClicked = campaignData.reduce((sum, campaign) => sum + campaign.clicked, 0);
  const totalReplied = campaignData.reduce((sum, campaign) => sum + campaign.replied, 0);
  const totalLeads = campaignData.reduce((sum, campaign) => sum + campaign.leads, 0);
  const totalBudget = campaignData.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalSpent = campaignData.reduce((sum, campaign) => sum + campaign.spent, 0);
  
  const openRate = ((totalOpened / totalSent) * 100).toFixed(1);
  const clickRate = ((totalClicked / totalOpened) * 100).toFixed(1);
  const replyRate = ((totalReplied / totalSent) * 100).toFixed(1);
  const conversionRate = ((totalLeads / totalSent) * 100).toFixed(2);
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient">
              Enreach Analytics
            </h1>
            <p className="text-text-secondary">
              Campaign performance, agent insights, and lead generation analytics across 24 active campaigns
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              leftIcon={<ArrowPathIcon className="w-4 h-4" />}
            >
              Refresh
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              leftIcon={<Cog6ToothIcon className="w-4 h-4" />}
            >
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Total Sent"
          value={totalSent.toLocaleString()}
          subtitle="Across all campaigns"
          status="info"
          trend={{
            value: 12,
            isPositive: true,
            label: "vs last month"
          }}
          icon={<EnvelopeIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Open Rate"
          value={`${openRate}%`}
          subtitle="Industry avg: 21.3%"
          status={parseFloat(openRate) > 21.3 ? "success" : "warning"}
          trend={{
            value: 3.2,
            isPositive: parseFloat(openRate) > 21.3,
            label: "vs benchmark"
          }}
          icon={<EyeIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Click Rate"
          value={`${clickRate}%`}
          subtitle="From opened emails"
          status="success"
          trend={{
            value: 8.5,
            isPositive: true,
            label: "improvement"
          }}
          icon={<CursorArrowRaysIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Leads Generated"
          value={totalLeads.toString()}
          subtitle={`${conversionRate}% conversion rate`}
          status="success"
          icon={<UserGroupIcon className="w-6 h-6" />}
        />
      </div>

      {/* Campaign Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Utilization */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Budget Utilization</h3>
              <ChartBarIcon className="w-5 h-5 text-zealynx-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Total Budget</span>
                <span className="text-text-primary font-medium">${totalBudget.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Spent</span>
                <span className="text-text-primary font-medium">${totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Remaining</span>
                <span className="text-zealynx-500 font-medium">${(totalBudget - totalSpent).toLocaleString()}</span>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Utilization</span>
                  <span className="text-text-primary">{((totalSpent / totalBudget) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background-tertiary rounded-full h-2">
                  <div 
                    className="bg-zealynx-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(totalSpent / totalBudget) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Analytics */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Response Analytics</h3>
              <ArrowTrendingUpIcon className="w-5 h-5 text-status-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">{totalOpened}</div>
                  <div className="text-xs text-text-muted">Opens</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-zealynx-500">{totalClicked}</div>
                  <div className="text-xs text-text-muted">Clicks</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-status-warning">{totalReplied}</div>
                  <div className="text-xs text-text-muted">Replies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-status-success">{totalLeads}</div>
                  <div className="text-xs text-text-muted">Qualified Leads</div>
                </div>
              </div>
              
              <div className="text-center pt-2 border-t border-border-color">
                <div className="text-lg font-semibold text-text-primary">{replyRate}%</div>
                <div className="text-sm text-text-secondary">Overall Reply Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Active Campaigns</h2>
          <Button size="sm" variant="primary">
            New Campaign
          </Button>
        </div>
        
        <div className="space-y-3">
          {campaignData.map((campaign) => {
            const campaignOpenRate = ((campaign.opened / campaign.sent) * 100).toFixed(1);
            const campaignClickRate = ((campaign.clicked / campaign.opened) * 100).toFixed(1);
            const campaignReplyRate = ((campaign.replied / campaign.sent) * 100).toFixed(1);
            
            return (
              <Card key={campaign.id} className="hover:shadow-enterprise-lg transition-all duration-200">
                <CardContent>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Campaign Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-text-primary">{campaign.name}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          campaign.status === 'active' ? 'bg-status-success/20 text-status-success' :
                          campaign.status === 'paused' ? 'bg-status-warning/20 text-status-warning' :
                          'bg-text-muted/20 text-text-muted'
                        }`}>
                          {campaign.status}
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          campaign.performance === 'excellent' ? 'bg-status-success' :
                          campaign.performance === 'good' ? 'bg-status-info' :
                          'bg-status-warning'
                        }`} />
                      </div>
                      <p className="text-sm text-text-secondary mt-1">
                        {campaign.startDate} - {campaign.endDate}
                      </p>
                    </div>
                    
                    {/* Campaign Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-text-primary">{campaign.sent}</div>
                        <div className="text-xs text-text-muted">Sent</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-text-primary">{campaignOpenRate}%</div>
                        <div className="text-xs text-text-muted">Opens</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-zealynx-500">{campaignClickRate}%</div>
                        <div className="text-xs text-text-muted">Clicks</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-status-warning">{campaignReplyRate}%</div>
                        <div className="text-xs text-text-muted">Replies</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-status-success">{campaign.leads}</div>
                        <div className="text-xs text-text-muted">Leads</div>
                      </div>
                    </div>
                    
                    {/* Budget Info */}
                    <div className="text-right">
                      <div className="text-sm font-medium text-text-primary">
                        ${campaign.spent} / ${campaign.budget}
                      </div>
                      <div className="text-xs text-text-muted">
                        {((campaign.spent / campaign.budget) * 100).toFixed(0)}% used
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Agent Performance */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Agent Performance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {agentStats.map((agent, index) => (
            <Card key={agent.name} variant="elevated">
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-text-primary">{agent.name}</h4>
                  <div className={`w-2 h-2 rounded-full ${
                    agent.status === 'active' ? 'bg-status-success' : 'bg-status-warning'
                  }`} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary text-sm">Contacts</span>
                    <span className="text-text-primary font-medium">{agent.contacts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary text-sm">Responses</span>
                    <span className="text-text-primary font-medium">{agent.responses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary text-sm">Response Rate</span>
                    <span className={`font-medium ${
                      agent.responseRate > 8.0 ? 'text-status-success' : 
                      agent.responseRate > 6.0 ? 'text-status-warning' : 'text-status-error'
                    }`}>
                      {agent.responseRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary text-sm">Qualified Leads</span>
                    <span className="text-zealynx-500 font-medium">{agent.leads}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-text-muted text-sm py-4">
        <p>
          Campaign data synced every 30 minutes • Last sync: 12 min ago • 
          Next optimization: <span className="text-zealynx-500">Weekly review Friday</span>
        </p>
      </div>
    </div>
  );
}