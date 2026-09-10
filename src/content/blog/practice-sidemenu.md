---
title: 실무자의 사이드메뉴 제작법 — 만드는 법부터 모바일 대응까지
description: 사이드메뉴는 여닫는 코드가 전부가 아닙니다. 기본 구조부터 시작해 남는 부분 터치로 닫기, 뒤로가기 버튼 처리, 배경 스크롤 잠금까지 모바일에서 실제로 챙겨야 하는 것들을 쓰는 코드와 함께 정리했습니다.
category: practice
publishedAt: 2026-09-06
draft: false
---

## 홈페이지의 단골손님, 사이드메뉴

사이드메뉴는 어느 홈페이지를 가도 쉽게 찾아볼 수 있는 UI입니다. 쇼핑몰이든 회사 소개 페이지든, 햄버거 버튼 하나 눌렀을 때 옆에서 스윽 나오는 그 메뉴 말입니다.

이렇게까지 자주 쓰이는 이유는 단순합니다. **화면은 좁은데 넣어야 할 메뉴는 많기 때문**입니다. 상단에 메뉴를 다 펼쳐놓으면 두 줄, 세 줄이 되어버립니다. 그래서 평소에는 접어두고 필요할 때만 꺼내 쓰는 겁니다.

만드는 것 자체는 어렵지 않습니다. 문제는 만들고 나서입니다. 여닫는 것까지는 10분이면 되는데, QA에 넘기면 거의 항상 반려됩니다. 그것도 프로젝트가 바뀌어도 비슷한 사유로요.

이 글에서는 사이드메뉴를 어떻게 만드는지부터 시작해서, 만들고 나서 챙기지 않으면 반려당하는 것들까지 순서대로 정리하겠습니다.

## 사이드메뉴 만드는 법

먼저 뼈대입니다.

```html
<button type="button" id="menu-open" aria-controls="side-menu" aria-expanded="false">
  메뉴
</button>

<!-- 오버레이와 메뉴는 형제로 둡니다 -->
<div class="menu-overlay" hidden></div>
<nav class="side-menu" id="side-menu" aria-label="주메뉴" inert>
  <button type="button" id="menu-close">닫기</button>
  <ul>
    <li><a href="/">홈</a></li>
    <li><a href="/about/">회사소개</a></li>
  </ul>
</nav>
```

여기서 하나만 짚고 가겠습니다. **오버레이(어두운 배경)를 메뉴 안에 넣지 마세요.** 형제로 둬야 합니다.

메뉴 안에 넣으면 오버레이가 메뉴를 덮거나, 메뉴가 오버레이를 덮거나 둘 중 하나가 됩니다. z-index로 어떻게든 맞춰도 나중에 메뉴 안에 드롭다운 같은 걸 하나 더 넣는 순간 다시 꼬입니다. 형제로 두면 이 고민이 아예 없습니다.

CSS는 이렇게 시작합니다.

```css
.side-menu {
  position: fixed;
  inset: 0 auto 0 0;        /* 위·아래는 화면에 붙이고 왼쪽 기준으로 배치 */
  width: min(85vw, 320px);  /* 큰 화면에선 320px, 좁은 화면에선 화면의 85% */
  z-index: 100;
  background: #fff;
  overflow-y: auto;         /* 메뉴가 길어지면 메뉴 안에서 스크롤 */
}

.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 99;              /* 메뉴보다 한 단계 아래 */
  background: rgb(0 0 0 / 0.4);
}
```

`width: min(85vw, 320px)`를 눈여겨봐 주세요. 그냥 `320px`로 두면 아주 작은 폰에서 화면을 거의 다 덮어버립니다. 그러면 사용자가 "남는 부분을 눌러서 닫는" 동작을 할 수가 없습니다. 15% 정도는 남겨두는 겁니다.

## 사이드메뉴가 나타났다가 사라지는 방법

움직임은 `transform`으로 줍니다.

```css
.side-menu {
  transform: translateX(-100%);      /* 평소엔 화면 왼쪽 밖에 대기 */
  transition: transform 0.25s ease;
}

.side-menu.is-open {
  transform: translateX(0);
}
```

`left: -320px`를 애니메이션하는 방식도 있지만 `transform`이 훨씬 부드럽습니다. `left`는 브라우저가 매 프레임마다 레이아웃을 다시 계산하는데, `transform`은 그리기만 하기 때문입니다. 저사양 안드로이드에서 차이가 확 납니다.

그런데 여기서 끝내면 안 됩니다. **화면 밖으로 밀어냈을 뿐, 메뉴는 여전히 거기 있습니다.**

닫힌 상태에서 탭 키를 눌러보세요. 포커스가 안 보이는 메뉴 안으로 들어갑니다. 화면에는 아무 변화가 없는데 탭만 계속 먹는 상태가 됩니다. 스크린리더도 그 메뉴를 읽습니다. QA 접근성 항목에서 걸리는 단골입니다.

`inert` 속성으로 막습니다.

```js
const menu = document.getElementById('side-menu');

menu.inert = true;   // 닫을 때: 포커스도, 클릭도, 스크린리더도 못 들어감
menu.inert = false;  // 열 때: 원래대로
```

예전에는 `visibility: hidden`을 썼는데, 이건 애니메이션과 같이 쓰면 타이밍을 맞춰야 해서 번거롭습니다. `inert`는 보이는 것과 무관하게 상호작용만 막아주니 훨씬 깔끔합니다.

여기에 두 가지만 더 얹으면 기본은 끝납니다.

```js
const openBtn = document.getElementById('menu-open');
const closeBtn = document.getElementById('menu-close');
const overlay = document.querySelector('.menu-overlay');
let isOpen = false;

function openMenu() {
  isOpen = true;
  menu.classList.add('is-open');
  menu.inert = false;
  overlay.hidden = false;
  openBtn.setAttribute('aria-expanded', 'true');
  closeBtn.focus();  // 열자마자 메뉴 안으로 포커스를 옮긴다
}

function closeMenu() {
  isOpen = false;
  menu.classList.remove('is-open');
  menu.inert = true;
  overlay.hidden = true;
  openBtn.setAttribute('aria-expanded', 'false');
  openBtn.focus();   // 닫으면 원래 눌렀던 버튼으로 포커스를 되돌린다
}

openBtn.addEventListener('click', openMenu);

// ESC로도 닫히게
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isOpen) closeMenu();
});
```

포커스를 되돌리는 부분을 빼먹기 쉬운데, 이게 없으면 키보드로 메뉴를 닫은 순간 포커스가 문서 맨 처음으로 튑니다. 방금 있던 자리로 돌아가려면 탭을 수십 번 눌러야 합니다.

## 모바일 버전

보통 사이드메뉴는 모바일 버전에서 많이 사용합니다. 그래서 모바일 버전을 중심으로 제작하게 됩니다. 그에 따라 모바일 버전에서 특화된 행동이 많습니다.

여기서부터가 실제로 반려당하는 지점들입니다.

### 남는 부분을 터치하면 닫기

메뉴 옆에 남겨둔 공간, 그러니까 오버레이를 누르면 닫혀야 합니다. 사용자는 닫기 버튼을 찾기보다 그냥 옆을 누릅니다.

```js
// 이 줄은 바로 다음 항목(뒤로가기)에서 한 번 바뀝니다
overlay.addEventListener('click', closeMenu);
```

오버레이를 형제로 뒀기 때문에 이걸로 끝입니다. 만약 메뉴 안에 넣었다면 메뉴 안쪽을 눌렀을 때도 이벤트가 올라와서 닫히는 문제가 생기고, `e.stopPropagation()` 같은 걸 덧붙여야 합니다. 구조를 잘 잡으면 코드가 줄어드는 대표적인 예입니다.

### 뒤로가기 버튼을 눌렀을 때의 행동 (중요)

**사이드메뉴를 닫으려고 무심코 뒤로가기 버튼을 누르는 경우가 굉장히 많습니다.** 특히 앱에서는 이것이 기본 동작처럼 여겨지기 때문에 추가적으로 작업해야 하는 부분입니다.

처리하지 않으면 어떻게 될까요. 사용자는 메뉴만 닫으려고 눌렀는데 **이전 페이지로 나가버립니다.** 보고 있던 상품 페이지에서 튕겨나가는 겁니다. 체감상 가장 짜증나는 버그인데, 개발 중에는 마우스로만 테스트하니 발견이 늦습니다.

저도 처음 앱을 만들 때 이 부분을 아예 고려하지 않고 넘어갔습니다. 결국 사용자 테스트에서 지적을 가장 많이 받은 항목이 이거였고, 후작업으로 전부 고쳐야 했습니다. 그때는 방법을 몰라서 화면마다 하나하나 수작업으로 처리했습니다. 처음부터 알았으면 몇 줄로 끝났을 일이었습니다.

그리고 하나 더 말씀드리면, **앱과 웹은 뒤로가기 메커니즘이 조금 다릅니다.** 웹에서 잘 되는 걸 확인했다고 끝내지 마시고 앱에서도 직접 눌러보세요. 웹뷰로 감싸는 순간 동작이 달라지는 경우가 있습니다.

해결은 히스토리에 상태를 하나 쌓아두는 방식으로 합니다.

```js
function openMenu() {
  isOpen = true;

  // 뒤로가기로 닫을 수 있도록 히스토리에 항목을 하나 쌓는다.
  // 이 줄은 openMenu의 맨 앞에 둡니다. 이유는 조금 뒤에 설명하겠습니다.
  history.pushState({ sideMenu: true }, '');

  // ...나머지는 앞의 내용 그대로...
}

// 뒤로가기를 누르면 페이지를 떠나는 대신 메뉴만 닫는다
window.addEventListener('popstate', () => {
  if (isOpen) closeMenu();
});
```

여기까지만 하면 절반입니다. **닫기 버튼이나 오버레이로 닫을 때가 문제입니다.**

그냥 `closeMenu()`를 부르면 아까 쌓아둔 히스토리 항목이 그대로 남습니다. 그 상태에서 사용자가 뒤로가기를 누르면, 이미 닫힌 메뉴를 닫는 셈이라 아무 일도 일어나지 않습니다. 한 번 헛돌고 두 번째에야 페이지가 넘어갑니다.

그래서 버튼으로 닫을 때는 직접 닫지 말고 뒤로가기를 시킵니다.

```js
// 닫기 버튼·오버레이·ESC는 모두 이 함수를 부른다.
// 직접 closeMenu()를 부르지 않고 history.back()으로 넘겨서,
// popstate 핸들러가 닫도록 통로를 하나로 만든다.
function requestClose() {
  if (isOpen) history.back();
}

closeBtn.addEventListener('click', requestClose);
overlay.addEventListener('click', requestClose);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isOpen) requestClose();
});
```

닫는 경로를 하나로 모으는 게 핵심입니다. 이렇게 해두면 뒤로가기로 닫든 버튼으로 닫든 히스토리가 어긋나지 않습니다.

앞에서 오버레이에 `closeMenu`를, ESC에 `closeMenu`를 연결해뒀다면 **지금 것으로 바꿔주세요.** 그대로 두면 리스너가 둘 다 붙어서 한 번 눌렀는데 두 번 닫는 셈이 됩니다.

### 메뉴를 열면 뒤 배경이 같이 스크롤된다

메뉴 위에서 손가락을 위아래로 밀면 뒤에 있는 본문이 움직입니다. 메뉴를 닫고 나면 엉뚱한 위치에 가 있고요.

보통 이렇게 막으려고 합니다.

```css
body.menu-open { overflow: hidden; }
```

데스크톱에서는 됩니다. **iOS 사파리에서는 안 됩니다.** 이것 때문에 여러 번 반려당했습니다.

실무에서 쓰는 건 이쪽입니다.

```js
let savedScroll = 0;

// 열 때: 현재 스크롤 위치를 기억해 두고 body를 화면에 고정한다
function lockScroll() {
  savedScroll = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${savedScroll}px`;
  document.body.style.width = '100%';  // fixed가 되면서 너비가 줄어드는 것 방지
}

// 닫을 때: 고정을 풀고 기억해 둔 위치로 되돌린다
function unlockScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, savedScroll);
}
```

앞에서 만든 `openMenu()`에서 `lockScroll()`을, `closeMenu()`에서 `unlockScroll()`을 불러주면 됩니다.

`position: fixed`를 걸면 브라우저는 스크롤 위치를 0으로 봅니다. 그래서 풀 때 원래 위치로 직접 되돌려줘야 합니다. 이 복원을 빼먹으면 메뉴를 닫는 순간 페이지 맨 위로 튑니다.

`width: 100%`도 빼먹으면 안 됩니다. `fixed`가 되는 순간 body가 콘텐츠 너비만큼 줄어들면서 레이아웃이 순간적으로 흔들립니다.

#### 앞의 뒤로가기와 같이 쓸 때 — 순서를 지켜야 합니다

여기가 실제로 한참 헤맸던 지점입니다. 스크롤 잠금과 뒤로가기를 각각 만들면 둘 다 잘 되는데, **합쳐 놓으면 뒤로가기로 닫았을 때만 스크롤이 맨 위로 튑니다.** 닫기 버튼으로 닫으면 멀쩡하고요.

원인은 `openMenu` 안의 순서입니다.

```js
// ✗ 이렇게 하면 뒤로가기로 닫을 때 스크롤이 복원되지 않습니다
function openMenu() {
  lockScroll();                              // body가 fixed → 이 시점 스크롤은 0
  history.pushState({ sideMenu: true }, '');  // 브라우저가 "스크롤 0"으로 기록
}
```

`pushState`를 부르는 순간 브라우저는 **직전 히스토리 항목의 스크롤 위치를 함께 저장**합니다. 그런데 `lockScroll()`이 먼저 실행되어 `body`가 `position: fixed`가 된 뒤라, 그 시점의 스크롤은 이미 0입니다. 나중에 뒤로가기를 하면 브라우저가 저장해둔 0으로 되돌려버리고, `unlockScroll()`의 `scrollTo`는 그 위에 덮어써집니다.

순서만 바꾸면 해결됩니다.

```js
// ✓ 스크롤을 잠그기 전에 히스토리를 쌓는다
function openMenu() {
  history.pushState({ sideMenu: true }, '');  // 아직 스크롤은 800 → 그대로 기록
  lockScroll();
}
```

`history.scrollRestoration = 'manual'`로 브라우저의 자동 복원을 꺼봐도 이건 해결되지 않습니다. 순서를 바로잡는 게 답입니다.

그리고 메뉴 자체가 길어서 안에서 스크롤될 때, 끝까지 내리면 스크롤이 뒤 배경으로 넘어가는 현상이 있습니다. 이건 CSS 한 줄로 막습니다.

```css
.side-menu {
  overscroll-behavior: contain;  /* 메뉴 안에서 스크롤이 끝나도 뒤로 넘기지 않는다 */
}
```

### 화면 높이와 안전영역

마지막으로 높이입니다. `height: 100vh`로 두면 모바일에서 메뉴 아래쪽이 잘립니다. `100vh`는 주소창이 없는 상태의 높이라, 주소창이 떠 있는 동안에는 화면보다 큽니다.

```css
.side-menu {
  height: 100dvh;  /* 주소창 상태에 따라 실제 보이는 높이로 맞춰짐 */
}
```

메뉴 맨 아래에 로그인 버튼 같은 걸 두는 디자인이라면 하나 더 필요합니다. 아이폰의 홈 인디케이터(아래쪽 검은 막대)에 가려지기 때문입니다.

```css
.side-menu {
  /* 기본 여백에 안전영역만큼을 더한다 */
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
}
```

여기서 하나 빠뜨리기 쉬운 게 있습니다. **`viewport-fit=cover`가 없으면 `env(safe-area-inset-*)`은 항상 0입니다.** CSS만 써놓고 왜 안 되는지 한참 찾게 되는 부분이라, `<head>`의 뷰포트 설정을 같이 확인하세요.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

## 마침말

정리하면, 사이드메뉴는 여닫는 코드보다 **그 다음이 훨씬 깁니다.** 넘기기 전에 아래만 확인해도 반려는 크게 줄어듭니다.

- 오버레이와 메뉴를 형제로 뒀는가
- 닫힌 메뉴에 탭 포커스가 들어가지 않는가 (`inert`)
- 닫으면 포커스가 원래 버튼으로 돌아오는가
- 오버레이를 눌러서 닫히는가
- **뒤로가기로 메뉴만 닫히는가, 페이지가 넘어가지는 않는가**
- 메뉴를 열었을 때 뒤 배경이 스크롤되지 않는가 (iOS에서도)
- 닫은 뒤 원래 스크롤 위치로 돌아오는가 (**뒤로가기로 닫았을 때도**)
- 아래쪽이 잘리거나 홈 인디케이터에 가려지지 않는가

이 중에 하나만 꼽으라면 뒤로가기를 꼽겠습니다. 나머지는 QA에서 걸러지기라도 하는데, 뒤로가기는 실제 사용자 손에 들어가서야 드러나는 경우가 많습니다. 작업이 끝나면 폰으로 열어보시고, 앱으로도 감싸신다면 앱에서 한 번 더 눌러보세요.
