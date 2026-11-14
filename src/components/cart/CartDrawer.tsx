import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/hooks/useShop";
import { formatBDT } from "@/utils/currency";
import type { Product } from "@/types/product";

function CartItem({ product, qty, onQty, onRemove }: { product: Product; qty: number; onQty: (n: number) => void; onRemove: () => void }) {
  return (
    <li className="flex gap-3 border-b border-border py-4">
      <img src={product.image} alt={product.name} width={80} height={80} className="size-20 shrink-0 rounded-lg border border-border bg-surface object-contain p-1" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="line-clamp-2 text-sm font-semibold">{product.name}</p>
        <p className="text-xs text-muted-foreground">{product.brand} · {formatBDT(product.price)} each</p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex h-9 items-center rounded-lg border border-border" role="group" aria-label={`Quantity for ${product.name}`}>
            <button type="button" className="grid size-9 place-items-center hover:text-primary" onClick={() => onQty(qty - 1)} aria-label="Decrease quantity"><Minus className="size-3.5" /></button>
            <span className="w-7 text-center text-sm font-bold">{qty}</span>
            <button type="button" disabled={qty >= product.stock} className="grid size-9 place-items-center hover:text-primary disabled:opacity-40" onClick={() => onQty(qty + 1)} aria-label="Increase quantity"><Plus className="size-3.5" /></button>
          </div>
          <span className="text-sm font-extrabold text-primary">{formatBDT(product.price * qty)}</span>
        </div>
      </div>
      <button type="button" onClick={onRemove} className="self-start rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-sale" aria-label={`Remove ${product.name}`}>
        <Trash2 className="size-4" />
      </button>
    </li>
  );
}

export function CartDrawer() {
  const { items, count, subtotal, open, setOpen, updateQty, remove } = useCart();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 text-lg font-extrabold">
            <ShoppingBag className="size-5 text-primary" aria-hidden /> Your Cart
            <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs text-primary">{count} items</span>
          </SheetTitle>
          <SheetDescription className="sr-only">Review the items in your cart</SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-primary-soft"><ShoppingBag className="size-7 text-primary" /></div>
            <p className="font-bold">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add something you love to get started.</p>
            <button type="button" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary-deep">Continue Shopping</button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5" aria-live="polite">
              {items.map((l) => (
                <CartItem key={l.productId} product={l.product} qty={l.qty} onQty={(n) => updateQty(l.productId, n)} onRemove={() => remove(l.productId)} />
              ))}
            </ul>
            <div className="space-y-3 border-t border-border bg-background px-5 py-4">
              <div className="flex items-center justify-between text-base">
                <span className="font-semibold">Subtotal</span>
                <span className="font-extrabold text-primary">{formatBDT(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Delivery charges calculated at checkout.</p>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setOpen(false)} className="h-11 rounded-lg border border-primary text-sm font-bold text-primary hover:bg-primary-soft">Continue Shopping</button>
                <Link to="/checkout" onClick={() => setOpen(false)} className="grid h-11 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground hover:bg-primary-deep">Proceed to Checkout</Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
