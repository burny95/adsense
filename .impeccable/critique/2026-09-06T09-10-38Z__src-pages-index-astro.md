---
target: Burny Tools 사이트 (사이드바 셸)
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 4
target_identity: "file:C:\\Users\\User\\Desktop\\local_work\\adsense\\src\\pages\\index.astro"
target_fingerprint: "sha256:56bb50bc86af51b2e147e9203b828a55a838599e072ad7b8aa636276cdc6b111"
target_path: "C:\\Users\\User\\Desktop\\local_work\\adsense\\src\\pages\\index.astro"
timestamp: 2026-09-06T09-10-38Z
slug: src-pages-index-astro
---
**Method: dual-agent (A: 디자인 리뷰 · B: 디텍터/브라우저 증거, 상호 격리 병렬 실행)**

대상: src/pages/index.astro (사이드바 셸이 걸린 5개 대표 뷰: /, /tools, /tools/clamp-generator, /blog, /blog/px-rem-basics)

## 디자인 헬스 스코어

| # | 휴리스틱 | 점수 | 핵심 발견 |
|---|---|---|---|
| 1 | 시스템 상태 가시성 | 2 | /tools·/blog에서 사이드바 aria-current 미전달. #hint에 aria-live 없음 |
| 2 | 실세계와의 일치 | 3 | 라벨은 평이. "브라우저 창 크기를 바꿔보세요"는 도구 일을 사용자에게 넘김 |
| 3 | 사용자 제어와 자유 | 2 | 6개 도구 전부 초기화 버튼 없음. box-shadow 삭제는 확인·실행취소 없음 |
| 4 | 일관성과 표준 | 2 | clamp/box-shadow 순서 반대. aria-label="블로그 메뉴"가 도구 페이지에도. h1→h3 건너뜀 |
| 5 | 오류 예방 | 2 | 무효 입력 통과, 복사 버튼 활성 유지. 잘못된 hex 조용히 무시 |
| 6 | 회상보다 인식 | 3 | 아이콘 온리 없음. 프리셋·예시 부재 |
| 7 | 유연성과 효율 | 1 | 도구 상태가 URL에 없음 → 공유 불가. 단축키·프리셋·저장 0개 |
| 8 | 미학과 미니멀리즘 | 2 | 홈에서 도구 6개가 세 번. 읽기 페이지 오른쪽 300px 상시 공백 |
| 9 | 오류 인지·복구 | 2 | 문구는 우수. 문제 필드에서 260px 떨어진 곳에 뜨고 스크린리더엔 안 감 |
| 10 | 도움말과 문서 | 3 | 각 도구 사용법이 "왜"를 씀 — 사이트의 진짜 자산 |
| 합계 | | 22/40 | Acceptable |

## 디자인 특수성 판정

카테고리 교체 가능(category-interchangeable). 브랜드 색이 화면에 한 번도 안 나옴 — theme-color #FF7A1A(주황) vs --accent #3050e0(무개성 파랑). 카테고리 6종 배지가 전부 같은 회색. 색상 도구를 파는 사이트가 자기 카테고리를 색으로 구분하지 않음.
저작된 순간 하나: clamp 미리보기의 한글+라틴 팬그램.

결정론적 스캔: CLI는 지정 범위 0건이나 신뢰 불가. (1) CSS가 100% global.css에 있어 마크업 디렉터리만 넘기면 미스캔 — 범위를 src로 넓히자 global.css:618 .callout의 border-left 3px [side-tab] 1건. (2) 디텍터가 DEGRADED 모드(HTML 파서 모듈 부재)로 커스텀 프로퍼티·계산 대비 미평가. CLI 0건은 "측정 불가".

브라우저 주입 스캔 결과: / 6건(line-length×5 ~131자, skipped-heading×1), /tools 1건, /tools/clamp-generator 2건, /blog 8건, /blog/px-rem-basics 14건(low-contrast 포함).

오버레이는 현재 볼 수 없음 — 주입은 성공했으나 live-server를 규정대로 중지했고 스캔 중 탭이 3회 강제 종료됨.

두 평가 일치: 줄길이. A는 육안으로 "오른쪽 300px 빔, 홈 본문 944px", B는 같은 요소를 944px/~131자로 측정.
디텍터만 잡은 것: low-contrast #2b8a3e on #ffffff = 4.4:1, AA(4.5:1) 미달. 블로그 마크다운 인라인 색. 토큰 --success #1a7f37은 대비 충족하는데 본문이 토큰을 안 씀.
오탐: ai-color-palette는 Shiki github-dark 표준 토큰 색. em-dash-overuse는 영어 기준 룰.

## 총평

엔지니어링은 견고(테마 3단 구성, JSON-LD, 시맨틱 마크업, 실무 지식 산문), 디자인은 무개성. 크롬이 콘텐츠를 이김.
가장 큰 기회: 크롬 다이어트 + 도구 골격 통일 + 신뢰 회복.
사이드바는 블로그 상세에서는 값을 하지만 홈·/tools에서는 순손실.

## 잘 된 것

1. 사용법 산문이 진짜. clamp의 "vw만 쓰면 확대 시 접근성 문제" 설명. 검색 유입 후 체류시간 자산. 사이트의 방어선은 도구가 아니라 글.
2. 오류 문구가 원인+조치를 둘 다 씀. 문구 자체는 4점.
3. 테마 구현이 정석. FOUC 방지 인라인 스크립트 + 3단 구성으로 양방향 정확 동작.

## 우선순위 이슈

### [P1] 무효 상태에서 복사 버튼이 "복사됨"이라고 거짓말한다
clamp에 최소 2000/최대 1280 입력 시 결과가 clamp(...) 플레이스홀더로 죽는데 복사 버튼은 활성. 누르면 문자열 clamp(...)이 클립보드에 들어가고 "복사됨" 표시. 브라우저 재현 확인.
왜: 도구 사이트의 유일한 자산은 "결과를 믿을 수 있다". 성공 피드백이 실패를 덮으면 에디터에 붙여넣고 나서야 깨짐.
수정: 무효 분기에서 copyBtn.disabled=true. #hint에 role="status" aria-live="polite". 오류를 문제 필드 바로 아래로, aria-invalid="true".
명령: /impeccable harden

### [P1] 블로그 본문 인라인 하드코딩 색 — 다크 모드 파손 + WCAG AA 실패
마크다운 13개 중 9개에 인라인 style= 총 106회. background:#fff, color:#555(10회), #2b8a3e 등 라이트 전용. 다크에서 body는 전환되나 데모 블록은 흰 판으로 남음. #2b8a3e는 4.4:1로 AA 미달.
왜: WCAG 대비 검사기를 파는 사이트가 자기 본문에서 AA 미달. 다크 독자에게 글 9편이 깨져 보임.
수정: 인라인 hex를 토큰으로 치환. 반복되는 데모 블록은 재사용 클래스로 global.css에.
명령: /impeccable harden

### [P1] 사이드바가 스크린리더·키보드에서 깨진다
(a) Layout.astro:177의 aria-label="블로그 메뉴"가 도구 페이지·홈에도 적용 (b) aside가 grid-column:1로 시각상 좌측인데 DOM은 마지막 → 탭 순서가 …복사→관련글→[사이드바 13개]→푸터. WCAG 2.4.3 위반 (c) / 와 /tools에서 h1→h3 건너뜀.
수정: 두 섹션을 각각 nav aria-label="도구"/"블로그 카테고리"로, 바깥 aside는 "사이트 메뉴". 사이드바를 DOM 앞으로 옮기고 스킵 링크 보전. 카드 h3을 h2로.
명령: /impeccable audit

### [P1] 사이드바가 홈·/tools에서 중복이면서 작업 폭을 뺏는다
홈에서 도구 6개가 세 번(사이드바+카드+푸터). /tools는 사이드바 평면 6개 vs 본문 4카테고리 6개 — 같은 화면에 분류 체계 둘. 도구 상세 동일 링크 12개 정지점.
사이드바가 288px 상시 점유 → 뷰포트 900~1100px에서 작업 영역 584~764px, 도입 전 928px보다 좁음. box-shadow field-grid 붕괴.
수정: 홈·/tools에서 사이드바 도구 블록 숨김. 도구 상세는 같은 카테고리 형제 도구 + 전체 링크로 4항목 이하. 유지 시 푸터 도구 열 삭제. 홈 최근 글 설명 폭 제한.
명령: /impeccable distill

### [P2] 같은 계열 두 도구의 레이아웃 문법이 서로 다르다
clamp는 입력→결과→미리보기, box-shadow는 결과→입력→미리보기. 복사 버튼 위치도 다름. clamp 폼 5필드가 auto-fit에 걸려 4+1로 깨짐.
수정: ToolPage.astro에 controls/output/preview 슬롯 정의, 순서를 컨트롤→결과→미리보기로 통일.
명령: /impeccable layout

## 페르소나 레드플래그

Alex(파워유저): 공유할 URL 없음. 단축키 0개, Enter 제출 없음. box-shadow 프리셋·복제·실행취소 없음. 복사에 속성명 강제 포함.
Sam(스크린리더/키보드): 랜드마크가 "블로그 메뉴"로 오안내. aria-live 없어 오류를 못 듣고 "복사됨"만 들음 — 실패를 성공으로 오인시키는 경로. 다크에서 box-shadow 미리보기 #eef0f2 고정.
Riley(스트레스 테스터): #zzz 입력 시 조용히 무시. 기준 폰트 0 → ||16 폴백으로 화면과 계산 상태 불일치. 최소=최대는 경고 뜨지만 결과 정상 출력·복사 가능(일관성 없음). 새로고침 시 작업물 소실(테마는 저장).
Casey(모바일): 실사 검증 실패 — resize_window가 성공 반환하나 창이 1920px 유지(3회 확인). 390px 미확인. CSS 기반 예측: 모바일 하단에 링크 약 24개 연속, 도구 목록 두 번 반복. 600px 이하 헤더 테마 토글 display:none. .control min-height 41.6px < 44px. .shadow-preview sticky가 1열에서 무의미.

## 사소한 관찰

- 홈 h1이 헤더 로고와 같은 문자열
- 도구 6개를 다 보여준 뒤 "도구 전체 보기 →" — 링크가 약속을 어김
- /tools가 6개를 4섹션으로 쪼갬, 세 섹션은 카드 1장
- 테마 토글이 현재 상태를 표시(다수 제품은 전환될 상태)
- 글 첫 화면이 링크 7개짜리 목차 박스 — 오른쪽 빈 300px로 보내면 공백이 기능이 됨
- .card:hover translateY에 prefers-reduced-motion 예외 없음
- body overflow-x:hidden은 원인을 숨기는 처방

## 도발적 질문

1. 사이드바가 답인 문제가 무엇이었나? 도구 6개, 글 13편. 전체 접근성은 푸터가 이미 제공.
2. #FF7A1A를 파비콘에만 두는 건 결정인가 잔여물인가?
3. clamp가 "창 크기를 바꿔보세요"라고 시키는 대신 360→1280 슬라이더로 스크럽하게 한다면?
4. 결과를 복사한 사용자에게 다음 할 일을 제안하지 않음. 애드센스 관점에서 이건 수익 구조.
