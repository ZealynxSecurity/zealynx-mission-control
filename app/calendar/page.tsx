'use client';

import { StatusCard, Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  CalendarIcon,
  ClockIcon,
  BoltIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlayIcon,
  PauseIcon,
  Cog6ToothIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// Mock automation data
const automationJobs = [
  {
    id: 'telegram-scan',
    name: 'Telegram Scanner',
    description: 'Monitors 195+ conversations for urgent messages',
    schedule: 'Every 2 minutes',
    status: 'active',
    lastRun: '2 min ago',
    nextRun: 'In 30 seconds',
    successRate: 99.2,
    totalRuns: 14847,
    errors: 2,
    category: 'monitoring'
  },
  {
    id: 'harbor-monitor',
    name: 'Harbor Finance Monitor',
    description: 'Tracks response from high-priority lead',
    schedule: 'Every 30 minutes',
    status: 'active',
    lastRun: '15 min ago',
    nextRun: 'In 15 min',
    successRate: 100,
    totalRuns: 672,
    errors: 0,
    category: 'lead-tracking'
  },
  {
    id: 'claude-monitor',
    name: 'Claude Code Monitor',
    description: 'Emergency monitoring for long-running sessions',
    schedule: 'Every heartbeat',
    status: 'active',
    lastRun: '1 min ago',
    nextRun: 'Next heartbeat',
    successRate: 98.7,
    totalRuns: 8923,
    errors: 3,
    category: 'emergency'
  },
  {
    id: 'x-poster',
    name: 'X/Twitter Auto-Post',
    description: 'Daily agent intelligence posts to @ElliotAgentRepo',
    schedule: 'Daily at 04:00 UTC',
    status: 'active',
    lastRun: '16h ago',
    nextRun: 'Tomorrow 04:00',
    successRate: 95.8,
    totalRuns: 127,
    errors: 2,
    category: 'content'
  },
  {
    id: 'memory-cleanup',
    name: 'Memory Maintenance',
    description: 'Reviews and organizes daily conversation files',
    schedule: 'Daily at 23:00 UTC',
    status: 'active',
    lastRun: '21h ago',
    nextRun: 'Today 23:00',
    successRate: 100,
    totalRuns: 89,
    errors: 0,
    category: 'maintenance'
  },
  {
    id: 'enreach-sync',
    name: 'Enreach Campaign Sync',
    description: 'Syncs campaign performance data',
    schedule: 'Every hour',
    status: 'paused',
    lastRun: '2h ago',
    nextRun: 'Paused',
    successRate: 87.3,
    totalRuns: 445,
    errors: 8,
    category: 'integration'
  }
];

// Mock calendar events
const upcomingEvents = [
  {
    id: '1',
    title: 'Harbor Finance Follow-up',
    type: 'reminder',
    time: '2026-02-14T21:00:00Z',
    priority: 'high',
    description: 'Follow up on Sway audit capacity if no response received'
  },
  {
    id: '2',
    title: 'Weekly Pipeline Review',
    type: 'meeting',
    time: '2026-02-17T09:00:00Z',
    priority: 'medium',
    description: 'Review CRM pipeline and revenue forecasting'
  },
  {
    id: '3',
    title: 'Agent Performance Analysis',
    type: 'task',
    time: '2026-02-16T15:00:00Z',
    priority: 'low',
    description: 'Analyze @ElliotAgentRepo engagement metrics'
  },
  {
    id: '4',
    title: 'Monadex Payment Follow-up',
    type: 'reminder',
    time: '2026-02-15T10:00:00Z',
    priority: 'high',
    description: 'Check payment status for completed audit'
  }
];

// Category colors
const categoryColors = {
  monitoring: 'bg-status-info/20 text-status-info',
  'lead-tracking': 'bg-status-warning/20 text-status-warning',
  emergency: 'bg-status-error/20 text-status-error',
  content: 'bg-zealynx-500/20 text-zealynx-500',
  maintenance: 'bg-status-success/20 text-status-success',
  integration: 'bg-text-muted/20 text-text-muted'
};

const priorityColors = {
  high: 'border-l-status-error',
  medium: 'border-l-status-warning',
  low: 'border-l-status-info'
};

export default function CalendarPage() {
  const activeJobs = automationJobs.filter(job => job.status === 'active').length;
  const totalRuns = automationJobs.reduce((sum, job) => sum + job.totalRuns, 0);
  const totalErrors = automationJobs.reduce((sum, job) => sum + job.errors, 0);
  const overallSuccessRate = ((totalRuns - totalErrors) / totalRuns * 100).toFixed(1);
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 0) return `${Math.abs(diffMins)} min ago`;
    if (diffMins < 60) return `In ${diffMins} min`;
    if (diffMins < 1440) return `In ${Math.round(diffMins / 60)}h`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient">
              Calendar & Automation
            </h1>
            <p className="text-text-secondary">
              Schedule management and system automation with real-time monitoring across 6 active processes
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              leftIcon={<EyeIcon className="w-4 h-4" />}
            >
              View Logs
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              leftIcon={<PlusIcon className="w-4 h-4" />}
            >
              New Event
            </Button>
          </div>
        </div>
      </div>

      {/* Automation Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Active Jobs"
          value={activeJobs.toString()}
          subtitle="6 total automations"
          status="success"
          icon={<BoltIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Success Rate"
          value={`${overallSuccessRate}%`}
          subtitle="All time performance"
          status="success"
          trend={{
            value: 0.3,
            isPositive: true,
            label: "vs last month"
          }}
          icon={<CheckCircleIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Total Executions"
          value={totalRuns.toLocaleString()}
          subtitle="Since deployment"
          status="info"
          icon={<ClockIcon className="w-6 h-6" />}
        />
        
        <StatusCard
          title="Active Errors"
          value={totalErrors.toString()}
          subtitle="Requires attention"
          status={totalErrors > 5 ? "error" : "success"}
          icon={<ExclamationTriangleIcon className="w-6 h-6" />}
        />
      </div>

      {/* Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Upcoming Events</h2>
            <Button size="sm" variant="ghost">
              View Calendar
            </Button>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Card 
                key={event.id} 
                className={`border-l-4 ${priorityColors[event.priority as keyof typeof priorityColors]}`}
              >
                <CardContent padding="sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary text-sm">{event.title}</h4>
                      <p className="text-xs text-text-secondary mt-1">{event.description}</p>
                      <div className="flex items-center text-xs text-text-muted mt-2">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {formatTime(event.time)}
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      event.type === 'reminder' ? 'bg-status-warning/20 text-status-warning' :
                      event.type === 'meeting' ? 'bg-status-info/20 text-status-info' :
                      'bg-text-muted/20 text-text-muted'
                    }`}>
                      {event.type}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">System Health</h2>
          
          <Card variant="elevated">
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Heartbeat System</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-status-success rounded-full animate-pulse" />
                    <span className="text-status-success text-sm font-medium">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Cron Scheduler</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-status-success rounded-full" />
                    <span className="text-status-success text-sm font-medium">Healthy</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Database Connection</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-status-success rounded-full" />
                    <span className="text-status-success text-sm font-medium">Connected</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">External APIs</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-status-warning rounded-full" />
                    <span className="text-status-warning text-sm font-medium">1 Issue</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="elevated">
            <CardHeader>
              <h3 className="text-lg font-semibold text-text-primary">Performance Metrics</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">Avg Response Time</span>
                  <span className="text-text-primary font-medium">45ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">Memory Usage</span>
                  <span className="text-text-primary font-medium">2.1GB / 8GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">CPU Usage</span>
                  <span className="text-text-primary font-medium">23%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">Disk Usage</span>
                  <span className="text-zealynx-500 font-medium">156GB / 1TB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Automation Jobs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Automation Jobs</h2>
          <Button size="sm" variant="primary">
            Create Job
          </Button>
        </div>
        
        <div className="space-y-3">
          {automationJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-enterprise-lg transition-all duration-200">
              <CardContent>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-text-primary">{job.name}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        categoryColors[job.category as keyof typeof categoryColors]
                      }`}>
                        {job.category}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === 'active' ? 'bg-status-success/20 text-status-success' :
                        'bg-status-warning/20 text-status-warning'
                      }`}>
                        {job.status}
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{job.description}</p>
                    <p className="text-xs text-text-muted">Schedule: {job.schedule}</p>
                  </div>
                  
                  {/* Job Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-sm font-semibold text-text-primary">{job.successRate}%</div>
                      <div className="text-xs text-text-muted">Success</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-primary">{job.totalRuns.toLocaleString()}</div>
                      <div className="text-xs text-text-muted">Runs</div>
                    </div>
                    <div>
                      <div className={`text-sm font-semibold ${job.errors > 0 ? 'text-status-error' : 'text-status-success'}`}>
                        {job.errors}
                      </div>
                      <div className="text-xs text-text-muted">Errors</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-primary">{job.lastRun}</div>
                      <div className="text-xs text-text-muted">Last Run</div>
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="xs"
                      variant={job.status === 'active' ? 'secondary' : 'success'}
                      leftIcon={job.status === 'active' ? <PauseIcon className="w-3 h-3" /> : <PlayIcon className="w-3 h-3" />}
                    >
                      {job.status === 'active' ? 'Pause' : 'Resume'}
                    </Button>
                    <Button size="xs" variant="ghost">
                      <Cog6ToothIcon className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-text-muted text-sm py-4">
        <p>
          System monitoring active • Next heartbeat: 30 seconds • 
          All automations running: <span className="text-status-success">Operational</span>
        </p>
      </div>
    </div>
  );
}