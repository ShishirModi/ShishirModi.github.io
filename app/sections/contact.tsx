"use client";

import { Github, Linkedin, Mail, CheckCircle } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { GlassCard } from "@/app/components/glass-card";
import { SectionReveal } from "@/app/components/section-reveal";
import { motion } from "framer-motion";
import profile from "@/data/profile.json";

const socialLinks = [
  {
    label: "GitHub",
    href: profile.social.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: profile.social.linkedin,
    icon: Linkedin,
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
];

const formspreeId = "mnqokjng";

export function Contact() {
  const [state, handleSubmit] = useForm(formspreeId);

  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Left — Info */}
          <SectionReveal direction="left">
            <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Contact
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s build something together
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Have an interesting project or opportunity? I&apos;m always open to
              discussing new challenges in infrastructure, AI systems, and
              full-stack development.
            </p>

            {/* Social links */}
            <div className="mt-10 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border/40 bg-secondary/30 text-muted-foreground transition-all hover:border-border hover:bg-secondary/60 hover:text-foreground"
                  aria-label={link.label}
                  data-cursor="pointer"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </SectionReveal>

          {/* Right — Form */}
          <SectionReveal direction="right" delay={0.1}>
            <GlassCard>
              {state.succeeded ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
                  <h3 className="text-lg font-semibold">Message sent!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        className="bg-background/50"
                      />
                      <ValidationError field="name" errors={state.errors} />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="bg-background/50"
                      />
                      <ValidationError field="email" errors={state.errors} />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      className="bg-background/50"
                    />
                    <ValidationError field="message" errors={state.errors} />
                  </div>

                  {/* Form-level error */}
                  {state.errors && Object.keys(state.errors).length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400"
                    >
                      Something went wrong. Please try again.
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={state.submitting}
                    size="lg"
                    className="w-full rounded-full sm:w-auto"
                    data-cursor="pointer"
                  >
                    {state.submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </GlassCard>
          </SectionReveal>
        </div>

        {/* Footer */}
        <div className="mt-24 border-t border-border/30 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </div>
      </div>
    </section>
  );
}
