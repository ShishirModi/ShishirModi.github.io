"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";
import { TechBadge } from "./tech-badge";
import { cn } from "@/lib/utils";

interface Project {
  name: string;
  tag: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  details: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  className?: string;
}

export function ProjectCard({ project, onClick, className }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={cn("group", className)}
      data-cursor="pointer"
    >
      <GlassCard className="h-full transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-primary/5">
        {/* Tag */}
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {project.tag}
        </span>

        {/* Title */}
        <h3 className="mt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
          {project.name}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => (
            <TechBadge key={t} tech={t} className="text-[10px]" />
          ))}
          {project.tech.length > 5 && (
            <span className="inline-flex items-center rounded-full border border-border/30 px-2 py-0.5 text-[10px] text-muted-foreground">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        {/* View prompt */}
        <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          <span>View details</span>
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            &rarr;
          </motion.span>
        </div>
      </GlassCard>
    </motion.div>
  );
}
