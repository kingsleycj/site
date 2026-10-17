"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ChipHeadline } from "@/components/hero/ChipHeadline";
import { HeroSwitch, type HeroState } from "@/components/hero/HeroSwitch";
import { MobileIntro } from "@/components/hero/MobileIntro";
import { Ribbon } from "@/components/hero/Ribbon";
import { Stats } from "@/components/hero/Stats";
import { WorkedAt } from "@/components/hero/WorkedAt";
import { Panel } from "@/components/shell/Panel";
import { Chip } from "@/components/ui";
import { headlines, proofHeadline } from "@/content/site";
import { dur, ease } from "@/lib/motion";
import { panelById } from "@/lib/panels";

const home = panelById("home");

/**
 * Only shown after a click, so it stays out of the first paint and the main bundle.
 * Both hero states are grids, not flex columns: grid areas are definite, so the bands'
 * container-height units resolve and the ribbon and the stack size to the room they have.
 */
const FannedStack = dynamic(() => import("@/components/hero/FannedStack").then((m) => m.FannedStack), { ssr: false });

export function HomePanel() {
  const [state, setState] = useState<HeroState>("pitch");
  const fade = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: dur.base, ease: ease.out } };

  return (
    <Panel id="home" bare>
      <div className="flex flex-1 flex-col px-5 pb-6 pt-6 sm:px-8 shell:px-8 shell:pb-6 shell:pt-4 wide:px-12">
        <MobileIntro />
        <div className="flex items-center justify-between gap-4">
          <p className="label flex items-center gap-1">
            <span className="tabular">({home.number})</span>
            <span aria-hidden>—</span>
            <span>{home.label}</span>
          </p>
          <HeroSwitch value={state} onChange={setState} />
        </div>

        <div className="relative mt-4 flex min-h-0 flex-1 flex-col">
          <AnimatePresence mode="wait" initial={false}>
            {state === "pitch" ? (
              <motion.div key="pitch" {...fade} className="grid min-h-0 flex-1 gap-4 shell:grid-cols-12 shell:grid-rows-[auto_minmax(0,1fr)] shell:gap-x-6 shell:gap-y-0">
                <div className="relative z-10 shell:col-span-11 shell:col-start-1 shell:row-start-1">
                  <ChipHeadline option={headlines.primary} id="panel-home-title" />
                </div>
                {/* The band: spans both rows so the ribbon can rise beside the headline's short last line, as in the reference. */}
                <div className="ribbon-band mx-auto flex w-full max-w-[520px] items-end shell:col-span-8 shell:col-start-5 shell:row-span-2 shell:row-start-1 shell:mx-0 shell:min-h-0 shell:max-w-none shell:pt-[6%]">
                  <Ribbon />
                </div>
              </motion.div>
            ) : (
              <motion.div key="proof" {...fade} className="grid min-h-0 flex-1 gap-5 shell:grid-rows-[auto_minmax(0,1fr)]">
                <h1 id="panel-home-title" className="text-display-lg font-medium text-text">
                  {proofHeadline.lead}{" "}
                  <Chip variant="hero" size="display" className="text-[0.88em] align-[-0.1em]">
                    {proofHeadline.chip}
                  </Chip>{" "}
                  <span className="text-muted">{proofHeadline.tail}</span>
                </h1>
                <div className="stack-band min-h-0">
                  <FannedStack className="h-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Stats className="mt-10 shell:mt-4" />
        <WorkedAt className="mt-10 shell:mt-5" />
      </div>
    </Panel>
  );
}
