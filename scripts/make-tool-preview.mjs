// 도구 페이지 경험담 자리 미리보기: 빌드된 도구 HTML의 문서 섹션에 노란 상자를 끼운다
// 사용: node scripts/make-tool-preview.mjs <dist/tools/<slug>/index.html> <slots.json> <out.html>
// slots.json: { pageTitle, fixes: [문자열], slots: [{ before?, where, q, what, items: [], example? }] }
import fs from 'fs';
const [htmlPath, slotsPath, outPath] = process.argv.slice(2);
const html = fs.readFileSync(htmlPath, 'utf8');
const cfg = JSON.parse(fs.readFileSync(slotsPath, 'utf8'));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// 문서 섹션(<section class="prose">)만 모아 온다
let body = (html.match(/<section class="prose"[\s\S]*?<\/section>/g) || []).join('\n').replace(/ data-astro-cid-[a-z0-9]+/g, '');

// 경험담 상자
const box = (s, i) => `<aside class="slot"><div class="no">적어 주실 자리 ${i + 1} — ${esc(s.where)}</div><h3>${esc(s.q)}</h3><p>${esc(s.what)}</p><ul>${s.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>${s.example ? `<p class="ex"><b>예시(지어낸 것, 이대로 쓰지 않음):</b> ${esc(s.example)}</p>` : ''}</aside>`;

// 지정한 제목 앞(before) 또는 마지막 섹션 끝(end)에 끼운다. 앵커는 정확히 한 번만 나와야 한다
cfg.slots.forEach((s, i) => {
  if (s.before) {
    const a = `>${s.before}<`; const at = body.indexOf(a);
    if (at < 0 || body.indexOf(a, at + 1) >= 0) throw new Error('앵커 문제: ' + s.before);
    const tagStart = body.lastIndexOf('<', at);
    body = body.slice(0, tagStart) + box(s, i) + body.slice(tagStart);
  } else {
    const at = body.lastIndexOf('</section>');
    body = body.slice(0, at) + box(s, i) + body.slice(at);
  }
});
const fixes = `<section class="fixes"><h2>먼저 고친 것</h2><ul>${cfg.fixes.map(f => `<li>${esc(f)}</li>`).join('')}</ul></section>`;
fs.writeFileSync(outPath, `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(cfg.pageTitle)}</title><style>
:root{--bg:#fff;--fg:#1c1e21;--muted:#5f6368;--line:#e4e6ea;--code:#f3f4f6;--slot:#fff8db;--slot-line:#f5c400;--fix:#eef6ff;--fix-line:#9cc3f5}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0f1115;--fg:#e6e8eb;--muted:#9aa1ad;--line:#262a33;--code:#1a1d23;--slot:#2b2510;--slot-line:#b38f00;--fix:#13202f;--fix-line:#2f5d8f}}
:root[data-theme="dark"]{--bg:#0f1115;--fg:#e6e8eb;--muted:#9aa1ad;--line:#262a33;--code:#1a1d23;--slot:#2b2510;--slot-line:#b38f00;--fix:#13202f;--fix-line:#2f5d8f}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.8 system-ui,-apple-system,"Apple SD Gothic Neo","Malgun Gothic",sans-serif}
main{max-width:760px;margin:0 auto;padding:24px 16px 80px}h1{font-size:1.5rem;line-height:1.35}h2{font-size:1.3rem;margin:2.2rem 0 .6rem}h3{font-size:1.08rem;margin:1.6rem 0 .4rem}
pre{background:var(--code);padding:12px 14px;border-radius:8px;overflow-x:auto;font-size:.85rem;line-height:1.6}code{background:var(--code);padding:.1em .35em;border-radius:4px;font-size:.9em}pre code{background:none;padding:0}
.slot{background:var(--slot);border:2px dashed var(--slot-line);border-radius:10px;padding:14px 16px;margin:1.6rem 0}.slot h3{margin:.2rem 0 .4rem}.slot .no{font-size:.8rem;font-weight:700;color:var(--muted)}.slot ul{margin:.4rem 0;padding-left:1.2rem}.ex{font-size:.9rem;color:var(--muted)}
.fixes{background:var(--fix);border:1px solid var(--fix-line);border-radius:10px;padding:4px 16px 8px;margin-bottom:2rem}.fixes h2{margin-top:.8rem;font-size:1.1rem}
</style></head><body><main><p style="color:var(--muted);font-size:.85rem">미리보기 — 실제 사이트에는 아직 반영되지 않았습니다</p><h1>${esc(cfg.pageTitle)}</h1>${fixes}${body}</main></body></html>`);
console.log('ok');
