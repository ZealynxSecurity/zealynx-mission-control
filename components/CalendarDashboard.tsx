'use client';

import { useState, useEffect } from 'react';
import { formatTimeAgo, formatNumber } from '@/lib/utils';
import { CALENDAR_CONFIG } from '@/lib/constants';
import type { Task } from '@/types/database';

interface CalendarDashboardProps {
  className?: string;
}

// Mock calendar events and cron jobs
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  type: 'meeting' | 'deadline' | 'reminder' | 'audit' | 'personal';
  attendees?: string[];
  location?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  related_deal_id?: string;
}

interface CronJob {
  id: string;
  name: string;
  description: string;
  schedule: string;
  last_run: string;
  next_run: string;
  status: 'active' | 'paused' | 'failed';
  success_rate: number;
  function_name: string;
}

const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Lido Finance Audit Review',
    description: 'Technical review meeting with Lido team',
    start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days
    end_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), // +1h
    type: 'meeting',
    attendees: ['Elena Kozlova', 'Carlos Bloqarl'],
    location: 'Google Meet',
    priority: 'high',
    related_deal_id: '1',
  },
  {
    id: '2',
    title: 'DeFi Yield Proposal Deadline',
    description: 'Final proposal submission for DeFi Yield project',
    start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
    end_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'deadline',
    priority: 'urgent',
    related_deal_id: '2',
  },
  {
    id: '3',
    title: 'NFT Marketplace Project Kickoff',
    description: 'Start audit work for NFT marketplace client',
    start_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // tomorrow
    end_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // +2h
    type: 'audit',
    priority: 'high',
    related_deal_id: '3',
  },
  {
    id: '4',
    title: 'Weekly Team Standup',
    description: 'Regular sync with audit team members',
    start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week
    end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // +30min
    type: 'meeting',
    attendees: ['Audit Team'],
    location: 'Zoom',
    priority: 'medium',
  },
  {
    id: '5',
    title: 'Cross-chain Bridge Follow-up',
    description: 'Follow up on proposal response',
    start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days
    end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'reminder',
    priority: 'medium',
    related_deal_id: '4',
  },
];

const MOCK_CRON_JOBS: CronJob[] = [
  {
    id: '1',
    name: 'Telegram Scanner',
    description: 'Scan and categorize Telegram conversations for urgent messages',
    schedule: 'every 15 minutes',
    last_run: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12 minutes ago
    next_run: new Date(Date.now() + 3 * 60 * 1000).toISOString(), // 3 minutes
    status: 'active',
    success_rate: 98.5,
    function_name: 'telegram_scanner',
  },
  {
    id: '2',
    name: 'Pipeline Review',
    description: 'Autonomous pipeline health check and deal progression',
    schedule: 'daily at 9:00 AM',
    last_run: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    next_run: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(), // 18 hours
    status: 'active',
    success_rate: 95.2,
    function_name: 'pipeline_review',
  },
  {
    id: '3',
    name: 'Enreach Campaign Sync',
    description: 'Sync campaign performance data and update lead scores',
    schedule: 'every 5 minutes',
    last_run: new Date(Date.now() - 3 * 60 * 1000).toISOString(), // 3 minutes ago
    next_run: new Date(Date.now() + 2 * 60 * 1000).toISOString(), // 2 minutes
    status: 'active',
    success_rate: 92.1,
    function_name: 'enreach_sync',
  },
  {
    id: '4',
    name: 'Email Ingestion',
    description: 'Process incoming emails and extract business context',
    schedule: 'daily at 6:00 AM',
    last_run: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    next_run: new Date(Date.now() + 16 * 60 * 60 * 1000).toISOString(), // 16 hours
    status: 'active',
    success_rate: 89.7,
    function_name: 'email_processor',
  },
  {
    id: '5',
    name: 'Business Report',
    description: 'Generate and send daily business intelligence summary',
    schedule: 'daily at 11:00 PM',
    last_run: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    next_run: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(), // 22 hours
    status: 'active',
    success_rate: 97.8,
    function_name: 'business_reporter',
  },
  {
    id: '6',
    name: 'Database Backup',
    description: 'Automated backup of critical business data',
    schedule: 'every 6 hours',
    last_run: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    next_run: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours
    status: 'failed',
    success_rate: 85.3,
    function_name: 'backup_manager',
  },
];

export function CalendarDashboard({ className = '' }: CalendarDashboardProps) {
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [cronJobs, setCronJobs] = useState<CronJob[]>(MOCK_CRON_JOBS);
  const [selectedView, setSelectedView] = useState<'week' | 'month'>('week');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Get upcoming events (next 7 days)
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.start_time);
    const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    return eventDate >= new Date() && eventDate <= weekFromNow;
  }).sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

  // Get today's events
  const todaysEvents = events.filter(event => {
    const eventDate = new Date(event.start_time);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  });

  // Cron job statistics
  const activeCrons = cronJobs.filter(job => job.status === 'active').length;
  const failedCrons = cronJobs.filter(job => job.status === 'failed').length;
  const avgSuccessRate = cronJobs.length > 0 
    ? cronJobs.reduce((sum, job) => sum + job.success_rate, 0) / cronJobs.length 
    : 0;

  // Next cron to run
  const nextCron = [...cronJobs]
    .filter(job => job.status === 'active')
    .sort((a, b) => new Date(a.next_run).getTime() - new Date(b.next_run).getTime())[0];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📅</span>
            <div>
              <p className="caption">Today's Events</p>
              <p className="text-2xl font-semibold" style={{color: '#f1f5f9'}}>
                {formatNumber(todaysEvents.length)}
              </p>
            </div>
          </div>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            {upcomingEvents.length} this week
          </p>
        </div>
        
        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⚙️</span>
            <div>
              <p className="caption">Active Crons</p>
              <p className="text-2xl font-semibold text-teal-400">
                {formatNumber(activeCrons)}
              </p>
            </div>
          </div>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            {failedCrons} failed jobs
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📊</span>
            <div>
              <p className="caption">Success Rate</p>
              <p className="text-2xl font-semibold text-green-400">
                {avgSuccessRate.toFixed(1)}%
              </p>
            </div>
          </div>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            Automation reliability
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⏰</span>
            <div>
              <p className="caption">Next Cron</p>
              <p className="text-sm font-semibold text-amber-400">
                {nextCron ? formatTimeAgo(nextCron.next_run) : 'None'}
              </p>
            </div>
          </div>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            {nextCron ? nextCron.name : 'No active jobs'}
          </p>
        </div>
      </div>

      {/* Today's Schedule & Upcoming Events */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="heading-sm mb-2">Upcoming Events</h3>
                <p className="caption">Your schedule for the next 7 days</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedView('week')}
                  className={`px-3 py-1 text-xs rounded ${
                    selectedView === 'week' 
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setSelectedView('month')}
                  className={`px-3 py-1 text-xs rounded ${
                    selectedView === 'month'
                      ? 'bg-teal-500 text-white' 
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Month
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  delay={index * 100}
                />
              ))}
              
              {upcomingEvents.length === 0 && (
                <div className="text-center py-12">
                  <span className="text-4xl mb-4 block">🗓️</span>
                  <h4 className="heading-sm mb-2">No upcoming events</h4>
                  <p style={{color: '#94a3b8'}}>
                    Your schedule is clear for the next week
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Current Time & Today's Schedule */}
        <div className="space-y-6">
          <div className="card">
            <div className="text-center mb-6">
              <div className="text-3xl font-mono font-bold mb-2" style={{color: '#f1f5f9'}}>
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </div>
              <div className="text-sm" style={{color: '#94a3b8'}}>
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="heading-sm mb-2">Today's Schedule</h4>
              <p className="caption">Events happening today</p>
            </div>
            
            {todaysEvents.length > 0 ? (
              <div className="space-y-3">
                {todaysEvents.map(event => (
                  <div key={event.id} className="p-3 rounded-lg" style={{background: 'rgba(30, 41, 59, 0.5)'}}>
                    <h5 className="font-medium text-sm mb-1" style={{color: '#f1f5f9'}}>
                      {event.title}
                    </h5>
                    <p className="text-xs" style={{color: '#cbd5e1'}}>
                      {new Date(event.start_time).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="text-2xl block mb-2">✨</span>
                <p className="text-sm" style={{color: '#94a3b8'}}>
                  No events today
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cron Jobs Management */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="heading-sm mb-2">Automation & Cron Jobs</h3>
            <p className="caption">Background processes and scheduled tasks</p>
          </div>
          <button className="btn btn-secondary text-xs">
            View Logs
          </button>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cronJobs.map((job, index) => (
            <CronJobCard
              key={job.id}
              job={job}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Sub-components
interface EventCardProps {
  event: CalendarEvent;
  delay?: number;
}

function EventCard({ event, delay = 0 }: EventCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'deadline': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'audit': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'reminder': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'personal': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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

  const isToday = new Date(event.start_time).toDateString() === new Date().toDateString();
  const isTomorrow = new Date(event.start_time).toDateString() === new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();

  return (
    <div 
      className={`p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
        isToday ? 'border-l-4 border-l-teal-500' : ''
      }`}
      style={{
        background: 'rgba(30, 41, 59, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        animationDelay: `${delay}ms`
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span>{getPriorityIcon(event.priority)}</span>
            <h4 className="font-medium truncate" style={{color: '#f1f5f9'}}>
              {event.title}
            </h4>
          </div>
          {event.description && (
            <p className="text-xs mb-2 text-gray-300">
              {event.description}
            </p>
          )}
          <div className="flex items-center gap-2">
            <span className={`status-indicator text-xs ${getTypeColor(event.type)}`}>
              {event.type}
            </span>
            {event.priority !== 'low' && (
              <span className={`status-indicator text-xs ${
                event.priority === 'urgent' 
                  ? 'bg-red-500/20 text-red-400 border-red-500/30'
                  : event.priority === 'high'
                  ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                  : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
              }`}>
                {event.priority}
              </span>
            )}
          </div>
        </div>
        <div className="text-right text-xs" style={{color: '#94a3b8'}}>
          <div className="font-medium">
            {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : 
             new Date(event.start_time).toLocaleDateString('en-US', {
               month: 'short',
               day: 'numeric',
             })}
          </div>
          <div>
            {new Date(event.start_time).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </div>
        </div>
      </div>
      
      {event.location && (
        <div className="flex items-center gap-1 text-xs" style={{color: '#94a3b8'}}>
          <span>📍</span>
          <span>{event.location}</span>
        </div>
      )}
    </div>
  );
}

interface CronJobCardProps {
  job: CronJob;
  delay?: number;
}

function CronJobCard({ job, delay = 0 }: CronJobCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

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
          <h4 className="font-medium truncate mb-1" style={{color: '#f1f5f9'}}>
            {job.name}
          </h4>
          <p className="text-xs mb-2" style={{color: '#cbd5e1'}}>
            {job.description}
          </p>
          <span className={`status-indicator text-xs ${getStatusColor(job.status)}`}>
            {job.status}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-teal-400">
            {job.success_rate.toFixed(1)}%
          </p>
          <p className="text-xs" style={{color: '#94a3b8'}}>
            Success
          </p>
        </div>
      </div>

      <div className="space-y-2 text-xs" style={{color: '#94a3b8'}}>
        <div className="flex justify-between">
          <span>Schedule:</span>
          <span className="font-mono">{job.schedule}</span>
        </div>
        <div className="flex justify-between">
          <span>Last run:</span>
          <span>{formatTimeAgo(job.last_run)}</span>
        </div>
        <div className="flex justify-between">
          <span>Next run:</span>
          <span className="text-teal-400">{formatTimeAgo(job.next_run)}</span>
        </div>
      </div>
    </div>
  );
}