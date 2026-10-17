import type { Metadata } from "next";
import { Shell } from "@/components/shell/Shell";
import { panelById } from "@/lib/panels";

const panel = panelById("contact");

export const metadata: Metadata = {
  title: panel.title,
  description: "Roles, contract work, or a good argument about something you're building. Email reaches me fastest.",
  alternates: { canonical: panel.path },
};

export default function Page() {
  return <Shell panel="contact" />;
}
