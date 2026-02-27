'use client';

import { useState, useEffect } from 'react';
import {
  Target,
  AlertCircle,
  Clock,
  TrendingDown,
  Users,
  Zap,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface EnreachDashboardProps {
  className?: string;
}

interface EnreachLead {
  id: string;
  company: string;
  contact_name: string | null;
  contact_username: string | null;
  contact_role: string | null;
  telegram_group: string | null;
  category: string;
  status: string;
  stage: string;
  action_urgency: string;
  days_since_contact: number;
  last_contact_at: string | null;
  last_message: string | null;
  actioned_at: string | null;
  snoozed_until: string | null;
  notes: string | null;
  synced_at: string;
}

type UrgencyFilter = 'all' | 'today' | 'this_week' | 'stalled' | 'actioned';

const URGENCY_ORDER: Record<string, number> = {
  today: 0,
  this_week: 1,
  stalled: 2,
  actioned: 3,
  snoozed: 4,
};

function formatRelative(dateStr: string | null): string {
  if (!dateStr) return 'Never';
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
}

function UrgencyBadge({ urgency }: { urgency: string }) {
  const styles: Record<string, string> = {
    today: 'bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30 text-[var(--color-warning)]',
    this_week: 'bg-[var(--color-info)]/10 border-[var(--color-info)]/30 text-[var(--color-info)]',
    stalled: 'bg-[var(--color-error)]/10 border-[var(--color-error)]/30 text-[var(--color-error)]',
    actioned: 'bg-[var(--color-success)]/10 border-[var(--color-success)]/30 text-[var(--color-success)]',
    snoozed: 'bg-[var(--color-text-subtle)]/10 border-[var(--color-text-subtle)]/30 text-[var(--color-text-subtle)]',
  };
  const labels: Record<string, string> = {
    today: 'Today', this_week: 'This Week', stalled: 'Stalled', actioned: 'Actioned', snoozed: 'Snoozed',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${styles[urgency] ?? styles.snoozed}`}>
      {labels[urgency] ?? urgency}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    hot: 'bg-[var(--color-error)]/10 border-[var(--color-error)]/30 text-[var(--color-error)]',
    warm: 'bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30 text-[var(--color-warning)]',
    cold: 'bg-[var(--color-info)]/10 border-[var(--color-info)]/30 text-[var(--color-info)]',
    nurture: 'bg-[var(--color-text-subtle)]/10 border-[var(--color-text-subtle)]/30 text-[var(--color-text-subtle)]',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${styles[status] ?? styles.nurture}`}>
      {status}
    </span>
  );
}

function TodayCard({ lead }: { lead: EnreachLead }) {
  const [expanded, setExpanded] = useState(false);
  const contact = lead.contact_username ?? lead.contact_name ?? '—';
  const isOld = lead.days_since_contact > 14;
  return (
    <div className="card hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-[var(--color-text-primary)] text-lg">{lead.company}</h4>
          <p className="text-sm text-[var(--color-text-muted)]">{contact}</p>
        </div>
        <UrgencyBadge urgency={lead.action_urgency} />
      </div>
      <div className="flex items-center gap-1 mb-3">
        <Clock size={12} className={isOld ? 'text-[var(--color-error)]' : 'text-[var(--color-text-subtle)]'} />
        <span className={`text-xs ${isOld ? 'text-[var(--color-error)] font-medium' : 'text-[var(--color-text-subtle)]'}`}>
          {lead.days_since_contact}d since contact
        </span>
      </div>
      {lead.last_message && (
        <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-3">
          <p className={`text-sm italic text-[var(--color-text-muted)] ${!expanded ? 'line-clamp-3' : ''}`}>
            "{lead.last_message}"
          </p>
          {lead.last_message.length > 120 && (
            <button onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-[var(--color-primary)] mt-2 hover:underline">
              {expanded ? <><ChevronUp size={12} /> Show less</> : <><ChevronDown size={12} /> Show more</>}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function EnreachDashboard({ className = '' }: EnreachDashboardProps) {
  const [leads, setLeads] = useState<EnreachLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<UrgencyFilter>('all');

  useEffect(() => {
    async function fetchLeads() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('enreach_leads')
        .select('*')
        .order('days_since_contact', { ascending: false });
      if (error) setError(error.message);
      else setLeads(data ?? []);
      setLoading(false);
    }
    fetchLeads();
  }, []);

  if (loading) return (
    <div className={`flex items-center justify-center py-20 ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[var(--color-text-muted)]">Loading leads…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className={`card py-12 text-center ${className}`}>
      <AlertCircle size={40} className="mx-auto text-[var(--color-error)] mb-3" />
      <h4 className="heading-sm mb-1">Failed to load leads</h4>
      <p className="text-sm text-[var(--color-text-muted)]">{error}</p>
    </div>
  );

  const total = leads.length;
  const todayCount = leads.filter(l => l.action_urgency === 'today').length;
  const thisWeekCount = leads.filter(l => l.action_urgency === 'this_week').length;
  const stalledCount = leads.filter(l => l.action_urgency === 'stalled').length;
  const todayLeads = leads.filter(l => l.action_urgency === 'today');
  const sorted = [...leads].sort((a, b) => (URGENCY_ORDER[a.action_urgency] ?? 9) - (URGENCY_ORDER[b.action_urgency] ?? 9));
  const filtered = filter === 'all' ? sorted : sorted.filter(l => l.action_urgency === filter);

  const FILTERS: { key: UrgencyFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'today', label: 'Today' },
    { key: 'this_week', label: 'This Week' },
    { key: 'stalled', label: 'Stalled' },
    { key: 'actioned', label: 'Actioned' },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Leads', value: total, icon: Users, color: 'primary', sub: 'Enreach outbound pipeline' },
          { label: 'Follow Up Today', value: todayCount, icon: Zap, color: 'warning', sub: 'Needs action now' },
          { label: 'This Week', value: thisWeekCount, icon: Calendar, color: 'info', sub: 'Due within 7 days' },
          { label: 'Stalled', value: stalledCount, icon: TrendingDown, color: 'error', sub: '21+ days no contact' },
        ].map(({ label, value, icon: Icon, color, sub }) => (
          <div key={label} className="card">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg bg-[var(--color-${color})]/10 border border-[var(--color-${color})]/20`}>
                <Icon size={20} className={`text-[var(--color-${color})]`} />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-text-muted)]">{label}</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">{value}</p>
              </div>
            </div>
            <p className="text-xs text-[var(--color-text-subtle)]">{sub}</p>
          </div>
        ))}
      </div>

      {todayLeads.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="heading-sm">Today's Follow-ups</h3>
            <span className="text-xs px-2 py-0.5 rounded-full border bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30 text-[var(--color-warning)] font-semibold">{todayLeads.length}</span>
          </div>
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {todayLeads.map(lead => <TodayCard key={lead.id} lead={lead} />)}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h3 className="heading-sm">All Leads</h3>
          <span className="text-xs px-2 py-0.5 rounded-full border border-[var(--color-border-primary)] text-[var(--color-text-subtle)]">{filtered.length}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filter === f.key
                ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                : 'border-[var(--color-border-primary)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'}`}>
              {f.label}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="card text-center py-12">
            <Target size={40} className="mx-auto text-[var(--color-text-subtle)] mb-3" />
            <p className="text-[var(--color-text-muted)]">No leads found</p>
          </div>
        ) : (
          <div className="card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]">
                    {['Company', 'Contact', 'Last Contact', 'Urgency', 'Status', 'Last Message'].map(h => (
                      <th key={h} className={`text-left px-4 py-3 text-xs font-medium text-[var(--color-text-subtle)] uppercase tracking-wide ${h === 'Last Message' ? 'hidden lg:table-cell' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-primary)]">
                  {filtered.map(lead => (
                    <tr key={lead.id} className="hover:bg-[var(--color-bg-tertiary)]/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-[var(--color-text-primary)]">{lead.company}</td>
                      <td className="px-4 py-3 text-[var(--color-text-muted)]">{lead.contact_username ?? lead.contact_name ?? '—'}</td>
                      <td className="px-4 py-3 text-[var(--color-text-muted)]">{formatRelative(lead.last_contact_at)}</td>
                      <td className="px-4 py-3"><UrgencyBadge urgency={lead.action_urgency} /></td>
                      <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                      <td className="px-4 py-3 text-[var(--color-text-subtle)] hidden lg:table-cell max-w-xs">
                        <span className="truncate block" title={lead.last_message ?? ''}>
                          {lead.last_message ? lead.last_message.slice(0, 60) + (lead.last_message.length > 60 ? '…' : '') : '—'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
