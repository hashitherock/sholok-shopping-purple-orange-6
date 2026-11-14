import { categoryIconPaths } from "@/data/categoryIconPaths";

export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  return <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{(categoryIconPaths[slug] ?? []).map((d, i) => <path d={d} key={i} />)}</svg>;
}