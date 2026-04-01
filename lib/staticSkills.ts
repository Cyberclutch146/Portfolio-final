// lib/staticSkills.ts
// Static skills data — no database required

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: "LANGUAGES" | "HARDWARE" | "TOOLS" | "DESIGN" | "SOFT";
  icon?: string;
}

export const SKILLS: Skill[] = [
  // Languages
  { id: "1", name: "C / C++", level: 95, category: "LANGUAGES" },
  { id: "2", name: "Python", level: 90, category: "LANGUAGES" },
  { id: "3", name: "JavaScript / TypeScript", level: 85, category: "LANGUAGES" },
  { id: "4", name: "Java", level: 80, category: "LANGUAGES" },
  { id: "5", name: "SQL", level: 85, category: "LANGUAGES" },

  // Hardware
  { id: "6", name: "Arduino", level: 95, category: "HARDWARE" },
  { id: "7", name: "ESP8266 / ESP32", level: 90, category: "HARDWARE" },
  { id: "8", name: "Microcontroller Programming", level: 92, category: "HARDWARE" },
  { id: "9", name: "Circuit Design", level: 80, category: "HARDWARE" },
  { id: "10", name: "PCB Layout", level: 75, category: "HARDWARE" },

  // Tools
  { id: "11", name: "Git / GitHub", level: 90, category: "TOOLS" },
  { id: "12", name: "VS Code", level: 95, category: "TOOLS" },
  { id: "13", name: "Linux", level: 85, category: "TOOLS" },
  { id: "14", name: "Bash / Shell Scripting", level: 80, category: "TOOLS" },
  { id: "15", name: "Docker", level: 75, category: "TOOLS" },

  // Design
  { id: "16", name: "Figma", level: 85, category: "DESIGN" },
  { id: "17", name: "UI/UX Design", level: 80, category: "DESIGN" },
  { id: "18", name: "Motion Design", level: 85, category: "DESIGN" },

  // Soft
  { id: "19", name: "Problem Solving", level: 95, category: "SOFT" },
  { id: "20", name: "Technical Writing", level: 85, category: "SOFT" },
  { id: "21", name: "Mentoring", level: 80, category: "SOFT" },
];

export async function getAllSkills(): Promise<Skill[]> {
  return SKILLS.sort((a, b) => a.category.localeCompare(b.category));
}

export async function getSkillsByCategory(category: Skill["category"]): Promise<Skill[]> {
  return SKILLS.filter((s) => s.category === category).sort((a, b) => a.name.localeCompare(b.name));
}
