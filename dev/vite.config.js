import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
//import vitePluginClean from 'vite-plugin-clean';

export default defineConfig({
    base: './',
    build: {
        outDir: './dist',
        emptyOutDir: true, // Cleans the output directory before building
        minify: 'esbuild',
        rollupOptions: {
            rollupOptions: {
                input: {
                    main: './index.html',
                    overview: './public/overview.html',
                    impressum: './public/impressum.html',
                },
            },
        },
    },
    define: {
        'process.env.BASE_URL': JSON.stringify('/MaCoZu.github.io/'),
    },
});
