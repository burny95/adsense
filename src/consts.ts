// 사이트 전역 설정값 (여러 페이지에서 공통으로 사용)

export const SITE_NAME = 'Burny Tools'; // 원하는 이름으로 자유롭게 변경 가능
export const SITE_DESCRIPTION =
  '웹 퍼블리셔·디자이너를 위한 프론트엔드 도구와 가이드 모음';

// 문의용 실제 이메일 (애드센스 심사 시 연락 가능한 주소가 있어야 함)
export const CONTACT_EMAIL = 'shskse5@gmail.com';

// 검색엔진 노출 스위치.
// false = 모든 페이지에 noindex → 검색에 안 잡힘 (완성 전까지 유지)
// 콘텐츠 충분해지면 true 로 바꾸고 푸시
export const SITE_LIVE = true;

// 검색엔진 소유확인용 메타 태그 값 (각 콘솔에서 'HTML 태그' 방식으로 발급받아 입력)
export const VERIFICATION = {
  naver: '261f9f84ec2f15dc260db12079fca98272f6a0a4', // 네이버 서치어드바이저
};

// 네비게이션 메뉴.
// secondary: true 인 항목은 좁은 화면에서 헤더에 숨기고 푸터에만 노출
export interface NavLink {
  href: string;
  label: string;
  secondary?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: '홈' },
  { href: '/tools', label: '도구' },
  { href: '/blog', label: '블로그' },
  { href: '/about', label: '소개', secondary: true },
  { href: '/contact', label: '문의', secondary: true },
];

// 도구·글 공통 카테고리 (목록 페이지에서 섹션 구분에 사용)
export const CATEGORIES = {
  css: 'CSS',
  color: '색상',
  image: '이미지',
  markup: '마크업',
  productivity: '생산성',
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
