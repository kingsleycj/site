import type { HeadlineOption, Stat } from "./types";

export const site = {
  name: "Kingsley Nweke",
  firstName: "Kingsley",
  initials: "KN",
  handle: "@kingsleycj",
  role: "Software engineer",
  founderLine: "Building HumStage",
  location: "Lagos, Nigeria",
  availability: "Open to what's next",
  url: "https://kingsleynweke.vercel.app",
  buildingSince: 2022,
  /** Shown in the footer. A constant on purpose: the page is prerendered. */
  copyrightYear: 2026,
  greeting: "Hey, I'm Kingsley",
  bio: "Software engineer in Lagos. I build backends, payment rails, AI systems and whole websites that hold up. Lately, HumStage.",
  /**
   * Two cut-outs of the same portrait, pre-made as WebP at 320/480/640/896px plus a 160px avatar
   * (public/images/portrait): the dark-filtered one for dark mode, the natural one for light.
   * The original PNGs stay in public/images as the source for the share image and future re-exports.
   */
  photo: {
    dir: "/images/portrait",
    /** Used where only one file can be shown, such as structured data. */
    src: "/images/portrait/kingsley-colored-896.webp",
    alt: "Kingsley Nweke, wearing glasses and a black shirt, looking straight at the camera.",
    width: 896,
    height: 1200,
  },
  humstage: {
    name: "HumStage",
    href: "https://humstage.app",
    download: "https://humstage.app/download",
    badge: "Building HumStage",
    badgeHint: "My startup. An all-in-one platform for events. Opens humstage.app in a new tab.",
  },
  contact: {
    email: "primekings.kc@gmail.com",
    github: { label: "github.com/kingsleycj", href: "https://github.com/kingsleycj" },
    linkedin: { label: "linkedin.com/in/kingsleycj", href: "https://linkedin.com/in/kingsleycj" },
    instagram: { label: "instagram.com/kingsleycj_", href: "https://instagram.com/kingsleycj_" },
    x: { label: "x.com/kingsleycj8", href: "https://x.com/kingsleycj8" },
    whatsapp: { label: "WhatsApp", href: "https://wa.me/2348145424408" },
    phone: { label: "+234 814 542 4408", href: "tel:+2348145424408" },
    resume: { label: "Download PDF", href: "/resume/kingsley-resume.pdf" },
  },
  meta: {
    title: "Kingsley Nweke — Software Engineer, building HumStage",
    description:
      "Software engineer in Lagos building backends, payment rails, AI systems and whole websites that hold up. Co-founder of HumStage, an all-in-one platform for events. Four years in, and the part I still like best is the bit I haven't figured out yet.",
    ogAlt: "Kingsley Nweke — Software engineer. Building HumStage.",
    keywords: [
      "Kingsley Nweke",
      "Software Engineer",
      "HumStage",
      "Backend",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Solana",
      "Solidity",
      "AI systems",
      "Lagos",
    ],
  },
} as const;

/** The hero headline. `primary` ships; the alternates are here to swap in. */
export const headlines: { primary: HeadlineOption; alternates: HeadlineOption[] } = {
  primary: {
    id: "hold-up",
    lead: "I build",
    chips: ["backends", "& whole websites"],
    tail: "that",
    accent: "hold up",
    tailEnd: ".",
  },
  alternates: [
    { id: "first-sketch", lead: "Software from", chips: ["the first sketch", "to the box"], tail: "it", accent: "runs on", tailEnd: "." },
    { id: "whole-thing", lead: "I build it,", chips: ["test it", "& teach it"], tail: "then I", accent: "listen", tailEnd: "." },
  ],
};

/** The headline in the hero's second state, over the fanned stack of work. */
export const proofHeadline = { lead: "Start with", chip: "the work", tail: "I'd be quizzed on." } as const;

/** The badge on the hero ribbon. */
export const requestLoop = {
  badge: "BUILDING HUMSTAGE · SINCE 2022 · ",
} as const;

/** Sub-line under the headline. The first ships. */
export const sublines = [
  "Four years in, and the part I still like best is the bit I haven't figured out yet.",
  "Backends, payment rails, AI systems, realtime rooms, whole websites. And now a startup.",
  "Software engineer. Building HumStage. Here for the next problem I haven't met yet.",
] as const;

/** The two numbers the home page shows; the rest stay available to case studies. */
export const homeStatCount = 2;

export const stats: Stat[] = [
  { value: 4, suffix: "+", label: "years building", detail: "since 2022", href: "/path" },
  { value: 500, suffix: "+", label: "users on HarmonyKloud", detail: "US healthcare platform", href: "/path#harmonykloud" },
  { value: 633, label: "tests behind HumStage", detail: "the server suite", href: "/work/humstage" },
  { value: 100, suffix: "/100", label: "desktop PageSpeed", detail: "Imago Dynamics Media", href: "/work/imago-dynamics-media" },
];

/** Marquee rows. Text wordmarks only; there are no logos to show and none are invented. */
export const marquee = {
  placesLabel: "Worked at (2022–26)",
  places: [
    { name: "TekAIDA Consulting", note: "Backend Developer" },
    { name: "HarmonyKloud", note: "Backend Developer", href: "https://harmonykloud.com" },
    { name: "Genesys Tech Hub", note: "Web3 Developer" },
    { name: "Genesys Tech Hub", note: "Backend Engineer" },
    { name: "HumStage", note: "Co-founder", href: "https://humstage.app" },
    { name: "Imago Dynamics Media", note: "Client", href: "https://imagodynamicsmedia.com" },
  ],
} as const;
