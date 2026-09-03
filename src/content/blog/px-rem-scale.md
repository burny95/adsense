---
title: rem 실전 — 스케일 만들기와 흔한 함정 세 가지
description: rem으로 타이포·간격 스케일을 잡는 방법과, 미디어쿼리·line-height처럼 rem이 오히려 함정이 되는 곳, 그리고 em을 일부러 쓰는 자리를 정리합니다.
category: css
publishedAt: 2026-09-03
relatedTools:
  - px-rem-converter
draft: false
---

## px를 전부 rem으로 바꿨는데도 어색하다면

[1편](/blog/px-rem-basics)에서 px를 rem으로 바꾸는 법까지 봤습니다. 그런데 시안의 px를 하나씩 나눠서 옮겨 놓고 나면, 값이 이렇게 흩어져 있는 경우가 많습니다.

```css
.card       { padding: 1.4375rem; }  /* 23px */
.card__body { padding: 1.5625rem; }  /* 25px */
.panel      { padding: 1.5rem; }     /* 24px */
```

23, 25, 24px. 시안에서 손으로 찍은 값을 그대로 옮긴 결과입니다. 단위만 rem이 됐을 뿐 여백은 여전히 제각각이고, 새 컴포넌트를 만들 때마다 "여기 여백 얼마였지" 하고 다른 파일을 뒤지게 됩니다.

단위를 바꾸는 것과 **값을 정리하는 것**은 다른 일입니다. 이번 편은 그 정리하는 쪽입니다.

## 값을 매번 나누지 말고 스케일로

쓸 값을 미리 몇 개만 정해 두고 그 안에서만 고릅니다. 글자는 배수로, 간격은 4px 배수로 잡는 게 무난합니다.

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

1편의 카드를 이 스케일로 다시 씁니다.

```css
.card {
  font-size: var(--text-lg);
  padding: var(--space-6);
  border-radius: 8px;
}
```

`1.125rem`이 무슨 값인지 기억할 필요가 없고, 23px과 25px 사이에서 고민할 일도 없어집니다. 선택지가 여섯 개뿐이라 고르기만 하면 되죠. 주석의 px 값은 지우지 마세요 — 시안과 대조할 때 이게 제일 빠릅니다.

> **스케일에 넣을 px 값을 한 번에 바꾸려면** [px ↔ rem 변환기](/tools/px-rem-converter)를 쓰세요. 자주 쓰는 값 대조표가 함께 나와서 스케일 후보를 고르기에도 편합니다.

여기까지가 값 정리입니다. 이제부터는 rem이 기대와 다르게 동작하는 자리입니다.

## 함정 1 — 미디어쿼리의 rem은 루트 설정을 무시한다

1편의 62.5% 트릭을 쓰는 프로젝트에서 브레이크포인트를 rem으로 옮기려다 가장 많이 걸리는 함정입니다.

```css
html { font-size: 62.5%; }   /* 1rem = 10px */

.card { padding: 2.4rem; }   /* 24px — 의도대로 동작 */

@media (min-width: 76.8rem) { /* 768px을 노렸지만… */
  .card { padding: 3.2rem; }
}
```

`.card`의 `2.4rem`은 24px이 맞습니다. 그런데 미디어쿼리의 `76.8rem`은 768px이 **아니라 1228.8px**입니다.

미디어쿼리 안의 `rem`과 `em`은 `html`에 지정한 값이 아니라 **사용자의 기본 글자 크기**를 기준으로 계산되기 때문입니다. 미디어쿼리는 어떤 요소에도 속하지 않아서, 문서 안의 선언을 참조할 수가 없습니다. 그래서 `font-size: 62.5%`는 무시되고 기본값 16px이 쓰여 76.8 × 16 = 1228.8px이 됩니다.

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

<div style="background:#fff;border:1px solid #e4e6ea;border-radius:10px;padding:1.25rem 1.5rem;display:flex;gap:1rem;flex-wrap:wrap;font-family:system-ui,sans-serif">
  <div style="flex:1 1 220px;border:1px solid #dfe2e8;border-radius:8px;padding:14px 16px">
    <div style="color:#c92a2a;font-size:11px;margin-bottom:8px">✗ line-height: 1.5rem</div>
    <div style="color:#111;font-size:32px;line-height:24px">두 줄이 되면 글자가 겹칩니다</div>
  </div>
  <div style="flex:1 1 220px;border:1px solid #dfe2e8;border-radius:8px;padding:14px 16px">
    <div style="color:#2b8a3e;font-size:11px;margin-bottom:8px">✓ line-height: 1.5</div>
    <div style="color:#111;font-size:32px;line-height:1.5">두 줄이 되어도 간격이 유지됩니다</div>
  </div>
</div>

단위를 붙이면 **계산된 결과값(24px)이 상속**되고, 단위 없는 숫자를 쓰면 **비율 자체가 상속**되어 자식이 자기 글자 크기로 다시 계산합니다.

```css
.article { font-size: 1rem; line-height: 1.5; }  /* 비율이 상속됨 */
.article h2 { font-size: 2rem; }                 /* 줄 높이 자동으로 48px */
```

`line-height`에는 단위를 붙이지 않습니다. rem도 px도 아니고 그냥 `1.5`라고 씁니다.

## 함정 3 — em을 피하기만 하면 손해다

1편에서 `em`이 중첩되면 곱해진다는 걸 봤습니다. 글자 크기에 쓰면 위험한 성질이지만, **여백에 쓰면 오히려 이게 장점**입니다.

```css
.btn {
  font-size: 1rem;
  padding: 0.5em 1em;   /* 8px 16px */
}
.btn--lg { font-size: 1.25rem; }  /* 20px → padding 자동으로 10px 20px */
```

`--lg`에서 바꾼 건 글자 크기 하나뿐인데 안쪽 여백이 같이 커집니다. `padding`을 rem으로 뒀다면 크기별로 값을 따로 다 써 줘야 했겠죠. 버튼·뱃지·태그처럼 **크기 변형이 여러 개인 컴포넌트**에서 특히 유용합니다.

아이콘도 같습니다. `width: 1em; height: 1em`으로 두면 옆 글자와 항상 같은 크기로 따라갑니다.

1편까지 합치면 단위 선택 기준은 셋입니다.

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

- 단위를 바꾸는 것과 값을 정리하는 것은 다른 일이다. 타이포·간격 스케일을 CSS 변수로 먼저 정하자
- **미디어쿼리의 `rem`은 `html`에 지정한 값이 아니라 사용자 기본 글자 크기가 기준** — 62.5%를 써도 `48rem` = 768px
- 브레이크포인트는 그래도 rem이 낫다. 글자를 키운 사용자에게 더 일찍 좁은 레이아웃이 적용된다
- `line-height`는 단위 없는 숫자로. 단위를 붙이면 계산값이 상속돼 큰 글자에서 줄이 겹친다
- 컴포넌트 내부의 여백과 아이콘은 `em`이 유리하다. 글자 크기 하나만 바꿔도 비례해서 따라온다
