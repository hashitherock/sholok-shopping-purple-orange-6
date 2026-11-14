import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { PackageSearch } from "lucide-react";

export function ProductGrid({ products, showStock, emptyText = "No products found." }: { products: Product[]; showStock?: boolean | undefined; emptyText?: string | undefined }) {
  if (!products.length)
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card py-16 text-center">
        <PackageSearch className="size-10 text-primary" aria-hidden />
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      </div>
    );
  return (
    <ul className="product-grid">
      {products.map((p) => (
        <li key={p.id} className="min-w-0">
          <ProductCard product={p} showStock={showStock} />
        </li>
      ))}
    </ul>
  );
}
