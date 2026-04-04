"use client";
// components/sections/SkillsSection.tsx
// Cinematic Tech Stack Badges

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Skill } from "@prisma/client";
import { cn } from "@/lib/utils";
import DecryptedText from "@/components/animations/DecryptedText";

// Icons 
import { FaJava, FaCode } from "react-icons/fa";
import { 
  SiCplusplus, SiJavascript, SiTypescript, SiPython, SiSolidity, SiHtml5,
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiVite, SiSocketdotio, SiEthereum, SiPandas, SiPytorch,
  SiFirebase, SiSupabase, SiMongodb, SiPostgresql, SiMysql, SiVercel, SiGooglecloud,
  SiWebrtc, SiTailwindcss,
  SiArduino, SiGit, SiGithub, SiNotion, SiFigma, SiFramer,
  SiEspressif, SiKicad
} from "react-icons/si";

const ICON_MAP: Record<string, React.ElementType> = {
  SiCplusplus, FaJava, SiJavascript, SiTypescript, SiPython, SiSolidity, SiHtml5,
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiVite, SiSocketdotio, SiWeb3dotjs: SiEthereum, SiPandas, SiPytorch,
  SiFirebase, SiSupabase, SiMongodb, SiPostgresql, SiMysql, SiVercel, SiGooglecloud,
  SiWebrtc, SiTailwindcss,
  SiArduino, SiGit, SiGithub, SiNotion, SiFigma, SiFramer,
  SiEspressif, SiKicad
};

const CATEGORY_META: Record<string, { label: string; description: string }> = {
  LANGUAGES: { label: "Languages",  description: "Core languages for scripting and logic" },
  TOOLS:     { label: "Software & Web", description: "Frameworks, databases, and core dev tooling" },
  HARDWARE:  { label: "Hardware",   description: "Embedded platforms and components" },
  DESIGN:    { label: "Design",     description: "Creative tools for visual and motion work" },
};

// ── Cinematic Badge Component ─────────────────────────────────────────────────
function SkillBadge({ skill, index }: { skill: Skill; index: number }) {
  const Icon = skill.icon && ICON_MAP[skill.icon] ? ICON_MAP[skill.icon] : FaCode;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.19, 1, 0.22, 1] }}
      className="group relative flex items-center gap-3 px-5 py-3 cinematic-box overflow-hidden cursor-default transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_4px_25px_rgba(204,170,44,0.15)] border-white/[0.04] dark:border-white/[0.06] hover:border-gold/30"
    >
      {/* Background sweep on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-faint to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out opacity-20" />
      
      {/* Icon */}
      <div className="relative z-10 w-6 h-6 flex items-center justify-center">
        <Icon className="w-full h-full text-text-dim/80 group-hover:text-gold transition-all duration-400 group-hover:scale-110" />
      </div>

      {/* Label */}
      <span className="relative z-10 font-display font-medium tracking-[0.12em] text-[12px] sm:text-sm text-text-dim group-hover:text-text transition-colors duration-400 uppercase">
        {skill.name}
      </span>
    </motion.div>
  );
}

// ── Skills Section ────────────────────────────────────────────────────────────
export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const [activeCategory, setActiveCategory] = useState("LANGUAGES");

  // Group skills by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(CATEGORY_META).filter((c) => grouped[c]);
  const activeSkills = grouped[activeCategory] ?? [];
  const meta = CATEGORY_META[activeCategory];

  return (
    <section id="skills" className="pt-12 pb-6 relative border-t border-border-dim overflow-hidden bg-background transition-colors duration-500">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-gold rounded-full opacity-[0.015] blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mb-16 md:mb-24"
        >
          <div className="section-label group mb-8">
            <span className="w-8 h-px bg-gold-dim block" />
            <DecryptedText text="TECH STACK" animateOn="view" speed={80} />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-medium bg-gradient-to-br dark:from-white dark:via-gray-200 dark:to-gray-600 from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent mb-6 tracking-tight">
            System Capabilities
          </h2>
          <p className="text-text-dim max-w-lg text-[16px] font-light leading-relaxed">
            A comprehensive overview of my technological loadout, organized into primary operational categories.
          </p>
        </motion.div>

        {/* Categories Tab Row */}
        <div className="mb-10 flex flex-wrap gap-2 lg:gap-4 border-b border-border-dim pb-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 md:px-6 py-2 transition-all duration-400 uppercase tracking-widest text-[11px] sm:text-xs font-mono relative",
                  isActive ? "text-text scale-105" : "text-text-muted hover:text-text-dim"
                )}
              >
                {CATEGORY_META[cat]?.label}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBorder"
                    className="absolute bottom-[-17px] left-0 right-0 h-px bg-gold"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Category Meta Description (Optional details) */}
        <div className="mb-8">
           <p className="text-text-dim text-xs sm:text-sm font-light min-h-[20px] transition-opacity">
              {meta?.description}
           </p>
        </div>

        {/* Badges Grid */}
        <div className="min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              {activeSkills.map((skill, index) => (
                <SkillBadge key={skill.id} skill={skill} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
