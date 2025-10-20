/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,mjs,mts,ts,jsx,tsx}'],
    plugins: [require('tailwind-scrollbar-hide')],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        }
    }
}