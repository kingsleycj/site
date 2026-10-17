"use client";

import { AnimatePresence, motion } from "motion/react";
import type { PanelId } from "@/lib/panels";
import { dur, ease } from "@/lib/motion";
import { AboutState, ContactState, HomeState, NowState, PathState, ToolkitState, WorkState } from "./card-states";
import { useShell } from "./ShellContext";

const states: Record<PanelId, React.ComponentType> = {
  home: HomeState,
  about: AboutState,
  path: PathState,
  work: WorkState,
  toolkit: ToolkitState,
  now: NowState,
  contact: ContactState,
};

/** The fixed left card. Its body morphs per panel: a quick cross-fade with a small lift. */
export function ProfileCard() {
  const { active } = useShell();
  const State = states[active];
  return (
    <aside
      aria-label="Profile"
      className="relative flex h-full w-[360px] shrink-0 overflow-hidden rounded-xl border border-border bg-raised shadow-1 wide:w-[380px]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          className="h-full w-full"
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
          transition={{ duration: dur.base, ease: ease.out }}
        >
          <State />
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
