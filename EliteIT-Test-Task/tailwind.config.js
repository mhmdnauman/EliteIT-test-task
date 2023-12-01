/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-darkBlue': '#010C29',
        'custom-midBlue': '#19284E',
      },
    },
  },
  plugins: [],
}