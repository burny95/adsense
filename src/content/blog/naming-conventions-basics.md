---
title: 네이밍 컨벤션 기초 — 여섯 표기법과 어디에 무엇을 쓰나
description: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case가 각각 무엇이고 어느 자리에 쓰는 표기법인지, 그리고 data-* 속성에서 대소문자가 사라지는 함정까지 정리합니다.
category: productivity
publishedAt: 2026-09-02
relatedTools:
  - case-converter
draft: false
---

## 같은 것에 이름이 세 개

한 프로젝트를 열어 보면 이런 게 흔합니다.

```js
const userId = res.user_id;        // API는 snake_case
```
```css
.user-id { }                        /* CSS는 kebab-case */
```

같은 개념인데 표기가 셋입니다. 취향 문제로 보이지만 실제로 아픈 건 **검색**입니다. `user_id`로 찾으면 JS 코드가 안 걸리고, `userId`로 찾으면 API 스펙과 CSS가 안 걸립니다. 어디까지 고쳐야 하는지 파악이 안 되죠.

표기법은 여섯 개뿐이고, 어느 자리에 무엇을 쓸지는 대체로 정해져 있습니다.

## 여섯 가지 표기법

같은 이름 하나를 여섯 가지로 써 보면 이렇습니다.

| 표기법 | 예시 | 구분자 |
|---|---|---|
| `camelCase` | `userProfileId` | 첫 단어 소문자, 이후 대문자 |
| `PascalCase` | `UserProfileId` | 모든 단어 대문자로 시작 |
| `snake_case` | `user_profile_id` | 밑줄 |
| `kebab-case` | `user-profile-id` | 하이픈 |
| `CONSTANT_CASE` | `USER_PROFILE_ID` | 밑줄 + 전부 대문자 |
| `dot.case` | `user.profile.id` | 점 |

여섯 개가 다 달라 보이지만 하는 일은 하나입니다. **어디서 단어가 끊기는지 표시하는 것.** 공백을 못 쓰는 자리에서 단어 경계를 나타내려고 각자 다른 방식을 쓰는 것뿐입니다.

그래서 변환의 핵심도 단어를 어떻게 쪼개느냐입니다. `getUserName`이든 `GET_USER_NAME`이든 `get-user-name`이든, 일단 이렇게 쪼개고 나면 나머지는 다시 이어 붙이기만 하면 됩니다.

<div style="background:#fff;border:1px solid #e4e6ea;border-radius:10px;padding:1.5rem;font-family:system-ui,sans-serif;color:#111">
  <div style="font-family:ui-monospace,Menlo,monospace;font-size:15px;margin-bottom:14px">getUserName</div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
    <span style="background:#e7f0fb;color:#1c4f8f;border-radius:6px;padding:5px 11px;font-family:ui-monospace,Menlo,monospace;font-size:13px">get</span>
    <span style="background:#e9f3ea;color:#2b6a35;border-radius:6px;padding:5px 11px;font-family:ui-monospace,Menlo,monospace;font-size:13px">user</span>
    <span style="background:#fbeee7;color:#96501f;border-radius:6px;padding:5px 11px;font-family:ui-monospace,Menlo,monospace;font-size:13px">name</span>
  </div>
  <div style="color:#555;font-size:12px;margin-top:14px">세 조각으로 쪼갠 뒤 다시 붙이면 어떤 표기법이든 나온다</div>
</div>

## 어느 자리에 무엇을 쓰나

표기법 선택은 취향이 아니라 **그 자리의 관례**입니다. 관례를 따라야 남이 읽을 때 걸리지 않습니다.

| 자리 | 표기법 | 예 |
|---|---|---|
| JS·TS 변수, 함수 | `camelCase` | `userProfileId`, `fetchUser()` |
| 클래스, 컴포넌트, 타입 | `PascalCase` | `UserCard`, `OrderStatus` |
| 상수, 환경변수 | `CONSTANT_CASE` | `API_BASE_URL`, `MAX_RETRY` |
| CSS 클래스, 커스텀 속성 | `kebab-case` | `.user-card`, `--space-4` |
| HTML 속성, `data-*` | `kebab-case` | `data-user-id`, `aria-label` |
| 파일명, URL 경로 | `kebab-case` | `user-card.tsx`, `/blog/px-rem-basics` |
| DB 테이블·컬럼 | `snake_case` | `user_profile`, `created_at` |

`dot.case`만 자리가 좁습니다. 다국어 번역 키(`user.profile.title`)나 설정 파일 경로처럼 **계층 구조를 나타낼 때** 씁니다. 다른 표기법이 단어를 잇는 데 쓰이는 것과 달리, 점은 보통 "안에 있는 것"을 뜻합니다.

## data-* 속성에서 대소문자가 사라진다

HTML에서 `kebab-case`를 쓰라는 게 그냥 관례가 아니라 **지키지 않으면 동작이 깨지는** 자리가 있습니다.

```html
<div data-userId="42"></div>
```

```js
el.dataset.userId  // undefined
```

HTML 속성 이름은 대소문자를 구분하지 않습니다. 브라우저는 위 속성을 `data-userid`로 저장합니다. 그리고 `dataset`은 **하이픈 뒤 글자를 대문자로 바꾸는** 규칙으로 이름을 만들기 때문에, 하이픈이 없는 `data-userid`는 그대로 `dataset.userid`가 됩니다.

```html
<div data-user-id="42"></div>
```

```js
el.dataset.userId  // "42"
```

HTML에서는 `kebab-case`, JS에서는 `camelCase`. 둘이 자동으로 이어지도록 설계돼 있어서, 관례를 따르면 신경 쓸 일이 없고 어기면 조용히 `undefined`가 나옵니다. 값이 안 나오는데 오타는 없어 보여서 찾는 데 한참 걸리는 부류의 버그입니다.

> **표기법을 한 번에 바꾸려면** [네이밍 컨벤션 변환기](/tools/case-converter)에 이름을 넣으세요. 여섯 가지 결과를 동시에 보여 주고, 여러 줄을 붙여 넣으면 줄 단위로 한꺼번에 바꿉니다. 공백·하이픈·밑줄·점은 물론 `camelCase`의 대소문자 경계까지 단어 구분으로 인식합니다.

## 대문자로 시작하느냐가 의미를 가질 때

`camelCase`와 `PascalCase`는 첫 글자 하나만 다릅니다. 그런데 이 차이가 문법적으로 의미를 갖는 자리가 있습니다.

```jsx
<userCard />   {/* HTML 태그로 해석된다 */}
<UserCard />   {/* 컴포넌트로 해석된다 */}
```

JSX는 **첫 글자가 소문자면 HTML 태그**, 대문자면 컴포넌트로 봅니다. 그래서 리액트에서 컴포넌트 이름이 `PascalCase`인 건 스타일 규칙이 아니라 문법입니다. 파이썬·자바에서 클래스만 대문자로 시작하는 관례도 같은 맥락입니다 — "이건 인스턴스가 아니라 틀"이라는 표시죠.

## 요약

- 표기법 여섯 개가 하는 일은 하나다. **공백을 못 쓰는 자리에서 단어 경계를 표시하는 것**
- 변환의 핵심은 단어로 쪼개는 것. 쪼개고 나면 이어 붙이는 방식만 다르다
- 자리마다 관례가 있다. JS는 `camelCase`, 컴포넌트는 `PascalCase`, CSS·HTML·파일명은 `kebab-case`, 상수는 `CONSTANT_CASE`, DB는 `snake_case`
- **`data-userId`는 동작하지 않는다.** HTML 속성은 대소문자를 구분하지 않아 `data-userid`가 되고, `dataset.userId`로는 잡히지 않는다
- JSX에서 첫 글자 대소문자는 태그냐 컴포넌트냐를 가르는 문법이다

다음 편에서는 표기법이 **시스템 경계에서 깨지는** 곳을 다룹니다. API의 `snake_case`를 어디서 바꿔야 하는지, `userID`처럼 약어가 섞인 이름이 왜 왕복 변환에서 망가지는지, 그리고 파일명 대소문자 때문에 로컬에서는 되고 배포하면 404가 나는 문제입니다.
