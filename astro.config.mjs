import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  load: {
    // Create a function to get the current build time
    getBuildTime: () => {
      return new Date().toISOString();
    },
  },
});
