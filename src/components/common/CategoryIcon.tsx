import { createElement } from "react";
import { categoryIconElements } from "@/data/categoryIconPaths";

export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  return <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{(categoryIconElements[slug] ?? []).map((element, i) => createElement(element.tag, { ...element.attrs, key: i }))}</svg>;
}