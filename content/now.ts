import type { NowItem } from "./types";

export const now = {
  title: "On my desk this month",
  month: "October 2026",
  items: [
    {
      title: "HumStage Desktop, out of beta",
      body: "It sends a room's screen out to a vision mixer and it works on Windows and Linux. macOS is next.",
      tag: "HumStage",
      project: "humstage",
    },
    {
      title: "Making models a config change",
      body: "Inside VibeCraft's AI service at TekAIDA: provider routing, transcription, and the arithmetic of self-hosting versus paying per token.",
      tag: "AI/ML",
      project: "vibecraft",
    },
    {
      title: "Learning Rust the hard way",
      body: "Taking DojoPay's Anchor escrow from written-and-building to actually deployed. It is the step that gets custody out of my hands, and it is teaching me a lot.",
      tag: "Software",
      project: "dojopay",
    },
    {
      title: "Healthcare APIs that hold, and the people using them",
      body: "Ongoing backend work at HarmonyKloud: the endpoints clinicians depend on, the reliability work that keeps them dependable, and the training sessions where I find out what to fix next.",
      tag: "Software",
    },
  ] satisfies NowItem[],
};
