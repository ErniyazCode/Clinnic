/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#007f94',
        },
        fontFamily: {
          sans: ['Manrope', 'system-ui', 'sans-serif'],
          display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
          outfit: ['Manrope', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
          playfair: ['Playfair Display', 'serif'],
          montserrat: ['Montserrat', 'sans-serif'],
          cormorant: ['Cormorant Garamond', 'serif'],
          syne: ['Syne', 'sans-serif'],
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'marquee': 'marquee 25s linear infinite',
          'marquee2': 'marquee2 25s linear infinite',
        },
        keyframes: {
          marquee: {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-100%)' },
          },
          marquee2: {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(0%)' },
          },
        }
      },
    },
    plugins: [],
  }
