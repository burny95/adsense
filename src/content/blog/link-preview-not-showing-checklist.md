---
title: 카톡·슬랙 링크 미리보기가 안 뜰 때 체크리스트
description: 링크를 공유했는데 썸네일 카드가 안 나오거나 예전 정보가 그대로일 때 확인할 것들을 순서대로 정리합니다.
category: markup
publishedAt: 2026-08-30
relatedTools:
  - og-tag-generator
draft: true
---

## 먼저: 미리보기는 무엇으로 만들어지나

메신저와 SNS는 링크를 받으면 그 페이지의 `<head>`에 있는
**Open Graph 태그**(`og:title`, `og:description`, `og:image` 등)를 읽어
카드를 만듭니다. 태그가 없으면 `<title>`과 `<meta name="description">`으로
대체하거나, 아예 카드를 안 만듭니다.

## 카드가 아예 안 뜰 때

1. **`og:` 태그가 `<head>` 안에 있는가**
   `<body>`에 있거나 자바스크립트로 나중에 삽입하면 크롤러가 못 읽습니다.
   서버가 처음 내려주는 HTML에 들어 있어야 합니다.
2. **`og:image`가 절대 URL인가**
   `/og.png`처럼 상대 경로는 안 됩니다. `https://도메인/og.png` 전체 주소여야 합니다.
3. **이미지가 공개 접근 가능한가**
   로그인이 필요한 위치, `robots.txt`로 막힌 경로, 내부망 주소는 크롤러가 못 가져옵니다.
4. **이미지 크기·용량**
   너무 작으면(가로 200px 미만 등) 무시됩니다. 1200×630px, 5MB 이하 권장.
5. **페이지 자체가 크롤러에게 열려 있는가**
   `X-Robots-Tag: noindex`나 인증 페이지면 미리보기도 안 만들어집니다.

## 예전 정보가 계속 나올 때 (캐시 문제)

각 플랫폼은 한 번 읽은 OG 정보를 일정 시간 캐시합니다. 태그를 고쳐도
바로 반영되지 않습니다.

- **페이스북·인스타그램**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)에서
  URL 넣고 "Scrape Again"
- **카카오톡**: [카카오 개발자 도구의 캐시 초기화](https://developers.kakao.com/tool/clear/og) 사용
- **X(트위터)**: 예전 Card Validator는 종료됨. 새 URL 파라미터(`?v=2`)를 붙여
  강제로 새로 읽게 하는 방법이 흔히 쓰입니다.
- **슬랙**: 채널에 링크를 다시 붙이면 대체로 새로 읽습니다. 안 되면 URL에
  파라미터를 추가하세요.

## 태그부터 만들고 시작하기

태그 자체가 없거나 일부만 있는 경우가 가장 많습니다.
[Open Graph / meta 태그 생성기](/tools/og-tag-generator)에 제목·설명·이미지·URL을
넣으면 `<head>`에 그대로 붙일 수 있는 코드와 미리보기 카드를 만들어 줍니다.
