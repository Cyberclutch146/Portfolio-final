"use client";
// components/sections/ProjectsSection.tsx
// Featured projects grid with animated cards and category badges

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@prisma/client";
import { cn } from "@/lib/utils";

// ── Category styling map ─────────────────────────────────────────────────────
const CATEGORY_STYLES: Record<string, { label: string; color: string }> = {
  ROBOTICS:  { label: "robotics",  color: "text-signal  bg-signal/10  border-signal/25" },
  EMBEDDED:  { label: "embedded",  color: "text-circuit bg-circuit/10 border-circuit/25" },
  SOFTWARE:  { label: "software",  color: "text-ink-300 bg-ink-800    border-ink-700" },
  CREATIVE:  { label: "creative",  color: "text-pink-400 bg-pink-400/10 border-pink-400/25" },
  WEB:       { label: "web",       color: "text-blue-400 bg-blue-400/10 border-blue-400/25" },
};

// ── Single Project Card ───────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cat = CATEGORY_STYLES[project.category] ?? CATEGORY_STYLES.SOFTWARE;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="project-card flex flex-col h-full border border-ink-800 rounded-lg bg-ink-950/50 hover:bg-ink-900/50 transition-colors"
    >
      {/* Card header */}
      <div className="p-6 pb-4 flex-1">
        {/* Category badge */}
        <div className="mb-4">
          <span
            className={cn(
              "inline-block font-mono text-2xs px-2 py-0.5 rounded border tracking-wider",
              cat.color
            )}
          >
            {cat.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-xl text-ink-100 hover:text-ink-50 transition-colors mb-2 leading-tight">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-ink-400 text-sm leading-relaxed line-clamp-2">
          {project.tagline}
        </p>
      </div>

      {/* Tech stack */}
      <div className="px-6 py-4 border-t border-ink-800 flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((tech) => (
          <span key={tech} className="tech-tag text-2xs">
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="font-mono text-2xs text-ink-500 self-center">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>

      {/* Icon links footer */}
      <div className="px-6 py-4 border-t border-ink-800 flex gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 rounded border border-ink-700 text-ink-400 hover:text-signal hover:border-signal hover:bg-signal/10 transition-all"
            aria-label="View on GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 rounded border border-ink-700 text-ink-400 hover:text-circuit hover:border-circuit hover:bg-circuit/10 transition-all"
            aria-label="View live demo"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </a>
        )}
      </div>
    </motion.article>
  );
}

// ── Projects Section ─────────────────────────────────────────────────────────
export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-28 relative">
      {/* Subtle separator line from previous section */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-800 to-transparent" />

      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="section-label">
            <span className="w-4 h-px bg-signal inline-block" />
            selected work
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink-50 mb-4">
            Things I've built
          </h2>
          <p className="text-ink-400 max-w-md">
            From microcontroller firmware to full-stack web — each project is a
            complete problem-to-solution arc.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex justify-end"
        >
          <Link href="/projects" className="btn-ghost">
            <span>all projects</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
