import { timeline } from "@/content/experience";
import { cn } from "@/lib/cn";

const START = 2022;
const END = 2026;
const MONTHS = (END - START + 1) * 12;

function parse(period: string): [number, number] {
  const [a, b] = period.split("—").map((s) => s.trim());
  const toIndex = (s: string) => {
    if (/present/i.test(s)) return MONTHS;
    const [m, y] = s.split("/").map(Number);
    return (y - START) * 12 + (m - 1);
  };
  return [toIndex(a), toIndex(b)];
}

/** The roles as bars on one 2022–2026 ruler. Real dates from content, nothing else. */
export function CareerStrip({ className }: { className?: string }) {
  const rows = timeline.map((t) => ({ t, span: parse(t.period) }));
  return (
    <figure className={cn("flex flex-col gap-3", className)} aria-label="Roles over time, 2022 to now">
      <div className="relative ml-[8.5rem] flex justify-between text-caption text-muted tabular" aria-hidden>
        {Array.from({ length: END - START + 1 }, (_, i) => (
          <span key={i}>{START + i}</span>
        ))}
      </div>
      <ol className="flex flex-col gap-3">
        {rows.map(({ t, span }) => (
          <li key={t.id} className="grid grid-cols-[8.5rem_1fr] items-center">
            <span className="pr-2 text-caption font-medium leading-tight text-text">{t.org}</span>
            <span className="relative h-3 w-full rounded-pill bg-sunken" aria-hidden>
              <span className={cn("absolute inset-y-0 rounded-pill", t.current ? "bg-accent" : "bg-border-strong")} style={{ left: `${(span[0] / MONTHS) * 100}%`, width: `${((span[1] - span[0]) / MONTHS) * 100}%` }} />
            </span>
            <span className="sr-only">{t.title}, {t.period}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
