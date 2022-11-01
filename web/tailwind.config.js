/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      backgroundImage: {
        app: 'url(/app-bg.png)',
      },
      colors: {
        gray: {
          100: '#E1E1E5',
          300: '#808d99',
          600: '#323238',
          800: '#202024',
          900: '#121214',
        },
  
        yellow: {
          500: '#F7DD43',
          700: '#e5cd3d',
        },
        ignite: {
          500: '#129E57',
        },
      },
    },
  },
  plugins: [],
};
