import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { filterProducts, sortProducts, type SortKey } from "@/utils/productFilters";
import { ProductGrid } from "./ProductGrid";

export function ListingPage({ title, description, products, emptyText, defaultSort = "relevance" }: { title: string; description?: string; products: Product[]; emptyText?: string | undefined; defaultSort?: SortKey }) {
  const [sort, setSort] = useState<SortKey>(defaultSort);
  const [inStockOnly, setInStock] = useState(false);
  const [onSaleOnly, setOnSale] = useState(false);
  const [brand, setBrand] = useState("");
  const brands = [...new Set(products.map((p) => p.brand))].sort();
  const list = useMemo(() => sortProducts(filterProducts(products.filter((p) => !brand || p.brand === brand), { inStockOnly, onSaleOnly }), sort), [products, sort, inStockOnly, onSaleOnly, brand]);
  return (
    <div className="container-shop py-8">
      <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      <div className="my-5 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface p-3 text-sm">
        <span className="font-semibold text-muted-foreground">{list.length} products</span>
        <label className="flex items-center gap-2"><input type="checkbox" checked={inStockOnly} onChange={(e) => setInStock(e.target.checked)} className="accent-primary" /> In stock</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={onSaleOnly} onChange={(e) => setOnSale(e.target.checked)} className="accent-primary" /> On sale</label>
        <label className="flex items-center gap-2">Brand<select value={brand} onChange={(e) => setBrand(e.target.value)} className="h-9 max-w-44 rounded-md border border-border bg-surface px-2"><option value="">All brands</option>{brands.map((b) => <option key={b}>{b}</option>)}</select></label>
        <label className="ml-auto flex items-center gap-2">
          <span className="text-muted-foreground">Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="h-9 rounded-lg border border-border bg-surface px-2">
            <option value="relevance">Relevance</option>
            <option value="popular">Most popular</option>
            <option value="newest">Newest</option>
            <option value="rating">Top rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </label>
      </div>
      <ProductGrid products={list} emptyText={emptyText} />
    </div>
  );
}
