import { closeToTheUsers } from "@/content/experience";
import { cn } from "@/lib/cn";

const R = 118;
const C = 160;

/** Build → test → teach → listen, as a loop. A pulse orbits by rotating its group (paint only). */
export function BuildTestTrainLoop({ className }: { className?: string }) {
  const steps = closeToTheUsers.steps;
  const angle = (i: number) => (-90 + i * 90) * (Math.PI / 180);
  return (
    <svg viewBox="0 0 320 320" className={cn("h-auto w-full", className)} role="img" aria-label="A loop: build, test, teach, listen, and around again.">
      <circle cx={C} cy={C} r={R} fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="2" />
      <circle cx={C} cy={C} r={R} fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" />
      {steps.map((s, i) => (
        <g key={s.id} transform={`translate(${C + R * Math.cos(angle(i))} ${C + R * Math.sin(angle(i))})`}>
          <circle r="30" fill="var(--surface-raised)" stroke="currentColor" strokeOpacity="0.3" />
          <text textAnchor="middle" y="5" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500" fontSize="14">
            {s.verb}
          </text>
        </g>
      ))}
      {[0, 1].map((n) => (
        <g key={n} className="btl-orbit" style={{ transformOrigin: `${C}px ${C}px`, animationDelay: `${n * -4}s` }}>
          <circle cx={C} cy={C - R} r="7" fill="var(--accent)" opacity="0.35" />
          <circle cx={C} cy={C - R} r="3.5" fill="var(--accent)" />
        </g>
      ))}
      <text x={C} y={C - 6} textAnchor="middle" fill="currentColor" fontFamily="var(--font-sans)" fontSize="12" opacity="0.7">one feature,</text>
      <text x={C} y={C + 12} textAnchor="middle" fill="currentColor" fontFamily="var(--font-sans)" fontSize="12" opacity="0.7">whole life</text>
    </svg>
  );
}
