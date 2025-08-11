/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9e8',
          100: '#dcf1cc',
          200: '#b9e39a',
          300: '#93d068',
          400: '#73bc41',
          500: '#4d9921',
          600: '#2E7D32', // primary
          700: '#1B5E20',
          800: '#1a4e1a',
          900: '#173d17',
        },
        secondary: {
          50: '#f3e9e5',
          100: '#e7d3cc',
          200: '#d3b5aa',
          300: '#c09789',
          400: '#ac7967',
          500: '#8d6352',
          600: '#795548', // secondary
          700: '#5D4037',
          800: '#4e3329',
          900: '#3e291f',
        },
        accent: {
          50: '#fef7e9',
          100: '#fceed3',
          200: '#f9dda8',
          300: '#f5c87c',
          400: '#f2b350',
          500: '#ee9d24',
          600: '#E67E22', // accent
          700: '#be6a0f',
          800: '#9b570c',
          900: '#7d4709',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};