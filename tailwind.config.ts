// tailwind.config.ts
// Custom design system — NOT the default Tailwind look
// Typography-first, dark-base, technical aesthetic

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
        // Display / headings — sharp, editorial
        display: ["'Syne'", "system-ui", "sans-serif"],
        // Body — clean, readable, slightly geometric
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        // Monospace — code, labels, tech specs
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
      },

      // ── Color Palette ────────────────────────────────────────────────────────
      colors: {
        // Base — near-black with slight warmth
        ink: {
          950: "#0a0a0b",
          900: "#111113",
          800: "#1a1a1e",
          700: "#242428",
          600: "#2e2e34",
          500: "#3d3d45",
          400: "#55555f",
          300: "#808090",
          200: "#a8a8b8",
          100: "#d0d0dc",
          50:  "#f0f0f5",
        },
        // Accent — a precise, technical amber-gold
        signal: {
          DEFAULT: "#e8b94a",
          dim:     "#c49832",
          bright:  "#f5d06a",
          muted:   "#e8b94a22",
        },
        // Secondary accent — cold electric teal
        circuit: {
          DEFAULT: "#3ecfcf",
          dim:     "#2ba8a8",
          muted:   "#3ecfcf15",
        },
      },

      // ── Typography Scale ─────────────────────────────────────────────────────
      fontSize: {
        "2xs": ["0.65rem",  { lineHeight: "1rem" }],
        xs:    ["0.75rem",  { lineHeight: "1.125rem" }],
        sm:    ["0.875rem", { lineHeight: "1.375rem" }],
        base:  ["1rem",     { lineHeight: "1.6rem" }],
        lg:    ["1.125rem", { lineHeight: "1.75rem" }],
        xl:    ["1.25rem",  { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem",   { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem",  { lineHeight: "2.6rem" }],
        "5xl": ["3rem",     { lineHeight: "3.25rem" }],
        "6xl": ["3.75rem",  { lineHeight: "1.1" }],
        "7xl": ["4.5rem",   { lineHeight: "1.05" }],
        "8xl": ["6rem",     { lineHeight: "1" }],
        "9xl": ["8rem",     { lineHeight: "0.95" }],
      },

      // ── Spacing ──────────────────────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem",
        "46": "11.5rem",
      },

      // ── Animation ────────────────────────────────────────────────────────────
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
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
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        "scan-line": {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        "fade-up":   "fade-up 0.5s ease-out both",
        "fade-in":   "fade-in 0.4s ease-out both",
        blink:       "blink 1s step-end infinite",
        "scan-line": "scan-line 4s linear infinite",
      },

      // ── Border Radius ────────────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ── Max Width ────────────────────────────────────────────────────────────
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
    },
  },
  plugins: [],
};

export default config;
