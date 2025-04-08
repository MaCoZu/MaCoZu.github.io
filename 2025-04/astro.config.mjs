// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import mdx from '@astrojs/mdx';
import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import rehypeExternalLinks from 'rehype-external-links';


import react from '@astrojs/react';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://macozu.github.io',
  outDir: 'docs',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx({
    remarkPlugins: [remarkToc, remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],

  }), react(), icon()],
  markdown: {
    remarkPlugins: [remarkToc, remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex ],
  },
 
});