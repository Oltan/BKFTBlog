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
        // Cyberpunk theme
        'cyber-primary': '#00fff9',
        'cyber-secondary': '#ff00ff',
        'cyber-accent': '#ffff00',
        'cyber-dark': '#0a0a0a',
        'cyber-neon': '#ff006e',

        // Medieval Fantasy theme
        'fantasy-gold': '#ffd700',
        'fantasy-burgundy': '#800020',
        'fantasy-parchment': '#f4e8d0',
        'fantasy-dark': '#2d1810',
        'fantasy-emerald': '#50c878',

        // Space Opera theme
        'space-blue': '#1e3a8a',
        'space-purple': '#7c3aed',
        'space-cyan': '#06b6d4',
        'space-dark': '#0f172a',
        'space-nebula': '#ec4899',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'fantasy': ['Cinzel', 'serif'],
        'space': ['Exo 2', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(#00fff9 1px, transparent 1px), linear-gradient(90deg, #00fff9 1px, transparent 1px)",
        'fantasy-texture': "url('/textures/parchment.jpg')",
        'space-stars': "radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px)",
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
