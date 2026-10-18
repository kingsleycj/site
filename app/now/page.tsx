import type { Metadata } from "next";
import { NowPanel } from "@/components/panels/NowPanel";
import { Shell } from "@/components/shell/Shell";
import { panelById } from "@/lib/panels";

const panel = panelById("now");

export const metadata: Metadata = {
  title: panel.title,
  description: "On my desk this month.",
  alternates: { canonical: panel.path },
};

export default function Page() {
  return (
    <Shell panel="now">
      <NowPanel />
    </Shell>
  );
}
