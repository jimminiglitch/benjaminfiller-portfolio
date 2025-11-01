import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  vite: {
    build: {
      cssMinify: 'lightningcss',
      minify: 'terser'
    }
  }
});
