import type { Metadata } from "next";
import { PillButton } from "@/components/ui";
import { ui } from "@/content/microcopy";

export const metadata: Metadata = { title: "Not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-6 py-16">
      <div className="flex w-full max-w-[36rem] flex-col items-start gap-6">
        <p className="text-[clamp(5rem,18vw,11rem)] font-semibold leading-none tracking-[-0.05em] text-text">{ui.notFound.code}</p>
        <h1 className="text-display-lg font-medium text-text">{ui.notFound.title}</h1>
        <div className="flex flex-wrap items-center gap-3">
          <PillButton href="/">{ui.notFound.home}</PillButton>
          <PillButton href="/work" tone="secondary">{ui.notFound.work}</PillButton>
        </div>
      </div>
    </main>
  );
}
