import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { panels } from "@/lib/panels";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-17");
  return [
    ...panels.map((p) => ({ url: `${site.url}${p.path}`, lastModified, changeFrequency: "monthly" as const, priority: p.id === "home" ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, lastModified, changeFrequency: "monthly" as const, priority: p.isStartup ? 0.9 : 0.7 })),
  ];
}
