import { cn } from "@/lib/cn";

export interface RotatingBadgeProps {
  text: string;
  /** px, or any CSS length such as "22cqw" inside a container. */
  size?: number | string;
  className?: string;
}

/** The translucent dark disc with circling text and a coil mark, like the reference's. Spins slowly. */
export function RotatingBadge({ text, size = 128, className }: RotatingBadgeProps) {
  const id = "badge-path";
  const r = 45;
  return (
    <div
      className={cn("relative grid place-items-center rounded-pill text-[#ececec]", className)}
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle at 50% 40%, rgba(16,40,22,0.88) 0%, rgba(8,12,9,0.9) 60%, rgba(6,8,6,0.94) 100%)",
        boxShadow: "0 18px 40px -18px rgba(0,0,0,0.7)",
      }}
      aria-hidden
    >
      <svg viewBox="0 0 120 120" className="badge-spin absolute inset-0 h-full w-full">
        <defs>
          <path id={id} d={`M60,60 m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`} />
        </defs>
        <text fontSize="9.5" fontWeight="500" letterSpacing="2.6" fill="currentColor" fontFamily="var(--font-sans)">
          <textPath href={`#${id}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <svg viewBox="0 0 60 60" className="h-[36%] w-[36%]" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.9">
        <ellipse cx="21" cy="30" rx="9" ry="17" />
        <ellipse cx="27" cy="30" rx="9" ry="17" />
        <ellipse cx="33" cy="30" rx="9" ry="17" />
        <ellipse cx="39" cy="30" rx="9" ry="17" />
      </svg>
    </div>
  );
}
