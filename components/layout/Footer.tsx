// components/layout/Footer.tsx
// Minimal footer with social links and a location indicator
"use client";
import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/swagata-ganguly" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/swagata-ganguly-453aa6327/" },
  { label: "Email", href: "mailto:sagotogdg@gmail.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 mt-32">
      <div className="section-container py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col items-start">
            <button
              onClick={() => {
                document.body.style.transition = "transform 2s ease-in-out";
                document.body.style.transform = "rotate(360deg)";
                setTimeout(() => {
                  document.body.style.transition = "";
                  document.body.style.transform = "";
                }, 2000);
              }}
              className="mb-8 font-mono text-[9px] tracking-[0.3em] font-bold text-red-500/50 border border-red-500/30 px-3 py-1 rounded hover:bg-red-500/10 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all animate-pulse"
            >
              DO NOT PRESS
            </button>
            <p className="font-display font-semibold text-ink-200 text-sm mb-1">
              Swagata Ganguly
            </p>
            <p className="label-mono">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-circuit mr-1.5 relative">
                <span className="absolute inset-0 rounded-full bg-circuit animate-ping opacity-60" />
              </span>
              West Bengal, India
            </p>
          </div>

          {/* Center — Social links */}
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-mono text-xs text-ink-400 hover:text-ink-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <p className="label-mono">
            © {year} — all systems go
          </p>
        </div>
      </div>
    </footer>
  );
}
