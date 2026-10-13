// Turns a CSS declaration string ("color: red; padding: 4px") into a React style object.
// Used where a style is built from live values (selected tab, current chapter, ...).
export function css(str) {
  const out = {};
  let depth = 0;
  let cur = '';
  const decls = [];
  for (const ch of str) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ';' && depth === 0) {
      decls.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur.trim()) decls.push(cur);
  for (const d of decls) {
    const i = d.indexOf(':');
    if (i < 0) continue;
    const prop = d.slice(0, i).trim();
    if (!prop) continue;
    const key = prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = d.slice(i + 1).trim();
  }
  return out;
}
