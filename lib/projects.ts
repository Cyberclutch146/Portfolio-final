// lib/projects.ts
// Data access functions for projects — thin wrappers around Prisma queries
// Centralise all DB logic here so components stay clean

import { prisma } from "./prisma";
import type { Project } from "@prisma/client";

// ── Get featured projects for homepage ────────────────────────────────────────
export async function getFeaturedProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
  });
}

// ── Get all projects ──────────────────────────────────────────────────────────
export async function getAllProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    orderBy: { order: "asc" },
  });
}

// ── Get single project by slug ────────────────────────────────────────────────
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return prisma.project.findUnique({
    where: { slug },
  });
}

// ── Get projects by category ──────────────────────────────────────────────────
export async function getProjectsByCategory(
  category: Project["category"]
): Promise<Project[]> {
  return prisma.project.findMany({
    where: { category },
    orderBy: { order: "asc" },
  });
}
