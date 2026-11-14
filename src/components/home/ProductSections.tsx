import { Sparkles, TrendingUp } from "lucide-react";
import { getCollection } from "@/utils/productFilters";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useRecommendations } from "@/hooks/useShop";

export function TrendingItems() {
  return (
    <section className="container-shop mt-12">
      <SectionHeading
        title="TRENDING ITEMS"
        description="Most-loved picks based on what shoppers are buying this week."
        icon={<TrendingUp className="size-6 text-primary" aria-hidden />}
        viewAll="trending"
        viewAllLabel="View All Products"
      />
      <ProductGrid products={getCollection("trending").slice(0, 6)} />
    </section>
  );
}

export function MoreToLove() {
  const { products, basedOn, ready } = useRecommendations(18);
  return (
    <section className="container-shop mt-12" aria-labelledby="more-to-love">
      <SectionHeading
        title="MORE TO LOVE"
        icon={<Sparkles className="size-6 text-primary" aria-hidden />}
        description={basedOn ? `Because you searched for “${basedOn}”` : "Handpicked for you — refreshed every new visit."}
        viewAll="all"
        viewAllLabel="Explore All"
      />
      <div className={ready ? "" : "opacity-0"}>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
