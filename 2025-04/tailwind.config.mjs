// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}', // This tells Tailwind where to scan for classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true, // <--- THIS IS THE CRUCIAL LINE
};
