import type { Product } from "@/types/product";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import type { CollectionKey } from "@/data/navigation";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

/** Relevance score of a product for a query: name, category, brand, tags. 0 = no match. */
export function scoreProduct(p: Product, query: string): number {
  const q = norm(query);
  if (!q) return 0;
  const words = q.split(" ").filter((w) => w.length > 1);
  const cat = categories.find((c) => c.slug === p.category);
  const catName = norm(cat?.name ?? "");
  const name = norm(p.name);
  const brand = norm(p.brand);
  const tags = p.tags.map(norm);
  let score = 0;
  if (catName === q || catName.includes(q)) score += 6;
  if (name.includes(q)) score += 8;
  if (brand === q) score += 5;
  for (const w of words) {
    const stem = w.endsWith("s") && w.length > 3 ? w.slice(0, -1) : w;
    if (name.includes(stem)) score += 3;
    if (tags.some((t) => t.includes(stem))) score += 3;
    if (catName.includes(stem)) score += 2;
    if (brand.includes(stem)) score += 2;
  }
  return score;
}

export function searchProducts(query: string, list: Product[] = products): Product[] {
  return list
    .map((p) => ({ p, s: scoreProduct(p, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.p);
}

export type SortKey = "relevance" | "price-asc" | "price-desc" | "rating" | "popular" | "newest";

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const l = [...list];
  switch (sort) {
    case "price-asc": return l.sort((a, b) => a.price - b.price);
    case "price-desc": return l.sort((a, b) => b.price - a.price);
    case "rating": return l.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "popular": return l.sort((a, b) => b.sold - a.sold);
    case "newest": return l.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    default: return l;
  }
}

export interface Filters {
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
  maxPrice?: number;
}

export function filterProducts(list: Product[], f: Filters): Product[] {
  return list.filter(
    (p) =>
      (!f.inStockOnly || p.stock > 0) &&
      (!f.onSaleOnly || (p.regularPrice ?? 0) > p.price) &&
      (f.maxPrice === undefined || p.price <= f.maxPrice),
  );
}

export function getCollection(key: CollectionKey): Product[] {
  switch (key) {
    case "flash-sale": return products.filter((p) => p.flashSale && p.regularPrice);
    case "trending": return sortProducts(products, "popular").filter((p) => p.stock > 0).slice(0, 12);
    case "new-arrivals": return sortProducts(products, "newest").slice(0, 12);
    case "best-sellers": return sortProducts(products, "popular");
    default: return products;
  }
}
