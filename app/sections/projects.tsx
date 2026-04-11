"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/app/components/section-reveal";
import { ProjectCard } from "@/app/components/project-card";
import dynamic from "next/dynamic";
import projectsData from "@/data/projects.json";

const ProjectModal = dynamic(
  () =>
    import("@/app/components/project-modal").then((mod) => mod.ProjectModal),
  { ssr: false }
);

interface Project {
  name: string;
  tag: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  details: string;
}

const projects: Project[] = projectsData;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Projects
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Selected work
          </h2>
          <p className="mt-4 max-w-lg text-base text-muted-foreground">
            Production-grade systems spanning AI inference, event-driven
            architectures, and full-stack applications.
          </p>
        </SectionReveal>

        {/* Asymmetric grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          {/* First project — spans full width */}
          <motion.div variants={staggerChild} className="md:col-span-2">
            <ProjectCard
              project={projects[0]}
              onClick={() => openProject(projects[0])}
            />
          </motion.div>

          {/* Remaining projects — 2 columns */}
          {projects.slice(1).map((project) => (
            <motion.div key={project.name} variants={staggerChild}>
              <ProjectCard
                project={project}
                onClick={() => openProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
