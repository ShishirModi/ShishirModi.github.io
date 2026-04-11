"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    html.classList.add("transitioning");
    const next = !isDark;
    if (next) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setTimeout(() => html.classList.remove("transitioning"), 400);
  };

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  return (
    <button
      onClick={toggle}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 backdrop-blur-sm transition-colors hover:bg-secondary"
      aria-label="Toggle theme"
      data-cursor="pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-5 w-5" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-5 w-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
