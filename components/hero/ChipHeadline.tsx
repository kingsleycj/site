import { Chip } from "@/components/ui";
import type { HeadlineOption } from "@/content/types";
import { cn } from "@/lib/cn";

export interface ChipHeadlineProps {
  option: HeadlineOption;
  id?: string;
  className?: string;
}

/**
 * The headline-with-chips from the reference: a filled green chip, a dark chip with green text,
 * and one word in the italic serif (reference-2's "alive"). Static on purpose.
 */
export function ChipHeadline({ option, id, className }: ChipHeadlineProps) {
  const [a, b] = option.chips;
  return (
    <h1 id={id} className={cn("hero-headline text-text", className)}>
      <span>{option.lead} </span>
      <Chip variant="hero" size="display" className="text-[0.88em] align-[-0.1em]">
        {a}
      </Chip>
      <br />
      <Chip variant="tonal" size="display" className="text-[0.88em] align-[-0.1em]">
        {b}
      </Chip>
      <span> {option.tail}</span>
      <br className="hidden shell:block" />
      <span className="whitespace-nowrap">
        <span className="shell:hidden"> </span>
        <em className="font-accent font-normal text-accent-text">{option.accent}</em>
        {option.tailEnd && <span>{option.tailEnd}</span>}
      </span>
    </h1>
  );
}
