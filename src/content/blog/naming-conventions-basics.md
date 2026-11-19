---
title: 네이밍 컨벤션 정리 — 여섯 표기법부터 이름이 경계에서 깨지는 곳까지
description: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case를 어느 자리에 쓰는지, data-* 속성에서 대소문자가 사라지는 함정, 그리고 API의 snake_case·약어 왕복 변환·파일명 대소문자·CSS 대소문자처럼 이름이 시스템 경계에서 깨지는 곳과 일괄 치환 요령까지 정리합니다.
category: productivity
publishedAt: 2026-09-02
updatedAt: 2026-11-19
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

같은 개념인데 표기가 셋입니다. 취향 문제로 보이지만 실제로는 **검색**이 문제입니다. `user_id`로 찾으면 JS 코드가 안 걸리고 `userId`로 찾으면 API 스펙과 CSS가 안 걸립니다. 어디까지 고쳐야 하는지 파악이 안 되죠.

저도 이전 담당자가 작업하던 코드를 넘겨받았을 때 이걸 겪었습니다. 여러 표기법이 섞여 있어서 어느 게 id고 어느 게 class인지부터 헷갈렸습니다. 그 뒤로 제가 작업할 때는 둘을 확실히 구분해서 씁니다. id는 `user_id`처럼 밑줄로, class는 `user-id`처럼 하이픈으로 짓습니다.

표기법은 여섯 개뿐이고 어느 자리에 무엇을 쓸지는 대체로 정해져 있습니다. 뒤쪽에서는 그렇게
정해 둔 이름이 API·약어·파일명·CSS를 만나는 경계에서 깨지는 곳과, 이름을 일괄로 바꿀 때의
요령을 다룹니다.

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

여섯 개가 다 달라 보이지만 모두 **어디서 단어가 끊기는지 표시합니다.** 공백을 못 쓰는 자리에서 단어 경계를 나타내려고 각자 다른 방식을 쓰는 것뿐입니다.

그래서 변환도 단어를 어떻게 쪼개느냐에 달려 있습니다. `getUserName`이든 `GET_USER_NAME`이든 `get-user-name`이든, 일단 이렇게 쪼개고 나면 나머지는 다시 이어 붙이기만 하면 됩니다.

<div style="background:#fff;color:#1c1e21;border:1px solid #e4e6ea;border-radius:10px;padding:1.5rem;font-family:system-ui,sans-serif;color:#111">
  <div style="font-family:ui-monospace,Menlo,monospace;font-size:15px;margin-bottom:14px">getUserName</div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
    <span style="background:#e7f0fb;color:#1c4f8f;border-radius:6px;padding:5px 11px;font-family:ui-monospace,Menlo,monospace;font-size:13px">get</span>
    <span style="background:#e9f3ea;color:#2b6a35;border-radius:6px;padding:5px 11px;font-family:ui-monospace,Menlo,monospace;font-size:13px">user</span>
    <span style="background:#fbeee7;color:#96501f;border-radius:6px;padding:5px 11px;font-family:ui-monospace,Menlo,monospace;font-size:13px">name</span>
  </div>
  <div style="color:#555;font-size:12px;margin-top:14px">세 조각으로 쪼갠 뒤 다시 붙이면 어떤 표기법이든 나온다</div>
</div>

## 어느 자리에 무엇을 쓰나

표기법은 취향보다 **그 자리의 관례**를 보고 고릅니다. 관례를 따라야 남이 읽을 때 걸리지 않습니다.

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

HTML에서는 `kebab-case`를, JS에서는 `camelCase`를 씁니다. 둘이 자동으로 이어지도록 설계돼 있어서 관례를 따르면 신경 쓸 일이 없고 어기면 조용히 `undefined`가 나옵니다. 값이 안 나오는데 오타는 없어 보여서 찾는 데 한참 걸리는 부류의 버그입니다.

> **표기법을 한 번에 바꾸려면** [네이밍 컨벤션 변환기](/tools/case-converter/)에 이름을 넣으세요. 여섯 가지 결과를 동시에 보여 주고 여러 줄을 붙여 넣으면 줄 단위로 한꺼번에 바꿉니다. 공백·하이픈·밑줄·점은 물론 `camelCase`의 대소문자 경계까지 단어 구분으로 인식합니다.

## 대문자로 시작하느냐가 의미를 가질 때

`camelCase`와 `PascalCase`는 첫 글자 하나만 다릅니다. 그런데 이 차이가 문법적으로 의미를 갖는 자리가 있습니다.

```jsx
<userCard />   {/* HTML 태그로 해석된다 */}
<UserCard />   {/* 컴포넌트로 해석된다 */}
```

JSX는 **첫 글자가 소문자면 HTML 태그**, 대문자면 컴포넌트로 봅니다. 그래서 리액트에서 컴포넌트 이름이 `PascalCase`인 건 스타일 규칙이기 전에 문법입니다. 파이썬·자바에서 클래스만 대문자로 시작하는 관례도 같은 맥락입니다 — "이건 인스턴스를 찍어 내는 틀"이라는 표시죠.


## 컨벤션은 정했는데 왜 계속 깨질까

앞에서 자리마다 쓸 표기법을 정리했습니다. 팀에서 합의도 했다고 합시다. 그런데도 이름은 계속 깨집니다.

깨지는 자리가 정해져 있기 때문입니다. **표기법이 다른 두 시스템이 만나는 경계**입니다. 프론트엔드 안에서만 놀 때는 문제가 없다가, API·파일 시스템·CSS 같은 다른 규칙을 쓰는 쪽과 만나는 순간 어긋납니다.

경계는 네 군데입니다.

## 경계 1 — API의 snake_case

서버는 `snake_case`, 프론트는 `camelCase`. 가장 흔한 경계입니다.

```js
const user = await res.json();
// { user_id: 42, created_at: "...", display_name: "..." }

const id = user.user_id;   // 여기서부터 snake_case가 코드 안으로 들어온다
```

한번 들어오면 퍼집니다. 컴포넌트 props로 넘어가고 상태에 저장되고 결국 프로젝트 절반이 두 표기법을 섞어 쓰게 됩니다.

**변환은 한 곳에서 합니다.** API 응답을 받는 지점에서 바꾸고 그 안쪽은 전부 `camelCase`로 통일합니다.

```js
// 경계에서 한 번만 변환
const user = toCamelKeys(await res.json());
const id = user.userId;   // 이 아래로는 camelCase만 존재
```

다만 **모든 응답에 자동 변환을 걸어 두는 건 위험합니다.** 키 이름 자체가 데이터인 경우가 있기 때문입니다.

```js
// 사용자가 만든 태그별 집계 — 키가 곧 값이다
{ "counts": { "front_end": 12, "back_end": 8 } }
```

여기에 자동 변환이 돌면 `frontEnd`가 되어 원래 태그 이름과 달라집니다. 변환은 **키 구조가 고정된 엔드포인트**에만 거는 게 안전합니다.

## 경계 2 — 약어가 섞인 이름

`userID`, `parseHTML`, `APIClient`. 약어를 대문자로 유지한 이름은 왕복 변환에서 원래대로 돌아오지 않습니다.

| 원본 | snake_case로 | 다시 camelCase로 |
|---|---|---|
| `userId` | `user_id` | `userId` ✓ |
| `userID` | `user_id` | `userId` ✗ (원본과 다름) |

`userID`를 쪼개면 `user` + `ID`인데, 다시 붙일 때는 각 단어의 첫 글자만 대문자가 되니 `userId`가 됩니다. 원본과 다릅니다. 한 프로젝트 안에 `userId`와 `userID`가 공존하면 자동 변환을 한 번 돌릴 때마다 이름이 흔들립니다.

그래서 **약어도 보통 단어처럼 취급합니다.**

```js
userId, apiUrl, htmlParser, httpClient     // ✓
userID, APIUrl, HTMLParser, HTTPClient     // ✗ 왕복이 안 된다
```

구글 자바 스타일 가이드도 같은 규칙을 씁니다(`XmlHttpRequest`). 마이크로소프트 .NET 가이드라인은 두 글자 약어만 예외로 두고(`IOStream`), 세 글자 이상은 `HtmlParser`처럼 씁니다. 읽기에 어색해 보여도, 변환이 안정적이고 단어 경계가 항상 명확하다는 이점이 훨씬 큽니다.

> **왕복이 되는지 확인하려면** [네이밍 컨벤션 변환기](/tools/case-converter/)에 이름을 넣어 보세요. 이 도구는 약어를 소문자 한 단어로 정규화하므로 `API_BASE_URL`은 `apiBaseUrl`이 됩니다. 나온 결과를 다시 넣었을 때 같은 값이 나오면 그 이름은 안전합니다.

## 경계 3 — 파일명 대소문자

로컬에서는 멀쩡한데 배포하면 404가 나는 전형적인 원인입니다.

```js
import UserCard from './components/usercard';   // 실제 파일은 UserCard.tsx
```

macOS와 윈도우의 기본 파일 시스템은 대소문자를 **구분하지 않습니다.** 그래서 로컬에서는 잘 됩니다. 반면 배포 서버와 CI는 대부분 리눅스라 대소문자를 **구분합니다.** 같은 코드가 거기서만 "모듈을 찾을 수 없음"으로 죽습니다.

정적 사이트의 URL도 마찬가지입니다. `/blog/PX-Rem-Basics`는 로컬 미리보기에서 열릴 수 있지만 배포된 곳에서는 404입니다.

저도 이걸로 헤맨 적이 있습니다. 이미지 파일 이름에 대문자가 섞여 있었는데, 로컬에서는 잘 나와서 문제가 없다고 생각했습니다. 그런데 본 서버에 올리자 그 이미지만 뜨지 않았습니다. 코드에 적은 이름과 실제 파일 이름이 대소문자만 달랐던 겁니다.

이 문제는 규칙 하나로 사라집니다. **파일명과 URL은 소문자 `kebab-case`로 고정합니다.** 대소문자를 아예 쓰지 않으면 구분하든 안 하든 결과가 같습니다.

한 가지 더. 이미 커밋된 파일의 대소문자만 바꿀 때는 탐색기나 Finder에서 이름을 고치면 안 됩니다. 대소문자를 구분하지 않는 컴퓨터에서는 git이 같은 파일로 보고 변경을 기록하지 않아서 내 컴퓨터에서는 바뀌었는데 저장소에는 옛 이름이 그대로 남습니다. 이름은 `git mv`로 바꾸세요.

```bash
git mv UserCard.tsx user-card.tsx   # git이 이름 변경으로 기록한다
```

## 경계 4 — CSS는 대소문자를 가릴 때와 안 가릴 때가 있다

CSS에서 대소문자 규칙은 한 가지가 아닙니다. 이 표를 모르면 "왜 이건 되고 저건 안 되지"가 됩니다.

| 대상 | 대소문자 |
|---|---|
| 속성 이름 (`color`, `Color`) | 구분 안 함 |
| 요소 선택자 (`div`, `DIV`) | 구분 안 함 |
| 클래스·id 이름 (`.userCard`) | **구분함** |
| 커스텀 속성 (`--myColor`) | **구분함** |

그래서 `--Space-4`로 정의하고 `var(--space-4)`로 쓰면 값이 안 나옵니다. 오타처럼 보이지도 않아서 찾기 어렵습니다.

여러 사람이 같은 파일을 고치는 프로젝트에서 특히 자주 생깁니다. 제가 겪었을 때는 어떤 곳은 HTML의 클래스 이름에 대문자가 들어가 있고 어떤 곳은 CSS 선택자 쪽에 대문자가 들어가 있었습니다. 사람마다 쓰는 버릇이 달라서 생긴 일인데, 눈으로 보면 같은 이름이라 왜 스타일이 안 먹는지 한참 찾게 됩니다.

CSS 쪽 이름을 전부 소문자 `kebab-case`로 통일하면 이 구분을 기억할 필요가 없어집니다.

## 이름을 일괄로 바꿀 때

기존 코드의 표기법을 정리할 때 편집기의 전체 치환을 그냥 돌리면 안 됩니다. **부분 일치** 때문입니다.

`user_id` → `userId`로 치환하면 `user_id_list`도 `userIdlist`처럼 망가집니다. `user_ids`, `parent_user_id`처럼 앞뒤에 뭔가 붙은 이름이 다 걸립니다.

- 단어 경계를 포함해서 치환합니다 (`\buser_id\b`)
- 변수명 변경은 편집기의 **이름 바꾸기(rename symbol)** 기능을 씁니다. 문자열을 맞바꾸는 대신 코드 구조를 보고 바꾸므로 안전합니다
- 여러 이름을 한꺼번에 정리할 때는 목록을 변환기에 넣어 결과를 먼저 눈으로 확인하고 나서 적용합니다

작업 중간에 구조가 바뀔 때도 이 문제가 생깁니다. 저는 감싸는 요소가 하나 더 들어가 뎁스가 깊어지면서 클래스와 아이디 이름을 고쳐야 했던 적이 있습니다. 이름을 한꺼번에 바꿨더니 앞부분이 같은 하위 자식 클래스들까지 같이 바뀌어서 이름이 꼬였습니다. 바꿀 이름이 다른 이름의 앞부분이기도 하다면, 모두 바꾸기 대신 하나씩 확인하면서 바꾸는 편이 안전합니다.

## 요약

- 표기법 여섯 개가 하는 일은 하나다. **공백을 못 쓰는 자리에서 단어 경계를 표시하는 것**
- 변환의 핵심은 단어로 쪼개는 것. 쪼개고 나면 이어 붙이는 방식만 다르다
- 자리마다 관례가 있다. JS는 `camelCase`, 컴포넌트는 `PascalCase`, CSS·HTML·파일명은 `kebab-case`, 상수는 `CONSTANT_CASE`, DB는 `snake_case`
- **`data-userId`는 동작하지 않는다.** HTML 속성은 대소문자를 구분하지 않아 `data-userid`가 되고 `dataset.userId`로는 잡히지 않는다
- JSX에서 첫 글자 대소문자는 태그냐 컴포넌트냐를 가르는 문법이다
- 이름은 **표기법이 다른 시스템의 경계**에서 깨진다. 경계는 API·약어·파일명·CSS 네 군데다
- API 변환은 응답을 받는 한 지점에서만. 단 **키 자체가 데이터인 응답에는 자동 변환을 걸지 않는다**
- **약어도 한 단어로 취급한다** (`userId`, `apiUrl`). `userID`는 왕복 변환에서 원래대로 돌아오지 않는다
- 파일명·URL은 소문자 `kebab-case`로 고정한다. 로컬(대소문자 무시)과 배포 서버(구분)의 차이를 아예 없앤다
- CSS는 속성·요소 이름은 대소문자를 안 가리지만 **클래스와 커스텀 속성은 가린다**
- 일괄 치환은 부분 일치로 망가진다. 단어 경계를 넣거나 편집기의 이름 바꾸기를 쓴다
