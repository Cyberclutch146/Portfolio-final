"use client";
// app/projects/[slug]/ProjectDetailClient.tsx
// Animated case-study layout for individual project pages

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@prisma/client";
import LetterGlitch from "@/components/animations/LetterGlitch";

const CATEGORY_LABELS: Record<string, string> = {
  ROBOTICS: "robotics",
  EMBEDDED: "embedded",
  SOFTWARE: "software",
  CREATIVE: "creative",
  WEB: "web",
};

// ── Section block (problem / approach / learnings) ───────────────────────────
function CaseStudyBlock({
  label,
  content,
  index,
}: {
  label: string;
  content: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="border-t border-ink-800 pt-8"
    >
      <p className="label-mono mb-3">{label}</p>
      <p className="text-ink-300 leading-relaxed max-w-prose">{content}</p>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProjectDetailClient({ project }: { project: Project }) {
  const caseStudySections = [
    { label: "the problem",  content: project.problem },
    { label: "the approach", content: project.approach },
    { label: "learnings",    content: project.learnings },
  ].filter((s) => s.content);

  return (
    <div className="relative min-h-screen pt-24 pb-32">
      {/* ── Animated Background ── */}
      <div className="absolute inset-0 z-[-1] overflow-hidden opacity-10 pointer-events-none mix-blend-screen">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      {/* ── Back link ── */}
      <div className="section-container mb-10">
        <Link
          href="/#projects"
          className="relative z-10 inline-flex items-center gap-2 font-mono text-xs text-ink-500 hover:text-signal transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          back to projects
        </Link>
      </div>

      {/* ── Hero block ── */}
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Category + meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-2xs px-2 py-0.5 rounded border border-signal/25 bg-signal/10 text-signal tracking-wider">
              {CATEGORY_LABELS[project.category] ?? project.category.toLowerCase()}
            </span>
            <span className="font-mono text-2xs text-ink-600">·</span>
            <span className="font-mono text-2xs text-ink-500">
              {new Date(project.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink-50 leading-tight mb-4">
            {project.title}
          </h1>

          {/* Tagline */}
          <p className="text-ink-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            {project.tagline}
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>source code</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                <span>live demo</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 10L10 2M5 2h5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="mt-16 mb-12 h-px bg-gradient-to-r from-signal/40 via-ink-800 to-transparent" />

        {/* ── Two-column layout: content left, sidebar right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Full description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="label-mono mb-3">overview</p>
              <p className="text-ink-300 leading-relaxed max-w-prose text-base">
                {project.description}
              </p>
            </motion.div>

            {/* Case study blocks */}
            {caseStudySections.map((s, i) => (
              <CaseStudyBlock
                key={s.label}
                label={s.label}
                content={s.content!}
                index={i}
              />
            ))}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-24 space-y-8"
            >
              {/* Tech stack */}
              <div>
                <p className="label-mono mb-3">tech stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="border-t border-ink-800 pt-6 space-y-4">
                <div>
                  <p className="label-mono mb-1">category</p>
                  <p className="font-mono text-sm text-ink-300">
                    {CATEGORY_LABELS[project.category]}
                  </p>
                </div>
                <div>
                  <p className="label-mono mb-1">status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-circuit" />
                    <p className="font-mono text-sm text-ink-300">completed</p>
                  </div>
                </div>
              </div>

              {/* Quick nav to next project */}
              <div className="border-t border-ink-800 pt-6">
                <p className="label-mono mb-3">explore</p>
                <Link
                  href="/#projects"
                  className="group flex items-center gap-2 font-mono text-sm text-ink-400 hover:text-signal transition-colors"
                >
                  <span>all projects</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden
                  >
                    <path d="M2 6h8M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
