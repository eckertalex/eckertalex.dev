// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { siteConfig } from "./src/content/siteConfig.ts";
import sitemap from "@astrojs/sitemap";
import metaTags from "astro-meta-tags";

export default defineConfig({
  site: siteConfig.site,
  markdown: {
    shikiConfig: {
      themes: {
        light: "rose-pine-dawn",
        dark: "rose-pine",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), metaTags()],
});
