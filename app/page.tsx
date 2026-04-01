// app/page.tsx
// Homepage — composed of section components

import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AboutSection from "@/components/sections/AboutSection";
import CoreValuesSection from "@/components/sections/CoreValuesSection";
import ContactSection from "@/components/sections/ContactSection";
import { getFeaturedProjects } from "@/lib/projects";
import { getAllSkills } from "@/lib/skills";

export default async function HomePage() {
  // Fetch data server-side
  const [featuredProjects, skills] = await Promise.all([
    getFeaturedProjects(),
    getAllSkills(),
  ]);

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Featured Projects ── */}
      <ProjectsSection projects={featuredProjects} />

      {/* ── Skills ── */}
      <SkillsSection skills={skills} />
      {/* ── Core Values ── */}
      <CoreValuesSection />

      {/* ── About ── */}
      <AboutSection />

      {/* ── Contact ── */}
      <ContactSection />
    </>
  );
}
