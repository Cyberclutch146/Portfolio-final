// app/projects/[slug]/page.tsx
// Individual project case-study page

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import ProjectDetailClient from "./ProjectDetailClient";

// ── Static params for SSG ─────────────────────────────────────────────────────
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

// ── Dynamic metadata ──────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} | Swagata Ganguly`,
      description: project.tagline,
      ...(project.coverImage ? { images: [{ url: project.coverImage }] } : {}),
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}
