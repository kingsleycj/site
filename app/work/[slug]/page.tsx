import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CaseStudy } from "@/components/work/CaseStudy";
import { getProject, projects } from "@/content/projects";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const shot = p.screens.find((s) => s.device === "desktop");
  return {
    title: `${p.name} — ${p.kicker}`,
    description: `${p.summary} ${p.status.note}`,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: `${p.name} — ${p.kicker}`,
      description: p.summary,
      type: "article",
      ...(shot ? { images: [{ url: shot.src, width: shot.width, height: shot.height, alt: shot.alt }] } : {}),
    },
  };
}

async function Resolved({ params }: { params: Params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  return <CaseStudy project={p} />;
}

/**
 * Every slug is prerendered; the Suspense boundary is what Cache Components requires for
 * reading params, and it keeps an unknown slug a real 404 (a cached page cannot).
 */
export default function CaseStudyPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-surface" aria-busy="true" />}>
      <Resolved params={params} />
    </Suspense>
  );
}
