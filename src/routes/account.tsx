import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, GitCompareArrows, MapPin } from "lucide-react";
import { useCart, useCompare, useWishlist } from "@/hooks/useShop";
import { useShop } from "@/context/ShopProvider";

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
  const cart = useCart(); const wish = useWishlist(); const cmp = useCompare(); const { location } = useShop();
  const cards = [
    { icon: ShoppingBag, label: "Cart items", value: cart.count, action: () => cart.setOpen(true) },
    { icon: Heart, label: "Wishlist", value: wish.count, to: "/wishlist" as const },
    { icon: GitCompareArrows, label: "Comparing", value: cmp.items.length, to: "/compare" as const },
    { icon: MapPin, label: "Delivery area", value: location },
  ];
  return (
    <div className="container-shop max-w-4xl py-8">
      <h1 className="text-2xl font-extrabold sm:text-3xl">My Account</h1>
      <p className="mt-2 text-sm text-muted-foreground">Sign-in is not available in this demo. Here is your shopping activity in this browser.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => {
          const inner = (<><c.icon className="size-6 text-primary" aria-hidden /><span className="flex-1 text-sm font-semibold">{c.label}</span><b className="text-lg text-primary">{c.value}</b></>);
          const cls = "flex items-center gap-4 rounded-xl border border-border bg-surface p-5 text-left hover:border-primary";
          return c.to ? <Link key={c.label} to={c.to} className={cls}>{inner}</Link> : c.action ? <button key={c.label} onClick={c.action} className={cls}>{inner}</button> : <div key={c.label} className={cls}>{inner}</div>;
        })}
      </div>
    </div>
  );
}
