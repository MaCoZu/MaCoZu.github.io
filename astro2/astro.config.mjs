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
  publicDir: './public',
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
        '@scripts': '/src/scripts',
        '@/': path.resolve(__dirname, './src/'),
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