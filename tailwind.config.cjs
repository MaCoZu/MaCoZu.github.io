/** @type {import('tailwindcss').Config} */

const { addDynamicIconSelectors } = require('@iconify/tailwind');

module.exports = {
  base: './',
  content: [
    "./*.{html,js}",
    "./public/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    addDynamicIconSelectors(), // Iconify pluginx
  ],
}