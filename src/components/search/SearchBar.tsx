import { useMemo, useRef, useState, useId } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Clock, Search } from "lucide-react";
import { useShop } from "@/context/ShopProvider";
import { searchProducts } from "@/utils/productFilters";
import { categories } from "@/data/categories";
import { formatBDT } from "@/utils/currency";

export function SearchBar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const { recordSearch, searchHistory, setQuickView } = useShop();
  const navigate = useNavigate();
  const listId = useId();
  const blurTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const results = useMemo(() => (q.trim() ? searchProducts(q).slice(0, 6) : []), [q]);
  const catMatches = useMemo(
    () => (q.trim() ? categories.filter((c) => c.name.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 3) : []),
    [q],
  );

  const submit = (term = q) => {
    const t = term.trim();
    if (!t) return;
    recordSearch(t);
    setOpen(false);
    navigate({ to: "/search", search: { q: t } });
  };

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (active >= 0 && results[active]) {
          recordSearch(q);
          setQuickView(results[active]);
          setOpen(false);
        } else submit();
      }}
      className="relative w-full"
    >
      <label htmlFor="site-search" className="sr-only">Search products, categories or brands</label>
      <div className="flex h-11 overflow-hidden rounded-lg border-2 border-primary bg-surface">
        <input
          id="site-search"
          type="search"
          value={q}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          placeholder="Search products, categories or brands…"
          onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
          onFocus={() => setOpen(true)}
          onBlur={() => { blurTimer.current = setTimeout(() => setOpen(false), 150); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(-1, a - 1)); }
            if (e.key === "Escape") setOpen(false);
          }}
          className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button type="submit" className="flex items-center gap-2 bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary-deep" aria-label="Search">
          <Search className="size-4" aria-hidden />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {open && (q.trim() || searchHistory.length > 0) && (
        <div id={listId} role="listbox" className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-lift">
          {!q.trim() && (
            <div className="p-3">
              <p className="px-2 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Recent searches</p>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((h) => (
                  <button key={h} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { setQ(h); submit(h); }} className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
                    <Clock className="size-3" aria-hidden /> {h}
                  </button>
                ))}
              </div>
            </div>
          )}
          {catMatches.length > 0 && (
            <div className="border-b border-border p-2">
              {catMatches.map((c) => (
                <button key={c.slug} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { recordSearch(c.name); setOpen(false); navigate({ to: "/category/$slug", params: { slug: c.slug } }); }} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-primary-soft">
                  <c.icon className="size-4 text-primary" aria-hidden /> <span>in <b>{c.name}</b></span>
                </button>
              ))}
            </div>
          )}
          {q.trim() && (
            <ul className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted-foreground">No products match “{q}”.</li>}
              {results.map((p, i) => (
                <li key={p.id} role="option" aria-selected={i === active}>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { recordSearch(q); setQuickView(p); setOpen(false); }} className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-primary-soft ${i === active ? "bg-primary-soft" : ""}`}>
                    <img src={p.image} alt="" width={40} height={40} className="size-10 rounded-md border border-border object-contain" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{p.name}</span>
                      <span className="text-xs text-muted-foreground">{p.brand}</span>
                    </span>
                    <span className="text-sm font-bold text-primary">{formatBDT(p.price)}</span>
                  </button>
                </li>
              ))}
              {results.length > 0 && (
                <li>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => submit()} className="mt-1 w-full rounded-lg py-2 text-sm font-bold text-primary hover:bg-primary-soft">
                    See all results for “{q}”
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
