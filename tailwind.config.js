/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          red: '#ff0000',
          dark: '#1a1a1a',
          white: '#ffffff',
        }
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px #ff0000, 0 0 20px #ff0000' },
          '100%': { boxShadow: '0 0 20px #ff0000, 0 0 40px #ff0000' },
        }
      }
    },
  },
  plugins: [],
}
