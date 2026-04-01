// types/index.ts
// Shared TypeScript types for the application

import type { Project, Skill, ContactMessage, ProjectCategory, SkillCategory } from "@prisma/client";

// ── Re-export Prisma types ────────────────────────────────────────────────────
export type { Project, Skill, ContactMessage, ProjectCategory, SkillCategory };

// ── Contact form input type ───────────────────────────────────────────────────
export interface ContactFormInput {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

// ── API response wrappers ─────────────────────────────────────────────────────
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
  details?: Record<string, string[]>;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ── Navigation ────────────────────────────────────────────────────────────────
export interface NavLink {
  href:  string;
  label: string;
}

// ── Skill category display metadata ──────────────────────────────────────────
export interface SkillCategoryMeta {
  label:       string;
  description: string;
}
