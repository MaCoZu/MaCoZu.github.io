/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{html,js}",
    "./public/*",
    "./node_modules/flowbite/**/*.js"
  
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),


  ],
}

