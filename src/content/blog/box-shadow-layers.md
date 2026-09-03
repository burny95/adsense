---
title: box-shadow 실전 — 겹쳐 쌓기와 고도 시스템, 다크 모드 대응
description: 그림자 한 겹이 가짜처럼 보이는 이유와 2~3겹으로 쌓는 레시피, 고도 단계를 CSS 변수로 정리하는 법, 다크 모드에서 그림자가 사라질 때의 대안을 정리합니다.
category: css
publishedAt: 2026-09-05
relatedTools:
  - box-shadow-generator
draft: false
---

## 값은 맞는데 왜 가짜 같을까

[1편](/blog/box-shadow-basics)의 규칙을 다 지켜서 이렇게 썼다고 합시다.

```css
.card {
  box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.18);
}
```

가로는 0, 흐림은 오프셋의 두 배 이상, 색은 반투명 검정, 번짐은 음수. 틀린 게 없는데도 어딘가 밋밋합니다. 진하게 하면 탁해지고, 옅게 하면 안 보입니다.

문제는 값이 아니라 **겹 수**입니다.

## 현실의 그림자는 두 종류다

물체 아래에는 성격이 다른 그림자가 동시에 존재합니다.

- **접지 그림자** — 물체가 바닥에 닿는 자리. 아주 좁고 진합니다
- **확산 그림자** — 주변광이 만드는 넓고 옅은 그림자. 멀리 퍼집니다

한 겹으로는 이 둘을 동시에 표현할 수 없습니다. 흐림을 줄이면 접지만 남아 딱딱해지고, 흐림을 키우면 확산만 남아 물체가 떠 있는지 얼룩이 진 건지 알 수 없게 됩니다. 그래서 **성격이 다른 그림자를 겹쳐 쌓습니다.**

<div style="background:#fff;border:1px solid #e4e6ea;border-radius:10px;padding:1.75rem 1.5rem;display:flex;gap:1.75rem;flex-wrap:wrap;justify-content:center;font-family:system-ui,sans-serif">
  <div style="text-align:center"><div style="width:96px;height:70px;background:#fff;border-radius:10px;box-shadow:0 8px 20px -4px rgba(0,0,0,.18)"></div><div style="font-size:11px;color:#555;margin-top:12px">1겹</div></div>
  <div style="text-align:center"><div style="width:96px;height:70px;background:#fff;border-radius:10px;box-shadow:0 1px 2px rgba(0,0,0,.10),0 8px 24px -4px rgba(0,0,0,.14),0 16px 40px -8px rgba(0,0,0,.10)"></div><div style="font-size:11px;color:#555;margin-top:12px">3겹</div></div>
</div>

오른쪽이 더 진하지도 더 크지도 않은데 더 또렷하게 떠 보입니다. 1px짜리 접지 그림자 한 줄이 카드의 아랫변을 바닥에 붙여 주기 때문입니다.

## 겹 쌓는 규칙

세 줄이면 충분합니다.

```css
box-shadow:
  0 1px 2px rgba(0, 0, 0, 0.10),      /* 접지 — 좁고 또렷하게 */
  0 8px 24px -4px rgba(0, 0, 0, 0.14),  /* 본체 — 방향을 만든다 */
  0 16px 40px -8px rgba(0, 0, 0, 0.10); /* 확산 — 넓고 옅게 */
```

규칙은 두 가지입니다. **아래로 갈수록 오프셋과 흐림을 대략 두 배씩 키우고, 투명도는 조금씩 낮춥니다.** 그리고 큰 레이어일수록 번짐을 더 크게 음수로 줘서 위로 새는 걸 막습니다.

투명도를 전부 0.1 근처로 잡는 게 핵심입니다. 겹치면서 더해지기 때문에, 한 겹씩 보면 거의 안 보일 정도가 맞습니다. 각 겹을 진하게 쓰면 세 겹이 합쳐져 검은 덩어리가 됩니다.

> **직접 겹을 쌓아 보려면** [box-shadow 생성기](/tools/box-shadow-generator)에서 "+ 레이어 추가"로 겹을 늘리세요. 기본값이 이미 2겹(`0 1px 2px`과 `0 8px 24px -4px`)이라, 여기에 한 겹만 더하면 위 레시피가 됩니다.

## 고도를 단계로 고정하기

컴포넌트마다 그림자를 새로 만들면 화면 안에서 어느 요소가 더 위에 있는지 알 수 없게 됩니다. 그림자는 **높이를 나타내는 신호**라서, 값이 제각각이면 신호가 망가집니다.

쓸 단계를 서너 개만 정해 두고 그 안에서 고릅니다.

```css
:root {
  /* 1단계 — 표면에 거의 붙어 있음 (입력창, 구분된 영역) */
  --shadow-1: 0 1px 2px rgba(0, 0, 0, 0.10);

  /* 2단계 — 살짝 떠 있음 (카드, 버튼) */
  --shadow-2: 0 1px 2px rgba(0, 0, 0, 0.10),
              0 4px 12px -2px rgba(0, 0, 0, 0.12);

  /* 3단계 — 확실히 떠 있음 (드롭다운, 팝오버, 모달) */
  --shadow-3: 0 1px 2px rgba(0, 0, 0, 0.10),
              0 8px 24px -4px rgba(0, 0, 0, 0.14),
              0 16px 40px -8px rgba(0, 0, 0, 0.10);
}
```

단계가 올라갈수록 겹 수도 같이 늘어나는 게 자연스럽습니다. 높이 뜬 물체일수록 그림자 성분이 더 분명하게 갈라지기 때문입니다.

`.card { box-shadow: var(--shadow-2); }`처럼 쓰고, hover에서 한 단계 올리고 싶으면 `--shadow-3`으로 바꿉니다. 값을 새로 만들지 않습니다.

## 다크 모드에서는 그림자가 안 보인다

여기서 많이 막힙니다. 검정에 가까운 배경 위에 반투명 검정 그림자를 얹으면 **아무 변화가 없습니다.** 어두운 것 위에 어두운 것을 올렸으니 당연합니다.

라이트 모드의 그림자를 그대로 두면 다크 모드에서 카드가 배경에 그냥 잠깁니다. 해법은 그림자를 진하게 하는 게 아니라 **다른 신호를 쓰는 것**입니다. 다크 모드에서는 높이 뜬 요소일수록 **표면을 밝게** 합니다.

<div style="background:#16181c;border:1px solid #2a2e36;border-radius:10px;padding:1.75rem 1.5rem;display:flex;gap:1.75rem;flex-wrap:wrap;justify-content:center;font-family:system-ui,sans-serif">
  <div style="text-align:center"><div style="width:96px;height:70px;background:#16181c;border-radius:10px;box-shadow:0 8px 24px -4px rgba(0,0,0,.5)"></div><div style="font-size:11px;color:#9aa1ad;margin-top:12px">✗ 그림자만 — 안 보임</div></div>
  <div style="text-align:center"><div style="width:96px;height:70px;background:#23262d;border-radius:10px;box-shadow:0 8px 24px -4px rgba(0,0,0,.5)"></div><div style="font-size:11px;color:#9aa1ad;margin-top:12px">✓ 표면을 밝게</div></div>
</div>

같은 그림자인데 오른쪽만 카드로 보입니다. 배경보다 밝은 표면색 하나가 그림자 열 겹보다 낫습니다.

```css
.card { background: var(--surface-2); box-shadow: var(--shadow-2); }

@media (prefers-color-scheme: dark) {
  :root {
    --surface-2: #23262d;  /* 배경보다 밝게 — 이게 고도 신호 */
    --shadow-2: 0 1px 2px rgba(0, 0, 0, 0.4),
                0 8px 24px -4px rgba(0, 0, 0, 0.5);  /* 보조 역할 */
  }
}
```

다크 모드의 그림자는 지우지 말고 **투명도를 올려 둔 채 보조로** 남겨 두세요. 요소 경계 바로 아래를 눌러 주는 역할은 여전히 합니다.

## 그림자에 트랜지션을 걸지 마세요

hover에서 카드를 띄우는 흔한 코드입니다.

```css
.card { transition: box-shadow 0.2s; }       /* 매 프레임 다시 그린다 */
.card:hover { box-shadow: var(--shadow-3); }
```

`box-shadow`는 GPU에서 합성되지 않아서, 애니메이션하는 동안 매 프레임 그림자를 새로 계산합니다. 카드가 여럿인 목록에서 특히 티가 납니다.

가상 요소에 큰 그림자를 미리 깔아 두고 **투명도만** 바꾸면 이 비용이 사라집니다.

```css
.card { position: relative; box-shadow: var(--shadow-1); }
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: var(--shadow-3);
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;   /* 클릭을 가로채지 않도록 */
}
.card:hover::after { opacity: 1; }
```

`opacity`는 합성만으로 처리되기 때문에 다시 그리는 비용이 없습니다.

## 요약

- 그림자 하나로는 접지와 확산을 동시에 표현할 수 없다. **2~3겹**으로 나눈다
- 아래 겹으로 갈수록 오프셋·흐림을 두 배씩 키우고, 번짐 음수를 더 크게, 투명도는 낮춘다
- 각 겹은 거의 안 보일 만큼(0.1 근처) 옅게. 겹치면서 더해진다
- 고도는 `--shadow-1/2/3` 세 단계로 고정한다. 컴포넌트마다 새로 만들면 높이 신호가 망가진다
- **다크 모드의 고도 신호는 그림자가 아니라 표면 밝기다.** 그림자는 보조로 남긴다
- hover 그림자는 `box-shadow`에 트랜지션을 걸지 말고 가상 요소의 `opacity`로 바꾼다
