// 도구 등록소.
// 도구 페이지는 src/pages/tools/<slug>.astro 로 직접 만들고,
// 여기에 메타데이터를 등록하면 /tools 목록과 상호 링크에 자동 반영됨.
import type { CategoryKey } from './consts';

export interface Tool {
  slug: string; // /tools/<slug>
  title: string;
  description: string; // 목록·검색결과에 노출되는 한 줄 설명
  category: CategoryKey;
  relatedPosts?: string[]; // 관련 블로그 글 slug 목록
}

export const TOOLS: Tool[] = [
  {
    slug: 'clamp-generator',
    title: 'CSS clamp() 생성기',
    description:
      '뷰포트 범위와 최소·최대 크기를 입력하면 미디어쿼리 없이 반응하는 clamp() 값을 만들어 줍니다.',
    category: 'css',
    relatedPosts: ['responsive-typography-with-clamp'],
  },
  {
    slug: 'contrast-checker',
    title: '색상 대비 검사기 (WCAG)',
    description:
      '글자색과 배경색의 명도 대비를 계산해 WCAG AA·AAA 기준 통과 여부를 알려주고, 실패 시 통과하는 색을 추천합니다.',
    category: 'color',
    relatedPosts: ['understanding-wcag-contrast'],
  },
];

export function getTool(slug: string): Tool {
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) throw new Error(`등록되지 않은 도구: ${slug}`);
  return tool;
}
