import type { Product } from "@/types/product";
import { categories } from "@/data/categories";
import { scoreProduct } from "./productFilters";

/** Deterministic PRNG so the order stays stable for a given session seed. */
export function seededRandom(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return ((s >>> 0) % 1_000_000) / 1_000_000;
  };
}

export function shuffle<T>(list: T[], seed: number): T[] {
  const rnd = seededRandom(seed);
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = a[i]!; a[i] = a[j]!; a[j] = t;
  }
  return a;
}

/**
 * Priority: 1) latest search query  2) relevant products  3) related categories  4) general fallback.
 * Only in-stock products, no duplicates. Order within each tier is shuffled with the session seed.
 */
export function getRecommendations(all: Product[], latestQuery: string | undefined, seed: number, limit = 18): Product[] {
  const available = all.filter((p) => p.stock > 0);
  if (!latestQuery) return shuffle(available, seed).slice(0, limit);

  const relevant = available.filter((p) => scoreProduct(p, latestQuery) > 0);
  const relevantCats = new Set(relevant.map((p) => p.category));
  const relatedCats = new Set(
    [...relevantCats].flatMap((c) => categories.find((x) => x.slug === c)?.related ?? []),
  );
  const used = new Set(relevant.map((p) => p.id));
  const related = available.filter((p) => !used.has(p.id) && (relevantCats.has(p.category) || relatedCats.has(p.category)));
  related.forEach((p) => used.add(p.id));
  const rest = available.filter((p) => !used.has(p.id));

  return [...shuffle(relevant, seed), ...shuffle(related, seed + 1), ...shuffle(rest, seed + 2)].slice(0, limit);
}
