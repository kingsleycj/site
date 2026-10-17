import type { Metadata } from "next";
import { Shell } from "@/components/shell/Shell";
import { panelById } from "@/lib/panels";

const panel = panelById("work");

export const metadata: Metadata = {
  title: panel.title,
  description: "Seven projects I'd happily be quizzed on, each with the hard part and an honest word on where it stands.",
  alternates: { canonical: panel.path },
};

export default function Page() {
  return <Shell panel="work" />;
}
