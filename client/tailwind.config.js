/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quiz: {
          dark: '#0f0c20',
          card: 'rgba(255, 255, 255, 0.07)',
          accent: '#8b5cf6',
          pink: '#ec4899',
          yellow: '#f59e0b',
          blue: '#3b82f6',
          green: '#10b981',
          red: '#ef4444'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' }
        }
      }
    },
  },
  plugins: [],
}
