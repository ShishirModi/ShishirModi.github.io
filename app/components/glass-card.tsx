import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/30 bg-card/60 p-6 backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  );
}
