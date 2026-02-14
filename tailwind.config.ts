import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enterprise Background System
        'background-primary': '#0F0F0F',     // Deep black (Linear inspired)
        'background-secondary': '#1A1A1A',   // Card backgrounds
        'background-tertiary': '#2A2A2A',    // Elevated elements
        'background-hover': '#323232',       // Interactive hover states
        'background-active': '#404040',      // Active states
        
        // Enterprise Text Hierarchy
        'text-primary': '#FFFFFF',     // Main content
        'text-secondary': '#B8B8B8',   // Secondary info
        'text-muted': '#6B7280',       // Timestamps, labels
        
        // Professional Status Colors
        'status-success': '#10B981',     // Active, completed
        'status-warning': '#F59E0B',     // Pending, attention
        'status-error': '#EF4444',       // Urgent, errors
        'status-info': '#3B82F6',        // Information
        
        // Zealynx Brand Colors
        zealynx: {
          50: '#f0fdfe',
          100: '#cbf7f9',
          200: '#9eedf2',
          300: '#63dbe5',         // Light teal
          400: '#33C5CE',         // Medium teal
          500: '#13B7C1',         // Primary teal
          600: '#0F9AA3',         // Darker teal
          700: '#0c7c84',         // Dark teal
          800: '#0f6169',
          900: '#135157',
          950: '#083235',
        },
        
        // Border Colors
        'border-color': '#374151',        // Consistent borders
      },
      
      // Enterprise Spacing System (4px base)
      spacing: {
        '0.5': '2px',   // 0.5 * 4px
        '1': '4px',     // Tight spacing
        '2': '8px',     // Small spacing
        '3': '12px',    // Default spacing
        '4': '16px',    // Medium spacing
        '5': '20px',    // Large spacing
        '6': '24px',    // Section spacing
        '8': '32px',    // Major spacing
        '10': '40px',   // Page margins
        '12': '48px',   // Large margins
      },
      
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      
      // Professional Typography Scale
      fontSize: {
        'xs': '12px',    // Labels, timestamps
        'sm': '14px',    // Body text, descriptions
        'base': '16px',  // Primary content
        'lg': '18px',    // Subheadings
        'xl': '20px',    // Card titles
        '2xl': '24px',   // Section headers
        '3xl': '30px',   // Page titles
      },
      
      fontWeight: {
        'medium': '500',  // Emphasis
        'semibold': '600', // Headings
        'bold': '700',    // Strong emphasis
      },
      
      // Professional Animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scaleIn: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
      
      // Enterprise Shadow System
      boxShadow: {
        'enterprise': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'enterprise-lg': '0 10px 25px rgba(0, 0, 0, 0.4)',
        'zealynx': '0 0 20px rgba(19, 183, 193, 0.15)',
        'zealynx-lg': '0 0 40px rgba(19, 183, 193, 0.2)',
      },
      
      // Professional Border Radius
      borderRadius: {
        'lg': '8px',      // Cards
        'xl': '12px',     // Large cards
      },
      
      backgroundImage: {
        'gradient-zealynx': 'linear-gradient(135deg, #13B7C1 0%, #63dbe5 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%)',
      },
      
      // Mobile-First Breakpoints
      screens: {
        'xs': '320px',    // Small phones
        'sm': '640px',    // Large phones
        'md': '768px',    // Tablets
        'lg': '1024px',   // Laptops
        'xl': '1280px',   // Desktops
        '2xl': '1536px',  // Large screens
      },
    },
  },
  plugins: [],
};

export default config;