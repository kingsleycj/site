import Image from "next/image";
import type { Screen } from "@/content/types";
import { cn } from "@/lib/cn";

export interface ThemedScreenProps {
  screens: Screen[];
  device?: "desktop" | "mobile";
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * Picks the capture that matches the site theme, without JS: both variants render and CSS
 * shows the matching one. The hidden one is lazy, so it is not downloaded until shown.
 */
export function ThemedScreen({ screens, device = "desktop", sizes = "(min-width: 1024px) 50vw, 100vw", priority, className, imgClassName }: ThemedScreenProps) {
  const of = screens.filter((s) => s.device === device);
  const dark = of.find((s) => s.scheme === "dark") ?? of[0];
  const light = of.find((s) => s.scheme === "light") ?? dark;
  if (!dark) return null;
  const same = dark.src === light.src;
  return (
    <span className={cn("block", className)}>
      <Image src={dark.src} alt={dark.alt} width={dark.width} height={dark.height} sizes={sizes} priority={priority} className={cn(imgClassName, !same && "screen-dark")} />
      {!same && <Image src={light.src} alt={light.alt} width={light.width} height={light.height} sizes={sizes} loading="lazy" className={cn(imgClassName, "screen-light")} />}
    </span>
  );
}
