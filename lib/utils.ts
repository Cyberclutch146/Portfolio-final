// lib/utils.ts
// Shared utility functions

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ── Class name merger ─────────────────────────────────────────────────────────
// Merges Tailwind classes intelligently, resolving conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Format date to readable string ───────────────────────────────────────────
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(typeof date === "string" ? new Date(date) : date);
}

// ── Slugify a string ──────────────────────────────────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Truncate text ─────────────────────────────────────────────────────────────
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

// ── Delay helper (for animations/testing) ─────────────────────────────────────
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
