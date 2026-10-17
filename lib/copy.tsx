import type { ReactNode } from "react";

/**
 * Emphasis in copy. Content strings may mark one word with [[word]] (the italic serif accent,
 * as in reference-2) or {{word}} (plain medium weight). Everything else renders as text.
 */
export function renderCopy(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[\[(.+?)\]\]|\{\{(.+?)\}\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<em key={k++} className="font-accent text-[1.08em] text-accent-text">{m[1]}</em>);
    else out.push(<strong key={k++} className="font-medium">{m[2]}</strong>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
