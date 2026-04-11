import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  tech: string;
  className?: string;
}

export function TechBadge({ tech, className }: TechBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "border-border/40 bg-secondary/60 text-secondary-foreground backdrop-blur-sm",
        className
      )}
    >
      {tech}
    </Badge>
  );
}
