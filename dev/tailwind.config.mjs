/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public/*",
    "./*.{html,js}",
    "./public/**/*.{html, js, cjs}",
    "./*.{html, js, cjs}",
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

