import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/', //  Correct if deploying to username.github.io/
  build: {
    outDir: 'docs', 
    format: 'directory',
  },
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['d3']
    },
    resolve: {
      alias: {
        '@/': path.resolve(__dirname, './src/'),
        '@scripts/': path.resolve(__dirname, './src/scripts/'),
        '@styles/': path.resolve(__dirname, './src/styles/'),
        '@layouts/': path.resolve(__dirname, './src/layouts/'),
        '@components/': path.resolve(__dirname, './src/components/'),
      },
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