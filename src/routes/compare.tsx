import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useCart, useCompare } from "@/hooks/useShop";
import { formatBDT, discountPercent } from "@/utils/currency";
import { getCategory } from "@/data/categories";

export const Route = createFileRoute("/compare")({
  head: () => ({ meta: [
    { title: "Compare Products — SHOLOK Shopping" },
    { name: "description", content: "Compare products side by side at SHOLOK." },
    { property: "og:title", content: "Compare Products — SHOLOK" },
    { property: "og:description", content: "Side-by-side product comparison." },
  ] }),
  component: ComparePage,
});

function ComparePage() {
  const { items, toggle, clear } = useCompare();
  const { add } = useCart();
  const rows: [string, (p: (typeof items)[number]) => React.ReactNode][] = [
    ["Price", (p) => <b className="text-primary">{formatBDT(p.price)}</b>],
    ["Discount", (p) => (discountPercent(p.price, p.regularPrice) ? <span className="font-bold text-sale">-{discountPercent(p.price, p.regularPrice)}%</span> : "—")],
    ["Brand", (p) => p.brand],
    ["Category", (p) => getCategory(p.category)?.name],
    ["Rating", (p) => (p.rating ? `${p.rating} (${p.reviews})` : "—")],
    ["Availability", (p) => (p.stock > 0 ? "In stock" : "Out of stock")],
  ];
  return (
    <div className="container-shop py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Compare Products</h1>
        {items.length > 0 && <button onClick={clear} className="text-sm font-bold text-sale hover:underline">Clear all</button>}
      </div>
      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border bg-card py-16 text-center text-sm text-muted-foreground">No products to compare yet. Use the compare icon on any product card.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr>
                <th className="w-32 p-3" />
                {items.map((p) => (
                  <th key={p.id} className="p-3 align-top">
                    <div className="relative">
                      <button onClick={() => toggle(p)} aria-label={`Remove ${p.name}`} className="absolute right-0 top-0 rounded-full p-1 hover:bg-muted"><X className="size-4" /></button>
                      <img src={p.image} alt={p.name} width={120} height={120} className="mx-auto size-28 object-contain" />
                      <p className="mt-2 line-clamp-2 font-semibold">{p.name}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, fn]) => (
                <tr key={label} className="border-t border-border">
                  <th className="p-3 text-left font-semibold text-muted-foreground">{label}</th>
                  {items.map((p) => <td key={p.id} className="p-3 text-center">{fn(p)}</td>)}
                </tr>
              ))}
              <tr className="border-t border-border">
                <td />
                {items.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    <button disabled={p.stock <= 0} onClick={() => add(p)} className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50">Add to Cart</button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
