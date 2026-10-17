"use client";

import { ParallaxGroup, ParallaxLayer } from "@/components/fx/Parallax";
import { RotatingBadge } from "@/components/ui";
import { requestLoop } from "@/content/site";
import { cn } from "@/lib/cn";
import { RIBBON_PATH, RIBBON_SPAN as S, RIBBON_VIEWBOX as V } from "./ribbon-path";

/* Where the badge sits on the traced silhouette, in viewBox units: the crossing at the top of the loop. */
const BADGE = { cx: 375, cy: 82, r: 77 };

/**
 * The hero graphic: the reference's flat green ribbon, traced from the image so the silhouette
 * is exact, shaded only along its length (darker where it passes behind the crossing), ends
 * fading out, a soft drop shadow, and the translucent badge on the crossing. No rims: a flat band.
 */
export function Ribbon({ className }: { className?: string }) {
  return (
    <ParallaxGroup className={cn("ribbon-box relative select-none", className)}>
      <div className="relative w-full @container" style={{ aspectRatio: `${V.w} / ${V.h}` }}>
        <ParallaxLayer depth={-5} className="absolute inset-0">
          <svg viewBox={`0 0 ${V.w} ${V.h}`} className="h-full w-full overflow-visible" aria-hidden>
            <defs>
              {/* Along the ribbon: dark at both ends, bright through the middle, like the reference. Mapped to the silhouette's own span. */}
              <linearGradient id="rb-body" gradientUnits="userSpaceOnUse" x1={S.x0} y1="0" x2={S.x1} y2="0">
                <stop offset="0" stopColor="#0f8f3f" />
                <stop offset="0.14" stopColor="#19c458" />
                <stop offset="0.32" stopColor="#23e667" />
                <stop offset="0.46" stopColor="#1cd05d" />
                <stop offset="0.56" stopColor="#12a648" />
                <stop offset="0.7" stopColor="#26ec6b" />
                <stop offset="0.88" stopColor="#19c458" />
                <stop offset="1" stopColor="#0f8f3f" />
              </linearGradient>
              {/* Both ends dissolve into the page over the last sixth of the span. */}
              <linearGradient id="rb-fade" gradientUnits="userSpaceOnUse" x1={S.x0} y1="0" x2={S.x1} y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.17" stopColor="#fff" stopOpacity="1" />
                <stop offset="0.83" stopColor="#fff" stopOpacity="1" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <mask id="rb-mask">
                <rect x="0" y="0" width={V.w} height={V.h} fill="url(#rb-fade)" />
              </mask>
              <filter id="rb-shadow" x="-10%" y="-20%" width="120%" height="150%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
            </defs>
            <g mask="url(#rb-mask)">
              <path d={RIBBON_PATH} fill="#000" style={{ fillOpacity: "var(--ribbon-shadow)" }} fillRule="evenodd" filter="url(#rb-shadow)" transform="translate(0 14)" />
              <path d={RIBBON_PATH} fill="url(#rb-body)" fillRule="evenodd" />
            </g>
          </svg>
        </ParallaxLayer>
        <ParallaxLayer depth={-11} className="absolute" style={{ left: `${(BADGE.cx / V.w) * 100}%`, top: `${(BADGE.cy / V.h) * 100}%` }}>
          <RotatingBadge text={requestLoop.badge} size={`${((BADGE.r * 2) / V.w) * 100}cqw`} className="-translate-x-1/2 -translate-y-1/2" />
        </ParallaxLayer>
      </div>
      <span className="sr-only">A green ribbon looping once around a badge that reads building HumStage since 2022.</span>
    </ParallaxGroup>
  );
}
