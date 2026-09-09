---
target: 도구 표면 전체 (ToolPage)
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 3
target_identity: "file:C:\\Users\\User\\Desktop\\local_work\\adsense\\src\\layouts\\ToolPage.astro"
target_fingerprint: "sha256:a311211c1214b8537f64802b05735f457135928249b823ad9fbdd83a2f5a1ecc"
target_path: "C:\\Users\\User\\Desktop\\local_work\\adsense\\src\\layouts\\ToolPage.astro"
timestamp: 2026-09-09T05-59-31Z
slug: src-layouts-toolpage-astro
---
**Method: dual-agent** (A: 디자인 리뷰 · B: 디텍터 + 브라우저 증거).
**공정성 고지 2건**: (1) B가 A보다 먼저 완료되어 디텍터 결과가 종합 맥락에 먼저 진입했다. 점수는 종합자가 독립적으로 매긴 뒤 A와 대조했고 29점으로 일치했다. (2) **크롬 확장이 세션에 연결되지 않아(`list_connected_browsers` → `[]`) A는 화면을 전혀 보지 못했다.** A의 판단은 소스 + dev 서버가 내보낸 렌더 HTML 9장 + Node 대비비 계산에 근거한다. B는 시스템 Chrome을 puppeteer로 직접 구동해 실측을 대체했다. 따라서 **"보아야만 아는" 심미 판단은 이번 실행에서 미검증이다.**

# Design Health Score — 29/40 (Good)

| # | 휴리스틱 | 점수 | 핵심 소견 |
|---|---|:--:|---|
| 1 | 시스템 상태 가시성 | 3 | 라이브 리전 5/9. 다중 파일 변환은 "변환 중…"뿐, 몇 번째인지 없음 |
| 2 | 시스템과 현실의 일치 | 3 | 도메인 어휘 정확. og-tag는 `summary_large_image`를 라벨로 노출 |
| 3 | 사용자 통제와 자유 | 3 | 초기화 전 도구 + URL 공유. 실행취소는 2개뿐이고 구조 변경만 |
| 4 | 일관성과 표준 | 2 | 결과 계약은 통일됐으나 레이아웃 4관용구, 복사 페이로드 4종 |
| 5 | 오류 예방 | 3 | 조건부 공개가 실제로 작동. og-tag는 지시문이 든 출력을 복사 가능 |
| 6 | 회상보다 인식 | 3 | 8/9가 작동 예제로 열림. box-shadow 레이어당 7숫자는 매핑 불가 |
| 7 | 유연성과 효율 | 2 | URL 공유 외 숙련자 경로 없음. 문서가 권하는 프리셋 3개를 도구가 안 줌 |
| 8 | 심미성과 미니멀리즘 | 3 | 결과 1rem > 라벨 0.88rem 위계, accent 컨트롤. og-tag 8필드 벽이 균형 깸 |
| 9 | 오류 인지·복구 | 3 | 문구가 원인과 현재 처리를 함께 말함. 숨김 안내가 실제로는 발화 안 됨 |
| 10 | 도움말과 문서 | 4 | 카테고리 평균을 명확히 넘음. 실무 판단이지 SEO 채움이 아님 |

24 → 29. 실제 수정으로 오른 것 6점(3·4·5·6·8·10 각 +1), 변경 없는 코드에 대한 재판정으로 내린 것 1점(7: 3→2).

# Design Specificity Verdict
**교환 가능품이 아니다. 다만 저술 밀도의 편차가 지금 이 표면의 최대 결함이다.**
근거: 색 토큰이 수사가 아니라 역산이다(`--border-control` 라이트 3.62:1 / 다크 3.60:1, WCAG 1.4.11의 3:1을 겨냥해 착지). 컨트롤이 도메인을 안다(이미지 크기 6모드가 결과를 서술하고 모드별로 칸이 사라짐, radial일 때 각도 제거). 미리보기가 장식이 아니라 계측기다(원본 크기 점선 겹침, 알파용 체크무늬).
반대편: og-tag는 8필드를 세로로 쌓고 미리보기를 700px 아래 둔다 — 어떤 폼 생성기에도 그대로 붙는 무명의 배치. 9개가 레이아웃 4관용구를 쓰고, 잘 저술된 3~4개가 나머지의 평균을 떠받친다.

Deterministic scan:
- 소스 3디렉터리 `--json` → exit 0, `[]`, 0건. B가 통제 테스트(Inter + bounce easing 심은 임시 .astro)로 디텍터가 살아 있음을 먼저 검증했다 → 진짜 클린.
- `dist/tools` → exit 2, 6건 전부 `flat-type-hierarchy`. **6건 모두 오탐**: 정적 분석기가 `global.css:137,141`의 `clamp()`를 못 풀고 `.related h2{font-size:1rem}`(810)을 h2 대표값으로 잡음. 실제 렌더는 9개 전부 body 16 / h3 18.72 / h2 24 / h1 33.6px (단계 1.17→1.28→1.40).
- URL 모드 9/9 exit 2: `line-length` 85건 — **오탐**(한글 전각을 라틴 자폭으로 나눠 약 2배 계산, 실측 36~79자). `low-contrast` 6건 — 전부 `disabled` 버튼, WCAG 1.4.3 예외라 위반 아님(실측 2.47:1 / 3.26:1). `first-viewport-column-overflow` 1건(gradient `.grad-layout`, 한 컬럼이 뷰포트 높이 162%) — **실재**. `em-dash-overuse` 5건 advisory.
- 이 프로젝트에서 실질 신호는 `dist` 스캔과 URL 모드에서만 나온다. 소스 스캔만 돌리면 미탐이다.

Visual overlays: **없음.** 크롬 확장 미연결로 주입 프리플라이트 자체가 불가. 오버레이가 존재한다고 주장하지 않는다. 대체로 puppeteer 실측을 썼다.
빌드: 성공, 29페이지, 경고 0건. JS 예외 9/9 0건.

# Priority Issues

[P0] 이미지 변환기를 키보드만으로는 시작조차 할 수 없다.
  `<input type="file" hidden>`(image-converter.astro:10) → `display:none` → 탭 순서에서 제거.
  감싼 `<label>`은 포커스를 받지 못한다. 드래그앤드롭은 마우스 조작이라 대안이 아니다.
  9행 주석은 "label로 감싸면 클릭·키보드 모두 열린다"고 적혀 있어 의도와 결과가 정반대.
  **이번 주기의 회귀가 아니다** — `[hidden]{display:none!important}` 이전에도 이 입력에는
  display를 주는 저자 규칙이 없어 UA 스타일시트가 이미 숨기고 있었다.
  디텍터 대비 흥미로운 지점: B는 `[hidden]` 16개가 전부 display:none/offsetHeight 0인 것을
  **성공**으로 측정했고, A는 같은 측정치를 한 요소에 대해 **실패**로 읽었다.
  Fix: `hidden` 제거 → 시각적 은닉(`position:absolute;width:1px;height:1px;opacity:0`),
  `.drop-zone:focus-within`에 hover와 동일한 accent 강조. → /impeccable harden

[P1] px↔rem 복사가 붙여넣을 수 없는 문장을 준다 — 이번 주기에 내가 만든 회귀.
  `24px = 1.5rem   |   1.5rem = 24px` 전체를 복사한다(px-rem-converter.astro:223-225 → 264).
  사용자가 원한 건 `1.5rem` 하나다. 같은 자리·같은 라벨·같은 색 버튼이 clamp에서는
  `font-size: clamp(…);`를, 여기서는 사람이 읽는 문장을 준다.
  bfba656에서 "빠진 복사 버튼 추가"를 하며 결과 문자열을 그대로 실은 것이 원인.
  Fix: 방금 편집한 방향의 단일 값만 복사. → /impeccable clarify

[P1] og-tag 생성기가 지시문을 복사 가능한 출력에 흘리고, 홀로 2단 레이아웃을 안 쓴다.
  `value="페이지 제목을 입력하세요"`(10), `value="사이트 이름"`(31) — placeholder가 아니라 값이다.
  복사 잠금은 `!title && !description && !url && !image`(236)라 네 값이 **모두** 비어야 걸리는데
  url·image가 example.com으로 프리필돼 있어 **로드 직후에도 복사가 열려 있다.**
  다른 8개는 전부 현실적 샘플값(`#3b82f6`, `360/1280/16/24`, `user profile id`)을 쓴다.
  게다가 폼이 `flex-direction:column` 전폭(290-294)이라 928px에서 제목칸이 ~880px가 되고,
  타이핑하는 동안 카드 미리보기는 화면 밖 — 이 도구의 존재 이유인 피드백 루프가 끊긴다.
  Fix: 지시문 value → placeholder, 샘플값 도입, `.tool-layout` 적용,
  사이트명·유형·트위터카드·로케일 4개는 `<details>`로. → /impeccable harden

[P1] 4개 도구의 결과가 보조기술에 전혀 전달되지 않는다.
  실측: role="status" — box-shadow 1, clamp 1, contrast 1, gradient 1, image 4.
  **case-converter · color-converter · og-tag-generator · px-rem-converter는 0개.**
  이 도구들의 상호작용 모델은 "입력하면 답이 바뀐다"인데 그 변화가 발화되지 않는다.
  추가로: hidden인 role="status"를 `hidden=false`로만 바꾸는 코드(box-shadow:394, gradient:438)는
  textContent가 변하지 않아 **라이브 리전이 발화하지 않는다** — 그 안내는 아무에게도 안 간다.
  Fix: 4개 결과 컨테이너에 role="status", 숨김 해제 시 textContent 재설정. → /impeccable harden

[P2] box-shadow "실행취소"가 사용자가 실제로 되돌리고 싶은 것을 되돌리지 못한다.
  `snapshot()`은 339(삭제)·345(추가)·359(초기화)에서만 호출되고 값 변경 핸들러(298-334)에는 없다.
  슬라이더를 잘못 끈 뒤 눌러도 아무 일이 없거나 훨씬 이전 구조로 점프한다.
  Fix: `change`(드래그 종료) 시점 스냅샷 추가, 또는 라벨을 "레이어 되돌리기"로 좁힘. → /impeccable harden

# Persona Red Flags
스크린리더(NVDA): 대비비는 발화되나 판정 5행과 추천 색 상자(`hidden=false`, contrast-checker:293-297)는 발화 안 됨 — 이 도구의 최종 산출물에 도달 못 함. 테마 토글에 aria-pressed 없음.
키보드 전용: 드롭존에서 포커스가 멈추지 않고 "저장 형식" select로 넘어감. 이미지 변환기 완전 사용 불가 — 9개 중 유일하게 페이지를 떠나야 함.
모바일 첫 방문자(390px): og-tag 8필드 ≈720px로 세로 한 화면. 프리필 5개를 각각 전체선택·삭제하는 것이 첫 과업. 이미지 URL 404와 정상 로드가 시각적으로 구분 안 됨(`.empty` 클래스만 잃음, og-tag:252). 같은 사이트 box-shadow는 1열에서 미리보기를 `order:-1` + sticky로 올려 줌 — 정반대 배려.

# Minor
sticky 오프셋 매직넘버 `top:5rem` 6곳 + `3.75rem` 1곳, `--header-h` 토큰 없음.
체크박스 4개가 13×13(box-shadow 2, gradient 1, image 1)이나 감싼 label이 24px 높이라 2.5.8 위반은 아님.
`.preview-toggle .btn` ~30px로 44px 규약 밖(box-shadow:501-505).
죽은 코드(언급만): `.theme-toggle--header`, `.site-footer .theme-toggle`(global.css:340), 297-299 주석이 현재 구현과 불일치.
파일명이 이스케이프 없이 innerHTML로 들어감(image-converter:452) — `&`, `<` 든 파일명이 깨져 보임.
`.tool-intro`가 px-rem에서 표 캡션으로 재사용(47-49) — 한 클래스 두 의미.
contrast 판정표 5행 중 실질 임계값은 3개(3:1 두 행, 4.5:1 두 행 중복).
추천 색 견본이 사용자의 배경색이 아니라 `--surface` 위에 놓임 — 주석(66)의 의도와 다름.
사실 정정: URL 상태 공유는 9/9가 아니라 8/9 (이미지 변환기 제외, 파일이라 정당).

# Questions
1. box-shadow 문서는 "sm/md/lg 3단계로 정해 두고 그 안에서만 쓰라"고 가르치는데(90-108), 도구는 매번 14개 숫자를 백지에서 조율하게 한다. 도구가 자기 조언을 따르지 않는 것 아닌가?
2. 레이아웃 4관용구는 도구별 저술인가, 9번의 개별 결정이 누적된 결과인가? 골격 전체를 계약으로 묶는 것과 "입력이 길고 미리보기가 있으면 `.tool-layout`" 규칙 한 줄은 비용이 완전히 다르다.
3. 대비 검사기의 결과가 스크린리더에 절반만 전달되는 것이, 접근성 도구를 내건다는 주장과 양립하는가?
4. 8/9를 작동 예제로 여는 결정은 훌륭한데 og-tag만 지시문인 것은 의도인가, 그 결정이 아직 도달 못 한 곳인가?
