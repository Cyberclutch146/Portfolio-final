"use client"; //hello
// components/sections/AboutSection.tsx
// Cinematic engineering identity section

import { motion } from "framer-motion";
import Link from "next/link";
import DecryptedText from "@/components/animations/DecryptedText";

const TIMELINE = [
  { year: "2024", label: "Started B.Tech ECE", note: "Shifted focus toward software development and problem solving" },
  { year: "2024", label: "First full-stack project", note: "Built end-to-end app with frontend, backend, and database" },
  { year: "2024", label: "Freelance development", note: "Worked with clients, shipped real-world web solutions" },
  { year: "2024", label: "Backend & APIs", note: "Designed REST APIs and handled database integration" },
  { year: "2025", label: "DSA & problem solving", note: "Strengthening core CS fundamentals and logic building" },
  { year: "now", label: "Seeking software internships", note: "Full-stack, backend, or systems-focused roles" },
];

export default function AboutSection() {
  return (
    <section id="about" className="pt-6 pb-6 relative border-t border-border-dim overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-gold rounded-full opacity-[0.02] blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="section-label">
              <span className="w-8 h-px bg-gold-dim block" />
              <DecryptedText text="ORIGIN STORY" animateOn="view" speed={80} />
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium bg-gradient-to-br dark:from-white dark:via-gray-200 dark:to-gray-600 from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent mb-8 tracking-tight leading-[1.1]">
              I think in <span className="text-gold opacity-100 drop-shadow-[0_0_20px_rgba(204,170,44,0.4)]">Systems.</span>
            </h2>

            <div className="space-y-6 text-text-dim text-lg font-light leading-relaxed">
              <p>
                I'm{" "}
                <span className="text-text dark:text-white font-normal underline decoration-border underline-offset-4">Swagata Ganguly</span>, a
                B.Tech Electronics & Communication Engineering student in West
                Bengal, India. My work lives at the edge where hardware meets
                software — where a line of C++ controls a physical motor, and a
                poorly chosen resistor kills three hours of debugging.
              </p>
              <p>
                I got into ECE because I wanted to understand how things actually
                work — not at the abstraction level, but at the <span className="text-text dark:text-white font-normal">fundamental level</span>. That
                curiosity drove me to build robots, design PCBs, flash firmware, and
                eventually climb the stack into complex web applications and data
                visualizations, but I quickly moved into software to build real-world applications. I work across the stack — designing clean architectures, developing APIs, and creating user-facing interfaces, with a focus on performance, reliability, and maintainability.
              </p>
              <p>
                Outside technical work, I'm a{" "}
                <span className="text-text dark:text-white font-normal">graphic designer</span> and{" "}
                <span className="text-text dark:text-white font-normal">video editor</span>. I believe
                engineers who can communicate visually are rare and valuable. And I
                freelance as a{" "}
                <span className="text-text dark:text-white font-normal">programming tutor</span>: teaching
                DSA and C++ to juniors has made me a much better programmer than any
                course did.
              </p>
              
              <div className="relative pl-6 py-2 border-l border-gold-dim mt-10">
                <p className="italic text-text-muted font-display text-lg tracking-wide">
                  "If you can't explain it simply, you don't understand it well enough."
                </p>
              </div>
            </div>

            <div className="mt-14 flex flex-wrap gap-4">
              <a
                href="/Professional%20CV%20-%20Swagata%20Ganguly%20(1).pdf"
                download="Swagata_Ganguly_Resume.pdf"
                className="btn-primary"
              >
                <span>Download Resume</span>
              </a>
              <Link href="/#contact" className="btn-ghost">
                <span>Contact Me</span>
              </Link>
            </div>
          </motion.div>

          {/* Right — timeline & facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col gap-10"
          >
            {/* Timeline */}
            <div className="cinematic-box p-8 sm:p-10 relative overflow-hidden group">
              <div className="mb-10 flex items-center gap-4">
                 <span className="w-1.5 h-1.5 bg-gold-dim block" />
                 <p className="font-mono text-[10px] text-text-dim tracking-[0.2em] uppercase">Chronology</p>
                 <span className="flex-1 h-px bg-border-dim block" />
              </div>
              
              <div className="relative">
                {/* Vertical line  */}
                <div className="absolute left-[3.25rem] top-2 bottom-2 w-px bg-border-dim" />

                <div className="space-y-8">
                  {TIMELINE.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                      className="flex gap-6 items-start group/log"
                    >
                      {/* Year */}
                      <div className="w-12 flex-shrink-0 text-right pt-0.5">
                        <span className="font-mono text-[11px] text-text-muted group-hover/log:text-gold transition-colors">{item.year}</span>
                      </div>

                      {/* Dot */}
                      <div className="relative z-10 flex-shrink-0 mt-[5px]">
                        <div
                          className={`w-[7px] h-[7px] rounded-full border transition-all duration-300 ${
                            item.year === "now"
                              ? "bg-gold border-gold"
                              : "bg-surface border-border group-hover/log:border-gold group-hover/log:bg-gold-faint"
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="pb-1">
                        <p className="text-text dark:text-white font-display font-medium text-[15px] leading-snug tracking-wide group-hover/log:text-gold transition-colors">
                          {item.label}
                        </p>
                        <p className="text-text-muted text-[13px] mt-1 font-light">
                          {item.note}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick facts layout */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Projects Shipped",  value: "3+" },
                { label: "Technologies Mastered",  value: "20+" },
                { label: "Robots Built",      value: "3" },
                { label: "Ideas explored",  value: "∞" },
              ].map((stat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                  key={stat.label} 
                  className="cinematic-box p-6 flex flex-col items-center text-center justify-center group transition-colors"
                >
                  <p className="font-display text-3xl font-light text-text dark:text-white group-hover:text-gold transition-colors duration-300">{stat.value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted mt-3 group-hover:text-gold-dim transition-colors">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
