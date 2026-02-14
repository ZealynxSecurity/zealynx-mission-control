'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from './Card';
import { Button } from './Button';
import { 
  PlusIcon,
  EllipsisVerticalIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserIcon,
  BuildingOfficeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Mock CRM data
interface Deal {
  id: string;
  title: string;
  company: string;
  contact: string;
  value: number;
  probability: number;
  stage: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  lastActivity: string;
  nextAction: string;
  tags: string[];
  avatar?: string;
}

const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Smart Contract Security Audit',
    company: 'Harbor Finance',
    contact: 'Sarah Chen',
    value: 25000,
    probability: 80,
    stage: 'proposal',
    priority: 'urgent',
    lastActivity: '2h ago',
    nextAction: 'Follow up on Sway audit capacity',
    tags: ['Sway', 'DeFi', 'Launch'],
    avatar: undefined
  },
  {
    id: '2',
    title: 'Comprehensive Protocol Audit',
    company: 'Aurora Labs',
    contact: 'Marcus Webb',
    value: 45000,
    probability: 65,
    stage: 'negotiation',
    priority: 'high',
    lastActivity: '1d ago',
    nextAction: 'Schedule technical discussion',
    tags: ['Solidity', 'Layer2', 'Bridge'],
    avatar: undefined
  },
  {
    id: '3',
    title: 'Multi-Chain Wallet Security',
    company: 'Bastion Wallet',
    contact: 'Alex Rodriguez',
    value: 35000,
    probability: 90,
    stage: 'closing',
    priority: 'high',
    lastActivity: '3h ago',
    nextAction: 'Contract signature pending',
    tags: ['Mobile', 'Multi-chain', 'Wallet'],
    avatar: undefined
  },
  {
    id: '4',
    title: 'Token Economics Review',
    company: 'Monadex Protocol',
    contact: 'Lisa Park',
    value: 15000,
    probability: 95,
    stage: 'won',
    priority: 'medium',
    lastActivity: 'Yesterday',
    nextAction: 'Payment confirmation',
    tags: ['Tokenomics', 'AMM', 'Completed'],
    avatar: undefined
  },
  {
    id: '5',
    title: 'NFT Marketplace Security',
    company: 'Artisan Markets',
    contact: 'David Kim',
    value: 20000,
    probability: 30,
    stage: 'qualification',
    priority: 'low',
    lastActivity: '3d ago',
    nextAction: 'Send initial proposal',
    tags: ['NFT', 'Marketplace', 'Early-stage'],
    avatar: undefined
  }
];

// Pipeline stages configuration
const stages = [
  {
    id: 'qualification',
    title: 'Qualification',
    color: 'bg-text-muted',
    deals: mockDeals.filter(deal => deal.stage === 'qualification')
  },
  {
    id: 'proposal',
    title: 'Proposal',
    color: 'bg-status-info',
    deals: mockDeals.filter(deal => deal.stage === 'proposal')
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    color: 'bg-status-warning',
    deals: mockDeals.filter(deal => deal.stage === 'negotiation')
  },
  {
    id: 'closing',
    title: 'Closing',
    color: 'bg-zealynx-500',
    deals: mockDeals.filter(deal => deal.stage === 'closing')
  },
  {
    id: 'won',
    title: 'Won',
    color: 'bg-status-success',
    deals: mockDeals.filter(deal => deal.stage === 'won')
  }
];

// Priority colors
const priorityColors = {
  low: 'border-l-text-muted',
  medium: 'border-l-status-info',
  high: 'border-l-status-warning',
  urgent: 'border-l-status-error',
};

const priorityIcons = {
  low: CheckCircleIcon,
  medium: ClockIcon,
  high: ExclamationTriangleIcon,
  urgent: ExclamationTriangleIcon,
};

// Deal Card Component
interface DealCardProps {
  deal: Deal;
  onEdit?: (deal: Deal) => void;
  onMove?: (deal: Deal, newStage: string) => void;
}

function DealCard({ deal, onEdit, onMove }: DealCardProps) {
  const PriorityIcon = priorityIcons[deal.priority];
  
  return (
    <Card 
      className={`border-l-4 ${priorityColors[deal.priority]} hover:shadow-enterprise-lg transition-all duration-200 cursor-pointer`}
      onClick={() => onEdit?.(deal)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-text-primary text-sm truncate">
              {deal.title}
            </h4>
            <p className="text-xs text-text-secondary flex items-center mt-1">
              <BuildingOfficeIcon className="w-3 h-3 mr-1" />
              {deal.company}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <PriorityIcon className={`w-3 h-3 ${
              deal.priority === 'urgent' ? 'text-status-error' :
              deal.priority === 'high' ? 'text-status-warning' :
              deal.priority === 'medium' ? 'text-status-info' : 'text-text-muted'
            }`} />
            <button className="p-1 hover:bg-background-hover rounded">
              <EllipsisVerticalIcon className="w-3 h-3 text-text-muted" />
            </button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent padding="sm">
        <div className="space-y-3">
          {/* Value and Probability */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-text-secondary">
              <CurrencyDollarIcon className="w-3 h-3 mr-1" />
              ${deal.value.toLocaleString()}
            </div>
            <div className="text-xs font-medium text-zealynx-500">
              {deal.probability}% prob
            </div>
          </div>
          
          {/* Contact */}
          <div className="flex items-center text-xs text-text-secondary">
            <UserIcon className="w-3 h-3 mr-1" />
            {deal.contact}
          </div>
          
          {/* Last Activity */}
          <div className="flex items-center text-xs text-text-muted">
            <ClockIcon className="w-3 h-3 mr-1" />
            {deal.lastActivity}
          </div>
          
          {/* Next Action */}
          <div className="bg-background-tertiary rounded p-2">
            <p className="text-xs font-medium text-text-primary mb-1">Next Action:</p>
            <p className="text-xs text-text-secondary">{deal.nextAction}</p>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {deal.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-zealynx-500/20 text-zealynx-500 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Stage Column Component
interface StageColumnProps {
  stage: typeof stages[0];
  onAddDeal?: (stageId: string) => void;
  onEditDeal?: (deal: Deal) => void;
  onMoveDeal?: (deal: Deal, newStage: string) => void;
}

function StageColumn({ stage, onAddDeal, onEditDeal, onMoveDeal }: StageColumnProps) {
  const totalValue = stage.deals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedValue = stage.deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
  
  return (
    <div className="flex-1 min-w-80 max-w-sm">
      {/* Stage Header */}
      <div className="sticky top-0 z-10 bg-background-primary pb-4">
        <Card variant="elevated">
          <CardContent padding="sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                <h3 className="font-semibold text-text-primary">{stage.title}</h3>
                <span className="bg-background-tertiary text-text-muted text-xs px-2 py-0.5 rounded-full">
                  {stage.deals.length}
                </span>
              </div>
              <Button
                size="xs"
                variant="ghost"
                onClick={() => onAddDeal?.(stage.id)}
                leftIcon={<PlusIcon className="w-3 h-3" />}
              >
                Add
              </Button>
            </div>
            
            <div className="text-xs space-y-1">
              <div className="flex justify-between text-text-secondary">
                <span>Total:</span>
                <span>${totalValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Weighted:</span>
                <span>${Math.round(weightedValue).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Deals List */}
      <div className="space-y-3">
        {stage.deals.length === 0 ? (
          <Card className="border-dashed border-2 border-border-color">
            <CardContent padding="lg">
              <div className="text-center text-text-muted">
                <PlusIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No deals in {stage.title.toLowerCase()}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-2"
                  onClick={() => onAddDeal?.(stage.id)}
                >
                  Add Deal
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          stage.deals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              onEdit={onEditDeal}
              onMove={onMoveDeal}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Main Kanban Board Component
interface KanbanBoardProps {
  className?: string;
}

export default function KanbanBoard({ className = '' }: KanbanBoardProps) {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  
  const handleAddDeal = (stageId: string) => {
    console.log('Adding new deal to stage:', stageId);
    // TODO: Open deal creation modal
  };
  
  const handleEditDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    console.log('Editing deal:', deal);
    // TODO: Open deal edit modal
  };
  
  const handleMoveDeal = (deal: Deal, newStage: string) => {
    console.log('Moving deal:', deal.id, 'to stage:', newStage);
    // TODO: Update deal stage
  };
  
  // Calculate pipeline metrics
  const totalDeals = mockDeals.length;
  const totalValue = mockDeals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedValue = mockDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
  const avgDealSize = totalValue / totalDeals;
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Pipeline Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="elevated">
          <CardContent padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{totalDeals}</div>
              <div className="text-xs text-text-muted">Total Deals</div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="elevated">
          <CardContent padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">${Math.round(totalValue / 1000)}k</div>
              <div className="text-xs text-text-muted">Pipeline Value</div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="elevated">
          <CardContent padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-zealynx-500">${Math.round(weightedValue / 1000)}k</div>
              <div className="text-xs text-text-muted">Weighted Value</div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="elevated">
          <CardContent padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">${Math.round(avgDealSize / 1000)}k</div>
              <div className="text-xs text-text-muted">Avg Deal Size</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max px-4">
          {stages.map((stage) => (
            <StageColumn
              key={stage.id}
              stage={stage}
              onAddDeal={handleAddDeal}
              onEditDeal={handleEditDeal}
              onMoveDeal={handleMoveDeal}
            />
          ))}
        </div>
      </div>
      
      {/* Footer Actions */}
      <Card variant="glass">
        <CardContent padding="sm">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-text-secondary">
              Last updated: {new Date().toLocaleString()} • 
              <span className="text-status-success ml-1">Auto-sync enabled</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary">
                Export Pipeline
              </Button>
              <Button size="sm" variant="primary">
                Add New Deal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}