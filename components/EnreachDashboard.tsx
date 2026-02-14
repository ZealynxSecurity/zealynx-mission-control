'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Target,
  DollarSign,
  Play,
  Pause,
  Settings,
  BarChart3,
  Eye,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface EnreachDashboardProps {
  className?: string;
}

interface Campaign {
  id: string;
  name: string;
  agentName: string;
  platform: 'telegram' | 'linkedin' | 'email';
  status: 'active' | 'paused' | 'completed' | 'draft';
  targetsTotal: number;
  targetsContacted: number;
  responsesReceived: number;
  leadsQualified: number;
  conversionRate: number;
  costPerLead: number;
  startDate: string;
  messageTemplate: string;
  targetingCriteria: string;
  budget: number;
  spent: number;
}

interface CampaignCardProps extends Campaign {
  onToggleStatus: (id: string) => void;
}

function CampaignCard({ 
  id,
  name, 
  agentName, 
  platform, 
  status, 
  targetsTotal,
  targetsContacted, 
  responsesReceived, 
  leadsQualified, 
  conversionRate, 
  costPerLead,
  startDate,
  budget,
  spent,
  onToggleStatus
}: CampaignCardProps) {
  
  const getPlatformIcon = () => {
    switch (platform) {
      case 'telegram': return '💬';
      case 'linkedin': return '💼';
      case 'email': return '📧';
      default: return '📱';
    }
  };

  const getPlatformColor = () => {
    switch (platform) {
      case 'telegram': return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'linkedin': return 'bg-blue-600/10 border-blue-600/30 text-blue-500';
      case 'email': return 'bg-green-500/10 border-green-500/30 text-green-400';
      default: return 'bg-gray-500/10 border-gray-500/30 text-gray-400';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'bg-[var(--color-success)]/10 border-[var(--color-success)]/30 text-[var(--color-success)]';
      case 'paused': return 'bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30 text-[var(--color-warning)]';
      case 'completed': return 'bg-[var(--color-info)]/10 border-[var(--color-info)]/30 text-[var(--color-info)]';
      case 'draft': return 'bg-[var(--color-text-subtle)]/10 border-[var(--color-text-subtle)]/30 text-[var(--color-text-subtle)]';
      default: return 'bg-[var(--color-text-subtle)]/10 border-[var(--color-text-subtle)]/30 text-[var(--color-text-subtle)]';
    }
  };

  const progressPercentage = (targetsContacted / targetsTotal) * 100;
  const budgetUsed = (spent / budget) * 100;
  const responseRate = (responsesReceived / targetsContacted) * 100 || 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDateAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days ago`;
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{getPlatformIcon()}</div>
          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)]">
              {name}
            </h4>
            <p className="text-sm text-[var(--color-text-muted)]">
              Agent: {agentName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full border ${getPlatformColor()}`}>
            {platform}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor()}`}>
            {status}
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
          <p className="text-xs text-[var(--color-text-subtle)] mb-1">Response Rate</p>
          <p className="text-lg font-bold text-[var(--color-text-primary)]">
            {responseRate.toFixed(1)}%
          </p>
        </div>
        <div className="text-center p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
          <p className="text-xs text-[var(--color-text-subtle)] mb-1">Qualified Leads</p>
          <p className="text-lg font-bold text-[var(--color-primary)]">
            {leadsQualified}
          </p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3 mb-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[var(--color-text-muted)]">Contacted</span>
            <span className="text-[var(--color-text-primary)]">
              {targetsContacted.toLocaleString()} / {targetsTotal.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-[var(--color-bg-tertiary)] rounded-full h-2">
            <div 
              className="bg-[var(--color-primary)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[var(--color-text-muted)]">Budget Used</span>
            <span className="text-[var(--color-text-primary)]">
              {formatCurrency(spent)} / {formatCurrency(budget)}
            </span>
          </div>
          <div className="w-full bg-[var(--color-bg-tertiary)] rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                budgetUsed > 90 ? 'bg-[var(--color-error)]' : 
                budgetUsed > 70 ? 'bg-[var(--color-warning)]' : 
                'bg-[var(--color-success)]'
              }`}
              style={{ width: `${Math.min(budgetUsed, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 text-xs text-center mb-4">
        <div>
          <p className="text-[var(--color-text-subtle)]">Responses</p>
          <p className="font-semibold text-[var(--color-text-primary)]">{responsesReceived}</p>
        </div>
        <div>
          <p className="text-[var(--color-text-subtle)]">Cost/Lead</p>
          <p className="font-semibold text-[var(--color-text-primary)]">${costPerLead.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-[var(--color-text-subtle)]">Started</p>
          <p className="font-semibold text-[var(--color-text-primary)]">{formatDateAgo(startDate)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-[var(--color-border-primary)] pt-3">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onToggleStatus(id)}
            className="btn btn-ghost btn-sm"
          >
            {status === 'active' ? <Pause size={14} /> : <Play size={14} />}
            {status === 'active' ? 'Pause' : 'Start'}
          </button>
          <button className="btn btn-ghost btn-sm">
            <Eye size={14} />
            View
          </button>
        </div>
        <button className="btn btn-ghost btn-sm">
          <Settings size={14} />
        </button>
      </div>
    </div>
  );
}

interface AgentStatsProps {
  name: string;
  activeCampaigns: number;
  totalContacts: number;
  responseRate: number;
  leadsGenerated: number;
  color: string;
}

function AgentStats({ name, activeCampaigns, totalContacts, responseRate, leadsGenerated, color }: AgentStatsProps) {
  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-${color}-500 to-${color}-600 flex items-center justify-center`}>
          <span className="text-white font-semibold text-sm">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-[var(--color-text-primary)]">{name}</h4>
          <p className="text-xs text-[var(--color-text-muted)]">{activeCampaigns} active campaigns</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[var(--color-text-subtle)]">Total Contacts:</span>
          <span className="font-semibold text-[var(--color-text-primary)]">{totalContacts.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-text-subtle)]">Response Rate:</span>
          <span className={`font-semibold ${
            responseRate >= 15 ? 'text-[var(--color-success)]' :
            responseRate >= 10 ? 'text-[var(--color-warning)]' :
            'text-[var(--color-error)]'
          }`}>
            {responseRate.toFixed(1)}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-text-subtle)]">Leads Generated:</span>
          <span className="font-semibold text-[var(--color-primary)]">{leadsGenerated}</span>
        </div>
      </div>
    </div>
  );
}

export function EnreachDashboard({ className = '' }: EnreachDashboardProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Mock data - in real app this would come from Enreach API
  useEffect(() => {
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'Web3 Audit Outreach Q1',
        agentName: 'Alessandro',
        platform: 'telegram',
        status: 'active',
        targetsTotal: 500,
        targetsContacted: 342,
        responsesReceived: 18,
        leadsQualified: 4,
        conversionRate: 0.053,
        costPerLead: 45.50,
        startDate: new Date('2026-02-01').toISOString(),
        messageTemplate: 'Hi! I\'m reaching out on behalf of Zealynx Security...',
        targetingCriteria: 'Web3 projects with $1M+ funding',
        budget: 2000,
        spent: 1560
      },
      {
        id: '2',
        name: 'DeFi Partnership Outreach',
        agentName: 'Aliza',
        platform: 'linkedin',
        status: 'active',
        targetsTotal: 300,
        targetsContacted: 198,
        responsesReceived: 12,
        leadsQualified: 3,
        conversionRate: 0.061,
        costPerLead: 38.20,
        startDate: new Date('2026-01-28').toISOString(),
        messageTemplate: 'Hello! I noticed your work in DeFi...',
        targetingCriteria: 'DeFi protocol founders and CTOs',
        budget: 1500,
        spent: 756
      },
      {
        id: '3',
        name: 'Smart Contract Dev Outreach',
        agentName: 'Marco',
        platform: 'email',
        status: 'paused',
        targetsTotal: 750,
        targetsContacted: 425,
        responsesReceived: 31,
        leadsQualified: 7,
        conversionRate: 0.073,
        costPerLead: 42.85,
        startDate: new Date('2026-01-20').toISOString(),
        messageTemplate: 'Dear developer, I hope this email finds you well...',
        targetingCriteria: 'Smart contract developers with GitHub activity',
        budget: 3000,
        spent: 1821
      },
    ];
    
    setCampaigns(mockCampaigns);
  }, []);

  const handleToggleStatus = (campaignId: string) => {
    setCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === campaignId
          ? { 
              ...campaign, 
              status: campaign.status === 'active' ? 'paused' : 'active' as Campaign['status']
            }
          : campaign
      )
    );
  };

  // Calculate aggregated statistics
  const totalTargets = campaigns.reduce((sum, c) => sum + c.targetsTotal, 0);
  const totalContacted = campaigns.reduce((sum, c) => sum + c.targetsContacted, 0);
  const totalResponses = campaigns.reduce((sum, c) => sum + c.responsesReceived, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leadsQualified, 0);
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);

  const avgResponseRate = totalContacted > 0 ? (totalResponses / totalContacted) * 100 : 0;
  const avgCostPerLead = totalLeads > 0 ? totalSpent / totalLeads : 0;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;

  // Agent statistics
  const agentStats = [
    {
      name: 'Alessandro',
      activeCampaigns: campaigns.filter(c => c.agentName === 'Alessandro' && c.status === 'active').length,
      totalContacts: campaigns.filter(c => c.agentName === 'Alessandro').reduce((sum, c) => sum + c.targetsContacted, 0),
      responseRate: 12.4,
      leadsGenerated: campaigns.filter(c => c.agentName === 'Alessandro').reduce((sum, c) => sum + c.leadsQualified, 0),
      color: 'blue'
    },
    {
      name: 'Aliza',
      activeCampaigns: campaigns.filter(c => c.agentName === 'Aliza' && c.status === 'active').length,
      totalContacts: campaigns.filter(c => c.agentName === 'Aliza').reduce((sum, c) => sum + c.targetsContacted, 0),
      responseRate: 8.7,
      leadsGenerated: campaigns.filter(c => c.agentName === 'Aliza').reduce((sum, c) => sum + c.leadsQualified, 0),
      color: 'purple'
    },
    {
      name: 'Marco',
      activeCampaigns: campaigns.filter(c => c.agentName === 'Marco' && c.status === 'active').length,
      totalContacts: campaigns.filter(c => c.agentName === 'Marco').reduce((sum, c) => sum + c.targetsContacted, 0),
      responseRate: 15.2,
      leadsGenerated: campaigns.filter(c => c.agentName === 'Marco').reduce((sum, c) => sum + c.leadsQualified, 0),
      color: 'green'
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

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
              <Target size={20} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Total Contacted</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {totalContacted.toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            {activeCampaigns} active campaigns
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-success)]/10 border border-[var(--color-success)]/20">
              <MessageSquare size={20} className="text-[var(--color-success)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Response Rate</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {avgResponseRate.toFixed(1)}%
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            {totalResponses} total responses
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/20">
              <Users size={20} className="text-[var(--color-warning)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Qualified Leads</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {totalLeads}
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            High-quality prospects
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-info)]/10 border border-[var(--color-info)]/20">
              <DollarSign size={20} className="text-[var(--color-info)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Cost Per Lead</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                ${avgCostPerLead.toFixed(0)}
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            {formatCurrency(totalSpent)} spent total
          </p>
        </div>
      </div>

      {/* Agent Performance */}
      <div className="grid gap-4 sm:grid-cols-3">
        {agentStats.map((agent) => (
          <AgentStats key={agent.name} {...agent} />
        ))}
      </div>

      {/* Campaign Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="heading-sm">Active Campaigns</h3>
          <div className="flex items-center gap-2">
            <button className="btn btn-secondary btn-sm">
              <BarChart3 size={14} />
              Analytics
            </button>
            <button className="btn btn-primary btn-sm">
              <Target size={14} />
              New Campaign
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              {...campaign}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>

        {campaigns.length === 0 && (
          <div className="card text-center py-12">
            <Target size={48} className="mx-auto text-[var(--color-text-subtle)] mb-4" />
            <h4 className="heading-sm mb-2">No campaigns yet</h4>
            <p className="text-[var(--color-text-muted)] mb-4">
              Create your first Enreach campaign to start generating leads
            </p>
            <button className="btn btn-primary">
              <Target size={16} />
              Create Campaign
            </button>
          </div>
        )}
      </div>
    </div>
  );
}