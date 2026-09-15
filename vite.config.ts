import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { cdnAdapter } from "@vinext/cloudflare/cache/cdn-adapter";

export default defineConfig({
  plugins: [
    vinext({
      // O catálogo atual não usa `use cache`/unstable_cache, então não exige KV.
      // O CDN adapter mantém ISR/page cache na borda da Cloudflare e os arquivos
      // de public/ continuam servidos como Static Assets, sem consumir Worker CPU.
      cache: { cdn: cdnAdapter() },
    }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
