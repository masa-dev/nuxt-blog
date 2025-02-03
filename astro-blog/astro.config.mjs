// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://masa-dev.net",
  integrations: [mdx(), sitemap(), react()],
  trailingSlash: "never",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // bootstrapの警告を非表示にする
          silenceDeprecations: ["mixed-decls"],
        },
      },
    },
  },
});
