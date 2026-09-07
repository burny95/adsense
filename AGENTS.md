# Burny Tools

웹 퍼블리셔·프론트엔드 개발자용 도구 사이트. 애드센스 승인 → 광고 수익이 목표.
라이브: https://burnytools.com (Cloudflare Workers, `git push` 후 약 60~90초면 반영)

## 지금 병목은 글 편수 하나다

**글 12편 → 애드센스 신청까지 18~20편.** 5~7편이 부족하고, 이것만이 신청 가능 여부를 가른다.

사이트는 이미 공개·색인 중이고(2026-09-01 오픈), 도구 6개는 다 동작하며,
디자인은 크리틱 두 번 돌려 22 → 29/40까지 올려놨다. **여기서 더 손볼 이유가 없다.**

그래서 기본 작업은 글쓰기다. 다음 조건이 아니면 도구·디자인·구조를 건드리지 않는다.

- 사용자가 실제로 걸린 버그를 지목했을 때
- 사용자가 명시적으로 요청했을 때

"개선하면 좋을 것"을 발견해도 **말만 하고 넘어간다.** 지금까지 방향이 계속 새어나간 게
이 지점이었다. 아래 "보류하기로 한 것"은 다시 꺼내지 않는다.

## 현재 상태 (2026-09-07)

| 항목 | 상태 |
|---|---|
| 글 | 12편 발행 + 1편 검수 대기(`practice-sidemenu.md`) |
| 도구 | 6개 (clamp, 대비검사, OG태그, px↔rem, box-shadow, 네이밍) |
| 색인 | 열림. robots 메타 없음, `robots.txt` `Allow: /`, 사이트맵 200 |
| 애널리틱스 | GA4 `G-ZBFW2L3T6L` (Layout head, 전 페이지) |
| 애드센스 | 미신청. 승인 후 Layout head에 광고 스크립트 + `public/ads.txt` |

### 미커밋 (짝이라 같이 나가야 함)

`practice-sidemenu.md` + `src/consts.ts`의 `practice` 카테고리.
카테고리 없이 글만 커밋하면 스키마 검증에서 빌드가 깨진다.

## 글 쓸 때

- 카테고리: `practice`(실무자의 팁) / `css` / `color` / `image` / `markup` / `productivity`
- **`practice` 계열은 사용자가 직접 검수하고 고친다.** 정의 설명이 아니라
  현장에서 터득한 것을 전수하는 톤. 구체적 경험담 자리는 비워 두고 사용자가 채운다.
- 글은 `src/content/blog/*.md` (content collection)
- 도구 1개 = 툴 UI + 같은 페이지 사용법 + 관련 글 링크, 서로 연결

## 코드 건드릴 때 (재발 방지)

지금까지 실제로 사이트를 망가뜨린 것들이다.

- **공용 헬퍼를 여러 파일에 import하기 전에 그 파일에 같은 이름이 있는지 본다.**
  로컬 선언이 이기고, 인자 모양이 달라도 조용히 동작한다. 빌드도 통과한다.
  실제로 clamp 생성기가 이걸로 라이브에서 통째로 죽어 있었다.
  검사: import한 이름마다 `^\s*(function|const|let|var)\s+<이름>\b` grep.
- **패치 앵커는 첫 일치에 걸린다.** `.replace()`로 코드를 넣을 때 앵커가 파일에
  여러 번 나오는지 확인한다. box-shadow 삭제 기능이 이걸로 무동작이 된 적 있다.
- **확인은 "속성이 붙었나"가 아니라 "화면에 원하는 결과가 나오나"로 한다.**
  콘솔 에러가 없어도 도구는 죽어 있을 수 있었다.
- `toggleAttribute(name, 조건)`은 값을 빈 문자열로 넣는다. ARIA는 빈 값을 false로 읽고
  `[aria-invalid='true']`도 매칭되지 않는다. `setAttribute(name, 'true')`를 쓴다.
- `1fr`은 `minmax(auto, 1fr)`이라 자식의 min-content 아래로 줄지 않는다.
  좁은 화면에서 넘치면 `minmax(0, 1fr)`.
- `grid-row`는 읽는 순서를 바꾸지 않는다. DOM은 본문 우선, 배치는 `grid-column`으로만.
- Astro에서 인라인 `<script>`는 `is:inline` 없으면 모듈로 번들된다(전역 함수가 사라진다).

## 확인 방법

- **모바일**: 폭 390 `<iframe>`에 페이지를 띄운다. `resize_window`는 성공을 반환하고도
  창이 안 바뀌고, F12로 개발자도구를 열 수도 없다.
- **배포 반영**: 위치가 다르다. Layout CSS는 `/_astro/Layout.*.css` 번들,
  도구 페이지의 `<style>`은 페이지 HTML에 인라인된다. 엉뚱한 곳을 grep하면
  "미반영"으로 잘못 나온다.
- 새 글은 배포 200을 확인한 뒤 색인 요청한다. 404 상태로 요청하면 "찾을 수 없음"이
  기록돼 재크롤을 또 기다려야 한다.

## 보류하기로 한 것 (다시 꺼내지 않는다)

크리틱에서 지적됐지만 사용자가 "지금은 그대로" 판단한 것들이다.

- 사이드바 정체성 (`/tools`에 도구 목록이 없고, 홈에서는 왼쪽이 빈 기둥)
- 브랜드 색이 화면에 잘 안 드러남 (배지 전부 회색, 슬라이더는 브라우저 기본 파랑)
- 도구 골격을 `ToolPage` 공용 계약으로 묶기
- 내비게이션 탭 타겟 44px (사이드바 36px, 헤더 40px, 테마 토글 38px)
- Shiki 코드블록 주석이 다크에서 3.05:1
- 사이드바 스크롤 처리 — 도구가 늘어나면 그때. 다시 넣을 땐 `overflow-y:auto`가
  가로축도 스크롤 컨테이너로 만든다는 점에 주의(자식의 음수 `margin-inline`이 넘친다).

### 남은 실제 작업

- `practice-sidemenu.md` 검수 (사용자)
- box-shadow 생성기 모바일 조정 — 사용자가 폰에서 보고 지적. 구체 내용 미확인.
  이미 고친 것: sticky 미리보기 205px, 박스 76px, 가로 넘침. 남은 지적: 헤더+미리보기가
  844px 화면의 32% 점유, 390px에서 한 자리 숫자 칸이 343px 폭.
- 실무자의 팁 2편(팝업 제작법) — 사이드메뉴 편과 겹치는 스크롤 잠금·포커스는 링크로 넘기고
  팝업 고유 문제(중첩, `<dialog>`, 백드롭, 스크롤 위치)로 채운다.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
