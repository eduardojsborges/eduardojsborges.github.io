import { defineConfig } from 'astro/config';
import remarkBase from './scripts/remark-base.mjs';

export default defineConfig({
  site: 'https://eduardojsborges.github.io',
  base: '/research-portfolio',
  trailingSlash: 'always',
  output: 'static',
  markdown: { remarkPlugins: [[remarkBase, { base: '/research-portfolio' }]] },
});
