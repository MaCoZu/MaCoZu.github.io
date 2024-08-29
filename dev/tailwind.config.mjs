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
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

