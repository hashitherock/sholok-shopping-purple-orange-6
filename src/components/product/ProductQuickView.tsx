import { useState, useEffect } from "react";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useShop } from "@/context/ShopProvider";
import { useWishlist } from "@/hooks/useShop";
import { formatBDT, discountPercent } from "@/utils/currency";
import { getCategory } from "@/data/categories";
import { Rating } from "./Rating";
import { cn } from "@/lib/utils";

export function ProductQuickView() {
  const { quickView: p, setQuickView, addToCart } = useShop();
  const wish = useWishlist();
  const [qty, setQty] = useState(1);
  useEffect(() => setQty(1), [p?.id]);

  return (
    <Dialog open={!!p} onOpenChange={(o) => !o && setQuickView(null)}>
      <DialogContent className="max-h-[92vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl p-0">
        {p && (
          <div className="grid md:grid-cols-2">
            <div className="relative bg-surface p-6">
              <img src={p.image} alt={p.name} width={512} height={512} className="mx-auto aspect-square w-full max-w-sm object-contain" />
              {discountPercent(p.price, p.regularPrice) > 0 && (
                <span className="absolute left-4 top-4 rounded-md bg-sale px-2.5 py-1 text-xs font-extrabold text-sale-foreground">
                  -{discountPercent(p.price, p.regularPrice)}% OFF
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">{getCategory(p.category)?.name} · {p.brand}</p>
              <DialogTitle className="text-xl font-extrabold leading-tight">{p.name}</DialogTitle>
              <Rating value={p.rating} reviews={p.reviews} />
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-primary">{formatBDT(p.price)}</span>
                {p.regularPrice && <span className="text-sm text-muted-foreground line-through">{formatBDT(p.regularPrice)}</span>}
              </div>
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                {p.description ?? "No description available."}
              </DialogDescription>
              <p className={cn("text-sm font-semibold", p.stock > 0 ? "text-fresh" : "text-sale")}>
                {p.stock > 0 ? `In stock (${p.stock} available)` : "Out of stock"}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                <div className="flex h-11 items-center rounded-lg border border-border" role="group" aria-label="Quantity">
                  <button type="button" className="grid size-11 place-items-center hover:text-primary" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                    <Minus className="size-4" />
                  </button>
                  <span className="w-8 text-center font-bold" aria-live="polite">{qty}</span>
                  <button type="button" className="grid size-11 place-items-center hover:text-primary" onClick={() => setQty((q) => Math.min(p.stock || 1, q + 1))} aria-label="Increase quantity">
                    <Plus className="size-4" />
                  </button>
                </div>
                <button
                  type="button"
                  disabled={p.stock <= 0}
                  onClick={() => addToCart(p, qty)}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 font-bold text-primary-foreground hover:bg-primary-deep disabled:opacity-50"
                >
                  <ShoppingCart className="size-4" aria-hidden /> Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => wish.toggle(p)}
                  aria-pressed={wish.has(p.id)}
                  aria-label="Toggle wishlist"
                  className={cn("grid size-11 place-items-center rounded-lg border border-border hover:border-sale hover:text-sale", wish.has(p.id) && "border-sale text-sale")}
                >
                  <Heart className={cn("size-4", wish.has(p.id) && "fill-current")} />
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
