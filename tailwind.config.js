/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./dist/*.{html,js}",
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

