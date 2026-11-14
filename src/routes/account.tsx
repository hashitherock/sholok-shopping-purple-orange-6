import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, GitCompareArrows, MapPin } from "lucide-react";
import { useCart, useCompare, useWishlist } from "@/hooks/useShop";
import { useShop } from "@/context/ShopProvider";
import { formatBDT } from "@/utils/currency";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [
    { title: "My Account — SHOLOK Shopping" },
    { name: "description", content: "Your SHOLOK account overview." },
    { property: "og:title", content: "My Account — SHOLOK" },
    { property: "og:description", content: "Account overview." },
  ] }),
  component: AccountPage,
});

function AccountPage() {
  const cart = useCart(); const wish = useWishlist(); const cmp = useCompare(); const { location, orderDrafts } = useShop();
  const cards = [
    { icon: ShoppingBag, label: "Cart items", value: cart.count, action: () => cart.setOpen(true) },
    { icon: Heart, label: "Wishlist", value: wish.count, to: "/wishlist" as const },
    { icon: GitCompareArrows, label: "Comparing", value: cmp.items.length, to: "/compare" as const },
    { icon: MapPin, label: "Delivery area", value: location },
  ];
  return (
    <div className="container-shop max-w-4xl py-8">
      <h1 className="text-2xl font-extrabold sm:text-3xl">My Account</h1>
      <p className="mt-2 text-sm text-muted-foreground">Your shopping activity on this device. Sign-in is not connected.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => {
          const inner = (<><c.icon className="size-6 text-primary" aria-hidden /><span className="flex-1 text-sm font-semibold">{c.label}</span><b className="text-lg text-primary">{c.value}</b></>);
          const cls = "flex items-center gap-4 rounded-xl border border-border bg-surface p-5 text-left hover:border-primary";
          return c.to ? <Link key={c.label} to={c.to} className={cls}>{inner}</Link> : c.action ? <button key={c.label} onClick={c.action} className={cls}>{inner}</button> : <div key={c.label} className={cls}>{inner}</div>;
        })}
      </div>
      <h2 className="mt-10 text-xl font-extrabold">Saved order drafts</h2>
      {orderDrafts.length === 0 ? <p className="mt-3 text-sm text-muted-foreground">No saved drafts yet.</p> : <ul className="mt-4 divide-y divide-border">{orderDrafts.map((draft) => <li key={draft.id} className="py-5"><div className="flex flex-wrap justify-between gap-2"><b>{draft.id}</b><b className="text-sale">{formatBDT(draft.total)}</b></div><p className="mt-2 text-xs text-muted-foreground">{draft.status} · {draft.customer.name} · {draft.customer.city} · {new Date(draft.createdAt).toLocaleDateString()}</p><ul className="mt-3 text-sm">{draft.items.map((item) => <li key={item.productId}>{item.name} × {item.qty}</li>)}</ul></li>)}</ul>}
    </div>
  );
}
