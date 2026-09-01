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
    relatedPosts: ['css-clamp-basics', 'css-clamp-practical'],
  },
  {
    slug: 'contrast-checker',
    title: '색상 대비 검사기 (WCAG)',
    description:
      '글자색과 배경색의 명도 대비를 계산해 WCAG AA·AAA 기준 통과 여부를 알려주고, 실패 시 통과하는 색을 추천합니다.',
    category: 'color',
    relatedPosts: ['wcag-contrast-basics', 'wcag-contrast-practical'],
  },
  {
    slug: 'og-tag-generator',
    title: 'Open Graph / meta 태그 생성기',
    description:
      '제목·설명·이미지·URL을 입력하면 SNS 공유용 Open Graph와 Twitter 카드 메타 태그를 만들고, 미리보기 카드로 결과를 보여줍니다.',
    category: 'markup',
    relatedPosts: ['seo-meta-tags-and-open-graph', 'link-preview-not-showing-checklist'],
  },
  {
    slug: 'px-rem-converter',
    title: 'px ↔ rem 변환기',
    description:
      'px 값을 rem으로, rem 값을 px로 바꿔 줍니다. 기준 폰트 크기를 바꿔 계산할 수 있고, 자주 쓰는 값 대조표도 제공합니다.',
    category: 'css',
  },
  {
    slug: 'box-shadow-generator',
    title: 'box-shadow 생성기',
    description:
      '그림자 레이어를 여러 겹 쌓아 자연스러운 box-shadow를 만들고, 실시간 미리보기와 함께 CSS 코드를 복사할 수 있습니다.',
    category: 'css',
  },
  {
    slug: 'case-converter',
    title: '네이밍 컨벤션 변환기',
    description:
      '변수·클래스 이름을 camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE 등으로 한 번에 변환합니다. 여러 줄 일괄 처리도 됩니다.',
    category: 'productivity',
  },
];

export function getTool(slug: string): Tool {
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) throw new Error(`등록되지 않은 도구: ${slug}`);
  return tool;
}

// 도구 페이지용 JSON-LD (SoftwareApplication)
export function toolSchema(tool: Tool, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tool.description,
    url: `${siteUrl}tools/${tool.slug}/`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}
