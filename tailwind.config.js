/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4C6EF5',
          dark: '#A5B4FC',
        },
        accent: {
          green: {
            light: '#22C55E',
            dark: '#86EFAC',
          },
          purple: {
            light: '#8B5CF6',
            dark: '#C4B5FD',
          },
          orange: {
            light: '#F97316',
            dark: '#FDBA74',
          }
        },
        text: {
          light: '#1F2937',
          dark: '#F3F4F6',
        },
        background: {
          light: '#FFFFFF',
          dark: '#111827',
        },
        surface: {
          light: '#F9FAFB',
          dark: '#1F2937',
        }
      },
      fontFamily: {
        heading: ['Rammetto One', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slideInUp': 'slideInUp 0.5s ease-out',
        'fadeInScale': 'fadeInScale 0.6s ease-out',
        'slideUpBounce': 'slideUpBounce 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounceIn': 'bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(76, 110, 245, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(76, 110, 245, 0.6)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUpBounce: {
          '0%': { transform: 'translateY(100vh)', opacity: '0' },
          '60%': { transform: 'translateY(-10px)', opacity: '1' },
          '80%': { transform: 'translateY(5px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3) translateY(100px)' },
          '50%': { opacity: '1', transform: 'scale(1.05) translateY(-10px)' },
          '70%': { transform: 'scale(0.9) translateY(2px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(76, 110, 245, 0.3)',
        'glow-lg': '0 0 40px rgba(76, 110, 245, 0.4)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      }
    },
  },
  plugins: [],
}