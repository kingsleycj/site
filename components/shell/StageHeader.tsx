import { FounderBadge, Portrait } from "@/components/ui";
import { site } from "@/content/site";
import { Clock } from "./Clock";

/** Avatar, name and role on the left; date and time on the right. The top row of the stage. */
export function StageHeader() {
  return (
    <div className="flex items-start justify-between px-8 pb-2 pt-6 wide:px-12 wide:pt-7">
      <div className="flex items-center gap-3">
        <Portrait variant="avatar" size={40} alt="" />
        <div className="flex flex-col leading-tight">
          <span className="text-small font-medium text-text">{site.name}</span>
          <span className="flex items-center gap-2 text-caption text-muted">
            <span>{site.role}</span>
            <span aria-hidden>·</span>
            <FounderBadge variant="inline" className="text-caption" />
          </span>
        </div>
      </div>
      <Clock />
    </div>
  );
}
