// lib/skills.ts
// Data access functions for skills

import { prisma } from "./prisma";
import type { Skill } from "@prisma/client";

// ── Get all skills ordered by category sort ───────────────────────────────────
export async function getAllSkills(): Promise<Skill[]> {
  return prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });
}

// ── Get skills by category ────────────────────────────────────────────────────
export async function getSkillsByCategory(
  category: Skill["category"]
): Promise<Skill[]> {
  return prisma.skill.findMany({
    where: { category },
    orderBy: { order: "asc" },
  });
}
