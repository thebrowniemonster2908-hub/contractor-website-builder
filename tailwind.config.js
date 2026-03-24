/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        light: '300',
      },
      letterSpacing: {
        tight: '-0.025em',
        wide: '0.025em',
        widest: '0.1em',
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out',
        slideInFromLeft: 'slideInFromLeft 0.8s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
