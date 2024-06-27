/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'btn-color': '#34CE00',
        'primary-blue': '#3DD0FF',
        'primary-yellow': '#FFBD3D',
        'primary-pink': '#F361A6',
        'primary-green': '#47C83E',
        'primary-brown': '#F29661',
        'primary-purple': '#ECADFF',
        'primary-darkblue': '#3162C7',
      },
      fontFamily: {
        inter: ['Inter-Bold'],
        'inter-r': ['Inter-Regular'],
      },
    },
  },
  plugins: [],
};
