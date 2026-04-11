"use client";

import Image from "next/image";
import { SectionReveal } from "@/app/components/section-reveal";
import { TechBadge } from "@/app/components/tech-badge";
import profile from "@/data/profile.json";

const skillCategories = [
  {
    label: "Infrastructure",
    skills: [
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "NGINX",
      "Linux",
      "AWS/GCP",
    ],
  },
  {
    label: "Observability",
    skills: ["Prometheus", "Grafana", "Structured Logging", "Locust"],
  },
  {
    label: "AI / MLOps",
    skills: ["PyTorch", "Stable Diffusion", "FastAPI", "GPU Optimisation"],
  },
  {
    label: "Languages",
    skills: ["Python", "Golang", "JavaScript", "TypeScript", "C/C++", "SQL"],
  },
  {
    label: "Full-Stack",
    skills: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "REST/OpenAPI",
    ],
  },
];

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Left — Photo */}
          <SectionReveal direction="left">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={profile.aboutImage}
                  alt={profile.name}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              {/* Decorative offset border */}
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-border/40" />
            </div>
          </SectionReveal>

          {/* Right — Content */}
          <div className="flex flex-col justify-center">
            <SectionReveal direction="right">
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                About
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Engineering reliability at scale
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {profile.bio}
              </p>
            </SectionReveal>

            {/* Skills */}
            <SectionReveal direction="up" delay={0.2}>
              <div className="mt-10 space-y-6">
                {skillCategories.map((category) => (
                  <div key={category.label}>
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                      {category.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <TechBadge key={skill} tech={skill} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
