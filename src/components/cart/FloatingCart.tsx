import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useShop";
import { formatBDT } from "@/utils/currency";

export function FloatingCart() {
  const cart = useCart();
  return <Button variant="sale" onClick={() => cart.setOpen(true)} aria-label={`Open shopping cart, ${cart.count} items`} title="Your shopping cart" className="fixed bottom-5 right-4 z-40 h-14 gap-3 rounded-full px-5 shadow-floating sm:bottom-8 sm:right-6 sm:h-16">
    <span className="relative"><ShoppingBag className="size-6!" /><span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-surface text-[10px] font-extrabold text-sale">{cart.count}</span></span>
    <span className="hidden border-l border-sale-foreground/30 pl-3 text-sm font-extrabold sm:block">{formatBDT(cart.subtotal)}</span>
  </Button>;
}