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
      className="border-t border-border-dim pt-8"
    >
      <p className="label-mono mb-4 text-text-dim">{label}</p>
      <p className="text-text leading-relaxed max-w-prose font-light">{content}</p>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProjectDetailClient({ project }: { project: Project }) {
  const caseStudySections = [
    { label: "THE PROBLEM",  content: project.problem },
    { label: "THE APPROACH", content: project.approach },
    { label: "LEARNINGS",    content: project.learnings },
  ].filter((s) => s.content);

  return (
    <div className="relative min-h-screen pt-24 pb-32 bg-background">
      {/* ── Animated Background ── */}
      <div className="absolute inset-0 z-[-1] overflow-hidden opacity-[0.03] pointer-events-none mix-blend-screen">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Back link ── */}
      <div className="section-container mb-10">
        <Link
          href="/#projects"
          className="relative z-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-gold transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
          BACK TO PROJECTS
        </Link>
      </div>

      {/* ── Hero block ── */}
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Category + meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="font-mono text-[9px] px-3 py-1 border border-border text-text tracking-[0.2em] uppercase">
              {CATEGORY_LABELS[project.category] ?? project.category}
            </span>
            <span className="font-mono text-xs text-text-dim">/</span>
            <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
              {new Date(project.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6 tracking-tight">
            {project.title}
          </h1>

          {/* Tagline */}
          <p className="text-text-dim text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10">
            {project.tagline}
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex items-center justify-center min-w-[160px]"
              >
                <span>View Source</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center min-w-[160px]"
              >
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="mt-20 mb-16 h-px w-full bg-border-dim" />

        {/* ── Two-column layout: content left, sidebar right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Full description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="label-mono mb-4 text-text-dim">OVERVIEW</p>
              <p className="text-text leading-relaxed max-w-prose text-[15px] font-light">
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
              className="sticky top-32 cinematic-box p-8 space-y-10"
            >
              {/* Tech stack */}
              <div>
                <p className="label-mono mb-4 text-text-dim">TECH STACK</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="font-mono text-[9px] uppercase tracking-wider px-2 py-1 border border-border-dim text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="border-t border-border-dim pt-8 space-y-6">
                <div>
                  <p className="label-mono mb-2 text-text-dim border-l border-gold-dim pl-2">CATEGORY</p>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-text pl-2">
                    {CATEGORY_LABELS[project.category] || project.category}
                  </p>
                </div>
                <div>
                  <p className="label-mono mb-2 text-text-dim border-l border-gold-dim pl-2">STATUS</p>
                  <div className="flex items-center gap-2 pl-2">
                    <div className="w-1.5 h-1.5 bg-gold-dim" />
                    <p className="font-mono text-[11px] uppercase tracking-widest text-text">COMPLETED</p>
                  </div>
                </div>
              </div>

              {/* Quick nav to next project */}
              <div className="border-t border-border-dim pt-8">
                <p className="label-mono mb-4 text-text-dim">EXPLORE MORE</p>
                <Link
                  href="/#projects"
                  className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-gold transition-colors"
                >
                  <span className="w-4 h-px bg-border group-hover:bg-gold transition-colors" />
                  <span>ALL PROJECTS</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden
                  >
                    <path d="M2 6h8M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
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
