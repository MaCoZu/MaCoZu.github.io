import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    assets: '_astro',
    format: 'directory'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) { if (id.includes('node_modules')) { return 'vendor'; } }
        }
      }
    },
    plugins: [tailwindcss()],   
    optimizeDeps: { 
      include: ['d3']
    },
    resolve: {
      alias: [
            { find: '@/', replacement: path.resolve(__dirname, './src/') },
            { find: '@scripts/', replacement: path.resolve(__dirname, './src/scripts/') },
            { find: '@styles/', replacement: path.resolve(__dirname, './src/styles/') },
            { find: '@layouts/', replacement: path.resolve(__dirname, './src/layouts/') },
            { find: '@components/', replacement: path.resolve(__dirname, './src/components/') },
      ],
      conditions: ['import', 'module']
    },
  },
  scopedStyleStrategy: 'where',
  integrations: [
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  ],
}); 