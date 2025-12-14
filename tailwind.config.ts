import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'game-green': '#2d5016',
        'card-red': '#d32f2f',
        'card-black': '#1a1a1a',
      },
      animation: {
        'card-flip': 'flip 0.6s ease-in-out',
        'card-deal': 'deal 0.5s ease-out',
        'card-draw': 'draw 0.4s ease-out',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        deal: {
          '0%': { transform: 'translateY(-100px) scale(0.8)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        draw: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(20px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config