// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';

export default defineConfig({
  site: 'https://macozu.github.io/',
  base: process.env.NODE_ENV === 'production' ? '/MaCoZu.github.io' : '/',
  output: 'static',
  integrations: [
    mdx({
      remarkPlugins: [remarkToc, remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    react(),
    icon(),
  ],

  markdown: {
    remarkPlugins: [remarkToc, remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: 'one-light',
        dark: 'gruvbox-dark-medium',
      },
      wrap: true,
    },
  },

  vite: {
    build: {
      sourcemap: false,
    },
    optimizeDeps: {
      exclude: ['svgo'],
    },
  },
});
