import { useEffect, useState } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import { getCollection } from "@/utils/productFilters";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useRecommendations } from "@/hooks/useShop";
import { summerVegetable, isPromoActive } from "@/data/promotions";

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

export function SummerVegetableBanner() {
  const [active, setActive] = useState<boolean | null>(null);
  useEffect(() => setActive(isPromoActive(summerVegetable)), []);
  if (active === false) return null;
  const b = summerVegetable;
  return (
    <section className="container-shop mt-12" aria-label={b.title}>
      <div className="relative overflow-hidden rounded-2xl bg-fresh-soft">
        <img src={b.image} alt="Fresh tomatoes, broccoli, carrots and peppers" width={1600} height={608} loading="lazy" className="absolute inset-0 size-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-fresh-soft via-fresh-soft/80 to-transparent md:via-fresh-soft/30" />
        <div className="relative flex min-h-[220px] max-w-xl flex-col justify-center gap-3 p-6 sm:min-h-[300px] sm:p-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-fresh">Fresh from the farm</p>
          <h2 className="font-display text-3xl leading-none text-primary sm:text-5xl">{b.title}</h2>
          {active && <p className="text-lg font-extrabold text-foreground sm:text-2xl">Save up to <span className="text-sale">5% OFF</span></p>}
          <p className="hidden max-w-sm text-sm text-muted-foreground sm:block">{b.description}</p>
          <a href={b.href} className="mt-1 w-fit rounded-lg bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-lift hover:bg-primary-deep">{b.cta}</a>
        </div>
      </div>
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
      <p className="mt-4 text-center text-[11px] text-muted-foreground">
        Demo personalisation: based only on searches made in this browser tab. Nothing is tracked or stored on a server.
      </p>
    </section>
  );
}
