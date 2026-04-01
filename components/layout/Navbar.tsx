"use client";
// components/layout/Navbar.tsx
// Sticky glass navigation with scroll-aware state

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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

  // Detect scroll for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-ink-800"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <Link
            href="/"
            className="group flex items-center gap-2"
            aria-label="Swagata Ganguly — Home"
          >
            {/* Monogram mark */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded border border-signal/40 group-hover:border-signal/80 transition-colors duration-300" />
              <span
                className="font-display font-bold text-sm text-signal"
                aria-hidden
              >
                SG
              </span>
            </div>
            <span className="font-display font-semibold text-sm text-ink-200 group-hover:text-ink-50 transition-colors hidden sm:block">
              Swagata Ganguly
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
            {/* Resume CTA */}
            <a
              href="/resume/swagata-ganguly-resume.pdf"
              download
              className="btn-ghost text-xs py-2 px-4"
            >
              <span>resume</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M6 1v7M2 9l4 2 4-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-ink-300 hover:text-ink-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={cn("block h-px bg-current transition-all duration-300", mobileOpen && "rotate-45 translate-y-[7px]")} />
              <span className={cn("block h-px bg-current transition-opacity duration-300", mobileOpen && "opacity-0")} />
              <span className={cn("block h-px bg-current transition-all duration-300", mobileOpen && "-rotate-45 -translate-y-[9px]")} />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden glass border-t border-ink-800"
          >
            <div className="section-container py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-sm text-ink-300 hover:text-signal transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/resume/swagata-ganguly-resume.pdf"
                download
                className="font-mono text-sm text-ink-300 hover:text-signal transition-colors py-1"
              >
                resume ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
