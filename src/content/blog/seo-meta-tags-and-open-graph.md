---
title: 메타태그와 Open Graph 정리 — 작성법부터 링크 미리보기가 안 뜰 때까지
description: 검색결과에 쓰이는 메타태그와 공유 카드에 쓰이는 Open Graph 태그의 작성법, 그리고 카톡·슬랙 링크 미리보기가 안 뜨거나 예전 정보가 나올 때 점검 순서와 플랫폼별 캐시 갱신법을 한 편에 정리합니다.
category: markup
publishedAt: 2026-08-31
updatedAt: 2026-10-24
relatedTools:
  - og-tag-generator
draft: false
---

검색 엔진과 메신저는 페이지를 열 때 본문보다 `<head>` 안의 메타 정보를 먼저 읽습니다. 여기서 검색결과에 뜨는 제목·설명이 정해지고 카톡이나 슬랙에 링크를 붙였을 때 나오는 카드가 만들어집니다. 본문이 아무리 좋아도 이 부분이 비어 있으면 검색결과 제목이 파일명처럼 나오거나, 공유 카드에 아무 이미지도 안 붙습니다.

`<head>`에 넣는 태그는 목적에 따라 크게 두 묶음입니다.

- **검색용 메타태그** — 구글·네이버가 페이지를 이해하고 검색결과에 표시하는 데 씀
- **Open Graph 태그** — 페이스북·카카오·슬랙 등이 링크를 카드로 만들 때 읽음

이 글은 두 묶음을 하나씩 정의하고 이 블로그의 [CSS clamp() 기초](/blog/css-clamp-basics/) 글을 예제로 실제 태그를 어떻게 채우는지 봅니다.

## 1. 검색용 메타태그

### 정의

검색 엔진이 페이지의 주제·언어·표시 방식을 파악하는 데 쓰는 `<head>` 태그입니다. 순위에 직접 영향을 주는 것도 있고(제목), 노출되는 모양만 정하는 것도 있습니다(설명).

자주 쓰는 것은 다섯 가지입니다.

| 태그 | 역할 |
|---|---|
| `<title>` | 검색결과의 파란 제목, 브라우저 탭 이름 |
| `<meta name="description">` | 검색결과 제목 아래 회색 설명문 |
| `<link rel="canonical">` | 내용이 같은 여러 URL 중 대표 주소 지정 |
| `<meta name="robots">` | 색인·링크 추적 허용 여부 (`noindex` 등) |
| `<meta charset>` · `<meta name="viewport">` | 문자 인코딩, 모바일 화면 대응 (기술적 필수) |

### 사용법

clamp() 기초 글이라면 이렇게 채웁니다.

```html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CSS clamp() 기초 — 정의와 기본 사용법 | Burny Tools</title>
  <meta
    name="description"
    content="clamp()가 받는 세 값과 브라우저가 화면 너비에 따라 크기를 정하는 방식을 예제 하나로 정리합니다."
  />
  <link rel="canonical" href="https://burnytools.com/blog/css-clamp-basics" />
</head>
```

이 정보로 검색결과에 표시되는 모양은 대략 이렇습니다.

<div style="background:#fff;color:#1c1e21;border:1px solid #e4e6ea;border-radius:10px;padding:1.25rem 1.5rem">
  <div style="color:#4d5156;font-size:.8rem">burnytools.com › blog › css-clamp-basics</div>
  <div style="color:#1a0dab;font-size:1.3rem;margin:.15rem 0 .25rem">CSS clamp() 기초 — 정의와 기본 사용법 | Burny Tools</div>
  <div style="color:#4d5156;font-size:.92rem;line-height:1.55">clamp()가 받는 세 값과 브라우저가 화면 너비에 따라 크기를 정하는 방식을 예제 하나로 정리합니다.</div>
</div>

- `<title>`은 **페이지마다 유일**해야 하고 핵심 키워드를 앞쪽에 둡니다. 길이는 글자 수가 아니라 픽셀 폭(약 600px)으로 잘리기 때문에, 폭이 넓은 한글은 **25~30자**가 실질적인 상한입니다(영문 기준으로는 50~60자). 넘으면 검색결과에서 뒤가 `…`로 잘립니다.
- `description`은 순위 요소는 아니지만 검색결과에서 이 문장을 보고 클릭할지 정하므로 사실상 광고 문구입니다. 한글 **70~80자**, 영문 120~160자 정도가 안 잘리는 선입니다.
- `canonical`은 `?ref=`, 대소문자, `www` 유무 등으로 같은 글에 여러 주소가 생겼을 때 "이게 원본"이라고 알려 줍니다. 자기 자신을 가리켜도 됩니다.

## 2. Open Graph 태그

### 정의

페이스북이 만든 규격으로, 링크를 카드 형태로 보여 주는 서비스(카카오톡·슬랙·디스코드·라인 등 대부분)가 이 태그를 읽습니다. 속성 이름에 `og:` 접두사가 붙고 `<meta>`의 `property` 속성에 씁니다.

| 태그 | 역할 |
|---|---|
| `og:title` | 카드 제목 |
| `og:description` | 카드 설명 |
| `og:image` | 카드 썸네일 이미지 (절대 URL) |
| `og:url` | 이 콘텐츠의 대표 URL |
| `og:type` | 콘텐츠 종류 (`website`, `article` 등) |

여기에 트위터(X)는 카드 크기를 정하는 `twitter:card` 하나만 더 요구하고 제목·설명·이미지는 og 값을 그대로 재사용합니다.

### 사용법

같은 글의 공유 카드를 위한 태그입니다.

```html
<meta property="og:type" content="article" />
<meta property="og:title" content="CSS clamp() 기초 — 정의와 기본 사용법" />
<meta
  property="og:description"
  content="clamp()가 받는 세 값과 브라우저의 계산 방식을 예제 하나로 정리합니다."
/>
<meta property="og:image" content="https://burnytools.com/og/css-clamp-basics.png" />
<meta property="og:url" content="https://burnytools.com/blog/css-clamp-basics" />
<meta name="twitter:card" content="summary_large_image" />
```

메신저에 이 링크를 붙이면 이런 카드가 만들어집니다.

<div style="background:#fff;color:#1c1e21;border:1px solid #e4e6ea;border-radius:10px;padding:1.25rem 1.5rem">
  <div style="max-width:340px;border:1px solid #dfe2e8;border-radius:10px;overflow:hidden;font-family:sans-serif">
    <div style="background:linear-gradient(135deg,#f97316,#fbbf24);height:160px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.8rem">og:image · 1200×630</div>
    <div style="padding:.75rem .9rem">
      <div style="color:#111;font-weight:600;font-size:.95rem;margin-bottom:.25rem">CSS clamp() 기초 — 정의와 기본 사용법</div>
      <div style="color:#6b7280;font-size:.82rem;line-height:1.45">clamp()가 받는 세 값과 브라우저의 계산 방식을 예제 하나로 정리합니다.</div>
      <div style="color:#9aa0a6;font-size:.75rem;margin-top:.4rem">burnytools.com</div>
    </div>
  </div>
</div>

- `og:image`는 **절대 URL**(`https://`로 시작)이어야 합니다. 상대경로는 대부분의 서비스가 무시합니다.
- 권장 크기는 **1200×630**(1.91:1), 용량은 5MB 이하로 잡으면 무난합니다(상한은 플랫폼마다 다릅니다). 이보다 작으면 작은 썸네일로, 비율이 안 맞으면 잘려서 나옵니다.
- `og:title`은 `<title>`과 달라도 됩니다. 검색결과에는 `| Burny Tools` 같은 꼬리표가 유용하지만 공유 카드에서는 군더더기라, 이렇게 목적에 맞게 나눠서 다듬을 수 있습니다.

> **태그를 직접 입력하기 번거로우면** [OG/meta 태그 생성기](/tools/og-tag-generator/)에 제목·설명·이미지·URL만 넣으세요. Open Graph와 트위터 카드 태그를 한 세트로 만들어 주고 완성된 미리보기 카드까지 함께 보여 줍니다.

## 두 묶음은 어떻게 나눠 쓰나

역할이 겹치는 것처럼 보이지만 읽는 주체가 다릅니다.

- 검색 엔진은 `<title>`·`description`을 봅니다. `og:*`는 참고만 하거나 무시합니다.
- 메신저·SNS는 `og:*`를 봅니다. `og:title`이 없을 때만 `<title>`을 대신 씁니다(fallback).

그래서 **둘 다 넣어 두면** 각각의 맥락에 맞게 따로 다듬을 수 있고 하나가 빠져도 다른 하나가 대신 쓰입니다. 최소한 `<title>`, `description`, `og:title`, `og:description`, `og:image`, `og:url` 여섯 개는 모든 페이지에 넣는 것을 기본으로 잡으세요.

## 태그를 넣었는데 카드가 안 뜬다면

태그를 다 넣었는데도 카드가 안 뜨거나, 고쳤는데 예전 내용이 그대로인 경우가 꽤 많습니다.
증상은 크게 둘입니다.

- **카드가 아예 안 뜬다** — 링크가 파란 글자로만 나옴
- **예전 정보가 계속 나온다** — 제목·이미지를 바꿨는데 반영이 안 됨

## 공유 카드가 아예 안 뜰 때

자주 있는 순서대로 짚습니다.

### 1. og 태그가 서버 응답 HTML의 `<head>`에 있는가

가장 흔한 원인입니다. 크롤러는 페이지를 받아서 그 자리에서 `<head>`만 읽고 끝냅니다. 자바스크립트를 실행하지 않습니다.

<div style="background:#fff;color:#1c1e21;border:1px solid #e4e6ea;border-radius:10px;padding:1.1rem 1.4rem;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.8rem;line-height:1.9">
  <div style="color:#c92a2a">✗ 브라우저에서 JS 실행 후 삽입 — 크롤러엔 빈 &lt;head&gt;</div>
  <div style="color:#1a7f37">✓ 서버가 내려준 HTML에 이미 포함 — 크롤러가 바로 읽음</div>
</div>

React·Vue 같은 SPA에서 `react-helmet` 등으로 클라이언트에서만 태그를 넣으면, 브라우저에는 보여도 크롤러에는 빈 `<head>`입니다. SSR·SSG로 처음 HTML에 심거나, 메타 태그용 프리렌더가 필요합니다.

### 2. og:image가 절대 URL인가

<div style="background:#fff;color:#1c1e21;border:1px solid #e4e6ea;border-radius:10px;padding:1.1rem 1.4rem;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.8rem;line-height:1.9">
  <div style="color:#c92a2a">✗ &lt;meta property="og:image" content="/og.png"&gt;</div>
  <div style="color:#1a7f37">✓ &lt;meta property="og:image" content="https://example.com/og.png"&gt;</div>
</div>

상대 경로는 대부분의 플랫폼이 무시합니다. `https://`부터 전체 주소로 씁니다.

### 3. 이미지·페이지가 공개 접근 가능한가

- 로그인·인증 뒤에 있는 페이지 → 크롤러는 비로그인 상태라 아무것도 못 봄
- `robots.txt`나 `X-Robots-Tag: noindex`로 막힌 경로 → 미리보기도 안 만듦
- 내부망·스테이징 도메인 → 외부 크롤러가 접근 불가

이미지를 못 불러온 카드와 정상 카드:

<div style="background:#fff;color:#1c1e21;border:1px solid #e4e6ea;border-radius:10px;padding:1.25rem 1.5rem;display:flex;gap:1rem;flex-wrap:wrap;font-family:system-ui,sans-serif">
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

## 공유 카드에 예전 정보가 계속 나올 때 (캐시)

플랫폼은 한 번 읽은 og 정보를 일정 시간 저장해 둡니다. 태그를 고쳐도 바로 안 바뀝니다.

<div style="background:#fff;color:#1c1e21;border:1px solid #e4e6ea;border-radius:10px;padding:1.25rem 1.5rem;display:flex;gap:1rem;flex-wrap:wrap;font-family:system-ui,sans-serif">
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

## 공유 카드에서 흔한 실수

- **`<body>`에 og 태그를 넣음** — `<head>` 안에서만 유효합니다.
- **`name`과 `property`를 헷갈림** — og 태그는 `property="og:image"`, 트위터 태그는 `name="twitter:card"`. 섞이면 일부 플랫폼이 무시합니다.
- **`og:url`을 페이지마다 안 바꿈** — 템플릿에 하드코딩해 두면 모든 글이 같은 URL·같은 카드로 뜹니다.
- **로컬에서만 확인** — 로컬 주소는 크롤러가 접근 못 합니다. 배포 후 실제 도메인으로 테스트하세요.
- **캐시를 원인으로 오해** — 태그가 없거나 `<head>` 밖에 있는데 "캐시 탓"이라며 새로고침만 반복하는 경우가 많습니다. 먼저 태그 존재부터 확인합니다.

## 요약

- `<head>`의 메타 정보가 검색결과 스니펫과 공유 카드를 결정한다
- **검색용**: `<title>`(유일·한글 25~30자), `description`(클릭 유도·한글 70~80자), `canonical`, `robots`, `charset`·`viewport`
- **Open Graph**: `og:title`·`og:description`·`og:image`·`og:url`·`og:type`, 트위터는 `twitter:card`만 추가
- `og:image`는 절대 URL, 1200×630 권장
- 검색 엔진은 `<title>`을, 메신저는 `og:*`를 읽으므로 둘 다 넣고 맥락별로 다듬는다
- 카드가 안 뜨면: ① 태그가 서버 HTML `<head>`에 있는지 ② og:image가 절대 URL인지 ③ 페이지·이미지가 공개인지 ④ 이미지 크기·형식이 규격인지 순으로 확인
- SPA는 클라이언트에서만 태그를 넣으면 크롤러가 못 봄 → SSR·SSG 필요
- 예전 정보가 나오면 플랫폼별 캐시 갱신 도구 사용, 카카오톡은 `?v=2` 새 URL이 가장 빠름
- "캐시 탓" 하기 전에 태그 존재부터 확인
