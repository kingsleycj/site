import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export interface PortraitProps {
  /** `full`: the cut-out on a wash (card, intro). `avatar`: a small round crop of the face. */
  variant?: "full" | "avatar";
  size?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  alt?: string;
}

/**
 * The portrait, matched to the theme without JavaScript: the dark-filtered file in dark mode,
 * the natural-colour file in light mode. Both render; CSS shows the right one. `sizes` asks
 * for the real display width so the image is never upscaled, and quality 90 keeps it crisp.
 */
export function Portrait({ variant = "full", size = 40, sizes = "(min-width: 1440px) 640px, (min-width: 1024px) 560px, 50vw", priority, className, alt }: PortraitProps) {
  const { dark, light, width, height } = site.photo;
  const text = alt ?? site.photo.alt;
  if (variant === "avatar") {
    return (
      <span className={cn("relative block overflow-hidden rounded-pill border border-border bg-sunken", className)} style={{ width: size, height: size }}>
        <Image src={dark} alt={text} width={size * 3} height={size * 3} sizes={`${size * 2}px`} quality={90} className="screen-dark h-full w-full scale-[1.35] object-cover object-[50%_18%]" />
        <Image src={light} alt={text} width={size * 3} height={size * 3} sizes={`${size * 2}px`} quality={90} className="screen-light h-full w-full scale-[1.35] object-cover object-[50%_18%]" />
      </span>
    );
  }
  const img = "absolute inset-x-0 bottom-0 mx-auto h-full w-auto max-w-none object-contain object-bottom";
  return (
    <>
      <Image src={dark} alt={text} width={width} height={height} sizes={sizes} quality={90} priority={priority} className={cn(img, "screen-dark", className)} />
      <Image src={light} alt={text} width={width} height={height} sizes={sizes} quality={90} priority={priority} className={cn(img, "screen-light", className)} />
    </>
  );
}
