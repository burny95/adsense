// dist/_redirects 생성 — 슬래시 없는 주소를 301로 합친다.
//
// Cloudflare Workers의 정적 자산은 /foo 요청을 /foo/ 로 보낼 때 307(임시 이동)을 쓴다.
// 307은 구글에게 "원래 주소는 슬래시 없는 쪽"이라는 뜻으로 읽혀서, 같은 글이 두 주소로
// 색인된 채 신호가 쪼개진다. html_handling 옵션으로는 상태 코드를 바꿀 수 없어서
// (force-trailing-slash로도 307이 나온다) _redirects에 301을 직접 적는다.
//
// 와일드카드(`/* /:splat/ 301`)를 쓰면 이미 슬래시가 붙은 주소가 다시 매칭돼
// 무한 루프가 된다. 그래서 실제로 만들어진 페이지만 한 줄씩 나열한다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// URL.pathname을 직접 쓰면 안 된다. 윈도우에서는 "/C:/..."라 앞 슬래시를 떼야 하고
// 리눅스에서는 "/opt/..."라 떼면 상대 경로가 되어 빌드 서버에서 ENOENT가 난다.
const distDir = fileURLToPath(new URL('../dist/', import.meta.url));

/** dist 아래의 index.html을 모두 찾아 URL 경로로 바꾼다 */
function collect(dir, base = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      out.push(...collect(path.join(dir, entry.name), `${base}/${entry.name}`));
    } else if (entry.name === 'index.html' && base !== '') {
      out.push(base); // 예: /blog/css-clamp-basics
    }
  }
  return out;
}

const paths = collect(distDir).sort();

const lines = [
  '# 자동 생성 — scripts/gen-redirects.mjs',
  '# 슬래시 없는 주소를 슬래시 있는 정본으로 영구 이동시킨다.',
  ...paths.map((p) => `${p} ${p}/ 301`),
];

fs.writeFileSync(path.join(distDir, '_redirects'), lines.join('\n') + '\n', 'utf8');
console.log(`_redirects 생성 — 301 규칙 ${paths.length}개`);
