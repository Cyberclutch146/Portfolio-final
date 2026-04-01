// app/projects/page.tsx
// All projects listing page with category filter

import type { Metadata } from "next";
import AllProjectsClient from "./AllProjectsClient";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "All projects by Swagata Ganguly — robotics, embedded systems, software, and creative work.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return <AllProjectsClient projects={projects} />;
}
