---
title: px와 rem 정리 — 차이와 쓰는 자리, 스케일 만들기와 흔한 함정까지
description: px, em, rem이 각각 무엇을 기준으로 삼는 단위인지, 페이지 확대와 글자 크기 설정이 어떻게 다른지, 어디에 무엇을 쓸지, 그리고 rem으로 타이포·간격 스케일을 잡는 법과 미디어쿼리·line-height에서 rem이 함정이 되는 곳, em을 일부러 쓰는 자리까지 정리합니다.
category: css
publishedAt: 2026-09-02
updatedAt: 2026-11-19
draft: false
---

## 시안은 px로 오는데, 왜 rem을 쓰라고 하나

디자인 시안은 거의 항상 px로 옵니다. 본문 18px, 안쪽 여백 24px, 모서리 8px. 그대로 옮기면 되는데 왜 굳이 바꾸라는 말이 나올까요.

이 글에서는 카드 하나를 끝까지 예제로 씁니다. 앞쪽에서 단위의 차이와 바꾸는 법을 보고 뒤쪽에서
값을 스케일로 정리하는 법과 rem이 오히려 함정이 되는 자리를 다룹니다.

```css
.card {
  font-size: 18px;
  padding: 24px;
  border-radius: 8px;
}
```

대부분의 사용자에게는 잘 보입니다. **브라우저 글자 크기를 키워 둔 사용자**가 문제입니다. 눈이 불편해서 크롬 설정에서 기본 글자 크기를 16px에서 20px로 바꿔 둔 사람에게도, 이 카드의 글자는 여전히 18px입니다. 다른 사이트는 다 커졌는데 내 사이트만 작게 나오는 셈이죠.

같은 카드를 px로 짰을 때와 rem으로 짰을 때, 그 사용자의 화면입니다.

<div style="background:#fff;color:#1c1e21;border:1px solid #e4e6ea;border-radius:10px;padding:1.25rem 1.5rem;display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-start;font-family:system-ui,sans-serif">
  <div style="flex:1 1 210px;border:1px solid #dfe2e8;border-radius:8px;padding:24px">
    <div style="color:#c92a2a;font-size:11px;margin-bottom:6px">✗ px 고정</div>
    <div style="color:#111;font-size:18px">설정을 20px로 바꿔도 그대로 18px</div>
  </div>
  <div style="flex:1 1 210px;border:1px solid #dfe2e8;border-radius:8px;padding:30px">
    <div style="color:#1a7f37;font-size:11px;margin-bottom:6px">✓ rem</div>
    <div style="color:#111;font-size:22.5px">설정을 따라 22.5px로 커짐</div>
  </div>
</div>

오른쪽은 `font-size: 1.125rem`, `padding: 1.5rem`으로 쓴 결과입니다. 기준이 16px에서 20px로 1.25배 커졌으니 글자도 여백도 그만큼 커졌습니다.

저는 반응형 작업을 하면서 화면 크기마다 px 값을 하나씩 고치고 있었습니다. 그걸 보던 선임이 rem을 써 보라고 해서 쓰기 시작했는데 적응하고 나니 훨씬 편했습니다.

## 확대와 글자 크기 설정은 다릅니다

여기서 오해가 자주 생깁니다. "Ctrl + + 로 확대하면 px도 커지지 않나?" 맞습니다, **그건 커집니다.** 두 기능은 서로 다른 기능입니다.

| 기능 | 어디서 조절 | px | rem·em |
|---|---|---|---|
| 페이지 확대 | 브라우저 줌 (Ctrl + +) | 커짐 | 커짐 |
| 기본 글자 크기 | 설정 > 모양 > 글꼴 크기 | **안 커짐** | 커짐 |

페이지 확대는 화면을 통째로 키웁니다. 이미지도 여백도 레이아웃도 같이 커지고 그래서 가로 스크롤이 생기기도 하죠. 반면 글자 크기 설정은 **레이아웃은 그대로 두고 글자만** 키웁니다. 배치는 유지한 채 읽기만 편하게 하려는 사용자가 이 설정을 씁니다.

px로만 짠 사이트는 이 설정을 통째로 무시합니다. rem을 쓰는 이유는 "확대에 대응하려고"가 아니라 **사용자가 정해 둔 글자 크기를 존중하려고**입니다.

## px, em, rem

| 단위 | 기준 | 성격 |
|---|---|---|
| `px` | 없음(절대값) | 어디서 쓰든 항상 같은 크기 |
| `rem` | 루트(`html`)의 글자 크기 | 문서 전체에서 기준이 하나 |
| `em` | **자기 요소**의 글자 크기 (`font-size`에 쓰면 부모 기준) | 쓰는 위치마다 기준이 달라짐 |

`rem`은 root em의 줄임말입니다. 기준이 `html` 하나로 고정이라 `1.5rem`은 문서 어디에 있든 같은 값입니다. 기본 설정에서 루트가 16px이므로 `1rem = 16px`, `1.5rem = 24px`이 됩니다.

`em`은 기준이 자기 자신의 `font-size`입니다. 같은 `0.9em`이라도 부모가 무엇이냐에 따라 결과가 달라지고 중첩되면 곱해집니다.

<div style="background:#fff;color:#1c1e21;border:1px solid #e4e6ea;border-radius:10px;padding:1.25rem 1.5rem;font-family:system-ui,sans-serif;color:#111">
  <div style="font-size:16px">1단계 — 16px</div>
  <div style="font-size:16px;padding-left:14px"><span style="font-size:.9em">2단계 · 0.9em → 14.4px</span>
    <div style="font-size:14.4px;padding-left:14px"><span style="font-size:.9em">3단계 · 0.9em → 13.0px</span>
      <div style="font-size:13px;padding-left:14px"><span style="font-size:.9em">4단계 · 0.9em → 11.7px</span></div>
    </div>
  </div>
</div>

각 단계는 똑같이 `0.9em`이지만 기준이 매번 부모로 옮겨 가서 16 → 14.4 → 13.0 → 11.7px로 계속 줄어듭니다. 목록이나 댓글처럼 중첩되는 구조에 `em`으로 글자 크기를 주면 이렇게 예상 못 한 곳에서 글자가 뭉개집니다.

## px를 rem으로 바꾸는 계산

나눗셈 하나입니다.

> **rem 값 = px 값 ÷ 루트 글자 크기**

루트가 기본값 16px이면 `24 ÷ 16 = 1.5`, 즉 `24px = 1.5rem`입니다. 자주 쓰는 값은 외워 두면 편합니다.

| px | rem | px | rem |
|---|---|---|---|
| 12px | 0.75rem | 24px | 1.5rem |
| 14px | 0.875rem | 32px | 2rem |
| 16px | 1rem | 40px | 2.5rem |
| 18px | 1.125rem | 48px | 3rem |
| 20px | 1.25rem | 64px | 4rem |

`14px = 0.875rem`처럼 딱 안 떨어지는 값이 많아서 시안을 옮길 때 매번 계산기를 두드리게 됩니다.


## 62.5% 트릭

이 나눗셈이 귀찮아서 루트를 10px로 만들어 두는 방법이 널리 쓰입니다.

```css
html {
  font-size: 62.5%; /* 16px의 62.5% = 10px */
}
```

이러면 `1rem = 10px`이 되어 `24px = 2.4rem`처럼 소수점 한 자리로 딱 떨어집니다. 암산이 되니 시안 옮기기가 훨씬 빨라지죠.

단, **`62.5%`로 써야 합니다.** `font-size: 10px`으로 박아 버리면 사용자가 기본 글자 크기를 20px로 올려도 루트는 10px에 고정돼, rem을 쓴 의미가 사라집니다. `62.5%`는 비율이라 사용자 설정이 20px이면 루트도 12.5px로 따라 커집니다.

단점도 있습니다. 외부 UI 라이브러리나 붙여 온 컴포넌트는 대부분 `1rem = 16px`을 전제로 쓰여 있어서 이 트릭을 쓰면 그런 코드가 전부 62.5% 크기로 쪼그라듭니다. 처음부터 내가 짜는 프로젝트라면 편하고 남의 컴포넌트를 많이 가져다 쓰는 프로젝트라면 안 건드리는 편이 낫습니다.

저도 rem을 처음 쓸 때는 px 값을 하나하나 16으로 나눠 가며 옮겼는데 이 방식으로 바꾸고 나서 계산이 확실히 편해졌습니다. 대신 라이브러리처럼 CSS가 미리 정해져 들어오는 것을 함께 쓸 때는 크기가 어긋나지 않는지 주의해야 합니다.

## 어디에 rem을 쓰고, 어디에 px를 남기나

"전부 rem으로" 바꿀 필요는 없습니다. 기준은 하나입니다 — **사용자가 글자를 키웠을 때 이것도 같이 커져야 하는가?**

**rem을 쓰는 곳**

- `font-size` — 가장 중요합니다. 여기만 해도 절반은 해결됩니다.
- `padding`, `margin` — 글자가 커졌는데 여백이 그대로면 답답해집니다.
- `max-width` — 특히 본문 단 너비. 글자가 커지면 한 줄에 들어가는 글자 수를 유지하려고 폭도 같이 넓어져야 읽기 편합니다.

**px를 남겨도 되는 곳**

- `border: 1px` — 테두리가 글자 따라 굵어질 이유가 없습니다.
- `box-shadow`, 헤어라인 — 마찬가지로 장식 요소입니다.
- 아이콘·로고처럼 크기가 고정인 것.

`border-radius`는 취향입니다. 카드가 커질 때 모서리도 비례해서 둥글어지길 원하면 rem, 항상 같은 곡률을 원하면 px로 둡니다.


## px를 전부 rem으로 바꿨는데도 어색하다면

앞에서 px를 rem으로 바꾸는 법까지 봤습니다. 그런데 시안의 px를 하나씩 나눠서 옮겨 놓고 나면, 값이 이렇게 흩어져 있는 경우가 많습니다.

```css
.card       { padding: 1.4375rem; }  /* 23px */
.card__body { padding: 1.5625rem; }  /* 25px */
.panel      { padding: 1.5rem; }     /* 24px */
```

23, 25, 24px. 시안에서 손으로 찍은 값을 그대로 옮긴 결과입니다. 단위만 rem이 됐을 뿐 여백은 여전히 제각각이고 새 컴포넌트를 만들 때마다 "여기 여백 얼마였지" 하고 다른 파일을 뒤지게 됩니다.

단위를 바꾸는 것과 **값을 정리하는 것**은 다른 일입니다. 여기서부터는 그 정리를 다룹니다.

## 값을 매번 나누지 말고 스케일로

쓸 값을 미리 몇 개만 정해 두고 그 안에서만 고릅니다. 글자는 몇 단계만, 간격은 4px 배수로 잡는 게 무난합니다.

```css
:root {
  /* 타이포 스케일 */
  --text-sm:   0.875rem; /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg:   1.125rem; /* 18px */
  --text-xl:   1.5rem;   /* 24px */
  --text-2xl:  2rem;     /* 32px */

  /* 간격 스케일 — 4px 배수 */
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
}
```

앞의 카드를 이 스케일로 다시 씁니다.

```css
.card {
  font-size: var(--text-lg);
  padding: var(--space-6);
  border-radius: 8px;
}
```

`1.125rem`이 무슨 값인지 기억할 필요가 없고 23px과 25px 사이에서 고민할 일도 없어집니다. 선택지가 여섯 개뿐이라 고르기만 하면 되죠. 주석의 px 값은 지우지 마세요 — 시안과 대조할 때 이게 제일 빠릅니다.

저도 예전에는 글자마다 px 값을 하나씩 따로 줬습니다. 그러다 보니 값이 1px만 바뀌어도 같은 크기를 쓰는 본문을 전부 찾아서 고쳐야 했습니다. 스케일로 정해 둔 뒤로는 공통 값 하나만 바꾸면 전체에 적용돼서 완성 후 수정 작업이 훨씬 편해졌습니다.


여기까지가 값 정리입니다. 이제부터는 rem이 기대와 다르게 동작하는 자리를 봅니다.

## 함정 1 — 미디어쿼리의 rem은 루트 설정을 무시한다

앞에서 본 62.5% 트릭을 쓰는 프로젝트에서 브레이크포인트를 rem으로 옮기려다 가장 많이 걸리는 함정입니다.

```css
html { font-size: 62.5%; }   /* 1rem = 10px */

.card { padding: 2.4rem; }   /* 24px — 의도대로 동작 */

@media (min-width: 76.8rem) { /* 768px을 노렸지만… */
  .card { padding: 3.2rem; }
}
```

`.card`의 `2.4rem`은 24px이 맞습니다. 그런데 미디어쿼리의 `76.8rem`은 768px이 되지 않고 **1228.8px**이 됩니다.

미디어쿼리 안의 `rem`과 `em`은 `html`에 지정한 값을 따르지 않고 **사용자의 기본 글자 크기**를 기준으로 계산되기 때문입니다. 미디어쿼리는 어떤 요소에도 속하지 않아서 문서 안의 선언을 참조할 수가 없습니다. 그래서 `font-size: 62.5%`는 무시되고 기본값 16px이 쓰여 76.8 × 16 = 1228.8px이 됩니다.

| 위치 | `1rem`의 기준 |
|---|---|
| 일반 규칙(`.card { padding }`) | `html`에 지정한 값 (62.5% → 10px) |
| 미디어쿼리 조건(`@media`) | 사용자 기본 글자 크기 (보통 16px) |

**미디어쿼리의 rem은 항상 16px 기준으로 계산하세요.** 768px은 `48rem`, 1024px은 `64rem`, 1280px은 `80rem`입니다. 62.5% 트릭을 쓰든 안 쓰든 이 값은 같습니다.

그렇다고 브레이크포인트를 px로 두는 게 낫냐면, 그건 아닙니다. 기준이 사용자 기본 글자 크기라는 건 곧 **글자를 20px로 키워 둔 사용자에게는 `48rem`이 960px이 된다**는 뜻입니다. 글자가 큰 사용자일수록 더 이른 시점에 좁은 레이아웃으로 넘어가서, 한 줄에 들어가는 글자 수가 유지됩니다. px로 박아 두면 이 대응이 사라집니다.

## 함정 2 — line-height에는 단위를 쓰지 마세요

`line-height`는 rem으로 쓰면 안 되는 대표적인 속성입니다.

```css
.article { font-size: 1rem; line-height: 1.5rem; }  /* 16px / 24px */
.article h2 { font-size: 2rem; }                    /* 32px */
```

`h2`의 글자는 32px로 커졌는데 줄 높이는 상속받은 **24px 그대로**입니다. 줄 높이가 글자보다 작으니 두 줄이 되는 순간 글자가 겹칩니다.

<div style="background:#fff;color:#1c1e21;border:1px solid #e4e6ea;border-radius:10px;padding:1.25rem 1.5rem;display:flex;gap:1rem;flex-wrap:wrap;font-family:system-ui,sans-serif">
  <div style="flex:1 1 220px;border:1px solid #dfe2e8;border-radius:8px;padding:14px 16px">
    <div style="color:#c92a2a;font-size:11px;margin-bottom:8px">✗ line-height: 1.5rem</div>
    <div style="color:#111;font-size:32px;line-height:24px">두 줄이 되면 글자가 겹칩니다</div>
  </div>
  <div style="flex:1 1 220px;border:1px solid #dfe2e8;border-radius:8px;padding:14px 16px">
    <div style="color:#1a7f37;font-size:11px;margin-bottom:8px">✓ line-height: 1.5</div>
    <div style="color:#111;font-size:32px;line-height:1.5">두 줄이 되어도 간격이 유지됩니다</div>
  </div>
</div>

단위를 붙이면 **계산된 결과값(24px)이 상속**되고 단위 없는 숫자를 쓰면 **비율 자체가 상속**되어 자식이 자기 글자 크기로 다시 계산합니다.

```css
.article { font-size: 1rem; line-height: 1.5; }  /* 비율이 상속됨 */
.article h2 { font-size: 2rem; }                 /* 줄 높이 자동으로 48px */
```

`line-height`에는 단위를 붙이지 않습니다. rem이나 px 없이 그냥 `1.5`라고 씁니다.

line-height도 처음에는 rem으로 맞추면 깔끔할 것 같아서 그렇게 썼습니다. 막상 써 보니 줄 간격이 이상하게 나와서 지금은 단위를 붙이지 않습니다.

## 함정 3 — em을 피하기만 하면 손해다

앞에서 `em`이 중첩되면 곱해진다는 걸 봤습니다. 글자 크기에 쓰면 위험한 성질이지만 **여백에 쓰면 오히려 이게 장점**입니다.

```css
.btn {
  font-size: 1rem;
  padding: 0.5em 1em;   /* 8px 16px */
}
.btn--lg { font-size: 1.25rem; }  /* 20px → padding 자동으로 10px 20px */
```

`--lg`에서 바꾼 건 글자 크기 하나뿐인데 안쪽 여백이 같이 커집니다. `padding`을 rem으로 뒀다면 크기별로 값을 따로 다 써 줘야 했겠죠. 버튼·뱃지·태그처럼 **크기 변형이 여러 개인 컴포넌트**에서 특히 유용합니다.

아이콘도 같습니다. `width: 1em; height: 1em`으로 두면 옆 글자와 항상 같은 크기로 따라갑니다.

앞의 내용까지 합치면 단위 선택 기준은 셋입니다.

| 용도 | 단위 |
|---|---|
| 문서 전체의 글자·여백 스케일 | `rem` |
| 컴포넌트 내부에서 글자에 비례해야 하는 여백·아이콘 | `em` |
| 글자 크기 자체 (특히 중첩되는 구조) | `em` 피하기 |

## 기존 프로젝트를 옮기는 순서

전부 한 번에 바꿀 필요는 없습니다. 효과가 큰 것부터 순서대로 하면 중간에 멈춰도 손해가 없습니다.

1. **`font-size`** — 여기만 바꿔도 체감 효과의 대부분이 나옵니다
2. **`padding`·`margin`** — 스케일 변수를 만들면서 값 정리도 같이
3. **`max-width`** — 본문 단 너비. `65ch`도 좋은 선택입니다
4. **미디어쿼리** — 마지막에, 반드시 16px 기준으로 재계산
5. **`border`·`box-shadow`** — 그대로 둡니다

## 요약

- `rem`은 루트(`html`) 글자 크기 기준, `em`은 자기 요소 기준이라 중첩되면 곱해진다
- **페이지 확대는 px도 키우지만 브라우저 기본 글자 크기 설정은 rem·em만 키운다** — rem을 쓰는 진짜 이유
- `rem 값 = px 값 ÷ 루트 글자 크기`. 기본 16px 기준이면 `24px = 1.5rem`
- `html { font-size: 62.5% }`로 `1rem = 10px`을 만들 수 있다. 반드시 `%`로(`10px` 금지)
- 글자와 함께 커져야 하는 것(글자·여백·본문 폭)은 rem, 장식(테두리·그림자)은 px
- 단위를 바꾸는 것과 값을 정리하는 것은 다른 일이다. 타이포·간격 스케일을 CSS 변수로 먼저 정하자
- **미디어쿼리의 `rem`은 사용자 기본 글자 크기가 기준** — 62.5%를 써도 `48rem` = 768px
- 브레이크포인트는 그래도 rem이 낫다. 글자를 키운 사용자에게 더 일찍 좁은 레이아웃이 적용된다
- `line-height`는 단위 없는 숫자로. 단위를 붙이면 계산값이 상속돼 큰 글자에서 줄이 겹친다
- 컴포넌트 내부의 여백과 아이콘은 `em`이 유리하다. 글자 크기 하나만 바꿔도 비례해서 따라온다
