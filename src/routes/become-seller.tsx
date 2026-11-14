import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Store } from "lucide-react";

export const Route = createFileRoute("/become-seller")({
  head: () => ({ meta: [
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
      <p className="text-sm text-muted-foreground">Reach thousands of shoppers. Tell us about your business (demo form — nothing is sent).</p>
      {sent ? (
        <p role="status" className="mt-6 rounded-xl border border-primary/30 bg-primary-soft p-5 text-sm font-semibold text-primary">Thanks! In the live store our seller team would contact you. This demo doesn't submit data.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 grid gap-4 rounded-xl border border-border bg-surface p-5">
          {[["shop", "Shop name"], ["owner", "Your name"], ["email", "Email"]].map(([id, label]) => (
            <label key={id} className="grid gap-1.5 text-sm font-semibold">{label}<input id={id} required type={id === "email" ? "email" : "text"} className="h-11 rounded-lg border border-border px-3 font-normal" /></label>
          ))}
          <button className="h-11 rounded-lg bg-primary font-bold text-primary-foreground hover:bg-primary-deep">Submit application</button>
        </form>
      )}
    </div>
  );
}
