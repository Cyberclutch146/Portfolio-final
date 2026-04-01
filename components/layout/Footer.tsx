// components/layout/Footer.tsx
// Minimal footer with social links and a location indicator

import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com/swagata-ganguly" },
  { label: "LinkedIn", href: "https://linkedin.com/in/swagata-ganguly" },
  { label: "Email",    href: "mailto:contact@swagata.dev" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 mt-32">
      <div className="section-container py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Left */}
          <div>
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
