// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

type Phase = "SCAN" | "INTRO" | "WELCOME" | "REVEAL";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [phase, setPhase] = useState<Phase>("SCAN");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Phase timeline
    // SCAN:    0 → 3500ms
    const t1 = setTimeout(() => setPhase("INTRO"), 3500);
    // INTRO:   3500ms → 5500ms (2000ms window)
    const t2 = setTimeout(() => setPhase("WELCOME"), 5500);
    // WELCOME: 5500ms → 8800ms (3300ms window)
    const t3 = setTimeout(() => {
      setPhase("REVEAL");
      setTimeout(() => setIsFirstLoad(false), 800);
    }, 8800);

    // Emergency escape
    const escape = setTimeout(() => {
      setPhase("REVEAL");
      setIsFirstLoad(false);
    }, 12000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(escape);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {phase !== "REVEAL" && (
          <motion.div
            key="loading-overlay"
            className="fixed inset-0 z-[99999] bg-[#050505] overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          >
            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "128px 128px",
              }}
            />

            {/* Scan line phase */}
            <AnimatePresence>
              {phase === "SCAN" && (
                <motion.div
                  key="scan-line"
                  className="absolute left-0 right-0 h-[1px] z-20"
                  style={{ background: "linear-gradient(90deg, transparent 0%, #ccaa2c 40%, #f0d060 50%, #ccaa2c 60%, transparent 100%)" }}
                  initial={{ top: "-2px", opacity: 0 }}
                  animate={{ top: "102%", opacity: [0, 1, 1, 0.5] }}
                  transition={{ duration: 4.2, ease: [0.4, 0, 0.2, 1] }}
                />
              )}
            </AnimatePresence>

            {/* Decrypt text during scan */}
            <AnimatePresence>
              {phase === "SCAN" && (
                <motion.div
                  key="scan-decrypt"
                  className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-3 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.3 } }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <DecryptingLine text="SYSTEM BOOT" delay={0} />
                  <DecryptingLine text="LOADING SWAGATA GANGULY / PORTFOLIO" delay={200} />
                  <DecryptingLine text="ESTABLISHING SECURE CONNECTION" delay={450} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Corner crosshairs */}
            {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => {
              const isTop = corner.startsWith("top");
              const isLeft = corner.endsWith("left");
              return (
                <motion.div
                  key={corner}
                  className="absolute z-10 pointer-events-none"
                  style={{
                    top: isTop ? "24px" : "auto",
                    bottom: !isTop ? "24px" : "auto",
                    left: isLeft ? "24px" : "auto",
                    right: !isLeft ? "24px" : "auto",
                    width: "20px",
                    height: "20px",
                    borderTop: isTop ? "1px solid rgba(204,170,44,0.4)" : "none",
                    borderBottom: !isTop ? "1px solid rgba(204,170,44,0.4)" : "none",
                    borderLeft: isLeft ? "1px solid rgba(204,170,44,0.4)" : "none",
                    borderRight: !isLeft ? "1px solid rgba(204,170,44,0.4)" : "none",
                  }}
                  initial={{ opacity: 0, scale: 1.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                />
              );
            })}

            {/* Status indicator top-left */}
            <motion.div
              className="absolute top-6 left-16 z-10 flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#ccaa2c]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[10px] tracking-[0.2em] text-[#ccaa2c]/60 font-mono uppercase">
                Initializing
              </span>
            </motion.div>

            {/* Version tag top-right */}
            <motion.div
              className="absolute top-6 right-16 z-10"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <span className="text-[10px] tracking-[0.2em] text-[#ccaa2c]/40 font-mono uppercase">
                v2025
              </span>
            </motion.div>

            {/* Main content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-8">

              {/* INTRO PHASE — Name & title */}
              <AnimatePresence mode="wait">
                {(phase === "INTRO" || phase === "SCAN") && (
                  <motion.div
                    key="intro"
                    className="flex flex-col items-center gap-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -16, filter: "blur(8px)", transition: { duration: 0.35 } }}
                    transition={{ duration: 0.5, delay: phase === "SCAN" ? 10 : 0 }}
                  >
                    {/* Large initials / name */}
                    <div className="relative">
                      {/* Glow behind name */}
                      <div
                        className="absolute inset-0 blur-[60px] opacity-20 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse, #ccaa2c 0%, transparent 70%)" }}
                      />
                      <motion.h1
                        className="text-[clamp(90px,18vw,180px)] font-bold text-white leading-none tracking-tighter select-none"
                        style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", letterSpacing: "-0.04em" }}
                        initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      >
                        SG
                      </motion.h1>
                    </div>

                    {/* Divider line */}
                    <motion.div
                      className="h-[1px] bg-gradient-to-r from-transparent via-[#ccaa2c] to-transparent"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                      style={{ width: "120px", transformOrigin: "center" }}
                    />

                    {/* Subtitle */}
                    <motion.p
                      className="text-[13px] md:text-[18px] tracking-[0.35em] text-[#ccaa2c]/70 font-mono uppercase"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                    >
                      Design · Development · Motion
                    </motion.p>
                  </motion.div>
                )}

            {/* WELCOME PHASE */}
                {phase === "WELCOME" && (
                  <motion.div
                    key="welcome"
                    className="flex flex-col items-center gap-4 text-center"
                    initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.03, filter: "blur(10px)", transition: { duration: 0.45 } }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.p
                      className="text-[clamp(36px,8vw,76px)] font-light text-white leading-tight tracking-tight"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
                    >
                      welcome to my world
                    </motion.p>
                    <motion.div
                      className="h-[1px] bg-gradient-to-r from-transparent via-[#ccaa2c]/60 to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.25 }}
                      style={{ width: "100px", transformOrigin: "center" }}
                    />
                    <motion.p
                      className="text-[13px] md:text-[16px] tracking-[0.3em] text-[#ccaa2c]/50 font-mono uppercase"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      Swagata Ganguly
                    </motion.p>

                    {/* Mini loading bar */}
                    <motion.div
                      className="relative mt-2 overflow-hidden"
                      style={{ width: "80px", height: "2px", borderRadius: "1px", background: "rgba(255,255,255,0.06)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      <motion.div
                        className="absolute left-0 top-0 h-full"
                        style={{ background: "linear-gradient(90deg, #ccaa2c80, #f0d060, #ccaa2c80)" }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.6, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom progress bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ccaa2c]/60 via-[#f0d060] to-[#ccaa2c]/60"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 8.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </div>

            {/* Bottom label */}
            <motion.div
              className="absolute bottom-6 left-0 right-0 z-20 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <span className="text-[10px] tracking-[0.3em] text-white/20 font-mono uppercase">
                Portfolio 2025
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website content */}
      <div
        aria-hidden={phase !== "REVEAL"}
        className={phase !== "REVEAL" ? "h-screen overflow-hidden pointer-events-none" : ""}
      >
        {children}
      </div>
    </>
  );
}

// --- DecryptingLine sub-component ---
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

function DecryptingLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = React.useState(() =>
    text.split("").map(() => "-")
  );
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    const start = performance.now() + delay;
    const duration = 1800; // ms to fully decrypt
    const chars = text.split("");

    function tick(now: number) {
      if (cancelled) return;
      const elapsed = Math.max(0, now - start);
      const progress = Math.min(elapsed / duration, 1);
      const revealedCount = Math.floor(progress * chars.length);

      setDisplay(
        chars.map((char, i) => {
          if (char === " ") return " ";
          if (i < revealedCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    }

    // Wait for delay, then start
    const raf = requestAnimationFrame((now) => {
      if (now < start) {
        // Not time yet, poll
        const interval = setInterval(() => {
          const n = performance.now();
          if (n >= start) {
            clearInterval(interval);
            requestAnimationFrame(tick);
          }
        }, 16);
        return () => clearInterval(interval);
      } else {
        requestAnimationFrame(tick);
      }
    });

    return () => { cancelled = true; };
  }, [text, delay]);

  return (
    <div className="flex items-center gap-2">
      <span className="w-1 h-1 rounded-full bg-[#ccaa2c]/60 inline-block" />
      <span
        className="text-[13px] md:text-[16px] font-mono tracking-[0.25em] uppercase"
        style={{ color: done ? "rgba(204,170,44,0.8)" : "rgba(204,170,44,0.45)" }}
      >
        {display.join("")}
      </span>
    </div>
  );
}
