import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Download, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useShop";
import { useShop } from "@/context/ShopProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createOrderDraft, type OrderDraft } from "@/utils/checkout";
import { deliveryLocations } from "@/data/navigation";
import { formatBDT } from "@/utils/currency";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [
    { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Checkout — SHOLOK Shopping" },
    { name: "description", content: "Review your shopping bag and save your SHOLOK order details." },
    { property: "og:title", content: "Checkout — SHOLOK" },
    { property: "og:description", content: "Review your SHOLOK shopping bag and delivery details." },
    { name: "robots", content: "noindex" },
  ] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal } = useCart();
  const { location, saveOrderDraft } = useShop();
  const [saved, setSaved] = useState<OrderDraft | null>(null);
  function downloadDraft() {
    if (!saved) return;
    const blob = new Blob([JSON.stringify(saved, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = `${saved.id}.json`; link.click(); URL.revokeObjectURL(url);
  }
  if (saved) return <div className="container-shop max-w-3xl py-12"><CheckCircle2 className="mb-4 size-12 text-primary" /><h1 className="text-2xl font-extrabold">Order draft saved</h1><p role="status" className="mt-3 text-sm text-muted-foreground">{saved.id} · Saved on this device only. No order has been sent and no payment has been taken.</p><div className="mt-6 flex flex-wrap gap-3"><Button variant="sale" onClick={downloadDraft}><Download /> Download details</Button><Button asChild variant="outline"><Link to="/account">View saved drafts</Link></Button></div></div>;
  return (
    <div className="container-shop max-w-5xl py-8">
      <h1 className="text-2xl font-extrabold sm:text-3xl">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">Save your order details on this device. Orders are not sent and payments are not collected.</p>
      {items.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">Your cart is empty. <Link to="/" className="font-bold text-primary">Continue shopping</Link></p>
      ) : (
        <form className="mt-8 grid gap-8 lg:grid-cols-2" onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const draft = createOrderDraft(items.map((item) => ({ productId: item.productId, name: item.product.name, qty: item.qty, price: item.product.price })), { name: String(data.get("name")), phone: String(data.get("phone")), address: String(data.get("address")), city: String(data.get("city")) });
          saveOrderDraft(draft); setSaved(draft);
        }}>
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold">Delivery details</h2>
          <label className="grid gap-2 text-sm font-semibold">Full name<Input name="name" autoComplete="name" required minLength={2} className="h-11 bg-surface" /></label>
          <label className="grid gap-2 text-sm font-semibold">Phone number<Input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9 ()-]{7,20}" className="h-11 bg-surface" /></label>
          <label className="grid gap-2 text-sm font-semibold">Address<Input name="address" autoComplete="street-address" required minLength={5} className="h-11 bg-surface" /></label>
          <label className="grid gap-2 text-sm font-semibold">City<select name="city" defaultValue={location} className="h-11 rounded-md border border-input bg-surface px-3">{deliveryLocations.map((city) => <option key={city}>{city}</option>)}</select></label>
          <p className="border-t border-border pt-4 text-sm text-muted-foreground">Payment and delivery charges are not available.</p>
        </div>
        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold"><ShoppingBag className="size-5 text-sale" /> Order summary</h2>
          <ul className="divide-y divide-border">
            {items.map((l) => (
              <li key={l.productId} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span className="min-w-0 truncate">{l.product.name} × {l.qty}</span>
                <b>{formatBDT(l.qty * l.product.price)}</b>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-extrabold"><span>Subtotal</span><span className="text-primary">{formatBDT(subtotal)}</span></div>
          <Button variant="sale" type="submit" className="mt-5 h-12 w-full font-bold">Save Order Draft</Button>
        </div>
        </form>
      )}
    </div>
  );
}
