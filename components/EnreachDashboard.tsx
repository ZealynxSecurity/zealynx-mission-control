'use client';

import { useState, useEffect } from 'react';
import { formatCurrency, formatNumber, formatPercentage, formatTimeAgo } from '@/lib/utils';
import { ENREACH_CONFIG, CURRENT_BUSINESS_METRICS } from '@/lib/constants';
import type { EnreachCampaign, Contact } from '@/types/database';

interface EnreachDashboardProps {
  className?: string;
}

// Mock data representing Carlos's actual Enreach setup
const MOCK_CAMPAIGNS: EnreachCampaign[] = [
  {
    id: '1',
    campaign_name: 'Web3 Audit Outreach Q1',
    agent_name: 'Alessandro',
    platform: 'telegram',
    status: 'active',
    targets_total: 500,
    targets_contacted: 342,
    responses_received: 18,
    leads_qualified: 4,
    conversion_rate: 0.053,
    campaign_data: {
      start_date: new Date('2026-02-01').toISOString(),
      message_template: 'Hi! I\'m reaching out on behalf of Zealynx Security...',
      targeting_criteria: 'Web3 projects with $1M+ funding',
      cost_per_lead: 45.50,
    },
    created_at: new Date('2026-02-01').toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2', 
    campaign_name: 'DeFi Partnership Outreach',
    agent_name: 'Aliza',
    platform: 'linkedin',
    status: 'active',
    targets_total: 300,
    targets_contacted: 198,
    responses_received: 12,
    leads_qualified: 3,
    conversion_rate: 0.061,
    campaign_data: {
      start_date: new Date('2026-01-28').toISOString(),
      message_template: 'Hello! I noticed your work in DeFi and wanted to connect...',
      targeting_criteria: 'DeFi protocol founders and CTOs',
      cost_per_lead: 38.20,
    },
    created_at: new Date('2026-01-28').toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    campaign_name: 'Smart Contract Security Follow-up',
    agent_name: 'Zofia',
    platform: 'email',
    status: 'paused',
    targets_total: 150,
    targets_contacted: 89,
    responses_received: 5,
    leads_qualified: 2,
    conversion_rate: 0.056,
    campaign_data: {
      start_date: new Date('2026-02-05').toISOString(),
      message_template: 'Following up on our previous conversation about audit services...',
      targeting_criteria: 'Previous audit inquiries',
      cost_per_lead: 52.75,
    },
    created_at: new Date('2026-02-05').toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    campaign_name: 'Solana Ecosystem Outreach',
    agent_name: 'Anna', 
    platform: 'telegram',
    status: 'active',
    targets_total: 400,
    targets_contacted: 267,
    responses_received: 21,
    leads_qualified: 6,
    conversion_rate: 0.079,
    campaign_data: {
      start_date: new Date('2026-02-03').toISOString(),
      message_template: 'Hey! Saw your Solana project and would love to discuss security audits...',
      targeting_criteria: 'Solana ecosystem projects',
      cost_per_lead: 41.30,
    },
    created_at: new Date('2026-02-03').toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const MOCK_RECENT_LEADS: Contact[] = [
  {
    id: '1',
    name: 'DeFi Protocol XYZ',
    email: 'cto@defiprotocol.xyz',
    company: 'DeFi Protocol XYZ',
    role: 'CTO',
    telegram_username: '@defi_cto',
    last_interaction: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4h ago
    interaction_count: 5,
    contact_type: 'prospect',
    contact_data: {
      business_value: 9,
      sentiment_score: 0.8,
      communication_frequency: 3,
      preferred_contact_method: 'telegram',
      notes: 'Need Solidity audit for $2M protocol launch. Series A funded.',
    },
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Blockchain Gaming Studio',
    email: 'dev@gamedao.com',
    company: 'GameDAO',
    role: 'Lead Developer',
    linkedin_url: 'linkedin.com/in/gamedev-lead',
    last_interaction: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8h ago
    interaction_count: 3,
    contact_type: 'prospect',
    contact_data: {
      business_value: 7,
      sentiment_score: 0.6,
      communication_frequency: 2,
      preferred_contact_method: 'email',
      notes: 'Interested in NFT marketplace security review. Seed funded.',
    },
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Cross-chain Bridge Protocol',
    email: 'security@bridgeprotocol.io',
    company: 'Bridge Protocol Inc',
    role: 'Security Lead',
    telegram_username: '@bridge_security_lead',
    last_interaction: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12h ago
    interaction_count: 8,
    contact_type: 'prospect',
    contact_data: {
      business_value: 10,
      sentiment_score: 0.9,
      communication_frequency: 4,
      preferred_contact_method: 'telegram',
      notes: 'Critical bridge security audit needed before $10M TVL milestone. Series B funded.',
    },
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function EnreachDashboard({ className = '' }: EnreachDashboardProps) {
  const [campaigns, setCampaigns] = useState<EnreachCampaign[]>(MOCK_CAMPAIGNS);
  const [recentLeads, setRecentLeads] = useState<Contact[]>(MOCK_RECENT_LEADS);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Calculate aggregate metrics
  const totalSent = campaigns.reduce((sum, c) => sum + c.targets_contacted, 0);
  const totalResponses = campaigns.reduce((sum, c) => sum + c.responses_received, 0);
  const totalQualified = campaigns.reduce((sum, c) => sum + c.leads_qualified, 0);
  const avgResponseRate = totalSent > 0 ? totalResponses / totalSent : 0;
  const avgConversionRate = totalResponses > 0 ? totalQualified / totalResponses : 0;
  const avgCostPerLead = campaigns.length > 0 
    ? campaigns.reduce((sum, c) => sum + (c.campaign_data.cost_per_lead || 0), 0) / campaigns.length 
    : 0;

  // Active campaigns
  const activeCampaigns = campaigns.filter(c => c.status === 'active');

  // Agent performance
  const agentStats = ENREACH_CONFIG.agents.map(agent => {
    const agentCampaigns = campaigns.filter(c => c.agent_name === agent.name);
    const agentLeads = agentCampaigns.reduce((sum, c) => sum + c.leads_qualified, 0);
    const agentSent = agentCampaigns.reduce((sum, c) => sum + c.targets_contacted, 0);
    return {
      ...agent,
      campaigns: agentCampaigns.length,
      leads: agentLeads,
      sent: agentSent,
      performance: agentSent > 0 ? agentLeads / agentSent : 0,
    };
  }).sort((a, b) => b.performance - a.performance);

  // Mock refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate slight updates
      setCampaigns(prev => prev.map(campaign => ({
        ...campaign,
        targets_contacted: Math.min(campaign.targets_total, campaign.targets_contacted + Math.floor(Math.random() * 5)),
        responses_received: campaign.responses_received + Math.floor(Math.random() * 2),
      })));
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🚀</span>
            <div>
              <p className="caption">Active Campaigns</p>
              <p className="text-2xl font-semibold" style={{color: '#f1f5f9'}}>
                {formatNumber(activeCampaigns.length)}
              </p>
            </div>
          </div>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            {formatNumber(campaigns.length)} total campaigns
          </p>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📧</span>
            <div>
              <p className="caption">Messages Sent</p>
              <p className="text-2xl font-semibold" style={{color: '#f1f5f9'}}>
                {formatNumber(totalSent)}
              </p>
            </div>
          </div>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            {formatPercentage(avgResponseRate)} response rate
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">✅</span>
            <div>
              <p className="caption">Qualified Leads</p>
              <p className="text-2xl font-semibold text-teal-400">
                {formatNumber(totalQualified)}
              </p>
            </div>
          </div>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            {formatPercentage(avgConversionRate)} conversion rate
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">💰</span>
            <div>
              <p className="caption">Cost Per Lead</p>
              <p className="text-2xl font-semibold text-amber-400">
                {formatCurrency(avgCostPerLead)}
              </p>
            </div>
          </div>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            Below ${ENREACH_CONFIG.success_metrics.cost_per_lead} target
          </p>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="heading-sm mb-2">Campaign Performance</h3>
                <p className="caption">Real-time tracking of outreach campaigns</p>
              </div>
              <div className="flex gap-2">
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value as '7d' | '30d' | '90d')}
                  className="text-sm px-3 py-1 rounded border"
                  style={{
                    background: '#374151',
                    color: '#f3f4f6',
                    borderColor: '#4b5563',
                  }}
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="btn btn-secondary text-xs"
                >
                  {isRefreshing ? '🔄' : '↻'}
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="card">
          <div className="mb-6">
            <h3 className="heading-sm mb-2">Agent Performance</h3>
            <p className="caption">Top performing Enreach agents</p>
          </div>
          
          <div className="space-y-3">
            {agentStats.slice(0, 6).map((agent, index) => (
              <div key={agent.name} className="flex items-center justify-between p-3 rounded-lg" style={{background: 'rgba(30, 41, 59, 0.5)'}}>
                <div>
                  <p className="font-medium" style={{color: '#f1f5f9'}}>{agent.name}</p>
                  <p className="text-xs" style={{color: '#94a3b8'}}>
                    {agent.platform} • {agent.campaigns} campaigns
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-teal-400">
                    {agent.leads} leads
                  </p>
                  <p className="text-xs" style={{color: '#94a3b8'}}>
                    {formatPercentage(agent.performance)} rate
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Qualified Leads */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="heading-sm mb-2">Recent Qualified Leads</h3>
            <p className="caption">High-potential prospects from Enreach campaigns</p>
          </div>
          <button className="btn btn-primary text-xs">
            View All Leads
          </button>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentLeads.map((lead, index) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Sub-components
interface CampaignCardProps {
  campaign: EnreachCampaign;
  delay?: number;
}

function CampaignCard({ campaign, delay = 0 }: CampaignCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'stopped': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPlatformEmoji = (platform: string) => {
    switch (platform) {
      case 'telegram': return '💬';
      case 'linkedin': return '💼';
      case 'email': return '📧';
      default: return '📱';
    }
  };

  const progress = (campaign.targets_contacted / campaign.targets_total) * 100;

  return (
    <div 
      className="p-4 rounded-lg border transition-all hover:shadow-md"
      style={{
        background: 'rgba(30, 41, 59, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        animationDelay: `${delay}ms`
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium truncate" style={{color: '#f1f5f9'}}>
            {campaign.campaign_name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className={`status-indicator text-xs ${getStatusColor(campaign.status)}`}>
              {campaign.status}
            </span>
            <span className="text-xs" style={{color: '#94a3b8'}}>
              {getPlatformEmoji(campaign.platform)} {campaign.agent_name}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-teal-400">
            {campaign.leads_qualified} leads
          </p>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            {formatCurrency(campaign.campaign_data.cost_per_lead || 0)} CPL
          </p>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1" style={{color: '#94a3b8'}}>
          <span>Progress</span>
          <span>{campaign.targets_contacted}/{campaign.targets_total}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-teal-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <p style={{color: '#94a3b8'}}>Responses</p>
          <p className="font-semibold" style={{color: '#f1f5f9'}}>{campaign.responses_received}</p>
        </div>
        <div className="text-center">
          <p style={{color: '#94a3b8'}}>Rate</p>
          <p className="font-semibold text-teal-400">
            {formatPercentage(campaign.conversion_rate)}
          </p>
        </div>
        <div className="text-center">
          <p style={{color: '#94a3b8'}}>Started</p>
          <p className="font-semibold" style={{color: '#f1f5f9'}}>
            {formatTimeAgo(campaign.campaign_data.start_date)}
          </p>
        </div>
      </div>
    </div>
  );
}

interface LeadCardProps {
  lead: Contact;
  delay?: number;
}

function LeadCard({ lead, delay = 0 }: LeadCardProps) {
  const getStatusColor = (contactType: string) => {
    switch (contactType) {
      case 'prospect': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'client': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'partner': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'vendor': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
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
          <h4 className="font-medium truncate" style={{color: '#f1f5f9'}}>
            {lead.name}
          </h4>
          <p className="text-xs truncate" style={{color: '#94a3b8'}}>
            {lead.email}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-teal-400">
            {lead.contact_data.business_value}/10
          </p>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            Value
          </p>
        </div>
      </div>

      <div className="mb-3">
        <span className={`status-indicator text-xs ${getStatusColor(lead.contact_type)}`}>
          {lead.contact_type}
        </span>
        <p className="text-xs mt-2 line-clamp-2" style={{color: '#cbd5e1'}}>
          {lead.contact_data.notes}
        </p>
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        <span
          className="px-2 py-1 text-xs rounded border"
          style={{
            background: '#374151',
            color: '#cbd5e1',
            borderColor: '#4b5563',
          }}
        >
          {lead.contact_data.preferred_contact_method}
        </span>
        <span
          className="px-2 py-1 text-xs rounded border"
          style={{
            background: '#374151',
            color: '#cbd5e1',
            borderColor: '#4b5563',
          }}
        >
          {lead.interaction_count} interactions
        </span>
      </div>

      <p className="text-xs" style={{color: '#94a3b8'}}>
        Last contact {formatTimeAgo(lead.last_interaction)}
      </p>
    </div>
  );
}