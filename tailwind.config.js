/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1920px'
    },
    fontFamily: {
      battambang: ['Battambang', 'sans-serif'],
      lato: ['Lato', 'sans-serif'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
