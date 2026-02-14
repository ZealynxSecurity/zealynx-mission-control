'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar,
  Clock,
  Play,
  Pause,
  AlertCircle,
  CheckCircle,
  Activity,
  Settings,
  Plus,
  RefreshCw,
  Zap,
  Users,
  MapPin,
  Bell
} from 'lucide-react';

interface CalendarDashboardProps {
  className?: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  type: 'meeting' | 'deadline' | 'reminder' | 'audit' | 'personal';
  attendees?: string[];
  location?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface CronJob {
  id: string;
  name: string;
  description: string;
  schedule: string;
  lastRun: string;
  nextRun: string;
  status: 'active' | 'paused' | 'failed';
  successRate: number;
  functionName: string;
  runCount: number;
}

interface EventCardProps extends CalendarEvent {
  isToday?: boolean;
}

function EventCard({ 
  title, 
  description, 
  startTime, 
  endTime, 
  type, 
  attendees, 
  location, 
  priority, 
  isToday = false 
}: EventCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'deadline': return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'audit': return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
      case 'reminder': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      case 'personal': return 'bg-green-500/10 border-green-500/30 text-green-400';
      default: return 'bg-gray-500/10 border-gray-500/30 text-gray-400';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return '🚨';
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '📌';
      default: return '📌';
    }
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className={`card hover:shadow-lg transition-all duration-200 ${isToday ? 'border-l-4 border-l-[var(--color-primary)]' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span>{getPriorityIcon(priority)}</span>
          <h4 className="font-semibold text-[var(--color-text-primary)]">
            {title}
          </h4>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(type)}`}>
          {type}
        </span>
      </div>

      {description && (
        <p className="text-sm text-[var(--color-text-muted)] mb-3">
          {description}
        </p>
      )}

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-[var(--color-text-subtle)]" />
          <span className="text-[var(--color-text-primary)]">
            {formatTime(startTime)} - {formatTime(endTime)}
          </span>
        </div>

        {location && (
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[var(--color-text-subtle)]" />
            <span className="text-[var(--color-text-muted)]">{location}</span>
          </div>
        )}

        {attendees && attendees.length > 0 && (
          <div className="flex items-center gap-2">
            <Users size={14} className="text-[var(--color-text-subtle)]" />
            <span className="text-[var(--color-text-muted)]">
              {attendees.join(', ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface CronJobCardProps extends CronJob {}

function CronJobCard({ 
  name, 
  description, 
  schedule, 
  lastRun, 
  nextRun, 
  status, 
  successRate, 
  runCount 
}: CronJobCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'active': return <CheckCircle size={16} className="text-[var(--color-success)]" />;
      case 'paused': return <Pause size={16} className="text-[var(--color-warning)]" />;
      case 'failed': return <AlertCircle size={16} className="text-[var(--color-error)]" />;
      default: return <Clock size={16} className="text-[var(--color-text-subtle)]" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'bg-[var(--color-success)]/10 border-[var(--color-success)]/30 text-[var(--color-success)]';
      case 'paused': return 'bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30 text-[var(--color-warning)]';
      case 'failed': return 'bg-[var(--color-error)]/10 border-[var(--color-error)]/30 text-[var(--color-error)]';
      default: return 'bg-[var(--color-text-subtle)]/10 border-[var(--color-text-subtle)]/30 text-[var(--color-text-subtle)]';
    }
  };

  const formatTimeAgo = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const formatNextRun = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 0) return 'Overdue';
    if (minutes < 60) return `in ${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `in ${hours}h`;
    const days = Math.floor(hours / 24);
    return `in ${days}d`;
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <h4 className="font-semibold text-[var(--color-text-primary)]">
            {name}
          </h4>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor()}`}>
          {status}
        </span>
      </div>

      <p className="text-sm text-[var(--color-text-muted)] mb-3">
        {description}
      </p>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-[var(--color-text-subtle)]">Schedule:</span>
          <span className="text-[var(--color-text-primary)] font-mono">{schedule}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-text-subtle)]">Success Rate:</span>
          <span className={`font-semibold ${
            successRate >= 95 ? 'text-[var(--color-success)]' :
            successRate >= 85 ? 'text-[var(--color-warning)]' :
            'text-[var(--color-error)]'
          }`}>
            {successRate.toFixed(1)}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-text-subtle)]">Runs:</span>
          <span className="text-[var(--color-text-primary)]">{runCount.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2 text-xs border-t border-[var(--color-border-primary)] pt-3">
        <div className="flex justify-between">
          <span className="text-[var(--color-text-subtle)]">Last run:</span>
          <span className="text-[var(--color-text-muted)]">{formatTimeAgo(lastRun)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-text-subtle)]">Next run:</span>
          <span className="text-[var(--color-primary)]">{formatNextRun(nextRun)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <button className="btn btn-ghost btn-sm">
          <Play size={12} />
        </button>
        <button className="btn btn-ghost btn-sm">
          <Settings size={12} />
        </button>
        <button className="btn btn-ghost btn-sm ml-auto">
          <RefreshCw size={12} />
        </button>
      </div>
    </div>
  );
}

export function CalendarDashboard({ className = '' }: CalendarDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'calendar' | 'crons'>('calendar');

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock data representing real automation processes
  const events: CalendarEvent[] = [
    // Today's events would come from actual calendar integration
  ];

  const cronJobs: CronJob[] = [
    {
      id: '1',
      name: 'Telegram Scanner',
      description: 'Scan and categorize Telegram conversations for urgent messages',
      schedule: 'every 15 minutes',
      lastRun: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      nextRun: new Date(Date.now() + 3 * 60 * 1000).toISOString(),
      status: 'active',
      successRate: 98.5,
      functionName: 'telegram_scanner',
      runCount: 2847
    },
    {
      id: '2',
      name: 'Pipeline Review',
      description: 'Autonomous pipeline health check and deal progression analysis',
      schedule: 'daily at 9:00 AM',
      lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      nextRun: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      successRate: 95.2,
      functionName: 'pipeline_review',
      runCount: 87
    },
    {
      id: '3',
      name: 'Harbor Monitor',
      description: 'Track Harbor Finance lead engagement and response patterns',
      schedule: 'every 30 minutes',
      lastRun: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      nextRun: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      status: 'active',
      successRate: 92.1,
      functionName: 'harbor_monitor',
      runCount: 1456
    },
    {
      id: '4',
      name: 'Business Report',
      description: 'Generate and send daily business intelligence summary',
      schedule: 'daily at 6:00 PM',
      lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      nextRun: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      successRate: 97.8,
      functionName: 'business_reporter',
      runCount: 67
    },
    {
      id: '5',
      name: 'Claude Code Monitor',
      description: 'Monitor Claude coding sessions for timeout and progress',
      schedule: 'every heartbeat',
      lastRun: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      nextRun: new Date(Date.now() + 1 * 60 * 1000).toISOString(),
      status: 'active',
      successRate: 89.7,
      functionName: 'claude_code_monitor',
      runCount: 4521
    },
    {
      id: '6',
      name: 'X/Twitter Posts',
      description: 'Autonomous posting to @ElliotAgentRepo with agent intelligence',
      schedule: 'daily at 4:30 AM',
      lastRun: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
      nextRun: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(),
      status: 'failed',
      successRate: 85.3,
      functionName: 'x_post_scheduler',
      runCount: 23
    },
  ];

  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.startTime);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  });

  const activeCrons = cronJobs.filter(job => job.status === 'active').length;
  const failedCrons = cronJobs.filter(job => job.status === 'failed').length;
  const avgSuccessRate = cronJobs.length > 0 
    ? cronJobs.reduce((sum, job) => sum + job.successRate, 0) / cronJobs.length 
    : 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-info)]/10 border border-[var(--color-info)]/20">
              <Calendar size={20} className="text-[var(--color-info)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Today's Events</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {todayEvents.length}
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Scheduled for today
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-success)]/10 border border-[var(--color-success)]/20">
              <Activity size={20} className="text-[var(--color-success)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Active Crons</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {activeCrons}
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Running processes
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
              <CheckCircle size={20} className="text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Success Rate</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {avgSuccessRate.toFixed(1)}%
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Automation reliability
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--color-error)]/10 border border-[var(--color-error)]/20">
              <AlertCircle size={20} className="text-[var(--color-error)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-muted)]">Failed Jobs</p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {failedCrons}
              </p>
            </div>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Need attention
          </p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedView('calendar')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedView === 'calendar' 
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              📅 Calendar
            </button>
            <button
              onClick={() => setSelectedView('crons')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedView === 'crons'
                  ? 'bg-[var(--color-primary)] text-white' 
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              ⚙️ Automation
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="btn btn-secondary btn-sm">
              <Settings size={14} />
              Settings
            </button>
            <button className="btn btn-primary btn-sm">
              <Plus size={14} />
              {selectedView === 'calendar' ? 'New Event' : 'New Job'}
            </button>
          </div>
        </div>

        {/* Current Time Display */}
        <div className="text-center mb-6 p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
          <div className="text-3xl font-mono font-bold text-[var(--color-text-primary)] mb-2">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </div>
          <div className="text-sm text-[var(--color-text-muted)]">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>
      </div>

      {/* Content based on selected view */}
      {selectedView === 'calendar' ? (
        <div className="card">
          <h3 className="heading-sm mb-6">Today's Schedule</h3>
          
          {todayEvents.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {todayEvents.map((event) => (
                <EventCard key={event.id} {...event} isToday />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-[var(--color-text-subtle)] mb-4" />
              <h4 className="heading-sm mb-2">No events today</h4>
              <p className="text-[var(--color-text-muted)] mb-4">
                Your schedule is clear for today
              </p>
              <button className="btn btn-primary">
                <Plus size={16} />
                Add Event
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cronJobs.map((job) => (
            <CronJobCard key={job.id} {...job} />
          ))}
        </div>
      )}
    </div>
  );
}