import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/become-seller")({
  head: () => ({ meta: [
    { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Become a Seller — SHOLOK Shopping" },
    { name: "description", content: "Sell your products to customers across Bangladesh on SHOLOK." },
    { property: "og:title", content: "Become a Seller — SHOLOK" },
    { property: "og:description", content: "Grow your business with SHOLOK." },
  ] }),
  component: SellerPage,
});

function SellerPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container-shop max-w-2xl py-10">
      <div className="mb-6 flex items-center gap-3"><span className="grid size-12 place-items-center rounded-xl bg-primary-soft"><Store className="size-6 text-primary" /></span><h1 className="text-2xl font-extrabold sm:text-3xl">Become a Seller</h1></div>
      <p className="text-sm text-muted-foreground">Prepare your seller application. Details are saved on this device only, not sent to SHOLOK.</p>
      {sent ? (
        <p role="status" className="mt-6 border-t border-border py-5 text-sm font-semibold text-primary">Application draft saved on this device. It has not been submitted.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); const data = new FormData(e.currentTarget); localStorage.setItem("sholok:seller-draft", JSON.stringify(Object.fromEntries(data))); setSent(true); }} className="mt-6 grid gap-4">
          {[["shop", "Shop name"], ["owner", "Your name"], ["email", "Email"]].map(([id, label]) => (
            <label key={id} className="grid gap-1.5 text-sm font-semibold">{label}<input id={id} name={id} required type={id === "email" ? "email" : "text"} className="h-11 rounded-lg border border-border px-3 font-normal" /></label>
          ))}
          <Button type="submit" variant="sale" className="h-11 font-bold">Save application draft</Button>
        </form>
      )}
    </div>
  );
}
