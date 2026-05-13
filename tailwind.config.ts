import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0b0b0f',
        'dark-card': '#1a1a23',
        'dark-border': '#2a2a35',
        accent: '#ff3b7b',
        'accent-light': 'rgba(255, 59, 123, 0.15)',
        'accent-glow': 'rgba(255, 59, 123, 0.3)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 59, 123, 0.3)',
        'glow-lg': '0 0 30px rgba(255, 59, 123, 0.4)',
        'sm-dark': '0 2px 8px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(255, 59, 123, 0.3)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 30px rgba(255, 59, 123, 0.5)' },
        }
      }
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
        },
        '.scrollbar-thumb-dark-border': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#2a2a35',
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: '#3a3a45',
            },
          },
        },
        '.scrollbar-track-transparent': {
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        },
      })
    }),
  ],
}

export default config
