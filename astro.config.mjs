// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 배포 도메인 확정 후 실제 주소로 교체 (sitemap / 절대 URL 생성에 사용됨)
  site: 'https://example.pages.dev',
  integrations: [sitemap()],
});
