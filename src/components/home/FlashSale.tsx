import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { flashSaleConfig, isPromoActive } from "@/data/promotions";
import { getCollection } from "@/utils/productFilters";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";

function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function Countdown({ ms }: { ms: number }) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const parts = [
    ["Days", Math.floor(s / 86400)],
    ["Hours", Math.floor((s % 86400) / 3600)],
    ["Mins", Math.floor((s % 3600) / 60)],
    ["Secs", s % 60],
  ] as const;
  return (
    <div className="flex items-center gap-1.5" role="timer" aria-label="Time left in flash sale">
      <span className="mr-1 text-xs font-semibold text-muted-foreground">Ends in</span>
      {parts.map(([label, v]) => (
        <span key={label} className="flex min-w-12 flex-col items-center rounded-lg bg-sale px-2 py-1 text-sale-foreground">
          <span className="text-base font-extrabold tabular-nums leading-5">{String(v).padStart(2, "0")}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider opacity-85">{label}</span>
        </span>
      ))}
    </div>
  );
}

export function FlashSale() {
  const now = useNow();
  if (now === null) return <section className="container-shop mt-12 min-h-[420px]" aria-hidden />;
  if (!isPromoActive(flashSaleConfig, now)) return null;
  const items = getCollection("flash-sale").slice(0, 6);
  if (!items.length) return null;
  return (
    <section className="container-shop mt-12" aria-labelledby="flash-sale-title">
      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
        <SectionHeading
          title={flashSaleConfig.title}
          icon={<span className="grid size-8 place-items-center rounded-lg bg-sale text-sale-foreground"><Zap className="size-4 fill-current" aria-hidden /></span>}
          extra={<Countdown ms={Date.parse(flashSaleConfig.endsAt) - now} />}
          viewAll="flash-sale"
        />
        <ProductGrid products={items} showStock />
      </div>
    </section>
  );
}
