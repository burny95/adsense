// @ts-check
import fs from 'node:fs';
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// 글의 실제 수정일을 사이트맵 lastmod로 싣는다.
// 구글은 값이 꾸준히 정확할 때만 이걸 재크롤 신호로 쓴다. 그래서 날짜를 가진
// 글에만 넣고 나머지 페이지에는 넣지 않는다 — 전 페이지를 빌드 시각으로 채우면
// 매번 "전부 방금 바뀜"이 되어 신호가 오히려 죽는다.
const BLOG_DIR = new URL('./src/content/blog/', import.meta.url);

/** @type {Map<string, string>} */
const lastmodBySlug = new Map();

for (const file of fs.readdirSync(BLOG_DIR)) {
  if (!file.endsWith('.md')) continue;
  const text = fs.readFileSync(new URL(file, BLOG_DIR), 'utf8');

  // 프론트매터만 떼어낸다 (본문에 같은 키가 있어도 걸리지 않게)
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;
  const fm = m[1];

  // 비공개 글은 빌드에서 빠지므로 사이트맵에도 없다
  if (/^draft:\s*true\s*$/m.test(fm)) continue;

  // 고친 날이 있으면 그것이, 없으면 발행일이 마지막 수정일이다
  const date =
    fm.match(/^updatedAt:\s*(\S+)/m)?.[1] ?? fm.match(/^publishedAt:\s*(\S+)/m)?.[1];
  if (!date) continue;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) continue;

  lastmodBySlug.set(file.replace(/\.md$/, ''), parsed.toISOString());
}

// https://astro.build/config
export default defineConfig({
  // sitemap / canonical URL 생성 기준 주소
  site: 'https://burnytools.com',
  integrations: [
    sitemap({
      serialize(item) {
        const slug = item.url.match(/\/blog\/([^/]+)\/$/)?.[1];
        const lastmod = slug && lastmodBySlug.get(slug);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
});
