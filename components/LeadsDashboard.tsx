'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw, 
  ChevronDown,
  ExternalLink,
  MessageSquare,
  Calendar
} from 'lucide-react';

interface Lead {
  id: string;
  company: string;
  contact_name: string | null;
  contact_role: string | null;
  platform: string | null;
  category: string | null;
  stage: string | null;
  follow_up_stage: string | null;
  follow_up_count: number | null;
  next_follow_up_at: string | null;
  last_contact_at: string | null;
  action_urgency: string | null;
  notes: string | null;
  suggested_action: string | null;
}

const STAGE_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  new:            { label: 'New',            color: 'text-slate-400',   bg: 'bg-slate-500/20' },
  contacted_1:    { label: '1st Follow-up',  color: 'text-blue-400',    bg: 'bg-blue-500/20' },
  contacted_2:    { label: '2nd Follow-up',  color: 'text-yellow-400',  bg: 'bg-yellow-500/20' },
  contacted_3:    { label: '3rd Follow-up',  color: 'text-orange-400',  bg: 'bg-orange-500/20' },
  proposal_sent:  { label: 'Proposal Sent',  color: 'text-purple-400',  bg: 'bg-purple-500/20' },
  negotiating:    { label: 'Negotiating',    color: 'text-teal-400',    bg: 'bg-teal-500/20' },
  won:            { label: 'Won',            color: 'text-green-400',   bg: 'bg-green-500/20' },
  lost:           { label: 'Lost',           color: 'text-red-400',     bg: 'bg-red-500/20' },
  churned:        { label: 'Churned',        color: 'text-gray-500',    bg: 'bg-gray-500/10' },
};

const URGENCY_COLORS: Record<string, string> = {
  today:     'border-l-red-500',
  this_week: 'border-l-yellow-500',
  high:      'border-l-orange-500',
  stalled:   'border-l-gray-500',
  snoozed:   'border-l-slate-600',
};

function formatDaysAgo(dateStr: string | null): string {
  if (!dateStr) return 'Never';
  const d = new Date(dateStr);
  const diff = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return `${diff}d ago`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function StageBadge({ stage }: { stage: string | null }) {
  const s = stage && STAGE_LABELS[stage] ? STAGE_LABELS[stage] : { label: stage || '—', color: 'text-gray-400', bg: 'bg-gray-500/10' };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.bg} ${s.color}`}>
      {s.label}
    </span>
  );
}

function LeadRow({ lead, expanded, onToggle }: { lead: Lead; expanded: boolean; onToggle: () => void }) {
  const urgencyBorder = lead.action_urgency && URGENCY_COLORS[lead.action_urgency] 
    ? URGENCY_COLORS[lead.action_urgency] 
    : 'border-l-slate-600';

  const isOverdue = lead.next_follow_up_at && new Date(lead.next_follow_up_at) <= new Date();
  const isActive = !['won', 'lost', 'churned'].includes(lead.follow_up_stage || '');

  return (
    <div className={`border-l-4 ${urgencyBorder} bg-[var(--color-bg-secondary)] rounded-r-lg mb-2 transition-all`}>
      <div 
        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[var(--color-bg-tertiary)] rounded-r-lg"
        onClick={onToggle}
      >
        {/* Company + contact */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--color-text-primary)] truncate">{lead.company}</span>
            {lead.platform && (
              <span className="text-xs text-[var(--color-text-subtle)] hidden sm:inline">via {lead.platform}</span>
            )}
          </div>
          {lead.contact_name && lead.contact_name !== 'Unknown' && (
            <span className="text-xs text-[var(--color-text-muted)]">{lead.contact_name}</span>
          )}
        </div>

        {/* Follow-up stage */}
        <div className="hidden md:block">
          <StageBadge stage={lead.follow_up_stage} />
        </div>

        {/* Follow-up count */}
        <div className="hidden lg:flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
          <MessageSquare size={12} />
          <span>{lead.follow_up_count ?? 0}x</span>
        </div>

        {/* Last contact */}
        <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
          <Clock size={12} />
          <span>{formatDaysAgo(lead.last_contact_at)}</span>
        </div>

        {/* Next follow-up */}
        {isActive && (
          <div className={`hidden sm:flex items-center gap-1 text-xs ${isOverdue ? 'text-red-400 font-semibold' : 'text-[var(--color-text-muted)]'}`}>
            <Calendar size={12} />
            <span>{lead.next_follow_up_at ? formatDate(lead.next_follow_up_at) : '—'}</span>
          </div>
        )}

        {/* Urgency dot */}
        {lead.action_urgency === 'today' && (
          <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
        )}
        {(lead.follow_up_stage === 'won') && (
          <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
        )}

        <ChevronDown size={14} className={`text-[var(--color-text-subtle)] flex-shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-2 border-t border-[var(--color-border-primary)] pt-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-[var(--color-text-subtle)] text-xs">Stage</span>
              <p className="text-[var(--color-text-primary)]">{lead.stage || '—'}</p>
            </div>
            <div>
              <span className="text-[var(--color-text-subtle)] text-xs">Category</span>
              <p className="text-[var(--color-text-primary)]">{lead.category || '—'}</p>
            </div>
            <div>
              <span className="text-[var(--color-text-subtle)] text-xs">Follow-ups sent</span>
              <p className="text-[var(--color-text-primary)]">{lead.follow_up_count ?? 0}</p>
            </div>
            <div>
              <span className="text-[var(--color-text-subtle)] text-xs">Next action</span>
              <p className={`${isOverdue ? 'text-red-400 font-semibold' : 'text-[var(--color-text-primary)]'}`}>
                {lead.next_follow_up_at ? formatDate(lead.next_follow_up_at) : '—'}
                {isOverdue && isActive ? ' ⚠️ OVERDUE' : ''}
              </p>
            </div>
          </div>
          {lead.suggested_action && (
            <div>
              <span className="text-[var(--color-text-subtle)] text-xs">Suggested action</span>
              <p className="text-[var(--color-text-primary)] text-sm">{lead.suggested_action}</p>
            </div>
          )}
          {lead.notes && (
            <div>
              <span className="text-[var(--color-text-subtle)] text-xs">Notes</span>
              <p className="text-[var(--color-text-muted)] text-xs leading-relaxed line-clamp-3">{lead.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const FILTER_STAGES = ['all', 'new', 'contacted_1', 'contacted_2', 'contacted_3', 'proposal_sent', 'negotiating', 'won', 'lost', 'churned'];

export function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStage, setFilterStage] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads?select=*&order=action_urgency.asc,last_contact_at.asc`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          },
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Lead[] = await res.json();
      // Sort: today first, then by last_contact_at ascending (oldest first)
      const urgencyOrder: Record<string, number> = { today: 0, high: 1, this_week: 2, stalled: 3, snoozed: 4 };
      data.sort((a, b) => {
        const ua = urgencyOrder[a.action_urgency || ''] ?? 5;
        const ub = urgencyOrder[b.action_urgency || ''] ?? 5;
        if (ua !== ub) return ua - ub;
        return new Date(a.last_contact_at || 0).getTime() - new Date(b.last_contact_at || 0).getTime();
      });
      setLeads(data);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const filtered = leads.filter(l => {
    if (filterStage !== 'all' && l.follow_up_stage !== filterStage) return false;
    if (filterUrgency !== 'all' && l.action_urgency !== filterUrgency) return false;
    return true;
  });

  const activeCount = leads.filter(l => !['won','lost','churned'].includes(l.follow_up_stage || '')).length;
  const overdueCount = leads.filter(l => l.next_follow_up_at && new Date(l.next_follow_up_at) <= new Date() && !['won','lost','churned'].includes(l.follow_up_stage || '')).length;
  const todayCount = leads.filter(l => l.action_urgency === 'today').length;
  const proposalCount = leads.filter(l => l.follow_up_stage === 'proposal_sent').length;

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Leads', value: activeCount, sub: `of ${leads.length} total`, icon: <AlertCircle size={18} />, color: 'text-blue-400' },
          { label: 'Overdue', value: overdueCount, sub: 'need follow-up now', icon: <Clock size={18} />, color: 'text-red-400' },
          { label: 'Urgent Today', value: todayCount, sub: 'action_urgency=today', icon: <AlertCircle size={18} />, color: 'text-orange-400' },
          { label: 'Proposals Out', value: proposalCount, sub: 'awaiting decision', icon: <CheckCircle size={18} />, color: 'text-purple-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-[var(--color-bg-secondary)] rounded-lg p-4 border border-[var(--color-border-primary)]">
            <div className={`flex items-center gap-2 mb-1 ${stat.color}`}>
              {stat.icon}
              <span className="text-xs font-medium">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">{stat.value}</div>
            <div className="text-xs text-[var(--color-text-subtle)]">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Filters + refresh */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filterStage}
          onChange={e => setFilterStage(e.target.value)}
          className="text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded px-2 py-1 text-[var(--color-text-primary)]"
        >
          {FILTER_STAGES.map(s => (
            <option key={s} value={s}>{s === 'all' ? 'All stages' : STAGE_LABELS[s]?.label || s}</option>
          ))}
        </select>
        <select
          value={filterUrgency}
          onChange={e => setFilterUrgency(e.target.value)}
          className="text-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded px-2 py-1 text-[var(--color-text-primary)]"
        >
          {['all','today','high','this_week','stalled','snoozed'].map(u => (
            <option key={u} value={u}>{u === 'all' ? 'All urgency' : u}</option>
          ))}
        </select>
        <button onClick={fetchLeads} className="ml-auto flex items-center gap-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
        <span className="text-xs text-[var(--color-text-subtle)]">{filtered.length} leads</span>
      </div>

      {/* Lead list */}
      {loading ? (
        <div className="text-center py-12 text-[var(--color-text-muted)]">Loading leads...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-400">Error: {error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-text-muted)]">No leads match filter</div>
      ) : (
        <div>
          {filtered.map(lead => (
            <LeadRow
              key={lead.id}
              lead={lead}
              expanded={expandedId === lead.id}
              onToggle={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
