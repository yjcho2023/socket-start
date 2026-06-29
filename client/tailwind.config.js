/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        main_green: '#00e700',
        sub_green: '#00a65f',
        dark_green: '#008299',
      },
      fontFamily: {
        nanum: ['NanumSquareNeo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
