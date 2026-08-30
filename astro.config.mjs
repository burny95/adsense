// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // sitemap / canonical URL 생성 기준 주소
  site: 'https://burnytools.com',
  integrations: [sitemap()],
});
