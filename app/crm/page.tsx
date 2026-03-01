'use client';

import { useState } from 'react';
import KanbanBoard from '@/components/ui/KanbanBoard';
import { LeadsDashboard } from '@/components/LeadsDashboard';
import { StatusCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  ArrowPathIcon,
  FunnelIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

type Tab = 'pipeline' | 'leads';

export default function CRMPage() {
  const [activeTab, setActiveTab] = useState<Tab>('leads');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">CRM Pipeline</h1>
          <p className="text-text-secondary">Live pipeline from Supabase — staged and tracked by Michelle</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" leftIcon={<ArrowPathIcon className="w-4 h-4" />}>
            Sync
          </Button>
          <Button variant="ghost" size="sm" leftIcon={<FunnelIcon className="w-4 h-4" />}>
            Filter
          </Button>
          <Button variant="primary" size="sm" leftIcon={<PlusIcon className="w-4 h-4" />}>
            New Lead
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Total Pipeline"
          value="23 leads"
          subtitle="General + partnerships"
          status="info"
          icon={<ClipboardDocumentListIcon className="w-6 h-6" />}
        />
        <StatusCard
          title="Proposals Out"
          value="4"
          subtitle="Awaiting decision"
          status="warning"
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
        />
        <StatusCard
          title="Negotiating"
          value="1"
          subtitle="Espeo partnership"
          status="success"
          icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
        />
        <StatusCard
          title="Urgent Today"
          value="4"
          subtitle="Need immediate action"
          status="error"
          icon={<UserGroupIcon className="w-6 h-6" />}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--color-border-primary)]">
        {([
          { key: 'leads', label: 'Leads Pipeline' },
          { key: 'pipeline', label: 'Kanban Board' },
        ] as { key: Tab; label: string }[]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'leads' ? (
        <LeadsDashboard />
      ) : (
        <KanbanBoard />
      )}
    </div>
  );
}
