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

const CATEGORY_COLORS: Record<string, string> = {
  ROBOTICS: "text-signal  bg-signal/10  border-signal/25",
  EMBEDDED: "text-circuit bg-circuit/10 border-circuit/25",
  SOFTWARE: "text-ink-300 bg-ink-800    border-ink-700",
  CREATIVE: "text-pink-400 bg-pink-400/10 border-pink-400/25",
  WEB:      "text-blue-400 bg-blue-400/10 border-blue-400/25",
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
            className="inline-flex items-center gap-2 font-mono text-xs text-ink-500 hover:text-signal transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            home
          </Link>
          <p className="section-label">
            <span className="w-4 h-px bg-signal inline-block" />
            work
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-ink-50 mb-4">
            All Projects
          </h1>
          <p className="text-ink-400 max-w-sm">
            {projects.length} projects across hardware, software, and design.
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
                "font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-200",
                activeFilter === f.value
                  ? "bg-signal/15 border-signal/40 text-signal"
                  : "border-ink-700 text-ink-500 hover:border-ink-500 hover:text-ink-300"
              )}
            >
              {f.label}
              {f.value !== "ALL" && (
                <span className="ml-1.5 text-2xs opacity-50">
                  {projects.filter((p) => p.category === f.value).length}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group project-card flex flex-col h-full"
                >
                  <div className="p-6 pb-4 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <span className={cn("font-mono text-2xs px-2 py-0.5 rounded border tracking-wider", CATEGORY_COLORS[project.category])}>
                        {project.category.toLowerCase()}
                      </span>
                      <span className="text-ink-600 group-hover:text-signal transition-all duration-300 group-hover:translate-x-1 inline-block">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                          <path d="M3 8h10M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-ink-100 group-hover:text-ink-50 transition-colors mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-ink-400 text-sm leading-relaxed line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>
                  <div className="px-6 py-4 border-t border-ink-800 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="tech-tag text-2xs">{t}</span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="font-mono text-2xs text-ink-500 self-center">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-ink-600">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
