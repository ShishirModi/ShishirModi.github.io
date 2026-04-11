"use client";

import { cn } from "@/lib/utils";

interface GradientBlobProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-[300px] h-[300px]",
  md: "w-[500px] h-[500px]",
  lg: "w-[700px] h-[700px]",
};

export function GradientBlob({ className, size = "md" }: GradientBlobProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full opacity-30 blur-[100px] dark:opacity-20",
        sizeMap[size],
        className
      )}
      style={{
        background:
          "radial-gradient(circle, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 50%, transparent 70%)",
        animation: "blob-float 20s ease-in-out infinite",
      }}
    />
  );
}
