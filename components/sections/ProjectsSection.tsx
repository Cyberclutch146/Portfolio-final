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
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group project-card flex flex-col h-full"
        aria-label={`View project: ${project.title}`}
      >
        {/* Card header */}
        <div className="p-6 pb-4 flex-1">
          {/* Top row: category badge + arrow */}
          <div className="flex items-start justify-between mb-4">
            <span
              className={cn(
                "inline-block font-mono text-2xs px-2 py-0.5 rounded border tracking-wider",
                cat.color
              )}
            >
              {cat.label}
            </span>
            {/* Arrow — slides right on hover */}
            <span className="text-ink-600 group-hover:text-signal transition-all duration-300 group-hover:translate-x-1 inline-block">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M4 9h10M9 5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-semibold text-xl text-ink-100 group-hover:text-ink-50 transition-colors mb-2 leading-tight">
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="text-ink-400 text-sm leading-relaxed line-clamp-2">
            {project.tagline}
          </p>
        </div>

        {/* Tech stack footer */}
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
      </Link>
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
