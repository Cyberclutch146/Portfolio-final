"use client";
// components/sections/SkillsSection.tsx
// Dynamic skills display with category grouping and animated bars

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Skill } from "@prisma/client";

const CATEGORY_META: Record<string, { label: string; description: string }> = {
  LANGUAGES: { label: "Languages",  description: "Programming languages I write production code in" },
  HARDWARE:  { label: "Hardware",   description: "Embedded platforms and components I've shipped projects with" },
  TOOLS:     { label: "Tools",      description: "Dev tools and environments I use daily" },
  DESIGN:    { label: "Design",     description: "Creative tools for visual and motion work" },
  SOFT:      { label: "Other",      description: "Capabilities that don't fit a category" },
};

// ── Animated skill bar ────────────────────────────────────────────────────────
function SkillBar({ skill, inView }: { skill: Skill; inView: boolean }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-sm text-ink-200 group-hover:text-ink-50 transition-colors">
          {skill.name}
        </span>
        <span className="font-mono text-2xs text-ink-500">
          {skill.level}%
        </span>
      </div>
      {/* Track */}
      <div className="h-px bg-ink-800 w-full relative overflow-hidden rounded-full">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? skill.level / 100 : 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="absolute inset-y-0 left-0 right-0 origin-left"
          style={{
            background: "linear-gradient(90deg, #e8b94a, #3ecfcf)",
          }}
        />
      </div>
    </div>
  );
}

// ── Skills Section ────────────────────────────────────────────────────────────
export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const [activeCategory, setActiveCategory] = useState("LANGUAGES");
  const [sectionInView, setSectionInView] = useState(false);

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
    <section
      id="skills"
      className="py-28 relative bg-ink-900/30"
      ref={(el) => {
        if (!el) return;
        const obs = new IntersectionObserver(
          ([e]) => { if (e.isIntersecting) setSectionInView(true); },
          { threshold: 0.2 }
        );
        obs.observe(el);
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-800 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-800 to-transparent" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="section-label">
            <span className="w-4 h-px bg-circuit inline-block" />
            capabilities
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink-50 mb-3">
            Toolbox
          </h2>
          <p className="text-ink-400 max-w-sm">
            A living inventory of what I work with regularly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: category tabs */}
          <div className="lg:col-span-1">
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    flex-shrink-0 text-left px-4 py-3 rounded-lg border transition-all duration-200
                    font-mono text-sm
                    ${activeCategory === cat
                      ? "bg-signal/10 border-signal/30 text-signal"
                      : "bg-transparent border-ink-800 text-ink-400 hover:border-ink-600 hover:text-ink-200"
                    }
                  `}
                >
                  {CATEGORY_META[cat]?.label}
                  <span className="ml-2 text-2xs text-ink-600">
                    ({grouped[cat]?.length ?? 0})
                  </span>
                </button>
              ))}
            </div>

            {/* Category description */}
            <p className="mt-4 text-ink-500 text-sm leading-relaxed hidden lg:block">
              {meta?.description}
            </p>
          </div>

          {/* Right: skill bars */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-5"
              >
                {activeSkills.map((skill) => (
                  <SkillBar key={skill.id} skill={skill} inView={sectionInView} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
