import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';

export default defineConfig({
    base: '/MaCoZu.github.io/', // Adjust this to match your repo name
    build: {
        outDir: 'dist',
        sourcemap: true,
    },
    css: {
        postcss: {
            plugins: [tailwindcss('./tailwind.config.mjs')], // Link Tailwind config
        },
    },
});
