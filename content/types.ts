/** Shared content types. Every word on the site comes from the modules in this folder. */

export type StatusKind =
  | "live"
  | "devnet"
  | "testnet"
  | "beta"
  | "shipped"
  | "building";

export interface ProjectStatus {
  kind: StatusKind;
  /** Short label for the badge, e.g. "Live", "Devnet", "Testnet · Base Sepolia". */
  label: string;
  /** One or two honest sentences about where it really stands. */
  note: string;
}

export type LinkKind = "live" | "source" | "download" | "contract" | "telegram";

export interface ProjectLink {
  label: string;
  href: string;
  kind: LinkKind;
}

export interface Screen {
  /** Path under /public, e.g. "/screens/humstage-desktop-hero.webp". */
  src: string;
  alt: string;
  width: number;
  height: number;
  device: "desktop" | "mobile";
  /** Which site theme the capture was taken in; the UI picks the closest match. */
  scheme: "dark" | "light";
}

export interface Project {
  slug: string;
  name: string;
  /** One-line hook shown as the card title on Work, 4–9 words. */
  kicker: string;
  /** One or two plain sentences for the detail card. */
  summary: string;
  period: string;
  year: string;
  role: string;
  group: "selected" | "client";
  isStartup?: boolean;
  stack: string[];
  status: ProjectStatus;
  problem: string[];
  hardPart: string[];
  built: string[];
  standing: string[];
  links: ProjectLink[];
  screens: Screen[];
}

export interface SmallProject {
  name: string;
  blurb: string;
  href?: string;
}

export interface TimelineEntry {
  id: string;
  title: string;
  org: string;
  orgHref?: string;
  place: string;
  period: string;
  current: boolean;
  /** "Current" for employment, "Building" for HumStage. */
  badge?: string;
  bullets: string[];
  award?: { title: string; detail: string; date: string };
  /** Link to a project slug this role is about. */
  project?: string;
}

export interface LoopStep {
  id: "build" | "test" | "teach" | "listen";
  verb: string;
  title: string;
  body: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  grade: string;
}

export interface Certificate {
  title: string;
  issuer: string;
}

export interface ToolkitGroup {
  id: string;
  title: string;
  /** One dry line on what this group is for. */
  line: string;
  tools: string[];
}

export interface NowItem {
  title: string;
  body: string;
  tag: string;
  /** Project slug to link to, if any. */
  project?: string;
}

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
  /** Project or org this number belongs to, for the link. */
  href?: string;
}

export interface HeadlineOption {
  id: string;
  /** Text before the first chip. */
  lead: string;
  /** The filled green chip and the tonal chip, in that order. */
  chips: [string, string];
  /** Text after the chips; `accent` is set in the italic serif, like reference-2. */
  tail: string;
  accent: string;
  tailEnd?: string;
}
