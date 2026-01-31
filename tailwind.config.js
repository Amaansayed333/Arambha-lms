/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A192F', // Deep Navy
          light: '#112240',
          dark: '#020c1b',
        },
        secondary: {
          DEFAULT: '#D4AF37', // Gold
          light: '#E5C158',
          dark: '#B89628',
        },
        dark: {
            DEFAULT: '#0A192F',
            900: '#020c1b',
            800: '#0A192F',
            700: '#112240',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [],
}
