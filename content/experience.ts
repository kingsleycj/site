import type { Certificate, Education, LoopStep, TimelineEntry } from "./types";

export const pathIntro = {
  title: "Not a straight line",
  body: "Client work, then smart contracts, then healthcare, then realtime, then AI infrastructure, then a startup. Nobody would plan it in that order. I wouldn't swap it either.",
};

/** Newest first. Titles are the real ones and stay that way. */
export const timeline: TimelineEntry[] = [
  {
    id: "humstage",
    title: "Co-founder",
    org: "HumStage",
    orgHref: "https://humstage.app",
    place: "Lagos, Nigeria",
    period: "02/2026 — Present",
    current: true,
    badge: "Building",
    bullets: [
      "An all-in-one platform for events: live Q&A, polls and quizzes, sign-ups, paid tickets, emails, the projector, and a desktop app that sends the screen to a vision mixer over NDI.",
      "I build the product. 633 tests behind the server; a five-hundred-person event plays against a production build with every phone seeing a vote inside 255ms.",
      "Live, with the desktop app in beta. Honest status is part of the product.",
    ],
    project: "humstage",
  },
  {
    id: "tekaida",
    title: "Backend Developer",
    org: "TekAIDA Consulting",
    place: "Remote — Bedford, England, UK",
    period: "04/2026 — Present",
    current: true,
    badge: "Current",
    bullets: [
      "Sole backend engineer on VibeCraft, an AI creative suite. I own it end to end, first architecture sketch through to the box it runs on.",
      "Node, Express and TypeScript over PostgreSQL on Supabase, containerised with Docker Compose and shipped to a VPS.",
      "Wrote the API reference the front-end team builds against: auth, projects, conversations, SSE streaming, pagination. If it's ambiguous, it's my fault.",
      "Worked out whether self-hosting open models on our own GPUs beats paying per token. Sometimes it does, which was the interesting part.",
    ],
    project: "vibecraft",
  },
  {
    id: "harmonykloud",
    title: "Backend Developer",
    org: "HarmonyKloud",
    orgHref: "https://harmonykloud.com",
    place: "Remote — Texas, United States",
    period: "06/2025 — Present",
    current: true,
    badge: "Current",
    bullets: [
      "Backend work on a US practice-management platform for ABA and behavioral health teams, used by 500+ people.",
      "APIs for the parts that have to be right, patient data and appointments, and integrations with Waystar and Office Ally to keep them in sync.",
      "A fair amount of unglamorous reliability work: deployment flow, error handling, notifications, the things that stop a bad night happening.",
      "And the rest of a feature's life: I test it before it ships, train clients on it afterwards, and sit with the people using it. More on that below.",
      "I also revamped the HarmonyKloud website.",
    ],
    project: "harmonykloud-website",
  },
  {
    id: "genesys-web3",
    title: "Web3 Developer",
    org: "Genesys Tech Hub",
    place: "Hybrid — Enugu, Nigeria",
    period: "12/2024 — 12/2025",
    current: false,
    bullets: [
      "Shipped smart contracts across three-plus projects in Solidity and Hardhat.",
      "Built gNGN, a tokenised naira modelled on central-bank rules: mint, burn, pause and multi-signature approvals, all tested against the rules rather than my assumptions.",
      "Helped wire contracts into a civic ID system and an AI Telegram bot during Learnable collaborations.",
      "Backend team on Tutera, a multi-tenant LMS for institutions and creators.",
    ],
    award: {
      title: "Nikolai Tesla Award",
      detail: "Web3 Student of the Year, Genesys Tech Hub",
      date: "12/2025",
    },
    project: "gngn-token",
  },
  {
    id: "genesys-backend",
    title: "Backend Engineer",
    org: "Genesys Tech Hub",
    place: "Enugu, Nigeria",
    period: "03/2022 — 07/2023",
    current: false,
    bullets: [
      "My first real engineering job. Led the backend on client web apps and found out what shipping to a deadline actually costs.",
      "Agile and Scrum, proper code review, and the habit of checking something works before calling it done.",
    ],
  },
];

/** The HarmonyKloud story: the whole life of a feature, in four verbs. */
export const closeToTheUsers = {
  title: "Close to the users",
  lead: "At HarmonyKloud I work across the whole life of a feature. I build the thing, I test the thing, I teach the thing, and I sit with the people who use it.",
  steps: [
    {
      id: "build",
      verb: "Build",
      title: "I build it.",
      body: "APIs for patient data and appointments, integrations with Waystar and Office Ally, notifications, and the reliability and deployment work nobody writes home about.",
    },
    {
      id: "test",
      verb: "Test",
      title: "I test it.",
      body: "Every new feature goes through me before it goes out. I find what breaks, and when the experience or the logic needs a better idea, I suggest one.",
    },
    {
      id: "teach",
      verb: "Teach",
      title: "I teach it.",
      body: "After a feature ships, I train the clients on it: role-based training, onboarding, go-live readiness, and the follow-up working sessions where the real questions show up.",
    },
    {
      id: "listen",
      verb: "Listen",
      title: "I listen to the people using it.",
      body: "I work directly with clients, national and international, and understand how people actually use the product. What they tell me becomes prioritised fixes, and when something breaks, I troubleshoot it live with them on a call.",
    },
  ] satisfies LoopStep[],
  website: {
    line: "I also revamped the HarmonyKloud website.",
    href: "https://harmonykloud.com",
    label: "harmonykloud.com",
  },
  confidentiality: "No client names here, and no screenshots of the real app.",
};

export const education: Education = {
  degree: "B.Eng Computer Engineering",
  school: "Enugu State University of Science and Technology",
  period: "2018 — 2023",
  grade: "Second Class (Upper)",
};

export const certificates: Certificate[] = [
  { title: "Backend Developer", issuer: "Genesys Tech Hub" },
  { title: "Web3 Developer", issuer: "Genesys Tech Hub" },
];

export const award = {
  title: "Nikolai Tesla Award",
  detail: "Web3 Student of the Year",
  issuer: "Genesys Tech Hub",
  date: "12/2025",
};
