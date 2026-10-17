import { FounderBadge, Portrait, ThemeToggle } from "@/components/ui";
import { site } from "@/content/site";

/** The profile card, collapsed: sticky at the top on phones and tablets. */
export function MobileHeader() {
  return (
    <header className="glass sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-3 shell:hidden">
      <div className="flex min-w-0 items-center gap-3">
        <Portrait variant="avatar" size={36} alt="" className="shrink-0" />
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-small font-medium text-text">{site.name}</span>
          <span className="truncate text-caption text-muted">{site.role}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <FounderBadge variant="compact" />
        <ThemeToggle size={36} />
      </div>
    </header>
  );
}
