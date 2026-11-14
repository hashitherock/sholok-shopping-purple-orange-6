import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Info } from "lucide-react";
import { useCart } from "@/hooks/useShop";
import { formatBDT } from "@/utils/currency";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [
    { title: "Checkout (Demo) — SHOLOK Shopping" },
    { name: "description", content: "Demonstration checkout for SHOLOK Shopping." },
    { property: "og:title", content: "Checkout — SHOLOK" },
    { property: "og:description", content: "Demo checkout." },
    { name: "robots", content: "noindex" },
  ] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [reviewed, setReviewed] = useState(false);
  return (
    <div className="container-shop max-w-3xl py-8">
      <h1 className="text-2xl font-extrabold sm:text-3xl">Checkout</h1>
      <p className="mt-3 flex items-start gap-2 rounded-xl border border-primary/30 bg-primary-soft p-4 text-sm text-primary">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        This is a demonstration store. No payment is taken and no order will be placed.
      </p>
      {items.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">Your cart is empty. <Link to="/" className="font-bold text-primary">Continue shopping</Link></p>
      ) : (
        <div className="mt-6 rounded-xl border border-border bg-surface p-5">
          <ul className="divide-y divide-border">
            {items.map((l) => (
              <li key={l.productId} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span className="min-w-0 truncate">{l.product.name} × {l.qty}</span>
                <b>{formatBDT(l.qty * l.product.price)}</b>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-extrabold"><span>Subtotal</span><span className="text-primary">{formatBDT(subtotal)}</span></div>
          <button onClick={() => setReviewed(true)} className="mt-5 h-12 w-full rounded-lg bg-primary font-bold text-primary-foreground hover:bg-primary-deep">Review Order (Demo)</button>
          {reviewed && <p role="status" className="mt-3 text-center text-sm text-muted-foreground">Order review complete. In this demo nothing is purchased — payments will be connected in a future phase.</p>}
        </div>
      )}
    </div>
  );
}
