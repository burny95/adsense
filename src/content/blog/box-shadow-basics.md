---
title: box-shadow 기초 — 다섯 개 값이 각각 하는 일
description: box-shadow의 X, Y, blur, spread, 색상이 각각 무엇을 바꾸는지 하나씩 분리해서 보고, 그림자 색을 회색이 아니라 반투명 검정으로 써야 하는 이유를 정리합니다.
category: css
publishedAt: 2026-09-04
relatedTools:
  - box-shadow-generator
draft: false
---

## 값을 하나도 모르고 복붙하고 있다면

`box-shadow`는 어딘가에서 복사해 온 한 줄을 그대로 쓰는 경우가 많습니다.

```css
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
```

숫자가 셋이고 색이 하나인데, 어느 숫자를 건드려야 그림자가 더 부드러워지는지 모르면 결국 아무 값이나 바꿔 보다가 원래대로 되돌리게 됩니다. 값은 다섯 개뿐이고 각각 하는 일이 뚜렷합니다.

```css
box-shadow: <가로> <세로> <흐림> <번짐> <색상>;
/*             0     4px    8px    0    rgba(0,0,0,.3) */
```

번짐(spread)은 생략할 수 있어서 위 예제처럼 값이 셋만 보이는 경우가 흔합니다.

## 가로·세로 — 그림자의 방향

앞의 두 값은 그림자를 어느 쪽으로 얼마나 밀지 정합니다. 양수면 오른쪽·아래로 갑니다.

여기서 실무 규칙이 하나 나옵니다. **가로 오프셋은 대부분 0으로 둡니다.** 화면 위 요소는 보통 정면 위쪽에서 빛을 받는다고 가정하기 때문에, 그림자는 아래로만 떨어지는 게 자연스럽습니다. `0 4px`처럼 세로만 주는 값이 많은 이유입니다.

<div style="background:#fff;border:1px solid #e4e6ea;border-radius:10px;padding:1.5rem;display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center;font-family:system-ui,sans-serif">
  <div style="text-align:center"><div style="width:88px;height:64px;background:#fff;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,.25)"></div><div style="font-size:11px;color:#555;margin-top:10px">0 4px — 아래로</div></div>
  <div style="text-align:center"><div style="width:88px;height:64px;background:#fff;border-radius:8px;box-shadow:8px 4px 8px rgba(0,0,0,.25)"></div><div style="font-size:11px;color:#555;margin-top:10px">8px 4px — 옆으로 밀림</div></div>
  <div style="text-align:center"><div style="width:88px;height:64px;background:#fff;border-radius:8px;box-shadow:0 -4px 8px rgba(0,0,0,.25)"></div><div style="font-size:11px;color:#555;margin-top:10px">0 -4px — 위로</div></div>
</div>

가운데처럼 옆으로 밀린 그림자는 그 요소만 다른 방향에서 빛을 받는 셈이라, 같은 화면의 다른 카드들과 조명이 어긋나 보입니다.

## 흐림 — 부드러움

세 번째 값이 흐림(blur)입니다. 0이면 가장자리가 칼같이 잘리고, 값이 커질수록 경계가 퍼집니다. 그림자가 어색할 때 열에 아홉은 이 값이 문제입니다.

<div style="background:#fff;border:1px solid #e4e6ea;border-radius:10px;padding:1.5rem;display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center;font-family:system-ui,sans-serif">
  <div style="text-align:center"><div style="width:88px;height:64px;background:#fff;border-radius:8px;box-shadow:0 6px 0 rgba(0,0,0,.2)"></div><div style="font-size:11px;color:#555;margin-top:10px">blur 0</div></div>
  <div style="text-align:center"><div style="width:88px;height:64px;background:#fff;border-radius:8px;box-shadow:0 6px 6px rgba(0,0,0,.2)"></div><div style="font-size:11px;color:#555;margin-top:10px">blur 6px</div></div>
  <div style="text-align:center"><div style="width:88px;height:64px;background:#fff;border-radius:8px;box-shadow:0 6px 20px rgba(0,0,0,.2)"></div><div style="font-size:11px;color:#555;margin-top:10px">blur 20px</div></div>
</div>

경험칙으로 **흐림은 세로 오프셋의 두세 배**를 잡으면 무난합니다. `0 4px`이면 흐림 8~12px 정도죠. 흐림이 오프셋보다 작으면 스티커를 붙인 것처럼 딱딱해 보입니다.

## 번짐 — 크기, 특히 음수

네 번째 값은 그림자를 사방으로 키우거나 줄입니다. 양수는 잘 안 쓰고, **음수가 훨씬 유용합니다.**

그림자를 크게 떨어뜨리려고 오프셋과 흐림을 키우면 그림자가 요소 위쪽으로도 삐져나옵니다. 이때 번짐을 음수로 주면 전체 크기가 줄어서, 아래쪽에만 그림자가 남습니다.

<div style="background:#fff;border:1px solid #e4e6ea;border-radius:10px;padding:1.5rem;display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center;font-family:system-ui,sans-serif">
  <div style="text-align:center"><div style="width:88px;height:64px;background:#fff;border-radius:8px;box-shadow:0 12px 24px rgba(0,0,0,.22)"></div><div style="font-size:11px;color:#555;margin-top:10px">spread 0 — 위로도 번짐</div></div>
  <div style="text-align:center"><div style="width:88px;height:64px;background:#fff;border-radius:8px;box-shadow:0 12px 24px -8px rgba(0,0,0,.28)"></div><div style="font-size:11px;color:#555;margin-top:10px">spread -8px — 아래만</div></div>
</div>

## 색 — 회색을 쓰면 안 되는 이유

가장 많이 틀리는 부분입니다. 그림자 색으로 `#ccc` 같은 **불투명 회색**을 쓰면 흰 배경에서는 그럴듯해 보이지만, 배경이 흰색이 아닌 순간 회색 얼룩이 됩니다.

반투명 검정은 뒤에 있는 색이 그대로 비쳐서 어떤 배경에서든 "그 배경이 어두워진 것"으로 보입니다. 같은 두 그림자를 색 있는 배경 위에 올려 보면 차이가 분명합니다.

<div style="background:#dbe4d7;border:1px solid #e4e6ea;border-radius:10px;padding:1.5rem;display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center;font-family:system-ui,sans-serif">
  <div style="text-align:center"><div style="width:88px;height:64px;background:#fff;border-radius:8px;box-shadow:0 6px 14px #cccccc"></div><div style="font-size:11px;color:#3f4a3a;margin-top:10px">✗ #ccc — 회색 얼룩</div></div>
  <div style="text-align:center"><div style="width:88px;height:64px;background:#fff;border-radius:8px;box-shadow:0 6px 14px rgba(0,0,0,.18)"></div><div style="font-size:11px;color:#3f4a3a;margin-top:10px">✓ rgba(0,0,0,.18)</div></div>
</div>

투명도는 **0.1~0.2 사이**에서 시작하세요. 0.3을 넘으면 그림자가 아니라 검은 띠처럼 보이기 시작합니다. 맨 처음 예제로 가져온 `rgba(0, 0, 0, 0.3)`이 어딘가 탁해 보였다면 이 때문입니다.

> **값을 하나씩 밀어 보면서 확인하려면** [box-shadow 생성기](/tools/box-shadow-generator)를 쓰세요. 다섯 값을 각각 조절하면서 결과를 바로 보고, 밝은 배경과 어두운 배경을 전환해 확인할 수 있습니다.

## inset — 안쪽 그림자

`inset` 키워드를 앞에 붙이면 그림자가 요소 바깥이 아니라 안쪽으로 들어갑니다. 눌린 버튼, 입력창 안쪽의 미묘한 깊이, 이미지 위 비네팅 같은 데 씁니다.

<div style="background:#fff;border:1px solid #e4e6ea;border-radius:10px;padding:1.5rem;display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center;font-family:system-ui,sans-serif">
  <div style="text-align:center"><div style="width:88px;height:64px;background:#f1f3f5;border-radius:8px;box-shadow:0 3px 8px rgba(0,0,0,.18)"></div><div style="font-size:11px;color:#555;margin-top:10px">기본 — 떠 있음</div></div>
  <div style="text-align:center"><div style="width:88px;height:64px;background:#f1f3f5;border-radius:8px;box-shadow:inset 0 3px 8px rgba(0,0,0,.22)"></div><div style="font-size:11px;color:#555;margin-top:10px">inset — 눌려 있음</div></div>
</div>

## 요약

- 순서는 `가로 세로 흐림 번짐 색상`. 번짐은 생략 가능해서 값이 셋만 보이는 경우가 많다
- 가로는 대부분 0. 화면 안의 모든 요소가 같은 방향에서 빛을 받아야 한다
- **흐림은 세로 오프셋의 두세 배**부터 시작한다. 작으면 스티커처럼 딱딱해진다
- 번짐은 음수가 쓸모 있다. 큰 그림자가 위로 삐져나오는 것을 잘라 준다
- **색은 불투명 회색이 아니라 반투명 검정.** 투명도 0.1~0.2에서 시작한다

다음 편에서는 이 값들로 그림자를 **여러 겹 쌓아** 진짜처럼 보이게 만드는 방법과, 고도(elevation) 단계를 CSS 변수로 정리하는 법, 그리고 다크 모드에서 그림자가 사라지는 문제를 다룹니다.
