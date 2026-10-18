import { FounderBadge, Icon, PillButton, Portrait } from "@/components/ui";
import { ui } from "@/content/microcopy";
import { site } from "@/content/site";

/** On phones the profile card's home state lives at the top of the Home panel. */
export function MobileIntro() {
  return (
    <div className="mb-6 flex flex-col gap-4 shell:hidden">
      <div className="flex items-end gap-4">
        <div className="card-portrait relative h-28 w-24 shrink-0 overflow-hidden rounded-lg">
          <Portrait sizes="96px" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1 pb-1">
          <p className="text-display-sm font-medium text-text">{site.greeting}</p>
          <p className="text-small text-muted">{site.bio}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <PillButton href="/contact" className="h-11">{ui.card.talk}</PillButton>
        <a href={site.contact.resume.href} download className="inline-flex items-center gap-1.5 text-small font-medium text-text underline-offset-4 hover:underline">
          <Icon name="download" size={15} />
          {ui.card.resume}
        </a>
        <FounderBadge />
      </div>
    </div>
  );
}
