import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";

export default defineConfig({
  site: "https://macozu.github.io",
  base: "/",
  output: "static",
  build: {
    outDir: "docs",
  },
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkToc, remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      themes: {
        light: "one-light",
        dark: "gruvbox-dark-medium",
      },
      wrap: true,
    },
  },
});
