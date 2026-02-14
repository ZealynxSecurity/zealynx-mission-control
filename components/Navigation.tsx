'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DASHBOARD_CONFIG, ZEALYNX_BRAND } from '@/lib/constants';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = '' }: NavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll state for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navigationItems = DASHBOARD_CONFIG.components.map((component) => ({
    ...component,
    href: component.route,
    isActive: pathname === component.route || 
              (component.route !== '/' && pathname.startsWith(component.route)),
  }));

  return (
    <>
      {/* Desktop Navigation Sidebar */}
      <aside className={`hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 ${className}`}>
        <div className="flex flex-col flex-grow bg-surface-elevated border-r border-border-default">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-border-subtle">
            <div className="w-10 h-10 bg-gradient-zealynx rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">Z</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-text-primary">
                {ZEALYNX_BRAND.name}
              </h1>
              <p className="text-xs text-text-tertiary">Mission Control</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`nav-link ${item.isActive ? 'active' : ''}`}
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-medium truncate">
                    {item.title}
                  </span>
                  <span className="block text-xs text-text-tertiary truncate">
                    {item.description}
                  </span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Status Footer */}
          <div className="px-6 py-4 border-t border-border-subtle">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
              <span className="text-xs text-text-secondary">
                All systems operational
              </span>
            </div>
            <div className="mt-2 text-xs text-text-tertiary">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className={`lg:hidden mobile-header transition-all duration-200 ${
        isScrolled ? 'bg-background/95 shadow-elevated' : 'bg-background/80'
      }`}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-zealynx rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">Z</span>
            </div>
            <span className="text-lg font-semibold text-text-primary">
              Mission Control
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-surface-elevated border border-border-default"
            aria-label="Toggle navigation menu"
          >
            <svg
              className={`w-5 h-5 text-text-primary transition-transform duration-200 ${
                isMobileMenuOpen ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="border-t border-border-subtle bg-surface-elevated/95 backdrop-blur-xl">
            <nav className="px-4 py-4 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    item.isActive
                      ? 'bg-zealynx-500/10 text-zealynx-300 border border-zealynx-500/20'
                      : 'text-text-secondary hover:bg-surface-interactive hover:text-text-primary'
                  }`}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-text-tertiary">{item.description}</div>
                  </div>
                  {item.isActive && (
                    <div className="w-2 h-2 bg-zealynx-500 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden mobile-bottom-nav">
        <div className="flex justify-around py-2">
          {navigationItems.slice(0, 5).map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${
                item.isActive
                  ? 'text-zealynx-300'
                  : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs font-medium truncate max-w-[60px]">
                {item.title.split(' ')[0]}
              </span>
              {item.isActive && (
                <div className="w-1 h-1 bg-zealynx-500 rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

// Page layout wrapper component
interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageLayout({ 
  children, 
  title, 
  subtitle, 
  actions, 
  className = '' 
}: PageLayoutProps) {
  return (
    <div className="min-h-screen lg:pl-64">
      <Navigation />
      
      <main className={`pb-16 lg:pb-0 pt-16 lg:pt-0 ${className}`}>
        {(title || subtitle || actions) && (
          <div className="container-app py-6 lg:py-8 border-b border-border-subtle bg-background/50">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                {title && (
                  <h1 className="heading-lg zealynx-gradient-text">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="subheading mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
              {actions && (
                <div className="flex-shrink-0">
                  {actions}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="container-app py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}