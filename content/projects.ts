import type { Project, SmallProject } from "./types";

/**
 * Work, in display order: HumStage leads as the startup, then the projects with real
 * screenshots, then the two that live in a chat window and a block explorer.
 * Every status note is the honest state on 2026-10-17.
 */
export const projects: Project[] = [
  {
    slug: "humstage",
    name: "HumStage",
    kicker: "Five hundred phones, one room, no login",
    summary:
      "An all-in-one platform for events: live Q&A, polls and quizzes, sign-ups and paid tickets, the projector, and a desktop app for the venue's machine.",
    period: "02/2026 — Present",
    year: "2026",
    role: "Co-founder and product engineer",
    group: "selected",
    isStartup: true,
    stack: [
      "TypeScript",
      "Node.js 22",
      "Fastify 5",
      "Socket.IO",
      "PostgreSQL",
      "Redis",
      "React 19",
      "Vite",
      "Tailwind v4",
      "Electron",
      "NDI",
      "Cloudflare R2",
      "Paystack",
      "Docker",
      "Render",
      "Groq",
    ],
    status: {
      kind: "live",
      label: "Live · Desktop app in beta",
      note: "Live, with 633 tests behind the server. The desktop app is in beta.",
    },
    problem: [
      "A room full of people and one microphone. The questions that get asked come from whoever is nearest the aisle, not from what the room actually wants answered. And the moment anyone has to sign up, half the room stops.",
      "HumStage is an all-in-one platform for events. People scan a code on the screen, ask a question, and vote on other people's; the ones the room wants most go up on the projector behind the speaker. Ask anonymously and it really is anonymous: your name is never stored at all, so there is nothing to leak.",
    ],
    hardPart: [
      "Five hundred phones voting at once, every one of them expecting the board to move now. A vote has to reach every screen in the room before anyone wonders whether it counted.",
      "Anonymity that is structural rather than a setting. If a name is never written down, no bug, breach or subpoena can give it up later.",
      "Getting the screen behind the speaker out of a browser tab and into a vision mixer, without a capture card and without a browser window to babysit.",
    ],
    built: [
      "The product: a Fastify and Socket.IO server over PostgreSQL and Redis, a React front end for phones, hosts and the projector, and the dashboard that runs a room.",
      "Then the rest of an event: sign-ups, paid tickets through Paystack, the emails that go with them, door check-in, live polls and quickfire quizzes.",
      "HumStage Desktop, an Electron app that puts the projector on HDMI and sends the projector, a lower third or the join corner to a vision mixer as NDI sources.",
      "Underneath it is one Fastify server in Docker on Render, PostgreSQL for the records, Redis for the realtime fan-out, Cloudflare R2 for media and Paystack for payments.",
    ],
    standing: [
      "Live. 633 tests behind the server. A five-hundred-person event now plays against a production build, and every phone saw a vote inside 255ms with nothing dropped.",
      "The desktop app is in beta for Windows and Linux. macOS is coming.",
    ],
    links: [
      { label: "Live site", href: "https://humstage.app", kind: "live" },
      { label: "Download the desktop app", href: "https://humstage.app/download", kind: "download" },
    ],
    screens: [
      { src: "/screens/humstage-desktop-dark.webp", alt: "HumStage landing page on desktop: a room code join field and the line 'Your whole live event, in one place'.", width: 1440, height: 900, device: "desktop", scheme: "dark" },
      { src: "/screens/humstage-desktop-light.webp", alt: "HumStage landing page on desktop in light mode.", width: 1440, height: 900, device: "desktop", scheme: "light" },
      { src: "/screens/humstage-mobile-dark.webp", alt: "HumStage on a phone: join a room with a code.", width: 390, height: 844, device: "mobile", scheme: "dark" },
      { src: "/screens/humstage-mobile-light.webp", alt: "HumStage on a phone in light mode.", width: 390, height: 844, device: "mobile", scheme: "light" },
      { src: "/screens/humstage-download-desktop-dark.webp", alt: "The HumStage Desktop download page listing Windows and Linux builds, with the note that installers are not yet signed.", width: 1440, height: 900, device: "desktop", scheme: "dark" },
    ],
  },
  {
    slug: "dojopay",
    name: "DojoPay",
    kicker: "Strangers, real money, and no reason to trust each other",
    summary:
      "A marketplace on Solana where people get paid in SOL for small pieces of human judgement. All the difficulty is money that cannot drift.",
    period: "12/2025 — Present",
    year: "2025",
    role: "End to end: ledger, API, contracts, front end",
    group: "selected",
    stack: [
      "Node.js 22",
      "Express 5",
      "Prisma",
      "PostgreSQL",
      "Next.js 14",
      "Tailwind",
      "shadcn/ui",
      "Recharts",
      "Solana",
      "Anchor (Rust)",
      "Cloudflare R2",
    ],
    status: {
      kind: "devnet",
      label: "Devnet",
      note: "Devnet, pre-production. Payouts are still custodial; the Anchor escrow program that fixes that is written and building, but not yet deployed or audited.",
    },
    problem: [
      "Someone has fifty images and needs a crowd to pick the sharpest one, and will pay a small, exact amount per answer. Someone else has thirty seconds and a phone. Neither has any reason to trust the other, or me.",
      "DojoPay is a marketplace on Solana for small pieces of human judgement. Today that means picking the best image out of a set. A creator funds a task, it opens for exactly that many answers, workers answer and withdraw.",
    ],
    hardPart: [
      "All the difficulty is money that cannot drift. A task's budget is set aside the moment the task is created. Every change to a balance is written down and never edited afterwards. Two people going for the last slot can't both get it.",
      "Lamports are integers end to end, strings on the wire, never floats. A deposit's transaction signature can be credited exactly once, and only after the chain says it succeeded.",
    ],
    built: [
      "The ledger and the API: Express and Prisma on PostgreSQL, with the slot cap enforced on write so a race for the last slot has exactly one winner.",
      "The withdrawal path: balance debited before the transfer is broadcast, restored if it fails, and a signed message naming the exact amount and destination so an old signature can't be reused for more.",
      "The front end in Next.js, including a live ledger on the landing page that reconciles a task to zero in front of you.",
    ],
    standing: [
      "Devnet, pre-production. The marketplace works end to end and no real funds are at stake.",
      "Payouts are still custodial, and the site says so out loud. The Anchor escrow program that moves custody on chain is written, compiling and unit-tested, but not deployed, not audited, and not carrying a single lamport yet. Mainnet waits behind that.",
    ],
    links: [
      { label: "Live site", href: "https://dojopay.vercel.app", kind: "live" },
      { label: "Source", href: "https://github.com/kingsleycj/dojopay", kind: "source" },
    ],
    screens: [
      { src: "/screens/dojopay-desktop-dark.webp", alt: "DojoPay landing page: 'Small work. Exact pay.' beside a live task ledger reconciling to zero.", width: 1440, height: 900, device: "desktop", scheme: "dark" },
      { src: "/screens/dojopay-desktop-light.webp", alt: "DojoPay landing page in light mode.", width: 1440, height: 900, device: "desktop", scheme: "light" },
      { src: "/screens/dojopay-mobile-dark.webp", alt: "DojoPay on a phone.", width: 390, height: 844, device: "mobile", scheme: "dark" },
      { src: "/screens/dojopay-mobile-light.webp", alt: "DojoPay on a phone in light mode.", width: 390, height: 844, device: "mobile", scheme: "light" },
    ],
  },
  {
    slug: "vibecraft",
    name: "VibeCraft",
    kicker: "Four AI providers, one interface, zero refactors",
    summary:
      "An AI creative suite that builds websites, books, games and art from a conversation. I own the whole backend, sketch to server.",
    period: "04/2026 — Present",
    year: "2026",
    role: "Sole backend engineer (TekAIDA Consulting)",
    group: "selected",
    stack: [
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL on Supabase",
      "Python",
      "FastAPI",
      "Docker Compose",
      "SSE",
      "Groq",
      "Anthropic",
      "OpenAI",
      "Whisper",
    ],
    status: {
      kind: "live",
      label: "Live",
      note: "Live at vibecraft.today. I own the backend end to end, from the first architecture sketch to the box it runs on.",
    },
    problem: [
      "Describe a bakery website, a bedtime book or a browser game, and VibeCraft builds it in front of you and explains what it did. Underneath, that is several AI providers, speech and images, and a lot of long-running work that has to stream back to a browser without anything timing out.",
      "I joined as the sole backend engineer and own it end to end: first architecture sketch through to the VPS it runs on.",
    ],
    hardPart: [
      "The interesting problem was never getting a model to answer. It was making it stop mattering which model answered. Groq, Anthropic and OpenAI all sit behind the same interface, and so do speech and images. Swapping one for another is a settings change, not a rewrite.",
      "Working out whether self-hosting open models on our own GPUs beats paying per token. Sometimes it does, which was the interesting part.",
    ],
    built: [
      "Node, Express and TypeScript over PostgreSQL on Supabase, containerised with Docker Compose and shipped to a VPS, front end and backend both.",
      "The provider routing layer, SSE streaming for builds in progress, and a Python FastAPI service for the pieces that wanted Python.",
      "The API reference the front-end team builds against: auth, projects, conversations, SSE streaming, pagination. If it's ambiguous, it's my fault.",
    ],
    standing: [
      "Live. Transcription moved to a cheaper host in an afternoon without anything else noticing, which is the whole point of the routing layer.",
      "Lately it makes things rather than just answering: illustrated books that come out as finished PDFs, and a follow-up in a build chat that rebuilds the thing instead of replying about it.",
    ],
    links: [{ label: "Live site", href: "https://vibecraft.today", kind: "live" }],
    screens: [
      { src: "/screens/vibecraft-desktop-dark.webp", alt: "VibeCraft landing page: 'Describe it. Vibe builds it.' with a chat beside a live preview of a built website.", width: 1440, height: 900, device: "desktop", scheme: "dark" },
      { src: "/screens/vibecraft-desktop-light.webp", alt: "VibeCraft landing page in light mode.", width: 1440, height: 900, device: "desktop", scheme: "light" },
      { src: "/screens/vibecraft-mobile-dark.webp", alt: "VibeCraft on a phone.", width: 390, height: 844, device: "mobile", scheme: "dark" },
      { src: "/screens/vibecraft-mobile-light.webp", alt: "VibeCraft on a phone in light mode.", width: 390, height: 844, device: "mobile", scheme: "light" },
    ],
  },
  {
    slug: "imago-dynamics-media",
    name: "Imago Dynamics Media",
    kicker: "A whole website, from the copy to the DNS",
    summary:
      "A brand transformation agency's website, designed and built end to end. 95/100 mobile and 100/100 desktop on PageSpeed Insights.",
    period: "08/2026 — 09/2026",
    year: "2026",
    role: "Design, build, copy, SEO, deployment",
    group: "client",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Resend", "Zoho Mail", "DNS"],
    status: {
      kind: "shipped",
      label: "Live · Shipped for a client",
      note: "Live at imagodynamicsmedia.com. 95/100 mobile and 100/100 desktop on PageSpeed Insights.",
    },
    problem: [
      "Imago Dynamics Media is a brand, video and marketing agency in Lagos. They needed to look like the thing they sell, with nothing to run or configure afterwards.",
    ],
    hardPart: [
      "Not the code. The whole thing: the copy and the content architecture, the technical SEO, the domain and the mail, and a performance budget I could put a number on.",
    ],
    built: [
      "Wrote the copy and the content architecture, then designed and built the site.",
      "Technical SEO: sitemaps, canonical URLs, Google indexing.",
      "Bought and configured the domain, DNS and deployment. Set up Zoho Mail with several business mailboxes. Wired Resend for transactional email.",
    ],
    standing: [
      "Live. 95/100 mobile and 100/100 desktop on PageSpeed Insights, which is the number I hold my own site to.",
    ],
    links: [{ label: "Live site", href: "https://imagodynamicsmedia.com", kind: "live" }],
    screens: [
      { src: "/screens/imago-desktop-dark.webp", alt: "Imago Dynamics Media homepage: 'Make your brand impossible to overlook.'", width: 1440, height: 900, device: "desktop", scheme: "dark" },
      { src: "/screens/imago-desktop-light.webp", alt: "Imago Dynamics Media homepage in light mode.", width: 1440, height: 900, device: "desktop", scheme: "light" },
      { src: "/screens/imago-mobile-dark.webp", alt: "Imago Dynamics Media on a phone.", width: 390, height: 844, device: "mobile", scheme: "dark" },
      { src: "/screens/imago-mobile-light.webp", alt: "Imago Dynamics Media on a phone in light mode.", width: 390, height: 844, device: "mobile", scheme: "light" },
    ],
  },
  {
    slug: "harmonykloud-website",
    name: "HarmonyKloud website",
    kicker: "The public face of a platform used by 500+ people",
    summary:
      "I revamped the HarmonyKloud website, the marketing site for the practice-management platform I work on as a backend developer.",
    period: "While at HarmonyKloud",
    year: "2026",
    role: "Website revamp (Backend Developer, HarmonyKloud)",
    group: "client",
    stack: [],
    status: {
      kind: "shipped",
      label: "Live",
      note: "Live at harmonykloud.com. I keep the claim general on purpose: I revamped the website; what is on it belongs to HarmonyKloud.",
    },
    problem: [
      "HarmonyKloud is a US practice-management platform for ABA and behavioral health teams: scheduling, clinical documentation, authorizations, billing and payroll, serving 500+ users. Its public website is the first thing a clinic sees.",
    ],
    hardPart: [
      "Being the engineer who also knows the users. I train clients on the product and sit with them on calls, so I knew what a clinic needs to see before it books a demo.",
    ],
    built: ["I revamped the HarmonyKloud website."],
    standing: ["Live at harmonykloud.com."],
    links: [{ label: "Live site", href: "https://harmonykloud.com", kind: "live" }],
    screens: [
      { src: "/screens/harmonykloud-desktop-light.webp", alt: "HarmonyKloud public website: 'Better care, stronger outcomes, all in one platform'.", width: 1440, height: 900, device: "desktop", scheme: "light" },
      { src: "/screens/harmonykloud-mobile-light.webp", alt: "HarmonyKloud public website on a phone.", width: 390, height: 844, device: "mobile", scheme: "light" },
    ],
  },
  {
    slug: "simbi-ai-bot",
    name: "SIMBI-AI Bot",
    kicker: "A study buddy that lives in Telegram and remembers you",
    summary:
      "A Telegram bot that answers students' study questions. Who you are and what you've earned live on a smart contract, so it recognises you without keeping an account for you.",
    period: "04/2025 — Present",
    year: "2025",
    role: "Smart contracts and bot backend",
    group: "selected",
    stack: ["Telegram Bot API", "Solidity", "Smart contracts", "NFTs"],
    status: {
      kind: "live",
      label: "Live on Telegram",
      note: "Live on Telegram. It answered over 300 questions during its demo run at Learnable.",
    },
    problem: [
      "Students ask questions at midnight, in Telegram, and they don't want another account. SIMBI answers study questions where they already are.",
      "Underneath, who you are and what you have earned live on a smart contract, so it recognises you without keeping an account for you.",
    ],
    hardPart: [
      "Identity without an account. Verification, usage tracking, tokens and NFT rewards had to live on chain and still feel instant inside a chat.",
    ],
    built: [
      "The smart-contract backend for identity verification, user access tracking, tokens and NFT rewards, and the bot's wiring to it.",
    ],
    standing: [
      "Live on Telegram. It handled over 300 student queries during the Learnable demo run, the first time I watched strangers use something I had built.",
    ],
    links: [
      { label: "Open in Telegram", href: "https://t.me/simbi_ai_bot", kind: "telegram" },
      { label: "Source", href: "https://github.com/kingsleycj/simbi-bot", kind: "source" },
    ],
    screens: [],
  },
  {
    slug: "gngn-token",
    name: "gNGN Token",
    kicker: "A central bank's rulebook, expressed in Solidity",
    summary:
      "A digital naira built to follow Central Bank of Nigeria–style rules rather than whatever was easiest to code. Mint, burn, pause, multi-signature approval.",
    period: "05/2025 — 06/2025",
    year: "2025",
    role: "Contracts and tests (Genesys Tech Hub)",
    group: "selected",
    stack: ["Solidity", "Hardhat", "ERC-20", "Multi-signature"],
    status: {
      kind: "testnet",
      label: "Testnet · Base Sepolia",
      note: "Deployed to Base Sepolia, which is a testnet. Nothing here has ever moved real money, and it was never meant to.",
    },
    problem: [
      "What would a tokenised naira look like if it followed the central bank's rules instead of a tutorial? Minting, freezing and destroying money are not things one person should be able to do alone.",
    ],
    hardPart: [
      "Multi-signature approvals for the operations that matter, tested against the rules rather than my assumptions. It mostly held up. The places it didn't were the useful part.",
    ],
    built: [
      "ERC-20 contracts in Solidity and Hardhat for minting, burning and pausing, with multi-signature approval flows modelled on CBN-styled requirements, and the simulations that ran against them.",
    ],
    standing: [
      "Deployed to Base Sepolia, a testnet. Nothing here has ever moved real money, and it was never meant to.",
    ],
    links: [
      {
        label: "Contract on Basescan",
        href: "https://sepolia.basescan.org/address/0x0aF4e2C83B26A42e8a9348Cb9681BCFFa767f378",
        kind: "contract",
      },
      { label: "Source", href: "https://github.com/kingsleycj/gnaira-token", kind: "source" },
    ],
    screens: [],
  },
];

export const smallProjects: SmallProject[] = [
  {
    name: "CivicLink",
    blurb:
      "Decentralised civic identity. I built the contract functions behind identity creation and secure access; the prototype survived a full demo-week run.",
    href: "https://github.com/kingsleycj/civic-IdentityW3",
  },
  {
    name: "Tutera",
    blurb: "A multi-tenant LMS for institutions and creators. I was on the backend team at Genesys Tech Hub.",
  },
  {
    name: "eBuzz",
    blurb:
      "A campus media app. I wrote the backend for registration, login and posting, then watched 50+ students use it in launch week.",
    href: "https://github.com/esutBuzz/ebuzz-backend",
  },
  {
    name: "Medbloc",
    blurb:
      "Digital health records. API endpoints for patient data, hospital registration and scheduling, with validation and role-based access throughout.",
    href: "https://github.com/learnable-2022/DPR-4-BE",
  },
];

export const selectedProjects = projects.filter((p) => p.group === "selected");
export const clientProjects = projects.filter((p) => p.group === "client");

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
