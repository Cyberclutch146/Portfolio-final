"use client";
// components/sections/AboutSection.tsx
// Engineering-minded about section with timeline and identity

import { motion } from "framer-motion";
import Link from "next/link";

const TIMELINE = [
  { year: "2022", label: "Enrolled in B.Tech ECE", note: "Started building, not just studying" },
  { year: "2023", label: "First Arduino robot", note: "The wiring was terrible. It worked anyway." },
  { year: "2023", label: "Began freelance design", note: "Clients taught me more than classrooms" },
  { year: "2024", label: "Smart Home IoT project", note: "Full-stack, hardware to dashboard" },
  { year: "2025", label: "DSA visualizer & tutoring", note: "Teaching sharpens everything" },
  { year: "now",  label: "Seeking internships", note: "Embedded, robotics, or full-stack" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-28">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="section-label">
              <span className="w-4 h-px bg-signal inline-block" />
              about
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink-50 mb-6">
              I think in systems.
            </h2>

            <div className="space-y-4 text-ink-300">
              <p>
                I'm{" "}
                <span className="text-ink-50 font-medium">Swagata Ganguly</span>, a
                B.Tech Electronics & Communication Engineering student in West
                Bengal, India. My work lives at the edge where hardware meets
                software — where a line of C++ controls a physical motor, and a
                poorly chosen resistor kills three hours of debugging.
              </p>
              <p>
                I got into ECE because I wanted to understand how things actually
                work — not at the abstraction level, but at the voltage level. That
                curiosity drove me to build robots, design PCBs, flash firmware, and
                eventually climb the stack into web applications and data
                visualizations.
              </p>
              <p>
                Outside technical work, I'm a{" "}
                <span className="text-ink-100">graphic designer</span> and{" "}
                <span className="text-ink-100">video editor</span> — I believe
                engineers who can communicate visually are rare and valuable. And I
                freelance as a{" "}
                <span className="text-ink-100">programming tutor</span>: teaching
                DSA and C++ to juniors has made me a much better programmer than any
                course did.
              </p>
              <p className="italic text-ink-400">
                "If you can't explain it simply, you don't understand it well enough."
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/resume/swagata-ganguly-resume.pdf"
                download
                className="btn-primary"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M7 1v8M3 10l4 3 4-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>download resume</span>
              </a>
              <Link href="/#contact" className="btn-ghost">
                <span>let's talk</span>
              </Link>
            </div>
          </motion.div>

          {/* Right — timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="label-mono mb-6">timeline</p>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[2.5rem] top-0 bottom-0 w-px bg-ink-800" />

              <div className="space-y-6">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex gap-5 items-start"
                  >
                    {/* Year */}
                    <div className="w-14 flex-shrink-0 text-right">
                      <span className="font-mono text-xs text-signal">{item.year}</span>
                    </div>

                    {/* Dot */}
                    <div className="relative z-10 mt-1.5 flex-shrink-0">
                      <div
                        className={`w-2 h-2 rounded-full border ${
                          item.year === "now"
                            ? "bg-circuit border-circuit"
                            : "bg-ink-800 border-ink-600"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="pb-2">
                      <p className="text-ink-100 font-medium text-sm leading-snug">
                        {item.label}
                      </p>
                      <p className="text-ink-500 text-xs mt-0.5 font-mono italic">
                        {item.note}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick facts */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { label: "Projects shipped",  value: "8+" },
                { label: "Languages spoken",  value: "5" },
                { label: "Robots built",      value: "3" },
                { label: "Students tutored",  value: "20+" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-lg border border-ink-800 bg-ink-900/50">
                  <p className="font-display text-2xl font-bold text-signal">{stat.value}</p>
                  <p className="label-mono mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
