import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "@/components/common/CategoryIcon";

export function CategoryList({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  return (
    <ul className={cn("py-1.5", className)}>
      {categories.map((c) => (
        <li key={c.slug}>
          <Link
            to="/category/$slug"
            params={{ slug: c.slug }}
            onClick={onNavigate}
            className="group flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-primary-soft hover:text-primary"
            activeProps={{ className: "bg-primary-soft text-primary" }}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
              <CategoryIcon slug={c.slug} className="size-7" />
            </span>
            <span className="flex-1 truncate">{c.name}</span>
            <ChevronRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}
