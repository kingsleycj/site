import type { Metadata } from "next";
import { ToolkitPanel } from "@/components/panels/ToolkitPanel";
import { Shell } from "@/components/shell/Shell";
import { panelById } from "@/lib/panels";

const panel = panelById("toolkit");

export const metadata: Metadata = {
  title: panel.title,
  description: "What I reach for, grouped by the problem it solves.",
  alternates: { canonical: panel.path },
};

export default function Page() {
  return (
    <Shell panel="toolkit">
      <ToolkitPanel />
    </Shell>
  );
}
