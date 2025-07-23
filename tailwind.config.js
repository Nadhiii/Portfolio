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
          }
        },
        text: {
          light: '#1F2937',
          dark: '#F3F4F6',
        },
        background: {
          light: '#FFFFFF',
          dark: '#111827',
        }
      },
      fontFamily: {
        heading: ['Rammetto One', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}