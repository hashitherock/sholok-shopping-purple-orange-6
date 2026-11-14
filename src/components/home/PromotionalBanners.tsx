import { ArrowRight } from "lucide-react";
import { promoBanners } from "@/data/promotions";

export function PromotionalBanners() {
  const banners = promoBanners.filter((b) => b.enabled);
  return (
    <section aria-label="Featured offers" className="container-shop mt-6">
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {banners.map((b) => (
          <li key={b.id}>
            <a href={b.href} className="group relative block aspect-[976/688] overflow-hidden rounded-2xl border border-border">
              <img src={b.image} alt="" width={976} height={688} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="relative flex h-full max-w-[58%] flex-col justify-center gap-1.5 p-5">
                {b.offer && <span className="w-fit rounded bg-sale px-2 py-0.5 text-[11px] font-extrabold text-sale-foreground">{b.offer}</span>}
                <h3 className="text-lg font-extrabold leading-tight text-foreground">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.description}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-primary">
                  {b.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
