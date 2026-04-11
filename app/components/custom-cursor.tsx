"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

function isInteractive(target: HTMLElement): boolean {
  return !!(
    target.closest("a") ||
    target.closest("button") ||
    target.closest("[data-cursor='pointer']")
  );
}

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const rafId = useRef<number>(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const needsUpdate = useRef(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 40 });

  const updateCursor = useCallback(() => {
    if (needsUpdate.current) {
      cursorX.set(mousePos.current.x);
      cursorY.set(mousePos.current.y);
      needsUpdate.current = false;
    }
    rafId.current = requestAnimationFrame(updateCursor);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      needsUpdate.current = true;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      if (isInteractive(e.target as HTMLElement)) setIsHovering(true);
    };

    const onMouseOut = (e: MouseEvent) => {
      if (isInteractive(e.target as HTMLElement)) setIsHovering(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", () =>
      setIsVisible(false)
    );
    document.documentElement.addEventListener("mouseenter", () =>
      setIsVisible(true)
    );

    rafId.current = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [updateCursor, isVisible]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{ x: cursorX, y: cursorY }}
    >
      <motion.div
        className="rounded-full bg-foreground"
        animate={{
          width: isHovering ? 48 : 12,
          height: isHovering ? 48 : 12,
          x: isHovering ? -24 : -6,
          y: isHovering ? -24 : -6,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </motion.div>
  );
}
