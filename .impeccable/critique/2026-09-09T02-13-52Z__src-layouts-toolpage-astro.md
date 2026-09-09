---
target: 도구 표면 전체 (ToolPage)
total_score: 24
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 3
target_identity: "file:C:\\Users\\User\\Desktop\\local_work\\adsense\\src\\layouts\\ToolPage.astro"
target_fingerprint: "sha256:a311211c1214b8537f64802b05735f457135928249b823ad9fbdd83a2f5a1ecc"
target_path: "C:\\Users\\User\\Desktop\\local_work\\adsense\\src\\layouts\\ToolPage.astro"
timestamp: 2026-09-09T02-13-52Z
slug: src-layouts-toolpage-astro
---
**Method: dual-agent** (A: 디자인 리뷰 · B: 디텍터 + 브라우저 증거). B가 A보다 먼저 완료되어 종합 맥락에 먼저 진입했으나, B 결과가 0건이라 A의 판단을 앵커할 여지는 없었다.

# Design Health Score — 24/40 (Acceptable)

| # | 휴리스틱 | 점수 | 핵심 소견 |
|---|---|:--:|---|
| 1 | 시스템 상태 가시성 | 3 | 라이브 계산 도구는 결과가 소리 없이 갈림 |
| 2 | 시스템과 현실의 일치 | 3 | `목록 비우기`는 내부 용어 |
| 3 | 사용자 통제와 자유 | 2 | 실행취소가 9개 중 2개뿐 |
| 4 | 일관성과 표준 | 1 | 골격 6종, 결과 취급 4종 |
| 5 | 오류 예방 | 2 | 쓰이지 않는 칸이 열려 무의미한 입력 유도 |
| 6 | 회상보다 인식 | 2 | 어느 칸이 쓰이는지 기억해야 함 |
| 7 | 유연성과 효율 | 3 | URL 상태 공유 9개 전부 동일 |
| 8 | 심미성과 미니멀리즘 | 2 | 컨테이너 1.05:1, 첫 화면 478px 빈 열 |
| 9 | 오류 인지·복구 | 3 | 문구 품질 최고 수준, 다만 전부 0.83rem |
| 10 | 도움말과 문서 | 3 | UI에 없는 동작을 설명함 |

# Design Specificity Verdict
고유하지 않음. 로고와 링크색만 바꾸면 무관한 도구 사이트와 구별 불가.
btn-primary가 9개 중 1곳에만, 슬라이더 3개가 크롬 기본 파랑, select/checkbox는 OS 기본.
브랜드가 보이는 곳은 링크 색·관련 글 제목·그라디언트 기본 정지점 셋뿐.

Deterministic scan: 디텍터 2회 모두 exit 0 `[]`. 콘솔 오류 0건. 오탐 없음.
Visual overlays: 주입 실패(javascript_tool 권한 거부 2회). CSP 아님. 오버레이 없음.

# Priority Issues
[P0] `[hidden]`이 `.field{display:flex}`에 짓밟혀 점진적 공개가 작동하지 않음.
  브라우저 확인: #w-field/#h-field hidden=true인데 display:flex 높이 75px,
  PNG 선택 후 #quality-field 108px. 문서(image-converter.astro:107)는
  "품질 값이 의미가 없어 자동으로 숨겨집니다"라고 반대로 설명. AdSense 심사 대상 텍스트.
  Fix: `.field[hidden]{display:none}`. → /impeccable harden

[P1] 컨트롤 경계 WCAG 1.4.11 미달. --border-strong 대 --surface 1.55:1 (필요 3:1),
  .card 대 --bg 1.05:1, .panel 1.08:1. 입력 칸 위치 자체가 식별 불가.
  → /impeccable colorize

[P1] 도구 9개에 골격 6종, 결과 취급 4종. px↔rem·대비 검사기에 복사 버튼 없음(확인).
  → /impeccable layout

[P1] 도구 문서 어절 공백 47개 소실. OG 13곳, 이미지 2곳(렌더 HTML 실측).
  Astro가 줄바꿈 뒤 인라인 요소 앞 공백을 삭제. → /impeccable clarify

[P2] 이미지 변환기 첫 화면 grid 320px+478px 중 오른쪽 전부 빈 열.
  390px에서 변환 63px < 목록 비우기 112px. → /impeccable layout

# Persona Red Flags
Sam: 입력 칸 시각 식별 불가(1.55:1). 도구가 제목 개요에 없음(첫 h2가 `사용법`).
  복사 성공에 aria-live 없음. 테마 토글 aria-pressed 없음.
Alex: px↔rem·대비검사기 값 추출 불가. 색 변환기 값↔복사 600px 이격. 도구→도구 경로가 푸터뿐.
Casey: 주 액션 63px로 최소. 900px 스크롤. 드롭존이 폰에서 불가능한 동작 지시.

# Minor
/tools 메타 "도구 6종"인데 실제 9개. 빵부스러기 마지막 항목이 h1과 동일 문자열.
그라디언트 .layer-head 1440px에서도 줄바꿈. .swatch-big 718x70 순수 장식.
box-shadow 배경 토글만 aria-pressed + accent 상태 표현 — 다른 8개로 미전파.

# Questions
1. 왜 결과가 9번 중 8번은 회색 mono 상자인가?
2. 문서 3,700~4,200자가 도구 아래에 있어야 하나?
3. 도구 9개가 서로를 모르는 게 맞나? 관련 글 상자는 있는데 관련 도구 상자가 없다.
4. 왜 브랜드 색이 링크에만 있나?
