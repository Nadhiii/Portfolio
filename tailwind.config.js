/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0A0A0A",
          surface: "#1E1E1E",
          border: "#2A2A2A",
          orange: "#E8732A",
          text: "#F5F0E8",
          muted: "#888888",
          green: "#1A6B3A",
          gold: "#C9A84C",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        kannada: ["Noto Sans Kannada", "sans-serif"],
        malayalam: ["Noto Sans Malayalam", "sans-serif"],
        tamil: ["Noto Sans Tamil", "sans-serif"],
        telugu: ["Noto Sans Telugu", "sans-serif"],
        hindi: ["Noto Sans Devanagari", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        monument: ["Monument Extended", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
