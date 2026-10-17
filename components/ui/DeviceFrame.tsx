import Image from "next/image";
import type { Screen } from "@/content/types";
import { cn } from "@/lib/cn";

export interface DeviceFrameProps {
  screen: Screen;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Height of the visible window in CSS px for desktop frames; the page crops below it. */
  windowHeight?: number;
}

/**
 * A browser window (desktop) or a phone (mobile) around a real screenshot, drawn in CSS.
 * Frames carry no brand chrome; the screenshot is the content.
 */
export function DeviceFrame({ screen, priority, sizes = "(min-width: 1024px) 50vw, 100vw", className, windowHeight }: DeviceFrameProps) {
  if (screen.device === "mobile") {
    return (
      <figure className={cn("relative mx-auto aspect-[390/844] w-full max-w-[280px] overflow-hidden rounded-[2.2rem] border-[6px] border-[#0d0d0d] bg-[#0d0d0d] shadow-2", className)}>
        <span className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-pill bg-[#0d0d0d]" aria-hidden />
        <Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes="280px" priority={priority} className="h-full w-full object-cover object-top" />
      </figure>
    );
  }
  return (
    <figure className={cn("relative w-full overflow-hidden rounded-lg border border-border bg-raised shadow-2", className)}>
      <div className="flex h-8 items-center gap-1.5 border-b border-border px-3" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-pill bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-pill bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-pill bg-border-strong" />
        <span className="mx-auto h-5 w-2/5 rounded-pill bg-sunken" />
      </div>
      <div className="overflow-hidden" style={windowHeight ? { height: windowHeight } : undefined}>
        <Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes={sizes} priority={priority} className={cn("w-full object-cover object-top", !windowHeight && "aspect-[16/10]")} />
      </div>
    </figure>
  );
}
