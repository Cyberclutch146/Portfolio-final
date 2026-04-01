"use client";
// components/sections/HeroSection.tsx
// Full-viewport hero — technical, confident, ECE-identity

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LetterGlitch from "@/components/animations/LetterGlitch";

// ── Typing animation strings ──────────────────────────────────────────────────
const ROLES = [
  "develops full stack projects.",
  "designs circuits.",
  "ships scalable code.",
  "survives on caffeine and hope.",
  "makes things work.",
];

// ── Animated terminal cursor ──────────────────────────────────────────────────
function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (!deleting && displayed.length < current.length) {
      // Type forward
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 65);
    } else if (!deleting && displayed.length === current.length) {
      // Pause before deleting
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      // Delete
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 35);
    } else if (deleting && displayed.length === 0) {
      // Move to next role
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="text-signal">
      {displayed}
      <span className="animate-blink">_</span>
    </span>
  );
}

// ── Coordinate label for decorative grid ─────────────────────────────────────
function CoordLabel({ x, y, value }: { x: number; y: number; value: string }) {
  return (
    <div
      className="absolute font-mono text-2xs text-ink-700 select-none pointer-events-none"
      style={{ left: x, top: y }}
    >
      {value}
    </div>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* ── Background — glitch + grid + gradient ── */}
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-screen pointer-events-none">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>
      <div className="absolute inset-0 grid-bg opacity-40 mix-blend-overlay" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(232,185,74,0.06) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* ── Decorative coordinate labels ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <CoordLabel x={24}  y={80}  value="0,0" />
        <CoordLabel x={24}  y={140} value="12,0" />
        <CoordLabel x={24}  y={200} value="24,0" />
        <CoordLabel x={24}  y={260} value="36,0" />
      </div>

      {/* ── Main content ── */}
      <div className="section-container relative z-10 w-full py-20">
        {mounted && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
          {/* Status badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ink-700 bg-ink-900/50">
              <div className="relative w-1.5 h-1.5">
                <div className="absolute inset-0 rounded-full bg-circuit" />
                <div className="absolute inset-0 rounded-full bg-circuit animate-ping" style={{ animationDuration: "2s" }} />
              </div>
              <span className="font-mono text-2xs text-ink-400 tracking-widest uppercase">
                B.Tech ECE · Available for projects
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] mb-6"
          >
            <span className="block text-ink-50">Swagata</span>
            <span className="block text-ink-50">Ganguly</span>
            <span className="block mt-2 text-ink-400 text-4xl sm:text-5xl lg:text-6xl font-light">
              {/* Typing animation */}
              <TypingText />
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-xl text-ink-300 text-lg leading-relaxed"
          >
            Electronics & Communication Engineering student at heart, systems
            builder by nature. I work at the intersection of{" "}
            <span className="text-signal font-medium">hardware</span> and{" "}
            <span className="text-circuit font-medium">software</span> — from
            bare-metal firmware to full-stack web.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-4 items-center"
          >
            <Link href="/#projects" className="btn-primary">
              <span>view my work</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/#contact" className="btn-ghost">
              <span>get in touch</span>
            </Link>
          </motion.div>

          {/* Tech stack quick list */}
          <motion.div variants={itemVariants} className="mt-14">
            <p className="label-mono mb-3">primary stack</p>
            <div className="flex flex-wrap gap-2">
              {[
                "C / C++", "Arduino", "Python", "Java",
                "JavaScript", "ESP8266", "Linux", "Figma",
              ].map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
        )}

        {/* ── Decorative right column (desktop only) ── */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block select-none pointer-events-none"
          aria-hidden
        >
          <div className="relative w-72 h-72">
            {/* Concentric circles */}
            {[270, 210, 150, 90, 40].map((r, i) => (
              <div
                key={r}
                className="absolute rounded-full border border-ink-800"
                style={{
                  width: r,
                  height: r,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0.3 + i * 0.1,
                }}
              />
            ))}
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
            {/* Crosshair lines */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-ink-800 opacity-50" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-ink-800 opacity-50" />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="label-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-ink-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
