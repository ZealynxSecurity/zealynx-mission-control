'use client';

import { useState, useEffect } from 'react';
import { 
  DollarSign,
  Calendar,
  User,
  Mail,
  Phone,
  ExternalLink,
  MoreVertical,
  Plus,
  TrendingUp,
  Clock,
  Target,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface CrmDashboardProps {
  className?: string;
}

interface Deal {
  id: string;
  title: string;
  stage: 'prospects' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  probability: number;
  contactName: string;
  contactEmail: string;
  lastContact: string;
  source: string;
  auditType: string;
  timelineWeeks: number;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
}

interface DealCardProps extends Deal {
  onDragStart: (e: React.DragEvent, dealId: string) => void;
}

function DealCard({ 
  id,
  title, 
  value, 
  probability, 
  contactName, 
  contactEmail, 
  lastContact,
  source,
  auditType,
  timelineWeeks,
  description,
  urgency,
  onDragStart
}: DealCardProps) {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'border-l-[var(--color-error)]';
      case 'high': return 'border-l-[var(--color-warning)]';
      case 'medium': return 'border-l-[var(--color-info)]';
      default: return 'border-l-[var(--color-text-subtle)]';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div 
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      className={`card cursor-move hover:shadow-lg transition-all duration-200 border-l-4 ${getUrgencyColor(urgency)}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-[var(--color-text-primary)] leading-tight">
          {title}
        </h4>
        <button className="p-1 text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] rounded">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[var(--color-primary)]">
            {formatCurrency(value)}
          </span>
          <span className="text-sm text-[var(--color-text-muted)]">
            {(probability * 100).toFixed(0)}% likely
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] rounded-full">
            {auditType}
          </span>
          <span className="text-xs px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
            {timelineWeeks}w timeline
          </span>
        </div>

        <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">
          {description}
        </p>
      </div>

      <div className="border-t border-[var(--color-border-primary)] pt-3 space-y-2">
        <div className="flex items-center gap-2">
          <User size={14} className="text-[var(--color-text-subtle)]" />
          <span className="text-sm text-[var(--color-text-primary)]">{contactName}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Mail size={14} className="text-[var(--color-text-subtle)]" />
          <span className="text-xs text-[var(--color-text-muted)] truncate">{contactEmail}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-[var(--color-text-subtle)]" />
            <span className="text-xs text-[var(--color-text-muted)]">
              {formatTimeAgo(lastContact)}
            </span>
          </div>
          <span className="text-xs px-2 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-subtle)] rounded-full">
            {source}
          </span>
        </div>
      </div>
    </div>
  );
}

interface StageColumnProps {
  title: string;
  stage: string;
  deals: Deal[];
  totalValue: number;
  count: number;
  color: string;
  onDrop: (e: React.DragEvent, targetStage: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, dealId: string) => void;
}

function StageColumn({ 
  title, 
  stage, 
  deals, 
  totalValue, 
  count, 
  color,
  onDrop,
  onDragOver,
  onDragStart
}: StageColumnProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
    }).format(amount);
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`p-4 rounded-lg mb-4 bg-gradient-to-br from-${color}-500/10 to-${color}-600/10 border border-${color}-500/20`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-[var(--color-text-primary)]">
            {title}
          </h3>
          <span className={`text-xs px-2 py-1 bg-${color}-500/20 text-${color}-400 rounded-full font-medium`}>
            {count}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--color-text-muted)]">
            Total Value
          </span>
          <span className={`font-bold text-${color}-400`}>
            {formatCurrency(totalValue)}
          </span>
        </div>
      </div>

      <div 
        className="flex-1 min-h-[400px] p-2 rounded-lg border-2 border-dashed border-[var(--color-border-primary)] hover:border-[var(--color-primary)]/50 transition-colors"
        onDrop={(e) => onDrop(e, stage)}
        onDragOver={onDragOver}
      >
        <div className="space-y-3">
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              {...deal}
              onDragStart={onDragStart}
            />
          ))}
          
          <button className="w-full p-4 border-2 border-dashed border-[var(--color-border-primary)] rounded-lg text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)]/50 transition-colors">
            <Plus size={20} className="mx-auto mb-2" />
            <span className="text-sm">Add Deal</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function CrmDashboard({ className = '' }: CrmDashboardProps) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null);

  // Mock data - in real app this would come from your CRM system
  useEffect(() => {
    const mockDeals: Deal[] = [
      {
        id: '1',
        title: 'Lido Finance V2 Audit',
        stage: 'negotiation',
        value: 25000,
        probability: 0.85,
        contactName: 'Elena Kozlova',
        contactEmail: 'elena@lido.fi',
        lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'referral',
        auditType: 'Smart Contract',
        timelineWeeks: 4,
        description: 'Comprehensive audit of Lido V2 staking protocol before mainnet launch',
        urgency: 'high'
      },
      {
        id: '2',
        title: 'DeFi Yield Protocol',
        stage: 'proposal',
        value: 18000,
        probability: 0.6,
        contactName: 'Michael Chen',
        contactEmail: 'michael@defiyield.com',
        lastContact: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'enreach',
        auditType: 'DeFi Protocol',
        timelineWeeks: 3,
        description: 'Security review of yield farming contracts and tokenomics',
        urgency: 'medium'
      },
      {
        id: '3',
        title: 'Harbor Finance',
        stage: 'qualification',
        value: 22000,
        probability: 0.7,
        contactName: 'Sarah Johnson',
        contactEmail: 'sarah@harbor.finance',
        lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'telegram',
        auditType: 'Sway Audit',
        timelineWeeks: 5,
        description: 'Fuel network protocol audit for upcoming launch',
        urgency: 'urgent'
      },
      {
        id: '4',
        title: 'CrossChain Bridge',
        stage: 'prospects',
        value: 35000,
        probability: 0.4,
        contactName: 'Alex Kumar',
        contactEmail: 'alex@crosschain.io',
        lastContact: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'website',
        auditType: 'Bridge Protocol',
        timelineWeeks: 6,
        description: 'Multi-chain bridge security assessment',
        urgency: 'low'
      },
      {
        id: '5',
        title: 'Monadex DEX',
        stage: 'closed-won',
        value: 28000,
        probability: 1.0,
        contactName: 'Ryan Foster',
        contactEmail: 'ryan@monadex.com',
        lastContact: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'referral',
        auditType: 'DEX Protocol',
        timelineWeeks: 4,
        description: 'Completed security audit of Monad-based DEX',
        urgency: 'low'
      },
    ];
    
    setDeals(mockDeals);
  }, []);

  const stages = [
    { key: 'prospects', title: 'Prospects', color: 'slate' },
    { key: 'qualification', title: 'Qualification', color: 'blue' },
    { key: 'proposal', title: 'Proposal', color: 'yellow' },
    { key: 'negotiation', title: 'Negotiation', color: 'orange' },
    { key: 'closed-won', title: 'Closed Won', color: 'green' },
    { key: 'closed-lost', title: 'Closed Lost', color: 'red' },
  ];

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    setDraggedDeal(dealId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    
    if (!draggedDeal) return;
    
    setDeals(prevDeals => 
      prevDeals.map(deal => 
        deal.id === draggedDeal 
          ? { ...deal, stage: targetStage as Deal['stage'] }
          : deal
      )
    );
    
    setDraggedDeal(null);
  };

  const getStageData = (stageKey: string) => {
    const stageDeals = deals.filter(deal => deal.stage === stageKey);
    const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
    return {
      deals: stageDeals,
      count: stageDeals.length,
      totalValue
    };
  };

  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedPipelineValue = deals.reduce((sum, deal) => sum + (deal.value * deal.probability), 0);
  const activeDealsCount = deals.filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage)).length;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Pipeline Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
              <Target size={20} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Total Pipeline</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                ${(totalPipelineValue / 1000).toFixed(0)}k
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Across all stages
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-success)]/10 border border-[var(--color-success)]/20">
              <TrendingUp size={20} className="text-[var(--color-success)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Weighted Value</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                ${(weightedPipelineValue / 1000).toFixed(0)}k
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Probability adjusted
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-info)]/10 border border-[var(--color-info)]/20">
              <Clock size={20} className="text-[var(--color-info)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Active Deals</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {activeDealsCount}
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            In progress
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/20">
              <AlertCircle size={20} className="text-[var(--color-warning)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Urgent Deals</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {deals.filter(d => d.urgency === 'urgent').length}
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Need attention
          </p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="heading-sm">Pipeline Board</h3>
          <div className="flex items-center gap-2">
            <button className="btn btn-secondary btn-sm">
              Filter
            </button>
            <button className="btn btn-primary btn-sm">
              <Plus size={14} />
              New Deal
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 min-h-[600px]">
          {stages.map((stage) => {
            const stageData = getStageData(stage.key);
            return (
              <StageColumn
                key={stage.key}
                title={stage.title}
                stage={stage.key}
                color={stage.color}
                {...stageData}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}