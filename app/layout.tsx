import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import EnterpriseLayout from "@/components/EnterpriseLayout";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#13B7C1',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  title: {
    default: 'Zealynx Mission Control',
    template: '%s | Zealynx Mission Control',
  },
  description: 'Business Intelligence Dashboard for unified operations across Telegram, Enreach CRM, Calendar, and automation systems. Real-time monitoring with hybrid SQL + vector database.',
  keywords: [
    'Zealynx Security',
    'Mission Control',
    'Business Intelligence', 
    'CRM Dashboard',
    'Telegram Management',
    'Web3 Security',
    'Smart Contract Audits',
    'Enreach Integration',
    'Real-time Analytics'
  ],
  authors: [{ name: 'Zealynx Security', url: 'https://zealynx.io' }],
  creator: 'Zealynx Security',
  publisher: 'Zealynx Security',
  robots: {
    index: false, // Internal dashboard - not for public indexing
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: [
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Mission Control',
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
  },
  category: 'business',
  classification: 'business intelligence dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* PWA meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Mission Control" />
        <meta name="msapplication-TileColor" content="#13B7C1" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* iOS specific */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Mission Control" />
        <meta name="apple-touch-fullscreen" content="yes" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* DNS prefetch for faster loading */}
        <link rel="dns-prefetch" href="//api.openai.com" />
        <link rel="dns-prefetch" href="//api.supabase.co" />
        <link rel="dns-prefetch" href="//api.telegram.org" />
      </head>
      
      <body className={`${inter.variable} font-sans antialiased mobile-safe-area`}>
        {/* Main app content */}
        <div className="relative z-0 min-h-screen min-h-dvh">
          <EnterpriseLayout>
            {children}
          </EnterpriseLayout>
        </div>
        
        {/* Development indicators */}
        {process.env.NODE_ENV === 'development' && (
          <>
            {/* Development banner */}
            <div className="fixed top-0 left-0 z-50 bg-warning-500 text-black px-2 py-1 text-xs font-medium rounded-br">
              DEV
            </div>
            
            {/* Loading indicator */}
            <div 
              id="dev-loading" 
              className="fixed top-4 right-4 z-50 opacity-0 pointer-events-none transition-opacity duration-300"
            >
              <div className="bg-surface-elevated border border-border-default px-3 py-2 rounded-lg shadow-elevated">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-zealynx-500 rounded-full animate-pulse" />
                  <span className="text-sm text-text-secondary">Loading...</span>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* Service Worker registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Register service worker for PWA functionality
              if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('[SW] Registered:', registration.scope);
                    })
                    .catch(function(error) {
                      console.log('[SW] Registration failed:', error);
                    });
                });
              }
              
              // Handle loading states
              window.addEventListener('load', function() {
                const loadingEl = document.getElementById('dev-loading');
                if (loadingEl) {
                  loadingEl.style.opacity = '0';
                }
              });
              
              // Show loading indicator during navigation
              if (typeof window !== 'undefined') {
                let loadingTimer;
                
                function showLoading() {
                  const loadingEl = document.getElementById('dev-loading');
                  if (loadingEl) {
                    loadingEl.style.opacity = '1';
                  }
                }
                
                function hideLoading() {
                  const loadingEl = document.getElementById('dev-loading');
                  if (loadingEl) {
                    loadingEl.style.opacity = '0';
                  }
                }
                
                // Listen for route changes
                let previousUrl = '';
                const observer = new MutationObserver(function(mutations) {
                  if (location.href !== previousUrl) {
                    previousUrl = location.href;
                    showLoading();
                    
                    clearTimeout(loadingTimer);
                    loadingTimer = setTimeout(hideLoading, 1000);
                  }
                });
                
                observer.observe(document, { 
                  subtree: true, 
                  childList: true 
                });
              }
            `,
          }}
        />
        
        {/* Theme color meta for browser UI */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Dynamic theme color based on scroll position
              function updateThemeColor() {
                const scrolled = window.scrollY > 50;
                const metaThemeColor = document.querySelector('meta[name="theme-color"]');
                if (metaThemeColor) {
                  metaThemeColor.setAttribute('content', 
                    scrolled ? '#1a1b1e' : '#13B7C1'
                  );
                }
              }
              
              window.addEventListener('scroll', updateThemeColor);
              updateThemeColor();
            `,
          }}
        />
      </body>
    </html>
  );
}