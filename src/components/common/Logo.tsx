import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="SHOLOK home" className={cn("font-display text-[1.6rem] leading-none tracking-tight text-primary sm:text-3xl", className)}>
      SHOLOK
    </Link>
  );
}
