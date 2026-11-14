import { useCallback, useEffect, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/promotions";
import { CategoryList } from "./CategoryList";
import { Link } from "@tanstack/react-router";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

function HeroSlider() {
  const slides = heroSlides.filter((s) => s.enabled);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Promotions"
      className="relative h-[240px] overflow-hidden rounded-2xl bg-primary-soft sm:h-[340px] lg:h-full lg:min-h-[460px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((s, idx) => (
        <div
          key={s.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${idx + 1} of ${slides.length}`}
          aria-hidden={idx !== i}
          className={cn("absolute inset-0 transition-opacity duration-700", idx === i ? "opacity-100" : "pointer-events-none opacity-0")}
        >
          <img src={s.image} alt="" width={1600} height={800} loading={idx === 0 ? "eager" : "lazy"} className="absolute inset-0 size-full object-cover object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/70 to-transparent sm:via-surface/40" />
          <div className="relative flex h-full max-w-[62%] flex-col justify-center gap-2 px-5 sm:max-w-md sm:gap-3 sm:px-10 lg:px-14">
            {s.eyebrow && <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary sm:text-xs">{s.eyebrow}</p>}
            <h2 className="text-xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">{s.title}</h2>
            <p className="hidden text-sm text-muted-foreground sm:block sm:text-base">{s.description}</p>
            {s.offer && <p className="w-fit rounded-md bg-sale px-2.5 py-1 text-xs font-extrabold text-sale-foreground sm:text-sm">{s.offer}</p>}
            <a href={s.href} tabIndex={idx === i ? 0 : -1} className="mt-1 w-fit rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lift transition-colors hover:bg-primary-deep sm:px-7 sm:py-3">
              {s.cta}
            </a>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => go(i - 1)} aria-label="Previous slide" className="absolute left-3 top-1/2 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-surface/90 text-primary shadow-card hover:bg-primary hover:text-primary-foreground sm:grid">
        <ChevronLeft className="size-5" />
      </button>
      <button type="button" onClick={() => go(i + 1)} aria-label="Next slide" className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-surface/90 text-primary shadow-card hover:bg-primary hover:text-primary-foreground sm:size-10">
        <ChevronRight className="size-5" />
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, idx) => (
          <button key={s.id} type="button" onClick={() => go(idx)} aria-label={`Go to slide ${idx + 1}`} aria-current={idx === i} className={cn("h-2 rounded-full transition-all", idx === i ? "w-7 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/60")} />
        ))}
      </div>
    </section>
  );
}

export function HeroSection() {
  return (
    <div className="container-shop mt-4 flex gap-5 lg:mt-0">
      <aside aria-label="Shop by category" className="w-cat hidden shrink-0 rounded-b-xl border border-t-0 border-border bg-surface lg:block">
        <CategoryList />
      </aside>
      <div className="min-w-0 flex-1 lg:pt-5">
        <HeroSlider />
        <ul aria-label="Shop by category" className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7 lg:hidden">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link to="/category/$slug" params={{ slug: c.slug }} className="flex flex-col items-center gap-1.5 rounded-xl p-2 text-center text-[11px] font-semibold leading-tight hover:bg-primary-soft">
                <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary"><c.icon className="size-5" strokeWidth={1.8} aria-hidden /></span>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

