/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'inter': ['Inter'],
    },
    backgroundImage: {
      'mainpage': "url('../src/assets/mainpagebg.gif')",
      'about': "url('../src/assets/wave (15).svg')"
    }
  },
  plugins: [],
}