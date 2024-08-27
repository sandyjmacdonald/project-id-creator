/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '108': '27rem',
        '120': '30rem',
        '128': '32rem'
      }
    },
  },
  plugins: [],
  darkMode: 'media',
}