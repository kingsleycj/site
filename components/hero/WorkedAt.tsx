import { Icon, Marquee } from "@/components/ui";
import { marquee } from "@/content/site";
import { cn } from "@/lib/cn";

/** The strip at the bottom of Home: places worked, as wordmarks in type. No logos exist and none are faked. */
export function WorkedAt({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className="label flex items-center gap-2">
        <Icon name="sparkle" size={13} />
        <span>{marquee.placesLabel}</span>
      </p>
      <Marquee label={marquee.placesLabel} duration={46}>
        {marquee.places.map((p, i) => {
          const inner = (
            <>
              <span className="text-display-sm font-semibold text-text">{p.name}</span>
              <span className="text-caption text-muted">{p.note}</span>
            </>
          );
          return "href" in p && p.href ? (
            <a key={i} href={p.href} target="_blank" rel="noopener noreferrer" className="flex items-baseline gap-2 whitespace-nowrap rounded-xs underline-offset-4 hover:underline">
              {inner}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <span key={i} className="flex items-baseline gap-2 whitespace-nowrap">
              {inner}
            </span>
          );
        })}
      </Marquee>
    </div>
  );
}
