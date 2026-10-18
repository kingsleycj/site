import type { Metadata } from "next";
import { PathPanel } from "@/components/panels/PathPanel";
import { Shell } from "@/components/shell/Shell";
import { panelById } from "@/lib/panels";

const panel = panelById("path");

export const metadata: Metadata = {
  title: panel.title,
  description: "The road so far: TekAIDA, HarmonyKloud, Genesys Tech Hub, and HumStage. Build it, test it, teach it, listen.",
  alternates: { canonical: panel.path },
};

export default function Page() {
  return (
    <Shell panel="path">
      <PathPanel />
    </Shell>
  );
}
