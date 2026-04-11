"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const rafId = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let isScrolling = false;
    let idleTimer: ReturnType<typeof setTimeout>;

    function raf(time: number) {
      lenis.raf(time);
      if (isScrolling) {
        rafId.current = requestAnimationFrame(raf);
      }
    }

    function startRaf() {
      if (!isScrolling) {
        isScrolling = true;
        rafId.current = requestAnimationFrame(raf);
      }
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isScrolling = false;
      }, 150);
    }

    // Start RAF on any scroll-triggering event
    window.addEventListener("wheel", startRaf, { passive: true });
    window.addEventListener("touchmove", startRaf, { passive: true });
    window.addEventListener("keydown", (e) => {
      if (
        ["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown"].includes(e.key)
      ) {
        startRaf();
      }
    });

    // Initial kick to handle programmatic scrolls
    startRaf();

    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(idleTimer);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
