/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#d4c137',
        'gold-dark': '#a59b30',
        'gold-light': '#e6d951',
        'sage-green': 'rgb(169 186 157)',
        'burgundy': 'rgb(160 82 109)',
        'light-gray': 'rgb(237 237 237)',
        'off-white': 'rgb(242 242 242)',
        'light-text': 'rgb(237 237 237)'
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'elegant': ['Dancing Script', 'cursive'],
        'parisienne': ['Parisienne', 'cursive'],
        'raleway': ['Raleway', 'sans-serif'],
        'great-vibes': ['Great Vibes', 'cursive']
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in',
        'slide-up': 'slideUp 0.8s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}