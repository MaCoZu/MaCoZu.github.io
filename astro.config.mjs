import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://macozu.github.io',  // Correct base path for GitHub Pages subdirectory
  base: '/',                            //  Correct if deploying to the root of your site
  build: {
    outDir: 'docs',                     //  Crucial: Astro builds to the 'docs' directory
  },
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
  scopedStyleStrategy: 'where',
  integrations: [
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  ],
  experimental: {
    preserveScriptOrder: true
  }
});
