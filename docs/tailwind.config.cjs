const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./public/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  
  server: {
    host: '127.0.0.1'
  },

  plugins: [
    // require('flowbite/plugin'),
    require('tailwindcss'),
    addDynamicIconSelectors(),
    require('@tailwindcss/typography'),
    require('autoprefixer'),
  ],
}

