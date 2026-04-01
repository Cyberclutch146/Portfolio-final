"use client";
// components/layout/Navbar.tsx
// Elegant Cinematic HUD Navigation

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#projects",  label: "projects",  external: false },
  { href: "/#skills",    label: "skills",    external: false },
  { href: "/#about",     label: "about",     external: false },
  { href: "/#contact",   label: "contact",   external: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by rendering theme toggle only after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect scroll for HUD effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
      className={cn(
        "fixed top-6 left-1/2 z-50 w-[95%] sm:w-[85%] max-w-4xl transition-all duration-700",
        scrolled
          ? "border-b border-border bg-surface/80 backdrop-blur-md px-4 sm:px-8 py-2 shadow-2xl"
          : "border-b border-transparent bg-transparent px-2 sm:px-6 py-4 shadow-none"
      )}
    >
      <div className="w-full">
        <nav className="flex items-center justify-between h-12">
          {/* Logo / Name */}
          <Link
            href="/"
            className="group flex items-center gap-4 relative z-10"
            aria-label="Swagata Ganguly — Home"
          >
            {/* Minimal line mark */}
            <div className="relative w-8 h-8 flex items-center justify-center border border-border group-hover:border-gold-dim transition-all">
              <span className="font-display font-medium text-[11px] text-text-dim group-hover:text-gold transition-colors tracking-widest">
                SG
              </span>
              {/* Corner crosshairs */}
              <div className="absolute top-[-2px] left-[-2px] w-1.5 h-1.5 border-t border-l border-border group-hover:border-gold" />
              <div className="absolute bottom-[-2px] right-[-2px] w-1.5 h-1.5 border-b border-r border-border group-hover:border-gold" />
            </div>
            <span className="font-display font-light text-[14px] tracking-[0.2em] text-text group-hover:text-white transition-colors hidden sm:block uppercase">
              Swagata
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 relative z-10">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link text-xs">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4 relative z-10">
            {/* Resume CTA */}
            <a
              href="/Professional%20CV%20-%20Swagata%20Ganguly%20(1).pdf"
              download="Swagata_Ganguly_Resume.pdf"
              className="group flex items-center gap-2 text-[10px] font-mono font-normal tracking-[0.2em] uppercase text-text-dim hover:text-gold transition-colors py-2 px-4 border border-border hover:border-gold-dim bg-transparent"
            >
              <span>RESUME</span>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden className="group-hover:translate-y-[2px] transition-transform">
                <path d="M6 1v7M2 9l4 2 4-2" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"/>
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-4 relative z-10">
            <button
              className="p-2 text-text-muted hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-6 h-[10px] flex flex-col justify-between">
                <span className={cn("block h-[1px] w-full bg-current transition-all duration-300", mobileOpen && "rotate-45 translate-y-[4.5px]")} />
                <span className={cn("block h-[1px] w-full bg-current transition-all duration-300", mobileOpen && "-rotate-45 -translate-y-[4.5px]")} />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="md:hidden overflow-hidden w-full absolute top-[100%] left-0 right-0 bg-surface/95 backdrop-blur-xl border-b border-border shadow-2xl"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-light text-2xl tracking-widest text-text-dim hover:text-white transition-colors py-2 uppercase"
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px w-full bg-border my-6" />
              <a
                href="/Professional%20CV%20-%20Swagata%20Ganguly%20(1).pdf"
                download="Swagata_Ganguly_Resume.pdf"
                className="font-mono text-xs tracking-[0.2em] text-gold py-3 flex items-center justify-between transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <span>DOWNLOAD RESUME</span>
                <span className="font-serif">↓</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
