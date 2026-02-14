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
        // Zealynx Brand Colors
        zealynx: {
          50: '#f0fdfe',
          100: '#cbf7f9',
          200: '#9eedf2',
          300: '#63dbe5',   // Light teal
          400: '#39bef0',   // Blue accent
          500: '#13B7C1',   // Primary teal
          600: '#0e9ba3',
          700: '#0c7c84',   // Dark teal
          800: '#0f6169',
          900: '#135157',
          950: '#083235',
        },
        
        // Semantic Colors
        background: {
          DEFAULT: '#0a0a0b',      // Almost black
          secondary: '#1a1b1e',    // Dark card background
          tertiary: '#2a2b30',     // Elevated background
        },
        
        surface: {
          DEFAULT: '#1a1b1e',      // Card surface
          elevated: '#2a2b30',     // Elevated surface
          interactive: '#363740',  // Interactive elements
        },
        
        text: {
          primary: '#f8fafc',      // Almost white
          secondary: '#cbd5e1',    // Light gray
          tertiary: '#94a3b8',     // Medium gray
          inverse: '#1e293b',      // Dark text on light
        },
        
        border: {
          DEFAULT: '#334155',      // Default border
          subtle: '#1e293b',       // Subtle border
          strong: '#475569',       // Strong border
        },
        
        // Status Colors
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb', 
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626', 
          700: '#b91c1c',
        },
        info: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
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
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
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
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(19, 183, 193, 0.1)',
          },
          '100%': {
            boxShadow: '0 0 40px rgba(19, 183, 193, 0.3)',
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
      
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'dramatic': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'zealynx': '0 0 20px rgba(19, 183, 193, 0.15)',
        'zealynx-lg': '0 0 40px rgba(19, 183, 193, 0.2)',
        'inner-subtle': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      
      backdropBlur: {
        'xs': '2px',
        '3xl': '64px',
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-zealynx': 'linear-gradient(135deg, #13B7C1 0%, #63dbe5 100%)',
        'gradient-zealynx-dark': 'linear-gradient(135deg, #0c7c84 0%, #13B7C1 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },
    },
  },
  plugins: [
    // Custom utility classes
    function({ addUtilities }: any) {
      addUtilities({
        '.text-gradient-zealynx': {
          background: 'linear-gradient(135deg, #13B7C1 0%, #63dbe5 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          color: 'transparent',
        },
        '.border-gradient-zealynx': {
          background: 'linear-gradient(135deg, #13B7C1 0%, #63dbe5 100%)',
          padding: '1px',
          borderRadius: 'inherit',
        },
        '.glass-zealynx': {
          background: 'rgba(26, 27, 30, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-zealynx-strong': {
          background: 'rgba(42, 43, 48, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        },
      });
    },
  ],
};

export default config;