import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, LayoutGrid, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { mainNav, type NavItem } from "@/data/navigation";
import { CategoryList } from "@/components/home/CategoryList";
import { Logo } from "@/components/common/Logo";

const navLinkCls = "rounded-md px-3 py-2 text-sm font-bold text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground";
const activeCls = "bg-primary-foreground/15 text-primary-foreground";

function NavLink({ item, className, onClick }: { item: NavItem; className: string; onClick?: () => void }) {
  if (item.to === "/collection/$type")
    return <Link to={item.to} params={{ type: item.type }} className={className} activeProps={{ className: activeCls }} onClick={onClick}>{item.label}</Link>;
  return <Link to={item.to} className={className} activeOptions={{ exact: true }} activeProps={{ className: activeCls }} onClick={onClick}>{item.label}</Link>;
}

export function MainNavigation() {
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathname = useLocation({ select: (l) => l.pathname });
  useEffect(() => setCatOpen(false), [pathname]);
  // On the homepage the category column is always visible on desktop, so the dropdown is only needed elsewhere.
  const isHome = pathname === "/";

  useEffect(() => {
    if (!catOpen) return;
    const onDoc = (e: MouseEvent) => { if (!wrapRef.current?.contains(e.target as Node)) setCatOpen(false); };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCatOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [catOpen]);

  return (
    <nav aria-label="Main" className="sticky top-0 z-40 bg-primary shadow-card">
      <div className="container-shop flex h-12 items-center gap-4">
        <button type="button" onClick={() => setMobileOpen(true)} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-bold text-primary-foreground lg:hidden" aria-label="Open menu">
          <Menu className="size-5" aria-hidden /> Menu
        </button>

        <div ref={wrapRef} className="relative hidden h-full lg:block" onMouseLeave={() => !isHome && setCatOpen(false)}>
          <button
            type="button"
            aria-expanded={isHome || catOpen}
            aria-controls="cat-panel"
            onClick={() => !isHome && setCatOpen((o) => !o)}
            onMouseEnter={() => !isHome && setCatOpen(true)}
            className="w-cat flex h-full items-center gap-3 bg-primary-deep px-4 text-sm font-extrabold uppercase tracking-wide text-primary-foreground"
          >
            <LayoutGrid className="size-4" aria-hidden />
            <span className="flex-1 text-left">Shop by Category</span>
            <ChevronDown className={`size-4 transition-transform ${catOpen ? "rotate-180" : ""}`} aria-hidden />
          </button>
          {!isHome && (
            <div
              id="cat-panel"
              className={`w-cat absolute left-0 top-full rounded-b-xl border border-t-0 border-border bg-popover shadow-lift transition-all duration-200 ${catOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}
            >
              <CategoryList onNavigate={() => setCatOpen(false)} />
            </div>
          )}
        </div>

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <li key={item.label}><NavLink item={item} className={navLinkCls} /></li>
          ))}
        </ul>
        <Link to="/collection/$type" params={{ type: "flash-sale" }} className="ml-auto hidden rounded-full bg-sale px-3 py-1 text-xs font-extrabold text-sale-foreground xl:inline-block">
          Flash Deals Live
        </Link>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[86vw] max-w-sm overflow-y-auto p-0">
          <SheetHeader className="border-b border-border px-4 py-4">
            <SheetTitle><Logo /></SheetTitle>
            <SheetDescription className="sr-only">Site navigation and categories</SheetDescription>
          </SheetHeader>
          <ul className="border-b border-border p-2">
            {mainNav.map((item) => (
              <li key={item.label}>
                <NavLink item={item} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2.5 text-sm font-bold hover:bg-primary-soft hover:text-primary" />
              </li>
            ))}
          </ul>
          <p className="px-4 pt-4 text-xs font-extrabold uppercase tracking-wider text-primary">Shop by Category</p>
          <CategoryList onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
