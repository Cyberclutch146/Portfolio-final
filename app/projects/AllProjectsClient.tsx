"use client";
// app/projects/AllProjectsClient.tsx
// Filterable project grid for the /projects page

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Project } from "@prisma/client";
import { cn } from "@/lib/utils";

const FILTERS = [
  { value: "ALL",      label: "All" },
  { value: "ROBOTICS", label: "Robotics" },
  { value: "EMBEDDED", label: "Embedded" },
  { value: "SOFTWARE", label: "Software" },
  { value: "CREATIVE", label: "Creative" },
  { value: "WEB",      label: "Web" },
];

const CATEGORY_STYLES: Record<string, string> = {
  ROBOTICS: "text-text border-border",
  EMBEDDED: "text-text border-border",
  SOFTWARE: "text-text border-border",
  CREATIVE: "text-text border-border",
  WEB:      "text-text border-border",
};

export default function AllProjectsClient({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filtered =
    activeFilter === "ALL"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen pt-28 pb-32">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-gold transition-colors mb-8 uppercase tracking-widest"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            BACK TO HUB
          </Link>
          <p className="section-label">
            <span className="w-8 h-px bg-gold-dim block" />
            <span>ARCHIVES</span>
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-white mb-6 tracking-tight">
            All Projects
          </h1>
          <p className="text-text-dim font-light max-w-sm">
            {projects.length} works across hardware, software, and design.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "font-mono text-[11px] uppercase tracking-widest px-4 py-2 border transition-all duration-300",
                activeFilter === f.value
                  ? "bg-gold text-surface border-gold font-medium"
                  : "bg-surface border-border text-text-muted hover:border-gold-dim hover:text-gold"
              )}
            >
              {f.label}
              {f.value !== "ALL" && (
                <span className="ml-1.5 opacity-50">
                  [{projects.filter((p) => p.category === f.value).length}]
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="h-full"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group cinematic-box flex flex-col h-full overflow-hidden hover:border-gold-dim hover:bg-gold-faint/5 transition-colors duration-400"
                >
                  <div className="p-6 pb-4 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <span className={cn(
                        "font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm border", 
                        CATEGORY_STYLES[project.category] || "text-text border-border"
                      )}>
                        {project.category}
                      </span>
                      <span className="text-text-muted group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 inline-block">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                          <path d="M3 8h10M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                    <h3 className="font-display font-medium text-xl text-white group-hover:text-gold transition-colors duration-400 mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-text-dim text-[13px] font-light leading-relaxed line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>
                  <div className="px-6 py-4 border-t border-border-dim flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
                        // {t}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="font-mono text-[9px] text-text-muted self-center">
                        +{project.techStack.length - 3} MORE
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 border border-border-dim bg-surface p-8">
            <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted">NO RECORDS FOUND MATCHING SELECTED FILTER.</p>
          </div>
        )}
      </div>
    </div>
  );
}
