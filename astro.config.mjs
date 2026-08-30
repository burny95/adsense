// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 커스텀 도메인 연결 후 그 주소로 교체 (sitemap / 절대 URL 생성에 사용됨)
  site: 'https://adsense.shskse5.workers.dev',
  integrations: [sitemap()],
});
