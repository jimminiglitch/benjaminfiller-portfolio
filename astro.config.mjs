import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  site: 'https://benjaminfiller.dev',
  output: 'static',
  adapter: vercel(),
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'gsap': ['gsap'],
          }
        }
      }
    }
  },
  experimental: {
    contentCollections: true // Only needed if using Astro < 3.0
  }
});
