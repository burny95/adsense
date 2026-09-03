---
title: px와 rem 기초 — 차이와 어디에 무엇을 쓸지
description: px, em, rem이 각각 무엇을 기준으로 삼는 단위인지, 페이지 확대와 글자 크기 설정이 어떻게 다른지, 실무에서 어디에 무엇을 쓸지 정리합니다.
category: css
publishedAt: 2026-09-02
relatedTools:
  - px-rem-converter
draft: false
---

## 시안은 px로 오는데, 왜 rem을 쓰라고 하나

디자인 시안은 거의 항상 px로 옵니다. 본문 18px, 안쪽 여백 24px, 모서리 8px. 그대로 옮기면 되는데 왜 굳이 바꾸라는 말이 나올까요.

이 글에서는 카드 하나를 끝까지 예제로 씁니다.

```css
.card {
  font-size: 18px;
  padding: 24px;
  border-radius: 8px;
}
```

대부분의 사용자에게는 잘 보입니다. 문제는 **브라우저 글자 크기를 키워 둔 사용자**입니다. 눈이 불편해서 크롬 설정에서 기본 글자 크기를 16px에서 20px로 바꿔 둔 사람에게도, 이 카드의 글자는 여전히 18px입니다. 다른 사이트는 다 커졌는데 내 사이트만 작게 나오는 셈이죠.

같은 카드를 px로 짰을 때와 rem으로 짰을 때, 그 사용자의 화면입니다.

<div style="background:#fff;border:1px solid #e4e6ea;border-radius:10px;padding:1.25rem 1.5rem;display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-start;font-family:system-ui,sans-serif">
  <div style="flex:1 1 210px;border:1px solid #dfe2e8;border-radius:8px;padding:24px">
    <div style="color:#c92a2a;font-size:11px;margin-bottom:6px">✗ px 고정</div>
    <div style="color:#111;font-size:18px">설정을 20px로 바꿔도 그대로 18px</div>
  </div>
  <div style="flex:1 1 210px;border:1px solid #dfe2e8;border-radius:8px;padding:30px">
    <div style="color:#2b8a3e;font-size:11px;margin-bottom:6px">✓ rem</div>
    <div style="color:#111;font-size:22.5px">설정을 따라 22.5px로 커짐</div>
  </div>
</div>

오른쪽은 `font-size: 1.125rem`, `padding: 1.5rem`으로 쓴 결과입니다. 기준이 16px에서 20px로 1.25배 커졌으니 글자도 여백도 그만큼 커졌습니다.

## 확대와 글자 크기 설정은 다릅니다

여기서 오해가 자주 생깁니다. "Ctrl + + 로 확대하면 px도 커지지 않나?" 맞습니다, **그건 커집니다.** 두 기능은 서로 다른 기능입니다.

| 기능 | 어디서 조절 | px | rem·em |
|---|---|---|---|
| 페이지 확대 | 브라우저 줌 (Ctrl + +) | 커짐 | 커짐 |
| 기본 글자 크기 | 설정 > 모양 > 글꼴 크기 | **안 커짐** | 커짐 |

페이지 확대는 화면을 통째로 키웁니다. 이미지도 여백도 레이아웃도 같이 커지고, 그래서 가로 스크롤이 생기기도 하죠. 반면 글자 크기 설정은 **레이아웃은 그대로 두고 글자만** 키웁니다. 화면 구성이 안 무너지니 저시력 사용자가 실제로는 이쪽을 더 많이 씁니다.

px로만 짠 사이트는 이 설정을 통째로 무시합니다. rem을 쓰는 이유는 "확대에 대응하려고"가 아니라 **사용자가 정해 둔 글자 크기를 존중하려고**입니다.

## px, em, rem

| 단위 | 기준 | 성격 |
|---|---|---|
| `px` | 없음(절대값) | 어디서 쓰든 항상 같은 크기 |
| `rem` | 루트(`html`)의 글자 크기 | 문서 전체에서 기준이 하나 |
| `em` | **자기 요소**의 글자 크기 | 쓰는 위치마다 기준이 달라짐 |

`rem`은 root em의 줄임말입니다. 기준이 `html` 하나로 고정이라 `1.5rem`은 문서 어디에 있든 같은 값입니다. 기본 설정에서 루트가 16px이므로 `1rem = 16px`, `1.5rem = 24px`이 됩니다.

`em`은 기준이 자기 자신의 `font-size`입니다. 같은 `0.9em`이라도 부모가 무엇이냐에 따라 결과가 달라지고, 중첩되면 곱해집니다.

<div style="background:#fff;border:1px solid #e4e6ea;border-radius:10px;padding:1.25rem 1.5rem;font-family:system-ui,sans-serif;color:#111">
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

`14px = 0.875rem`처럼 딱 안 떨어지는 값이 많아서, 시안을 옮길 때 매번 계산기를 두드리게 됩니다.

> **계산이 번거로우면** [px ↔ rem 변환기](/tools/px-rem-converter)에 px 값을 넣으세요. 양방향으로 바로 바꿔 주고, 자주 쓰는 값 대조표도 함께 보여 줍니다. 루트를 16px이 아닌 값으로 잡은 프로젝트라면 기준 폰트 크기만 바꾸면 됩니다.

## 62.5% 트릭

이 나눗셈이 귀찮아서 루트를 10px로 만들어 두는 방법이 널리 쓰입니다.

```css
html {
  font-size: 62.5%; /* 16px의 62.5% = 10px */
}
```

이러면 `1rem = 10px`이 되어 `24px = 2.4rem`처럼 소수점 한 자리로 딱 떨어집니다. 암산이 되니 시안 옮기기가 훨씬 빨라지죠.

단, **`10px`이 아니라 `62.5%`로 써야 합니다.** `font-size: 10px`으로 박아 버리면 사용자가 기본 글자 크기를 20px로 올려도 루트는 10px에 고정돼, rem을 쓴 의미가 통째로 사라집니다. `62.5%`는 비율이라 사용자 설정이 20px이면 루트도 12.5px로 따라 커집니다.

단점도 있습니다. 외부 UI 라이브러리나 붙여 온 컴포넌트는 대부분 `1rem = 16px`을 전제로 쓰여 있어서, 이 트릭을 쓰면 그런 코드가 전부 62.5% 크기로 쪼그라듭니다. 처음부터 내가 짜는 프로젝트라면 편하고, 남의 컴포넌트를 많이 가져다 쓰는 프로젝트라면 안 건드리는 편이 낫습니다.

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

## 요약

- `rem`은 루트(`html`) 글자 크기 기준, `em`은 자기 요소 기준이라 중첩되면 곱해진다
- **페이지 확대는 px도 키우지만, 브라우저 기본 글자 크기 설정은 rem·em만 키운다** — rem을 쓰는 진짜 이유
- `rem 값 = px 값 ÷ 루트 글자 크기`. 기본 16px 기준이면 `24px = 1.5rem`
- `html { font-size: 62.5% }`로 `1rem = 10px`을 만들 수 있다. `10px`이 아니라 반드시 `%`로
- 글자와 함께 커져야 하는 것(글자·여백·본문 폭)은 rem, 장식(테두리·그림자)은 px

다음 편에서는 이 rem을 타이포·간격 스케일에 실제로 적용하는 방법과, 미디어쿼리·`line-height`처럼 rem이 오히려 함정이 되는 곳을 다룹니다.
