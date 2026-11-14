import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { searchProducts } from "@/utils/productFilters";
import { ListingPage } from "@/components/product/ListingPage";
import { useShop } from "@/context/ShopProvider";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s["q"] === "string" ? s["q"] : "" }),
  head: () => ({
    meta: [
      { title: "Search — SHOLOK Shopping" },
      { name: "description", content: "Search SHOLOK products by name, category or brand." },
      { property: "og:title", content: "Search — SHOLOK Shopping" },
      { property: "og:description", content: "Find products at SHOLOK." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const { recordSearch, hydrated } = useShop();
  useEffect(() => { if (hydrated && q) recordSearch(q); }, [q, hydrated, recordSearch]);
  return <ListingPage key={q} title={q ? `Results for “${q}”` : "Search"} products={searchProducts(q)} emptyText={q ? `No products match “${q}”. Try another word, a brand or a category.` : "Type something in the search bar to find products."} />;
}
