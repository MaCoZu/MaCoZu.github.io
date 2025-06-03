// @ts-check
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";

import react from "@astrojs/react";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://macozu.github.io",
  outDir: "docs",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false, // Disable source maps entirely
    },
    optimizeDeps: {
      exclude: ["svgo"],
    },
  },
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
    shikiConfig: {
      themes: {
        light: "one-light",
        dark: "gruvbox-dark-medium",
      },
      wrap: true,
    },
    rehypePlugins: [rehypeKatex],
  },
});
