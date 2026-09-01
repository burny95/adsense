---
title: 카톡·슬랙 링크 미리보기가 안 뜰 때 — 원인과 점검 순서
description: 링크를 공유했는데 카드가 안 나오거나 예전 정보가 그대로일 때, 원인을 자주 있는 순서대로 짚고 플랫폼별 캐시 갱신법을 정리합니다.
category: markup
publishedAt: 2026-09-04
relatedTools:
  - og-tag-generator
draft: true
---

[SEO에 중요한 메타태그와 Open Graph 태그](/blog/seo-meta-tags-and-open-graph)에서 공유 카드를 만드는 태그를 정리했습니다. 이번 편은 그 태그를 넣었는데도 카드가 안 뜨거나, 고쳤는데 예전 내용이 그대로일 때 무엇을 확인하느냐입니다.

증상은 크게 둘입니다.

- **카드가 아예 안 뜬다** — 링크가 파란 글자로만 나옴
- **예전 정보가 계속 나온다** — 제목·이미지를 바꿨는데 반영이 안 됨

## 카드가 아예 안 뜰 때

자주 있는 순서대로 짚습니다.

### 1. og 태그가 서버 응답 HTML의 `<head>`에 있는가

가장 흔한 원인입니다. 크롤러는 페이지를 받아서 그 자리에서 `<head>`만 읽고 끝냅니다. 자바스크립트를 실행하지 않습니다.

<div style="background:#fff;border:1px solid #e4e6ea;border-radius:10px;padding:1.1rem 1.4rem;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.8rem;line-height:1.9">
  <div style="color:#c92a2a">✗ 브라우저에서 JS 실행 후 삽입 — 크롤러엔 빈 &lt;head&gt;</div>
  <div style="color:#2b8a3e">✓ 서버가 내려준 HTML에 이미 포함 — 크롤러가 바로 읽음</div>
</div>

React·Vue 같은 SPA에서 `react-helmet` 등으로 클라이언트에서만 태그를 넣으면, 브라우저에는 보여도 크롤러에는 빈 `<head>`입니다. SSR·SSG로 처음 HTML에 심거나, 메타 태그용 프리렌더가 필요합니다.

### 2. og:image가 절대 URL인가

<div style="background:#fff;border:1px solid #e4e6ea;border-radius:10px;padding:1.1rem 1.4rem;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.8rem;line-height:1.9">
  <div style="color:#c92a2a">✗ &lt;meta property="og:image" content="/og.png"&gt;</div>
  <div style="color:#2b8a3e">✓ &lt;meta property="og:image" content="https://example.com/og.png"&gt;</div>
</div>

상대 경로는 대부분의 플랫폼이 무시합니다. `https://`부터 전체 주소로 씁니다.

### 3. 이미지·페이지가 공개 접근 가능한가

- 로그인·인증 뒤에 있는 페이지 → 크롤러는 비로그인 상태라 아무것도 못 봄
- `robots.txt`나 `X-Robots-Tag: noindex`로 막힌 경로 → 미리보기도 안 만듦
- 내부망·스테이징 도메인 → 외부 크롤러가 접근 불가

이미지를 못 불러온 카드와 정상 카드:

<div style="background:#fff;border:1px solid #e4e6ea;border-radius:10px;padding:1.25rem 1.5rem;display:flex;gap:1rem;flex-wrap:wrap;font-family:system-ui,sans-serif">
  <div style="width:230px;border:1px solid #dfe2e8;border-radius:10px;overflow:hidden">
    <div style="background:#f1f3f5;height:115px;display:flex;align-items:center;justify-content:center;color:#adb5bd;font-size:.76rem">✗ 이미지 못 불러옴</div>
    <div style="padding:.55rem .7rem">
      <div style="color:#111;font-weight:600;font-size:.83rem">문서 제목</div>
      <div style="color:#9aa0a6;font-size:.7rem;margin-top:.25rem">example.com</div>
    </div>
  </div>
  <div style="width:230px;border:1px solid #dfe2e8;border-radius:10px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#f97316,#fbbf24);height:115px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.76rem">✓ og:image</div>
    <div style="padding:.55rem .7rem">
      <div style="color:#111;font-weight:600;font-size:.83rem">문서 제목</div>
      <div style="color:#6b7280;font-size:.7rem;line-height:1.4">한 줄 설명이 들어갑니다.</div>
      <div style="color:#9aa0a6;font-size:.7rem;margin-top:.25rem">example.com</div>
    </div>
  </div>
</div>

### 4. 이미지 크기·형식이 규격 안인가

- 너무 작으면(가로 200px 미만 등) 썸네일로도 안 쓰입니다.
- 권장 1200×630, 용량은 5MB 이하 (플랫폼마다 상한이 다름).
- `webp`만 주면 일부 플랫폼이 못 읽습니다. `jpg`·`png`를 함께 두는 게 안전합니다.

## 예전 정보가 계속 나올 때 (캐시)

플랫폼은 한 번 읽은 og 정보를 일정 시간 저장해 둡니다. 태그를 고쳐도 바로 안 바뀝니다.

<div style="background:#fff;border:1px solid #e4e6ea;border-radius:10px;padding:1.25rem 1.5rem;display:flex;gap:1rem;flex-wrap:wrap;font-family:system-ui,sans-serif">
  <div style="width:230px;border:1px solid #dfe2e8;border-radius:10px;padding:.6rem .75rem">
    <div style="color:#111;font-weight:600;font-size:.83rem">예전 제목 · 옛 이미지</div>
    <div style="color:#9aa0a6;font-size:.7rem;margin-top:.3rem">example.com · 캐시된 값</div>
  </div>
  <div style="width:230px;border:1px solid #dfe2e8;border-radius:10px;padding:.6rem .75rem">
    <div style="color:#111;font-weight:600;font-size:.83rem">새로 고친 제목</div>
    <div style="color:#9aa0a6;font-size:.7rem;margin-top:.3rem">example.com · 강제 새로고침 후</div>
  </div>
</div>

| 플랫폼 | 갱신 방법 |
|---|---|
| 페이스북·인스타그램 | [공유 디버거](https://developers.facebook.com/tools/debug/)에 URL 넣고 **Scrape Again** |
| 카카오톡 | [카카오 캐시 초기화 도구](https://developers.kakao.com/tool/clear/og)에 URL 입력 |
| 슬랙 | 채널에 링크를 다시 붙이면 대체로 새로 읽음. 안 되면 URL 파라미터 추가 |
| X(트위터) | 예전 Card Validator는 종료됨. `?v=2` 같은 파라미터로 새 URL을 만들어 강제 |
| 네이버(블로그·카페 등) | 공개된 캐시 초기화 도구가 없음. URL 파라미터로 새 주소를 만드는 방법뿐 |

카카오톡은 채팅방 캐시를 사용자가 직접 못 지우는 경우가 있어, 급하면 `?v=2`처럼 쿼리를 붙인 새 주소를 공유하는 게 가장 빠릅니다.

## 흔한 실수

- **`<body>`에 og 태그를 넣음** — `<head>` 안에서만 유효합니다.
- **`name`과 `property`를 헷갈림** — og 태그는 `property="og:image"`, 트위터 태그는 `name="twitter:card"`. 섞이면 일부 플랫폼이 무시합니다.
- **`og:url`을 페이지마다 안 바꿈** — 템플릿에 하드코딩해 두면 모든 글이 같은 URL·같은 카드로 뜹니다.
- **로컬에서만 확인** — 로컬 주소는 크롤러가 접근 못 합니다. 배포 후 실제 도메인으로 테스트하세요.
- **캐시를 원인으로 오해** — 태그가 없거나 `<head>` 밖에 있는데 "캐시 탓"이라며 새로고침만 반복하는 경우가 많습니다. 먼저 태그 존재부터 확인합니다.

> **태그부터 점검하려면** [OG/meta 태그 생성기](/tools/og-tag-generator)에 제목·설명·이미지·URL을 넣어 보세요. `<head>`에 그대로 붙일 코드와, 값이 제대로 들어갔을 때 나올 미리보기 카드를 함께 확인할 수 있습니다.

## 요약

- 카드가 안 뜨면: ① 태그가 서버 HTML `<head>`에 있는지 ② og:image가 절대 URL인지 ③ 페이지·이미지가 공개인지 ④ 이미지 크기·형식이 규격인지 순으로 확인
- SPA는 클라이언트에서만 태그를 넣으면 크롤러가 못 봄 → SSR·SSG 필요
- 예전 정보가 나오면 플랫폼별 캐시 갱신 도구 사용, 카카오톡은 `?v=2` 새 URL이 가장 빠름
- "캐시 탓" 하기 전에 태그 존재부터 확인
