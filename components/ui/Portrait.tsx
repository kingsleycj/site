import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export interface PortraitProps {
  /** `full`: the cut-out on a wash (card, intro). `avatar`: a small round crop of the face. */
  variant?: "full" | "avatar";
  /** Avatar diameter in px. */
  size?: number;
  /** Responsive `sizes` for the full portrait. */
  sizes?: string;
  /** Mark the likely largest paint of its page (the desktop card). */
  important?: boolean;
  className?: string;
  alt?: string;
}

const widths = [320, 480, 640, 896] as const;
const srcSet = (variant: "dark" | "colored") => widths.map((w) => `${site.photo.dir}/kingsley-${variant}-${w}.webp ${w}w`).join(", ");

/**
 * The portrait as pre-made WebP files served straight from /public: no on-demand image
 * optimisation, so the first visit is as fast as the second. The dark-filtered file shows in
 * dark mode and the natural-colour one in light mode; both are `loading="lazy"`, which means
 * the hidden theme variant, and any copy inside a hidden container (the desktop card on a
 * phone), is never downloaded at all.
 */
export function Portrait({ variant = "full", size = 40, sizes = "(min-width: 1440px) 380px, (min-width: 1024px) 360px, 96px", important, className, alt }: PortraitProps) {
  const text = alt ?? site.photo.alt;
  if (variant === "avatar") {
    return (
      <span className={cn("relative block overflow-hidden rounded-pill border border-border bg-sunken", className)} style={{ width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized static WebP; no optimiser needed */}
        <img src={`${site.photo.dir}/kingsley-dark-avatar.webp`} alt={text} width={size} height={size} loading="lazy" decoding="async" className="screen-dark h-full w-full object-cover" />
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized static WebP; no optimiser needed */}
        <img src={`${site.photo.dir}/kingsley-colored-avatar.webp`} alt={text} width={size} height={size} loading="lazy" decoding="async" className="screen-light h-full w-full object-cover" />
      </span>
    );
  }
  const img = cn("absolute inset-x-0 bottom-0 mx-auto h-full w-auto max-w-none object-contain object-bottom", className);
  const priority = important ? ("high" as const) : undefined;
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- responsive srcset of pre-made WebP files */}
      <img src={`${site.photo.dir}/kingsley-dark-640.webp`} srcSet={srcSet("dark")} sizes={sizes} alt={text} width={site.photo.width} height={site.photo.height} loading="lazy" decoding="async" fetchPriority={priority} className={cn(img, "screen-dark")} />
      {/* eslint-disable-next-line @next/next/no-img-element -- responsive srcset of pre-made WebP files */}
      <img src={`${site.photo.dir}/kingsley-colored-640.webp`} srcSet={srcSet("colored")} sizes={sizes} alt={text} width={site.photo.width} height={site.photo.height} loading="lazy" decoding="async" fetchPriority={priority} className={cn(img, "screen-light")} />
    </>
  );
}
