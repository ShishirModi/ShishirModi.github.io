"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { GradientBlob } from "@/app/components/gradient-blob";
import profile from "@/data/profile.json";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const scrollToWork = () => {
    document
      .querySelector("#projects")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document
      .querySelector("#contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Gradient blobs */}
      <GradientBlob className="-left-40 -top-40" size="lg" />
      <GradientBlob className="-right-20 top-1/3" size="md" />

      {/* Parallax background image */}
      <motion.div
        style={{ y: backgroundY, opacity: imageOpacity }}
        className="absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.07] dark:opacity-[0.04]"
          style={{ backgroundImage: `url(${profile.heroImage})` }}
        />
      </motion.div>

      <div className="mx-auto w-full max-w-6xl px-6 py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Greeting tag */}
          <motion.div variants={childVariants} className="mb-6">
            <span className="inline-block rounded-full border border-border/50 bg-secondary/40 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
              DevOps &middot; SRE &middot; AI Infrastructure
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={childVariants}
            className="font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {profile.name}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={childVariants}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {profile.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={childVariants}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              onClick={scrollToWork}
              className="group relative overflow-hidden rounded-full px-8"
              data-cursor="pointer"
            >
              <span className="relative z-10">View Work</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="rounded-full px-8"
              data-cursor="pointer"
            >
              Contact
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          style={{ animation: "bounce-subtle 2s ease-in-out infinite" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
