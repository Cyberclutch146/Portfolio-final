"use client";
// components/sections/HeroSection.tsx
// Full-viewport hero — Elegant Cinematic Muted Gold Aesthetic

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ProfileCard from "@/components/animations/ProfileCard";
import DecryptedText from "@/components/animations/DecryptedText";
import dynamic from "next/dynamic";

const Threads = dynamic(() => import("@/components/animations/Threads"), { ssr: false });

// ── Typing animation strings ──────────────────────────────────────────────────
const ROLES = [
  "architects digital dimensions.",
  "engineers cybernetic systems.",
  "forges scalable futures.",
  "breathes life into code.",
  "bends hardware to his will.",
];

// ── Animated cursor ───────────────────────────────────────────────────────────
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
      }, 55);
    } else if (!deleting && displayed.length === current.length) {
      // Pause before deleting
      timeoutRef.current = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && displayed.length > 0) {
      // Delete
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 25);
    } else if (deleting && displayed.length === 0) {
      // Move to next role
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="text-gradient font-light">
      {displayed}
      <AnimatePresence>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="inline-block w-[3px] h-[36px] lg:h-[48px] ml-1 bg-gold align-middle"
        />
      </AnimatePresence>
    </span>
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
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] lg:min-h-screen flex items-center overflow-hidden bg-background transition-colors duration-500"
    >
      {/* ── Threads OGL Background ── */}
      <div className="absolute inset-0 z-0 mix-blend-screen opacity-90 overflow-hidden hidden md:block" aria-hidden="true">
        {mounted && (
          <Threads 
            color={[0.85, 0.65, 0.15]}
            amplitude={1.2}
            distance={0.1}
            yOffset={0.5}
            enableMouseInteraction={true}
          />
        )}
      </div>

      <div className="section-container relative z-10 w-full pt-28 pb-16 lg:pt-32 lg:pb-20 flex flex-col lg:flex-row justify-between items-center gap-10">
        {mounted && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-4xl relative z-10 lg:w-[60%] flex-shrink-0"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants} className="mb-10">
              <div className="inline-flex items-center gap-3 px-1 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                </span>
                <span className="font-mono text-2xs text-text-dim tracking-[0.2em] uppercase font-light">
                  Initiating connection
                </span>
                <span className="w-8 h-px bg-border block ml-2"></span>
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] mb-6 tracking-tight text-text"
            >
              <div className="block opacity-90 pb-2">
                <DecryptedText text="Swagata" animateOn="view" speed={120} maxIterations={30} sequential={true} />
              </div>
              <div className="block opacity-60">
                <DecryptedText text="Ganguly" animateOn="view" speed={160} maxIterations={40} sequential={true} className="text-text-muted" />
              </div>
              <span className="block mt-6 text-3xl sm:text-4xl lg:text-5xl font-light tracking-normal h-[60px] lg:h-[70px]">
                {/* Typing animation */}
                <TypingText />
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-white text-base sm:text-lg leading-relaxed font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            >
              Bridging bare-metal hardware and scalable software architectures. I forge intelligent systems logic inside high-performance, aesthetic interfaces.
            </motion.p>

            {/* CTA row */}
            <motion.div
              variants={itemVariants}
              className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
            >
              <Link href="/#projects" className="btn-primary group w-full sm:w-auto justify-center">
                <span>View Projects</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform group-hover:translate-x-1">
                  <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/#contact" className="btn-ghost group w-full sm:w-auto justify-center">
                <span>Contact</span>
              </Link>
            </motion.div>

            {/* Prominent Tech Stack */}
            <motion.div variants={itemVariants} className="mt-14">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-gold block shadow-[0_0_10px_rgba(204,170,44,0.5)]"></span>
                <h3 className="font-display text-xl sm:text-2xl text-gold tracking-[0.2em] uppercase shadow-gold text-shadow-sm font-medium">
                  Core Capabilities
                </h3>
              </div>
              <div className="flex flex-wrap gap-3 max-w-2xl">
                {[
                  "C / C++", "Next.js", "Python", "ROS",
                  "TypeScript", "Embedded Sys", "React", "Figma",
                ].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 sm:px-5 py-2.5 bg-surface/40 backdrop-blur-md border border-border text-white font-mono text-xs sm:text-sm tracking-widest uppercase hover:border-gold hover:text-gold hover:bg-gold/5 hover:scale-105 transition-all duration-300 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ── Profile Card ── */}
        <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[800px] lg:w-[40%] flex justify-center items-center pointer-events-auto mt-12 lg:-mt-16 z-20">
          {mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              <ProfileCard
                name="Swagata Ganguly"
                title="Aspiring Software Engineer"
                handle="Zenether"
                status="Online"
                contactText="Message Me"
                onContactClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                avatarUrl="/IMG_20241031_180055789_HDR_PORTRAIT~2.jpg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowColor="rgba(204, 170, 44, 0.6)" // Gold glow mapping
                iconUrl=""
                behindGlowEnabled={true}
                innerGradient="linear-gradient(145deg, rgba(8,8,8,0.85) 0%, rgba(204,170,44,0.1) 100%)"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 pointer-events-none"
        aria-hidden
      >
        <div className="w-px h-16 bg-gradient-to-b from-border to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-[40%] bg-gold-dim"
            animate={{ top: ["-40%", "100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

