import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { CollectionKey } from "@/data/navigation";

export function SectionHeading({ title, description, icon, viewAll, viewAllLabel = "View All", extra }: {
  title: string;
  description?: string;
  icon?: ReactNode;
  viewAll?: CollectionKey;
  viewAllLabel?: string;
  extra?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            {icon}
            {title}
          </h2>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {extra}
      </div>
      {viewAll && (
        <Link to="/collection/$type" params={{ type: viewAll }} className="group inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
          {viewAllLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
    </div>
  );
}
