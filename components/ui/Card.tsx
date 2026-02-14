'use client';

import { ReactNode } from 'react';

// Base Card Component
interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered' | 'glass';
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  onClick 
}: CardProps) {
  const baseClasses = 'rounded-lg transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-background-secondary border border-border-color',
    elevated: 'bg-background-secondary border border-border-color shadow-enterprise-lg',
    bordered: 'bg-background-secondary border-2 border-zealynx-500/20',
    glass: 'glass-morphism border border-border-color',
  };
  
  const hoverClasses = hover ? 'hover:bg-background-hover hover:border-zealynx-500/30 hover:shadow-enterprise-lg' : '';
  const clickableClasses = onClick ? 'cursor-pointer active:scale-[0.98]' : '';
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Card Header Component
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-4 py-3 border-b border-border-color ${className}`}>
      {children}
    </div>
  );
}

// Card Content Component
interface CardContentProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function CardContent({ children, className = '', padding = 'md' }: CardContentProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  return (
    <div className={`${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}

// Card Title Component
interface CardTitleProps {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3;
}

export function CardTitle({ children, className = '', level = 2 }: CardTitleProps) {
  const levelClasses = {
    1: 'text-xl font-semibold text-text-primary',
    2: 'text-lg font-semibold text-text-primary', 
    3: 'text-base font-medium text-text-primary',
  };
  
  return (
    <h3 className={`${levelClasses[level]} ${className}`}>
      {children}
    </h3>
  );
}

// Card Description Component
interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-sm text-text-secondary mt-1 ${className}`}>
      {children}
    </p>
  );
}

// Card Footer Component
interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-4 py-3 border-t border-border-color bg-background-tertiary/50 rounded-b-lg ${className}`}>
      {children}
    </div>
  );
}

// Status Card Component (for metrics/stats)
interface StatusCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  className?: string;
}

export function StatusCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  status = 'neutral',
  className = '' 
}: StatusCardProps) {
  const statusColors = {
    success: 'border-status-success/30 bg-status-success/5',
    warning: 'border-status-warning/30 bg-status-warning/5',
    error: 'border-status-error/30 bg-status-error/5',
    info: 'border-status-info/30 bg-status-info/5',
    neutral: 'border-border-color bg-background-secondary',
  };
  
  const statusDotColors = {
    success: 'bg-status-success',
    warning: 'bg-status-warning',
    error: 'bg-status-error',
    info: 'bg-status-info',
    neutral: 'bg-text-muted',
  };
  
  return (
    <Card className={`${statusColors[status]} ${className}`} hover={false}>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
              <div className={`w-2 h-2 rounded-full ${statusDotColors[status]}`} />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-text-primary">{value}</div>
              {subtitle && (
                <p className="text-xs text-text-muted">{subtitle}</p>
              )}
            </div>
            
            {trend && (
              <div className="mt-3 flex items-center space-x-1">
                <span className={`text-xs font-medium ${
                  trend.isPositive ? 'text-status-success' : 'text-status-error'
                }`}>
                  {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
                </span>
                {trend.label && (
                  <span className="text-xs text-text-muted">{trend.label}</span>
                )}
              </div>
            )}
          </div>
          
          {icon && (
            <div className="flex-shrink-0 ml-4">
              <div className="w-8 h-8 flex items-center justify-center text-text-muted">
                {icon}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Conversation Card Component (Slack-style)
interface ConversationCardProps {
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  status?: 'online' | 'away' | 'offline';
  category?: string;
  onClick?: () => void;
  className?: string;
}

export function ConversationCard({
  name,
  avatar,
  lastMessage,
  timestamp,
  unreadCount,
  priority = 'low',
  status = 'offline',
  category,
  onClick,
  className = ''
}: ConversationCardProps) {
  const priorityColors = {
    low: 'border-l-text-muted',
    medium: 'border-l-status-info',
    high: 'border-l-status-warning',
    urgent: 'border-l-status-error',
  };
  
  const statusColors = {
    online: 'bg-status-success',
    away: 'bg-status-warning',
    offline: 'bg-text-muted',
  };
  
  return (
    <Card 
      className={`conversation-item border-l-4 ${priorityColors[priority]} ${className}`}
      onClick={onClick}
    >
      <CardContent padding="md">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {avatar ? (
              <img 
                src={avatar} 
                alt={name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-zealynx-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background-secondary ${statusColors[status]}`} />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-text-primary truncate">
                {name}
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-text-muted">{timestamp}</span>
                {unreadCount && unreadCount > 0 && (
                  <div className="bg-zealynx-500 text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-sm text-text-secondary truncate mt-0.5">
              {lastMessage}
            </p>
            
            {category && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-background-tertiary text-text-muted">
                  {category}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Action Card Component
interface ActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  action: {
    label: string;
    onClick: () => void;
  };
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export function ActionCard({
  title,
  description,
  icon,
  action,
  variant = 'secondary',
  className = ''
}: ActionCardProps) {
  const variantClasses = {
    primary: 'border-zealynx-500/30 bg-zealynx-500/5',
    secondary: 'border-border-color bg-background-secondary',
    success: 'border-status-success/30 bg-status-success/5',
    warning: 'border-status-warning/30 bg-status-warning/5',
    error: 'border-status-error/30 bg-status-error/5',
    info: 'border-status-info/30 bg-status-info/5',
  };
  
  const buttonVariants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'bg-status-success hover:bg-status-success/90 text-white',
    warning: 'bg-status-warning hover:bg-status-warning/90 text-white',
    error: 'bg-status-error hover:bg-status-error/90 text-white',
    info: 'bg-status-info hover:bg-status-info/90 text-white',
  };
  
  return (
    <Card className={`${variantClasses[variant]} ${className}`}>
      <CardContent>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 flex items-center justify-center text-text-muted">
              {icon}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-text-primary">{title}</h4>
            <p className="text-sm text-text-secondary mt-1">{description}</p>
            <button 
              onClick={action.onClick}
              className={`mt-3 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${buttonVariants[variant]}`}
            >
              {action.label}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}