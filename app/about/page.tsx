import type { Metadata } from "next";
import { Shell } from "@/components/shell/Shell";
import { panelById } from "@/lib/panels";

const panel = panelById("about");

export const metadata: Metadata = {
  title: panel.title,
  description: "Still mostly curious. Who I am, how I got here, and what I'm after next.",
  alternates: { canonical: panel.path },
};

export default function Page() {
  return <Shell panel="about" />;
}
