// lib/staticProjects.ts
// Static projects data — no database required

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "ROBOTICS" | "EMBEDDED" | "SOFTWARE" | "CREATIVE" | "WEB";
  techStack: string[];
  featured: boolean;
  githubUrl?: string;
  demoUrl?: string;
  coverImage?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "racing-bot",
    title: "Manual Racing Bot",
    tagline: "High-speed RC obstacle covering rover.",
    description: "Built a compact racing robot using RF communication remote and DC brushed motors",
    category: "ROBOTICS",
    techStack: ["Arduino", "C++", "PID Control", "Electronics"],
    featured: true,
    githubUrl: "https://github.com",
  },
  {
    id: "2",
    slug: "iot-weather",
    title: "IoT Weather Station",
    tagline: "Real-time environmental monitoring with cloud sync.",
    description: "ESP8266-based weather station with cloud storage.",
    category: "EMBEDDED",
    techStack: ["ESP8266", "Arduino", "IoT", "MQTT"],
    featured: true,
    demoUrl: "https://example.com",
  },
  {
    id: "3",
    slug: "web-portfolio",
    title: "Portfolio Website",
    tagline: "Full-stack portfolio with animations and dark theme.",
    description: "Modern portfolio built with Next.js and Tailwind CSS.",
    category: "WEB",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    featured: true,
    githubUrl: "https://github.com",
  },
  {
    id: "4",
    slug: "python-automation",
    title: "Data Processing Pipeline",
    tagline: "Automated ETL pipeline for CSV/JSON processing.",
    description: "Python automation tool for data transformation.",
    category: "SOFTWARE",
    techStack: ["Python", "Pandas", "PostgreSQL", "Automation"],
    featured: false,
  },
];

export async function getFeaturedProjects(): Promise<Project[]> {
  return PROJECTS.filter((p) => p.featured).sort((a, b) => a.id.localeCompare(b.id));
}

export async function getAllProjects(): Promise<Project[]> {
  return PROJECTS.sort((a, b) => a.id.localeCompare(b.id));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

export async function getProjectsByCategory(category: Project["category"]): Promise<Project[]> {
  return PROJECTS.filter((p) => p.category === category).sort((a, b) => a.id.localeCompare(b.id));
}
