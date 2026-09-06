// 도구의 입력값을 주소(쿼리스트링)와 동기화한다.
// 계산해 둔 설정을 링크 하나로 그대로 공유할 수 있게 하는 것이 목적이다.

type Values = Record<string, string>;

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const field = (form: HTMLFormElement, name: string) =>
  form.elements.namedItem(name) as Field | null;

// 주소가 길어지지 않도록 값 하나의 길이를 제한한다
const MAX_LEN = 300;

/** 폼에 처음 적혀 있던 값(= 기본값)을 기억해 둔다 */
export function defaultsOf(form: HTMLFormElement, keys: string[]): Values {
  const out: Values = {};
  for (const k of keys) {
    const el = field(form, k);
    if (el) out[k] = 'defaultValue' in el ? el.defaultValue : el.value;
  }
  return out;
}

/** 주소에 담긴 값을 폼에 채운다. 주소에 없는 키는 건드리지 않는다 */
export function applyParams(form: HTMLFormElement, keys: string[]): boolean {
  const q = new URLSearchParams(location.search);
  let applied = false;
  for (const k of keys) {
    if (!q.has(k)) continue;
    const el = field(form, k);
    if (!el) continue;
    el.value = q.get(k) ?? '';
    applied = true;
  }
  return applied;
}

/** 기본값과 다른 값만 주소에 남긴다 — 공유 링크가 짧아진다 */
export function syncParams(form: HTMLFormElement, keys: string[], defaults: Values) {
  const q = new URLSearchParams();
  for (const k of keys) {
    const el = field(form, k);
    if (!el) continue;
    if (el.value !== defaults[k] && el.value.length <= MAX_LEN) q.set(k, el.value);
  }
  replaceQuery(q.toString());
}

/** 폼을 기본값으로 되돌리고 주소도 비운다 */
export function resetForm(form: HTMLFormElement, defaults: Values) {
  for (const [k, v] of Object.entries(defaults)) {
    const el = field(form, k);
    if (el) el.value = v;
  }
  replaceQuery('');
}

/** 폼이 없는 도구(box-shadow 등)가 직접 주소를 쓸 때 사용 */
export function replaceQuery(qs: string) {
  // 값을 만질 때마다 뒤로가기 기록이 쌓이지 않도록 replaceState를 쓴다
  history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
}
