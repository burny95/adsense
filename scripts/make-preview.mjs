// 경험담 자리 미리보기 생성기 (사이트 빌드와 무관한 작업 도구)
// 사용: node scripts/make-preview.mjs <dist/.../index.html> <slots.json> <out.html>
// - 빌드된 글 HTML에서 본문(<article class="prose">)만 떼어 온다
// - slots.json의 각 자리를 지정한 <h2 id="..."> 바로 앞에 노란 상자로 끼운다
// - fixes(사실 확인으로 이미 고친 것)는 맨 위에 따로 보여 준다
import fs from 'fs';

const [htmlPath, slotsPath, outPath] = process.argv.slice(2);
const html = fs.readFileSync(htmlPath, 'utf8');
const cfg = JSON.parse(fs.readFileSync(slotsPath, 'utf8'));

// HTML 특수문자 이스케이프
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// 글 제목과 본문 추출
const title = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
const m = html.match(/<article class="prose[^"]*"[^>]*>([\s\S]*?)<\/article>/);
if (!m) throw new Error('본문(<article class="prose">)을 찾지 못함');
let body = m[1];

// 경험담 자리 상자 하나를 만든다
const box = (s, i) => `
<aside class="slot">
  <div class="slot-no">경험담 자리 ${i + 1}</div>
  <h3>${esc(s.q)}</h3>
  <p>${esc(s.what)}</p>
  <ul>${(s.items || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
  ${s.example ? `<p class="ex"><b>예시(지어낸 것, 이대로 쓰지 않음):</b> ${esc(s.example)}</p>` : ''}
</aside>`;

// 각 자리를 해당 h2 앞에 끼운다 (앵커가 정확히 한 번 나와야 한다)
cfg.slots.forEach((s, i) => {
  const anchor = `<h2 id="${s.before}"`;
  const at = body.indexOf(anchor);
  if (at < 0) throw new Error(`h2를 찾지 못함: ${s.before}`);
  if (body.indexOf(anchor, at + 1) >= 0) throw new Error(`h2가 여러 번 나옴: ${s.before}`);
  body = body.slice(0, at) + box(s, i) + body.slice(at);
});

const fixes = (cfg.fixes || []).length
  ? `<section class="fixes"><h2>먼저 고친 것 / 확인한 것</h2><ul>${cfg.fixes.map(f => `<li>${esc(f)}</li>`).join('')}</ul></section>` : '';

const out = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(cfg.pageTitle)}</title>
<style>
:root{--bg:#fff;--fg:#1c1e21;--muted:#5f6368;--line:#e4e6ea;--code:#f3f4f6;--slot:#fff8db;--slot-line:#f5c400;--fix:#eef6ff;--fix-line:#9cc3f5}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0f1115;--fg:#e6e8eb;--muted:#9aa1ad;--line:#262a33;--code:#1a1d23;--slot:#2b2510;--slot-line:#b38f00;--fix:#13202f;--fix-line:#2f5d8f}}
:root[data-theme="dark"]{--bg:#0f1115;--fg:#e6e8eb;--muted:#9aa1ad;--line:#262a33;--code:#1a1d23;--slot:#2b2510;--slot-line:#b38f00;--fix:#13202f;--fix-line:#2f5d8f}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.8 system-ui,-apple-system,"Apple SD Gothic Neo","Malgun Gothic",sans-serif}
main{max-width:760px;margin:0 auto;padding:24px 16px 80px}
.meta{color:var(--muted);font-size:.85rem}
h1{font-size:1.6rem;line-height:1.35;margin:.3rem 0 1rem}
h2{font-size:1.3rem;margin:2.2rem 0 .6rem}
h3{font-size:1.08rem;margin:1.6rem 0 .4rem}
pre{background:var(--code);padding:12px 14px;border-radius:8px;overflow-x:auto;font-size:.85rem;line-height:1.6}
code{background:var(--code);padding:.1em .35em;border-radius:4px;font-size:.9em}
pre code{background:none;padding:0}
blockquote{margin:1rem 0;padding:.6rem 1rem;border-left:4px solid var(--line);color:var(--muted)}
table{border-collapse:collapse;width:100%;font-size:.9rem;display:block;overflow-x:auto}
th,td{border:1px solid var(--line);padding:6px 8px;text-align:left}
img{max-width:100%}
.slot{background:var(--slot);border:2px solid var(--slot-line);border-radius:12px;padding:14px 18px;margin:2rem 0}
.slot h3{margin:.2rem 0 .5rem}
.slot-no{font-weight:700;font-size:.8rem;color:var(--slot-line);letter-spacing:.02em}
.slot .ex{font-size:.9rem;color:var(--muted)}
.fixes{background:var(--fix);border:1px solid var(--fix-line);border-radius:12px;padding:6px 18px;margin:1rem 0 2rem}
.fixes h2{font-size:1rem;margin:.8rem 0 .2rem}
</style></head>
<body><main>
<div class="meta">${esc(cfg.meta || '')}</div>
<h1>${title}</h1>
${fixes}
<article>${body}</article>
</main></body></html>`;
fs.writeFileSync(outPath, out);
console.log(`미리보기 생성: 상자 ${cfg.slots.length}개`);
