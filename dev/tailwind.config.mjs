/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./font.css",
    "./index.html",
    "./public/**/*.html",
    "./**/*.{html,js,cjs}", // Matches all HTML and JS files in any folder
  ],
  theme: {
    extend: {
      filter: {
        white: 'brightness(0) invert(1)', // Turns an SVG/image white
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-filters'),
  ],


}

