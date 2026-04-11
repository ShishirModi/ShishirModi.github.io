"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";
import { TechBadge } from "./tech-badge";
import { Button } from "@/app/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";

interface Project {
  name: string;
  tag: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  details: string;
}

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto border-border/30 bg-card/95 backdrop-blur-xl sm:max-w-2xl">
        <DialogHeader>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {project.tag}
          </span>
          <DialogTitle className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {project.name}
          </DialogTitle>
          <DialogDescription className="mt-2 text-base leading-relaxed">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-2" />

        {/* Tech Stack */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground/70">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <TechBadge key={t} tech={t} />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground/70">
            Details
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.details}
          </p>
        </div>

        {/* Image placeholder */}
        <div className="overflow-hidden rounded-lg border border-border/30 bg-muted/30">
          <div className="flex aspect-video items-center justify-center text-sm text-muted-foreground">
            Project visual placeholder
          </div>
        </div>

        {/* Links */}
        {(project.github || project.live) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {project.github && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-full"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Source Code
                </a>
              </Button>
            )}
            {project.live && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-full"
              >
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
