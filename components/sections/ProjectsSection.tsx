"use client";
// components/sections/ProjectsSection.tsx
// Featured projects grid with elegant cinematic cards

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@prisma/client";
import { cn } from "@/lib/utils";
import DecryptedText from "@/components/animations/DecryptedText";

// ── Category styling map (Subtle Cinematic) ──────────────────────────────────
const CATEGORY_STYLES: Record<string, { label: string; color: string }> = {
  ROBOTICS:  { label: "robotics",  color: "text-text border-border" },
  EMBEDDED:  { label: "embedded",  color: "text-text border-border" },
  SOFTWARE:  { label: "software",  color: "text-text border-border" },
  CREATIVE:  { label: "creative",  color: "text-text border-border" },
  WEB:       { label: "web",       color: "text-text border-border" },
};

// ── Single Project Card ───────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cat = CATEGORY_STYLES[project.category] ?? CATEGORY_STYLES.SOFTWARE;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      className="project-card flex flex-col h-full group cinematic-box"
    >
      {/* Card header */}
      <div className="p-6 sm:p-8 pb-4 flex-1 relative z-10">
        {/* Category badge */}
        <div className="mb-8">
          <span
            className={cn(
               "inline-flex items-center justify-center font-mono text-[9px] px-2 py-0.5 border tracking-[0.2em] uppercase transition-colors group-hover:border-gold-dim group-hover:text-gold",
              cat.color
            )}
          >
            {cat.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-medium text-2xl text-text mb-4 tracking-tight group-hover:text-gold transition-colors duration-400">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-text-dim text-[14px] font-light leading-relaxed line-clamp-2">
          {project.tagline}
        </p>
      </div>

      {/* Tech stack */}
      <div className="px-6 sm:px-8 py-5 border-t border-border flex flex-wrap gap-2 relative z-10 transition-colors group-hover:border-gold-faint">
        {project.techStack.slice(0, 4).map((tech) => (
          <span key={tech} className="tech-tag text-[9px]">
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="font-mono text-[9px] text-text-muted self-center tracking-widest pl-2">
            +{project.techStack.length - 4} MORE
          </span>
        )}
      </div>

      {/* Icon links footer */}
      <div className="px-6 sm:px-8 py-4 border-t border-border flex gap-4 bg-surface/30 relative z-10 group-hover:border-gold-faint group-hover:bg-gold-faint/10 transition-all">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 rounded border border-border bg-transparent text-text-dim hover:text-gold hover:border-gold transition-all"
            aria-label="View on GitHub"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 rounded border border-border bg-transparent text-text-dim hover:text-gold hover:border-gold transition-all"
            aria-label="View live demo"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
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
    <section id="projects" className="py-32 relative border-t border-border-dim overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold rounded-full opacity-[0.015] blur-[150px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <div className="section-label mb-8 group">
              <span className="w-8 h-px bg-gold-dim block" />
              <DecryptedText text="CORE WORK" animateOn="view" speed={80} />
            </div>
            <h2 className="font-display text-5xl sm:text-6xl font-medium bg-gradient-to-br dark:from-white dark:via-gray-200 dark:to-gray-500 from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-sm">
              Featured Projects
            </h2>
            <p className="text-text-dim max-w-lg text-[16px] sm:text-lg font-light leading-relaxed">
              From bare-metal firmware to distributed web apps. Real-world solutions architected for scale and precision.
            </p>
          </div>

          <Link href="/projects" className="btn-ghost hidden md:inline-flex shrink-0">
            <span>Directory</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden className="ml-2">
              <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-12 flex justify-center md:hidden">
            <Link href="/projects" className="btn-ghost w-full justify-center">
              <span>View Directory</span>
            </Link>
        </div>
      </div>
    </section>
  );
}
