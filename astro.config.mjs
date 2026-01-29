import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  integrations: [tailwind(), svelte(), react()],
  output: 'server',
  adapter: vercel({
    runtime: 'nodejs20.x', // << Esto fuerza Node 20
  }),
});
