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
        // Zealynx Brand Colors - extending default colors, not replacing them
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
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        'zealynx': '0 0 20px rgba(19, 183, 193, 0.15)',
        'zealynx-lg': '0 0 40px rgba(19, 183, 193, 0.2)',
      },
      
      backgroundImage: {
        'gradient-zealynx': 'linear-gradient(135deg, #13B7C1 0%, #63dbe5 100%)',
      },
    },
  },
  plugins: [],
};

export default config;