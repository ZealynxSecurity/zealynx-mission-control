'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  HomeIcon, 
  ChatBubbleLeftRightIcon, 
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  Cog6ToothIcon,
  BellIcon,
  MagnifyingGlassIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Navigation items configuration
const navigationItems = [
  { 
    name: 'Overview', 
    href: '/', 
    icon: HomeIcon, 
    badge: null,
    description: 'Dashboard overview'
  },
  { 
    name: 'Telegram', 
    href: '/telegram', 
    icon: ChatBubbleLeftRightIcon, 
    badge: 6,
    description: '195+ conversations'
  },
  { 
    name: 'CRM Pipeline', 
    href: '/crm', 
    icon: ClipboardDocumentListIcon, 
    badge: 52,
    description: 'Deal management'
  },
  { 
    name: 'Enreach', 
    href: '/enreach', 
    icon: ChartBarIcon, 
    badge: null,
    description: 'Campaign analytics'
  },
  { 
    name: 'Calendar', 
    href: '/calendar', 
    icon: CalendarIcon, 
    badge: null,
    description: 'Schedule & automation'
  },
];

const secondaryItems = [
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Cog6ToothIcon, 
    badge: null,
    description: 'System configuration'
  },
];

// Badge Component
interface BadgeProps {
  count: number;
  variant?: 'default' | 'urgent' | 'warning';
}

function Badge({ count, variant = 'default' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full';
  
  const variantClasses = {
    default: 'bg-zealynx-500/20 text-zealynx-500 border border-zealynx-500/30',
    urgent: 'bg-status-error/20 text-status-error border border-status-error/30',
    warning: 'bg-status-warning/20 text-status-warning border border-status-warning/30',
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {count > 99 ? '99+' : count}
    </span>
  );
}

// Mobile Navigation Item
interface MobileNavItemProps {
  item: typeof navigationItems[0];
  isActive: boolean;
}

function MobileNavItem({ item, isActive }: MobileNavItemProps) {
  const Icon = item.icon;
  
  return (
    <Link 
      href={item.href}
      className={`
        flex flex-col items-center justify-center py-2 px-3 relative
        min-h-[60px] text-xs font-medium transition-colors duration-200
        ${isActive 
          ? 'text-zealynx-500' 
          : 'text-text-muted hover:text-text-primary'
        }
      `}
    >
      <div className="relative">
        <Icon className="h-6 w-6 mb-1" />
        {item.badge && (
          <div className="absolute -top-2 -right-2">
            <Badge 
              count={item.badge} 
              variant={item.badge > 5 ? 'urgent' : 'default'} 
            />
          </div>
        )}
      </div>
      <span className="truncate max-w-[60px]">{item.name}</span>
    </Link>
  );
}

// Desktop Navigation Item
function DesktopNavItem({ item, isActive }: { item: typeof navigationItems[0], isActive: boolean }) {
  const Icon = item.icon;
  
  return (
    <Link 
      href={item.href}
      className={`
        flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
        group relative
        ${isActive 
          ? 'bg-zealynx-500/10 text-zealynx-500 border-l-2 border-zealynx-500' 
          : 'text-text-secondary hover:text-text-primary hover:bg-background-hover'
        }
      `}
    >
      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span>{item.name}</span>
          {item.badge && (
            <Badge 
              count={item.badge} 
              variant={item.badge > 10 ? 'urgent' : 'default'} 
            />
          )}
        </div>
        {item.description && (
          <div className="text-xs text-text-muted mt-0.5">
            {item.description}
          </div>
        )}
      </div>
    </Link>
  );
}

// User Profile Component
function UserProfile() {
  return (
    <div className="flex items-center px-4 py-3 border-t border-border-color">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="h-8 w-8 bg-zealynx-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-white">C</span>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-status-success border-2 border-background-secondary rounded-full"></div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">Carlos</p>
          <p className="text-xs text-text-muted truncate">carlos@zealynx.io</p>
        </div>
        <Cog6ToothIcon className="h-4 w-4 text-text-muted hover:text-text-primary cursor-pointer transition-colors" />
      </div>
    </div>
  );
}

// Mobile Header
function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const currentPage = navigationItems.find(item => item.href === pathname);
  
  return (
    <div className="sticky top-0 z-30 bg-background-secondary/95 backdrop-blur-md border-b border-border-color">
      <div className="flex items-center justify-between px-4 py-3 safe-area-inset-top">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-text-primary">
              {currentPage?.name || 'Mission Control'}
            </h1>
            {currentPage?.description && (
              <p className="text-sm text-text-muted">
                {currentPage.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-text-secondary hover:text-text-primary transition-colors relative">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
          <button className="p-2 text-text-secondary hover:text-text-primary transition-colors relative">
            <BellIcon className="h-5 w-5" />
            <div className="absolute top-1 right-1 h-2 w-2 bg-status-error rounded-full"></div>
          </button>
        </div>
      </div>
    </div>
  );
}

// Desktop Sidebar
function DesktopSidebar() {
  const pathname = usePathname();
  
  return (
    <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 md:bg-background-secondary md:border-r md:border-border-color">
      {/* Logo Header */}
      <div className="flex items-center px-6 py-4 border-b border-border-color">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-gradient-to-br from-zealynx-500 to-zealynx-600 rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-white">Z</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-text-primary">Mission Control</h1>
            <p className="text-xs text-text-muted">Zealynx Studio</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div>
          <h2 className="px-4 text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Dashboard
          </h2>
          {navigationItems.map((item) => (
            <DesktopNavItem 
              key={item.name} 
              item={item} 
              isActive={pathname === item.href} 
            />
          ))}
        </div>
        
        <div className="pt-6">
          <h2 className="px-4 text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Settings
          </h2>
          {secondaryItems.map((item) => (
            <DesktopNavItem 
              key={item.name} 
              item={item} 
              isActive={pathname === item.href} 
            />
          ))}
        </div>
      </nav>
      
      {/* User Profile */}
      <UserProfile />
    </div>
  );
}

// Mobile Navigation
function MobileNavigation() {
  const pathname = usePathname();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background-secondary/95 backdrop-blur-md border-t border-border-color z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        {navigationItems.slice(0, 5).map((item) => (
          <MobileNavItem 
            key={item.name} 
            item={item} 
            isActive={pathname === item.href} 
          />
        ))}
      </div>
    </div>
  );
}

// Mobile Menu Overlay
function MobileMenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-background-secondary border-r border-border-color">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-color safe-area-inset-top">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-br from-zealynx-500 to-zealynx-600 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">Z</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-text-primary">Mission Control</h1>
              <p className="text-xs text-text-muted">Zealynx Studio</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
          {[...navigationItems, ...secondaryItems].map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 text-text-secondary hover:text-text-primary hover:bg-background-hover"
              >
                <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge 
                    count={item.badge} 
                    variant={item.badge > 10 ? 'urgent' : 'default'} 
                  />
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* User Profile */}
        <UserProfile />
      </div>
    </div>
  );
}

// Main Layout Component
interface EnterpriseLayoutProps {
  children: React.ReactNode;
}

export default function EnterpriseLayout({ children }: EnterpriseLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-background-primary">
      {/* Desktop Sidebar */}
      <DesktopSidebar />
      
      {/* Mobile Header */}
      <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />
      
      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
      
      {/* Main Content */}
      <div className="md:ml-64">
        <main className="pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
}