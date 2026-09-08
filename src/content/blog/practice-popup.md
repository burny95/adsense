---
title: 실무자의 팝업 제작법 — dialog 요소와 안 알려진 함정들
description: 팝업은 사이드메뉴보다 챙길 것이 많습니다. dialog 요소가 대신 해주는 것과 안 해주는 것, 바깥 클릭으로 닫기, 팝업 위에 팝업, 모바일 키보드까지 실제로 걸리는 문제를 정리했습니다.
category: practice
publishedAt: 2026-09-08
draft: true
---

## 팝업은 사이드메뉴보다 함정이 많습니다

[사이드메뉴](/blog/practice-sidemenu)를 만들어 보셨다면 여닫는 흐름은 이미
익숙하실 겁니다. 팝업도 크게 다르지 않아 보입니다. 화면 가운데에 상자를
띄우고, 바깥을 어둡게 하고, 닫기 버튼을 달면 끝인 것 같습니다.

그런데 실제로 만들어 보면 사이드메뉴보다 반려 사유가 더 많이 나옵니다.
이유가 있습니다. 사이드메뉴는 대개 하나만 있고 안에 링크만 들어갑니다.
팝업은 **폼이 들어가고, 팝업 위에 또 팝업이 뜨고, 내용 길이가 매번 다릅니다.**

다행히 요즘은 브라우저가 상당 부분을 대신 해줍니다. `<dialog>` 요소 이야기입니다.
문제는 **어디까지 대신 해주는지 모르고 쓰면** 오히려 더 헤맨다는 것입니다.

이 글에서는 `<dialog>`를 쓸 때 얻는 것과 여전히 직접 해야 하는 것을 나누고,
실무에서 걸리는 함정들을 순서대로 짚겠습니다.

## 직접 만들 것인가, dialog를 쓸 것인가

예전에는 `<div>`로 직접 만들었습니다. 지금도 그렇게 하는 코드가 많습니다.
그런데 직접 만들면 챙겨야 할 것이 꽤 됩니다.

- 팝업 뒤 요소들이 탭 이동에 잡히지 않게 막기
- 열 때 팝업 안으로 포커스 옮기기, 닫을 때 원래 자리로 되돌리기
- ESC 키로 닫기
- 다른 요소 위에 확실히 얹기 (`z-index` 싸움)
- 배경 어둡게 하기

`<dialog>`를 `showModal()`로 열면 **이 다섯 가지가 대부분 해결됩니다.**
직접 만들 이유가 예전만큼 크지 않습니다.

```html
<button type="button" id="open">주문 확인</button>

<dialog id="confirm-dialog">
  <div class="dialog-inner">
    <h2>주문을 확정할까요?</h2>
    <p>확정 후에는 배송지를 바꿀 수 없습니다.</p>
    <form method="dialog">
      <button value="cancel">취소</button>
      <button value="ok">확정</button>
    </form>
  </div>
</dialog>
```

```js
const dialog = document.getElementById('confirm-dialog');
document.getElementById('open').addEventListener('click', () => {
  dialog.showModal();
});

// form method="dialog"로 닫으면 어느 버튼을 눌렀는지 returnValue에 담깁니다
dialog.addEventListener('close', () => {
  if (dialog.returnValue === 'ok') {
    // 확정 처리
  }
});
```

`<form method="dialog">`를 쓰면 버튼을 누를 때 팝업이 닫히고, 그 버튼의
`value`가 `returnValue`에 담깁니다. 닫기 처리를 따로 쓰지 않아도 됩니다.

## showModal()이 해주는 것과 안 해주는 것

여기가 핵심입니다. **된다고 착각하기 쉬운 것**들이 섞여 있습니다.

**해줍니다.**

- 팝업이 다른 모든 요소 위에 올라갑니다. `z-index`를 신경 쓰지 않아도 됩니다
- 뒤쪽 요소가 탭 이동·스크린리더에서 빠집니다
- 열 때 팝업 안으로 포커스가 들어갑니다
- 닫으면 열었던 버튼으로 포커스가 돌아갑니다
- ESC로 닫힙니다
- `::backdrop`으로 배경을 어둡게 할 수 있습니다

```css
dialog::backdrop {
  background: rgb(0 0 0 / 0.5);
}
```

**안 해줍니다.**

- **배경 스크롤이 잠기지 않습니다.** 팝업을 열어 둔 채 마우스 휠을 굴리면 뒤 페이지가 스크롤됩니다
- **바깥을 눌러도 닫히지 않습니다.** 직접 붙여야 합니다
- **뒤로가기로 닫히지 않습니다.** 모바일에서 특히 문제가 됩니다
- 열고 닫을 때 애니메이션이 없습니다

앞의 두 개는 아래에서 다루고, **뒤로가기 처리는 사이드메뉴와 방식이 같습니다.**
[사이드메뉴 편의 뒤로가기 항목](/blog/practice-sidemenu)을 그대로 적용하면 됩니다.
거기서 다룬 **`history.pushState()`를 스크롤 잠금보다 먼저 호출해야 한다**는
순서 문제도 팝업에서 똑같이 발생합니다.

배경 스크롤 잠금도 [사이드메뉴 편](/blog/practice-sidemenu)의 방식을 그대로
씁니다. `position: fixed`로 body를 고정하고 저장해 둔 위치로 되돌리는 그
패턴입니다.

## 바깥을 눌러 닫기 — dialog에서 한 번 꼬입니다

직접 만든 팝업에서는 쉽습니다. 오버레이 `<div>`에 클릭 이벤트를 걸면 끝입니다.

그런데 `<dialog>`에는 오버레이 요소가 따로 없습니다. `::backdrop`은 가짜
요소라 클릭 이벤트를 받을 수 없습니다. 그래서 흔히 이렇게 씁니다.

```js
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close();
});
```

`<dialog>` 요소 자체가 배경 영역까지 차지하고 있어서, **배경을 클릭하면
`e.target`이 `dialog`가 됩니다.** 안쪽 내용을 클릭하면 그 요소가 target이
되므로 구분이 됩니다.

여기에 함정이 하나 있습니다. **`<dialog>`에 `padding`이 남아 있으면 그 여백도
`dialog`가 target입니다.** 브라우저 기본 스타일에 패딩이 들어 있어서, 팝업
가장자리를 눌렀을 뿐인데 닫혀 버립니다.

```css
/* 패딩은 dialog가 아니라 안쪽 요소에 줍니다 */
dialog {
  padding: 0;
  border: 0;
}
.dialog-inner {
  padding: 1.5rem;
}
```

앞의 HTML에서 내용을 `.dialog-inner`로 한 겹 감싼 이유가 이것입니다.

<!-- 여기에 실제 경험담을 넣을 자리입니다.
     예: 이 문제로 QA에서 어떤 지적을 받았는지, 어떻게 발견했는지 -->

## 팝업 위에 팝업이 뜰 때

실무에서 자주 나옵니다. 주문서 팝업 안에서 "약관 보기"를 누르면 약관 팝업이
뜨는 식입니다.

직접 만든 팝업이라면 `z-index`를 계속 올려가며 관리해야 합니다. 두세 개까지는
버티는데, 그 이상 되면 어느 값이 무엇인지 알 수 없게 됩니다.

`<dialog>`는 이 문제가 없습니다. `showModal()`로 연 팝업은 **연 순서대로
쌓입니다.** 나중에 연 것이 항상 위입니다. `z-index`를 적을 필요가 없습니다.

ESC 키도 **가장 위의 팝업 하나만** 닫습니다. 두 개가 한꺼번에 닫히지 않습니다.

다만 스스로 챙겨야 할 것이 있습니다. **배경 스크롤 잠금을 팝업마다 걸었다면,
안쪽 팝업을 닫을 때 잠금이 풀려 버립니다.** 바깥 팝업은 아직 열려 있는데
뒤가 스크롤되기 시작합니다.

열려 있는 팝업 수를 세서, **마지막 하나가 닫힐 때만 잠금을 푸는 것**이
안전합니다.

```js
let openCount = 0;

function lock() {
  openCount += 1;
  if (openCount === 1) lockScroll();
}

function unlock() {
  openCount -= 1;
  // 아직 열려 있는 팝업이 남았다면 잠금을 유지합니다
  if (openCount === 0) unlockScroll();
}
```

## 내용이 길 때

팝업 내용은 매번 길이가 다릅니다. 약관처럼 긴 글이 들어가면 팝업이 화면
밖으로 넘칩니다. 닫기 버튼이 화면 위로 밀려나 누를 수 없게 되기도 합니다.

**팝업 높이에 상한을 두고, 넘치는 부분은 팝업 안에서 스크롤**하게 합니다.

```css
dialog {
  max-height: 85dvh;
  /* 좁은 화면에서 좌우가 화면에 붙지 않게 */
  max-width: min(90vw, 32rem);
}
.dialog-inner {
  max-height: inherit;
  overflow-y: auto;
  /* 팝업 안에서 끝까지 스크롤해도 뒤 페이지가 따라 움직이지 않게 */
  overscroll-behavior: contain;
}
```

`dvh`를 쓴 이유는 모바일 주소창 때문입니다. `vh`는 주소창이 숨겨진 상태를
기준으로 계산돼서, 주소창이 보일 때는 팝업이 화면보다 커집니다.

`overscroll-behavior: contain`도 중요합니다. 이게 없으면 팝업 안을 끝까지
스크롤한 뒤 계속 굴렸을 때 뒤 페이지가 움직입니다.

머리말과 닫기 버튼을 항상 보이게 하려면 내용만 스크롤되도록 나눕니다.

```css
.dialog-inner {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  max-height: 85dvh;
}
.dialog-body {
  overflow-y: auto;
  overscroll-behavior: contain;
}
```

가운데 행에 `minmax(0, 1fr)`을 쓴 이유가 있습니다. `1fr`은 내용의 최소 크기
아래로 줄어들지 않아서, 내용이 길면 그리드가 늘어나 버립니다.

## 모바일에서 키보드가 올라올 때

팝업 안에 입력 칸이 있으면 겪게 됩니다. 입력 칸을 누르면 키보드가 올라오면서
**화면의 절반 가까이를 덮습니다.** 가운데 정렬해 둔 팝업이 키보드에 가려
입력 중인 칸이 안 보이는 상태가 됩니다.

가장 간단한 대응은 **좁은 화면에서 팝업을 가운데가 아니라 위쪽에 붙이는
것**입니다.

```css
@media (max-width: 600px) {
  dialog {
    margin-top: 5vh;
    margin-bottom: auto;
  }
}
```

더 정확히 맞추려면 `visualViewport`로 실제 보이는 영역을 읽습니다.

```js
// 키보드가 차지하고 남은 실제 화면 높이에 맞춥니다
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    dialog.style.maxHeight = `${window.visualViewport.height * 0.85}px`;
  });
}
```

<!-- 여기에 실제 경험담을 넣을 자리입니다.
     예: 어떤 기기에서 문제가 났는지, 테스트에서 어떻게 발견했는지 -->

## 열고 닫을 때 부드럽게

`<dialog>`는 열리고 닫힐 때 `display`가 바뀝니다. 그런데 **`display`가 바뀌는
전환에는 `transition`이 걸리지 않습니다.** 그래서 그냥 두면 툭 나타났다 툭
사라집니다.

`opacity`에 `transition`을 걸어도 소용없습니다. 열리는 순간 이미
`display: block`이면서 `opacity: 1`이라 중간 과정이 없습니다.

요즘은 이 문제를 위한 문법이 생겼습니다.

```css
dialog {
  opacity: 0;
  transform: scale(0.97);
  transition:
    opacity 0.18s,
    transform 0.18s,
    /* display와 overlay는 중간값이 없는 속성이라 별도 지정이 필요합니다 */
    display 0.18s allow-discrete,
    overlay 0.18s allow-discrete;
}

dialog[open] {
  opacity: 1;
  transform: scale(1);
}

/* 열리기 시작할 때의 상태를 따로 알려줍니다 */
@starting-style {
  dialog[open] {
    opacity: 0;
    transform: scale(0.97);
  }
}

dialog::backdrop {
  background: rgb(0 0 0 / 0);
  transition:
    background 0.18s,
    display 0.18s allow-discrete,
    overlay 0.18s allow-discrete;
}
dialog[open]::backdrop {
  background: rgb(0 0 0 / 0.5);
}
@starting-style {
  dialog[open]::backdrop {
    background: rgb(0 0 0 / 0);
  }
}
```

`@starting-style`과 `allow-discrete`가 낯설 수 있는데, 하는 일은 단순합니다.
**"나타나기 직전의 상태는 이거였다"**를 브라우저에 알려주는 것입니다.
그래야 브라우저가 어디서 어디로 움직일지 알 수 있습니다.

지원하지 않는 브라우저에서는 애니메이션 없이 즉시 나타납니다. 기능이
망가지는 것은 아니라 그대로 둬도 괜찮습니다.

움직임을 줄이도록 설정한 사용자를 위해 전환을 꺼 두는 것도 잊지 마세요.

```css
@media (prefers-reduced-motion: reduce) {
  dialog,
  dialog::backdrop {
    transition: none;
  }
}
```

## 확인할 것 정리

만들고 나서 이 목록으로 훑어보면 대부분 걸러집니다.

- [ ] ESC로 닫히는가
- [ ] 바깥을 눌러 닫히는가. **가장자리 여백을 눌렀을 때 잘못 닫히지는 않는가**
- [ ] 닫은 뒤 포커스가 열었던 버튼으로 돌아가는가
- [ ] 팝업을 열어 둔 채 휠을 굴렸을 때 뒤 페이지가 움직이지 않는가
- [ ] **모바일에서 뒤로가기를 눌렀을 때 페이지가 아니라 팝업이 닫히는가**
- [ ] 내용이 아주 길 때 팝업 안에서 스크롤되는가. 닫기 버튼이 화면 밖으로 나가지 않는가
- [ ] 입력 칸을 눌러 키보드가 올라와도 그 칸이 보이는가
- [ ] 팝업 위에 팝업을 열었다가 안쪽만 닫았을 때 스크롤 잠금이 유지되는가

## 마침말

`<dialog>` 덕분에 예전보다 할 일이 많이 줄었습니다. 포커스와 `z-index`처럼
직접 하면 성가시던 것들을 브라우저가 맡아 줍니다.

대신 **"이건 당연히 되겠지" 하고 넘어가기 쉬워졌습니다.** 배경 스크롤 잠금과
뒤로가기는 여전히 직접 해야 하는데, 개발할 때는 마우스로 열고 닫으니 잘
드러나지 않습니다. 그러다 모바일에서 확인할 때 한꺼번에 나옵니다.

<!-- 여기에 마무리 경험담을 넣을 자리입니다.
     사이드메뉴 편처럼 실제 프로젝트에서 겪은 일을 한두 문단으로 -->
