// tailwind.config.ts
// Custom design system — Elegant Cinematic Minimalism

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ── Custom Fonts ─────────────────────────────────────────────────────────
      fontFamily: {
        display: ["'Outfit'", "system-ui", "sans-serif"],
        sans: ["'Space Grotesk'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
      },

      // ── Color Palette ────────────────────────────────────────────────────────
      colors: {
        // Theme Colors mapped from CSS variables
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        border: "var(--color-border)",
        "border-dim": "var(--color-border-dim)",
        text: "var(--color-text)",
        "text-dim": "var(--color-text-dim)",
        "text-muted": "var(--color-text-muted)",
        
        // Base — Obsidian Blacks (kept for hardcoded components)
        ink: {
          950: "#030303", 
          900: "#080808",
          800: "#111111",
          700: "#1a1a1a",
          600: "#262626",
          500: "#333333",
          400: "#555555",
          300: "#777777",
          200: "#999999",
          100: "#dddddd",
          50:  "#f2f2f2",
        },
        // Accent — Cinematic Gold
        gold: {
          DEFAULT: "var(--color-gold)",
          dim:     "var(--color-gold-dim)",
          faint:   "rgba(204, 170, 44, 0.15)", /* Soft hover accent */
          bright:  "var(--color-gold-bright)",
        },
        // Secondary
        sand: {
          DEFAULT: "#e8dfd5",
          muted: "rgba(232, 223, 213, 0.5)",
        }
      },

      // ── Typography Scale ─────────────────────────────────────────────────────
      fontSize: {
        "2xs": ["0.65rem",  { lineHeight: "1rem", letterSpacing: "0.05em" }],
        xs:    ["0.75rem",  { lineHeight: "1.125rem", letterSpacing: "0.02em" }],
        sm:    ["0.875rem", { lineHeight: "1.375rem" }],
        base:  ["1rem",     { lineHeight: "1.6rem" }],
        lg:    ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
        xl:    ["1.25rem",  { lineHeight: "1.875rem", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem",   { lineHeight: "2rem", letterSpacing: "-0.02em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }],
        "4xl": ["2.25rem",  { lineHeight: "2.6rem", letterSpacing: "-0.03em" }],
        "5xl": ["3rem",     { lineHeight: "3.25rem", letterSpacing: "-0.03em" }],
        "6xl": ["3.75rem",  { lineHeight: "1.1", letterSpacing: "-0.04em" }],
        "7xl": ["4.5rem",   { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "8xl": ["6rem",     { lineHeight: "1", letterSpacing: "-0.05em" }],
        "9xl": ["8rem",     { lineHeight: "0.95", letterSpacing: "-0.05em" }],
      },

      // ── Animation ────────────────────────────────────────────────────────────
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },

      // ── Custom Keyframes ─────────────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scan-line": {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        "fade-up":   "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in":   "fade-in 0.6s ease-out both",
        "scan-line": "scan-line 6s linear infinite",
      },

      // ── Border Radius ────────────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
