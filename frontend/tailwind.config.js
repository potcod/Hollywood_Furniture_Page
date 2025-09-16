/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    
   "./src/pages/**/*.{js,ts,jsx,tsx}",      
    "./src/css_styles/**/*.{css}",           
  ],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
