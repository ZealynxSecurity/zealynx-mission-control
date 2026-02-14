'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  Users, 
  Target, 
  Settings, 
  Menu, 
  X,
  Activity,
  TrendingUp,
  Bell,
  Search
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string | number;
}

const navigation: NavItem[] = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Telegram', href: '/telegram', icon: MessageSquare, badge: '12' },
  { label: 'CRM Pipeline', href: '/crm', icon: Target, badge: '52' },
  { label: 'Enreach', href: '/enreach', icon: TrendingUp },
  { label: 'Calendar & Crons', href: '/calendar', icon: Calendar },
  { label: 'Activity', href: '/activity', icon: Activity },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 transform bg-[var(--color-bg-secondary)] border-r border-[var(--color-border-primary)]
        transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-full flex-col">
          {/* Logo/Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-primary)]">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-[var(--color-text-primary)]">
                  Mission Control
                </h1>
                <p className="text-xs text-[var(--color-text-subtle)]">
                  Zealynx Studio
                </p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 scrollbar-custom overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all
                    ${isActive
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                    }
                  `}
                >
                  <item.icon 
                    size={18} 
                    className={`mr-3 flex-shrink-0 ${
                      isActive ? 'text-[var(--color-primary)]' : 'text-current'
                    }`} 
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={`
                      ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium
                      ${isActive
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-subtle)]'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="border-t border-[var(--color-border-primary)] p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center">
                <span className="text-white font-medium text-sm">C</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                  Carlos
                </p>
                <p className="text-xs text-[var(--color-text-subtle)] truncate">
                  carlos@zealynx.io
                </p>
              </div>
              <button className="p-1.5 rounded-md text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]">
                <Settings size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-[var(--color-bg-primary)]/95 backdrop-blur-sm border-b border-[var(--color-border-primary)]">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]"
              >
                <Menu size={20} />
              </button>
              
              {/* Search */}
              <div className="hidden sm:block">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-subtle)]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 pl-10 pr-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-lg text-sm placeholder-[var(--color-text-subtle)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/20"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-md text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]">
                <Bell size={18} />
                <span className="absolute top-1 right-1 h-2 w-2 bg-[var(--color-error)] rounded-full"></span>
              </button>
              
              {/* Status indicator */}
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-[var(--color-bg-tertiary)] rounded-full">
                <div className="h-2 w-2 bg-[var(--color-success)] rounded-full animate-pulse"></div>
                <span className="text-xs text-[var(--color-text-muted)]">All systems operational</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <div className="container-app py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}