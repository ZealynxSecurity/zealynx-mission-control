'use client';

import { useState, useEffect } from 'react';
import { formatCurrency, formatNumber, formatPercentage, formatTimeAgo } from '@/lib/utils';
import { CRM_CONFIG, CURRENT_BUSINESS_METRICS } from '@/lib/constants';
import type { Deal, Task } from '@/types/database';

interface CrmDashboardProps {
  className?: string;
}

// Mock deals representing Carlos's actual pipeline
const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    title: 'Lido Finance V2 Audit',
    stage: 'negotiation',
    value: 25000,
    probability: 0.85,
    description: 'Comprehensive audit of Lido V2 staking protocol before mainnet launch',
    contact_name: 'Elena Kozlova',
    contact_email: 'elena@lido.fi',
    last_contact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    source: 'referral',
    deal_data: {
      audit_type: 'smart-contract',
      timeline_weeks: 4,
      complexity_score: 9,
      contract_signed: false,
      payment_terms: '50% upfront, 50% on completion',
    },
    created_at: new Date('2026-01-15').toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'DeFi Yield Farming Protocol',
    stage: 'proposal',
    value: 18000,
    probability: 0.6,
    description: 'Security review of yield farming contracts and tokenomics',
    contact_name: 'Michael Chen',
    contact_email: 'michael@defiyield.com',
    last_contact: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    source: 'enreach',
    deal_data: {
      audit_type: 'defi-protocol',
      timeline_weeks: 3,
      complexity_score: 7,
      contract_signed: false,
      payment_terms: 'Net 30',
    },
    created_at: new Date('2026-02-01').toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'NFT Marketplace Security Audit',
    stage: 'closed-won',
    value: 12000,
    probability: 1.0,
    description: 'Complete security audit of NFT marketplace smart contracts',
    contact_name: 'Sarah Johnson',
    contact_email: 'sarah@nftmarket.io',
    last_contact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    source: 'telegram',
    deal_data: {
      audit_type: 'nft',
      timeline_weeks: 2,
      complexity_score: 5,
      contract_signed: true,
      payment_terms: '100% upfront',
    },
    created_at: new Date('2026-01-20').toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Cross-chain Bridge Security Review',
    stage: 'qualification',
    value: 35000,
    probability: 0.4,
    description: 'Critical security audit for multi-chain bridge protocol',
    contact_name: 'Alex Petrov',
    contact_email: 'alex@bridgeprotocol.xyz',
    last_contact: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    source: 'partnership',
    deal_data: {
      audit_type: 'bridge',
      timeline_weeks: 6,
      complexity_score: 10,
      contract_signed: false,
      payment_terms: '40% upfront, 40% milestone, 20% completion',
    },
    created_at: new Date('2026-02-10').toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'GameFi Protocol Audit',
    stage: 'prospects',
    value: 8000,
    probability: 0.2,
    description: 'Security review of gaming token economy and smart contracts',
    contact_name: 'David Kim',
    contact_email: 'david@gamefi.gg',
    last_contact: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    source: 'twitter',
    deal_data: {
      audit_type: 'gamefi',
      timeline_weeks: 2,
      complexity_score: 6,
      contract_signed: false,
      payment_terms: 'TBD',
    },
    created_at: new Date('2026-02-05').toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock tasks related to deals
const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Send Lido proposal revision',
    description: 'Update proposal with timeline adjustments per client feedback',
    type: 'proposal',
    status: 'pending',
    priority: 'high',
    assigned_to: 'carlos',
    due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days
    related_deal_id: '1',
    task_data: {
      estimated_hours: 2,
      progress_notes: 'Client requested 3-week timeline instead of 4 weeks',
    },
    created_at: new Date('2026-02-12').toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2', 
    title: 'Follow up on DeFi Yield response',
    description: 'Client has been silent for 5 days, send follow-up',
    type: 'follow-up',
    status: 'pending',
    priority: 'medium',
    assigned_to: 'carlos',
    due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // tomorrow
    related_deal_id: '2',
    task_data: {
      estimated_hours: 0.5,
      progress_notes: 'Sent initial proposal 5 days ago',
    },
    created_at: new Date('2026-02-13').toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Schedule NFT Marketplace kick-off call',
    description: 'Coordinate with client team for project initiation',
    type: 'meeting',
    status: 'in-progress',
    priority: 'high',
    assigned_to: 'carlos',
    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
    related_deal_id: '3',
    task_data: {
      estimated_hours: 1,
      progress_notes: 'Sent calendar invite, waiting for confirmation',
    },
    created_at: new Date('2026-02-14').toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function CrmDashboard({ className = '' }: CrmDashboardProps) {
  const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'value' | 'probability' | 'date'>('value');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter deals by stage
  const filteredDeals = selectedStage === 'all' 
    ? deals 
    : deals.filter(deal => deal.stage === selectedStage);

  // Sort deals
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (sortBy) {
      case 'value':
        return (b.value || 0) - (a.value || 0);
      case 'probability':
        return b.probability - a.probability;
      case 'date':
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      default:
        return 0;
    }
  });

  // Calculate pipeline metrics
  const totalPipelineValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0);
  const weightedValue = deals.reduce((sum, deal) => sum + (deal.value || 0) * deal.probability, 0);
  const avgDealSize = deals.length > 0 ? totalPipelineValue / deals.length : 0;
  const avgProbability = deals.length > 0 ? deals.reduce((sum, deal) => sum + deal.probability, 0) / deals.length : 0;

  // Stage distribution
  const stageStats = CRM_CONFIG.deal_stages.map(stage => {
    const stageDeals = deals.filter(d => d.stage === stage.key);
    const stageValue = stageDeals.reduce((sum, d) => sum + (d.value || 0), 0);
    return {
      ...stage,
      count: stageDeals.length,
      value: stageValue,
      deals: stageDeals,
    };
  });

  // Overdue tasks
  const overdueTasks = tasks.filter(task => 
    task.due_date && new Date(task.due_date) < new Date() && task.status !== 'completed'
  );

  // Upcoming tasks (next 7 days)
  const upcomingTasks = tasks.filter(task => {
    if (!task.due_date || task.status === 'completed') return false;
    const dueDate = new Date(task.due_date);
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return dueDate >= now && dueDate <= weekFromNow;
  });

  // Mock autonomous actions
  const autonomousActions = [
    {
      type: 'auto-follow-up',
      description: 'Sent follow-up email to DeFi Yield (5 days since last contact)',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
      dealId: '2',
    },
    {
      type: 'stage-progression',
      description: 'Moved NFT Marketplace to closed-won (contract signed)',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6h ago
      dealId: '3',
    },
    {
      type: 'task-creation',
      description: 'Created reminder task for Cross-chain Bridge proposal deadline',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12h ago
      dealId: '4',
    },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Pipeline Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">💰</span>
            <div>
              <p className="caption">Total Pipeline</p>
              <p className="text-2xl font-semibold" style={{color: '#f1f5f9'}}>
                {formatCurrency(totalPipelineValue)}
              </p>
            </div>
          </div>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            {formatNumber(deals.length)} active deals
          </p>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📈</span>
            <div>
              <p className="caption">Weighted Value</p>
              <p className="text-2xl font-semibold text-teal-400">
                {formatCurrency(weightedValue)}
              </p>
            </div>
          </div>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            Probability-adjusted revenue
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📊</span>
            <div>
              <p className="caption">Avg Deal Size</p>
              <p className="text-2xl font-semibold text-amber-400">
                {formatCurrency(avgDealSize)}
              </p>
            </div>
          </div>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            {formatPercentage(avgProbability)} avg probability
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⏰</span>
            <div>
              <p className="caption">Tasks Due</p>
              <p className="text-2xl font-semibold text-red-400">
                {overdueTasks.length}
              </p>
            </div>
          </div>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            {upcomingTasks.length} upcoming this week
          </p>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="card">
        <div className="mb-6">
          <h3 className="heading-sm mb-2">Pipeline Stages</h3>
          <p className="caption">Deal progression through qualification to closing</p>
        </div>
        
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {stageStats.map((stage, index) => (
            <button
              key={stage.key}
              onClick={() => setSelectedStage(stage.key)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedStage === stage.key
                  ? 'border-teal-500 bg-teal-500/10'
                  : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
              }`}
            >
              <div className="text-center">
                <p className="text-2xl font-bold" style={{color: '#f1f5f9'}}>
                  {stage.count}
                </p>
                <p className="text-xs mb-2" style={{color: '#94a3b8'}}>
                  {stage.label}
                </p>
                <p className="text-xs font-semibold text-teal-400">
                  {formatCurrency(stage.value)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Deal Management */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Deals List */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="heading-sm mb-2">
                  {selectedStage === 'all' ? 'All Deals' : 
                   stageStats.find(s => s.key === selectedStage)?.label || 'Deals'} 
                  ({sortedDeals.length})
                </h3>
                <p className="caption">Manage your sales pipeline and track progress</p>
              </div>
              <div className="flex gap-2">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'value' | 'probability' | 'date')}
                  className="text-sm px-3 py-1 rounded border"
                  style={{
                    background: '#374151',
                    color: '#f3f4f6',
                    borderColor: '#4b5563',
                  }}
                >
                  <option value="value">Sort by Value</option>
                  <option value="probability">Sort by Probability</option>
                  <option value="date">Sort by Date</option>
                </select>
                <button
                  onClick={() => setSelectedStage('all')}
                  className="btn btn-secondary text-xs"
                >
                  Show All
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {sortedDeals.map((deal, index) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  delay={index * 100}
                />
              ))}
              
              {sortedDeals.length === 0 && (
                <div className="text-center py-12">
                  <span className="text-4xl mb-4 block">📭</span>
                  <h4 className="heading-sm mb-2">No deals found</h4>
                  <p style={{color: '#94a3b8'}}>
                    {selectedStage === 'all' 
                      ? 'No deals in your pipeline yet'
                      : `No deals in ${stageStats.find(s => s.key === selectedStage)?.label} stage`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tasks & Actions Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <div className="card">
            <div className="mb-4">
              <h4 className="heading-sm mb-2">Upcoming Tasks</h4>
              <p className="caption">Due in the next 7 days</p>
            </div>
            
            <div className="space-y-3">
              {upcomingTasks.slice(0, 5).map(task => (
                <div key={task.id} className="p-3 rounded-lg" style={{background: 'rgba(30, 41, 59, 0.5)'}}>
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-sm" style={{color: '#f1f5f9'}}>
                      {task.title}
                    </h5>
                    <span className={`status-indicator text-xs ${
                      task.priority === 'high' 
                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                        : task.priority === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{color: '#cbd5e1'}}>
                    {task.description}
                  </p>
                  <p className="text-xs" style={{color: '#94a3b8'}}>
                    Due: {formatTimeAgo(task.due_date!)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Autonomous Actions */}
          <div className="card">
            <div className="mb-4">
              <h4 className="heading-sm mb-2">Autonomous Actions</h4>
              <p className="caption">AI-powered pipeline management</p>
            </div>
            
            <div className="space-y-3">
              {autonomousActions.map((action, index) => (
                <div key={index} className="p-3 rounded-lg border-l-2 border-teal-500" style={{background: 'rgba(30, 41, 59, 0.3)'}}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-teal-400 text-sm">🤖</span>
                    <div className="flex-1">
                      <p className="text-xs font-medium" style={{color: '#f1f5f9'}}>
                        {action.type.replace('-', ' ').toUpperCase()}
                      </p>
                      <p className="text-xs mt-1" style={{color: '#cbd5e1'}}>
                        {action.description}
                      </p>
                      <p className="text-xs mt-1" style={{color: '#94a3b8'}}>
                        {formatTimeAgo(action.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components
interface DealCardProps {
  deal: Deal;
  delay?: number;
}

function DealCard({ deal, delay = 0 }: DealCardProps) {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospects': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'qualification': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'proposal': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'negotiation': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'closed-won': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed-lost': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 0.8) return 'text-green-400';
    if (probability >= 0.6) return 'text-teal-400';
    if (probability >= 0.4) return 'text-yellow-400';
    if (probability >= 0.2) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div 
      className="p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer"
      style={{
        background: 'rgba(30, 41, 59, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        animationDelay: `${delay}ms`
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium truncate mb-1" style={{color: '#f1f5f9'}}>
            {deal.title}
          </h4>
          <p className="text-xs mb-2 line-clamp-2" style={{color: '#cbd5e1'}}>
            {deal.description}
          </p>
          <div className="flex items-center gap-2">
            <span className={`status-indicator text-xs ${getStageColor(deal.stage)}`}>
              {deal.stage.replace('-', ' ')}
            </span>
            <span className="text-xs" style={{color: '#94a3b8'}}>
              {deal.deal_data.audit_type}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold" style={{color: '#f1f5f9'}}>
            {formatCurrency(deal.value || 0)}
          </p>
          <p className={`text-sm font-medium ${getProbabilityColor(deal.probability)}`}>
            {formatPercentage(deal.probability)} chance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-xs" style={{color: '#94a3b8'}}>Contact</p>
          <p className="text-sm font-medium" style={{color: '#f1f5f9'}}>
            {deal.contact_name}
          </p>
        </div>
        <div>
          <p className="text-xs" style={{color: '#94a3b8'}}>Timeline</p>
          <p className="text-sm font-medium" style={{color: '#f1f5f9'}}>
            {deal.deal_data.timeline_weeks} weeks
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span style={{color: '#94a3b8'}}>
          Last contact: {formatTimeAgo(deal.last_contact!)}
        </span>
        <span className="px-2 py-1 rounded border" style={{
          background: '#374151',
          color: '#cbd5e1',
          borderColor: '#4b5563',
        }}>
          {deal.source}
        </span>
      </div>
    </div>
  );
}