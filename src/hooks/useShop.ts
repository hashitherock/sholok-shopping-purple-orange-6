import { useMemo } from "react";
import { useShop } from "@/context/ShopProvider";
import { getProduct, products } from "@/data/products";
import { getRecommendations } from "@/utils/recommendations";
import type { Product } from "@/types/product";

export function useCart() {
  const s = useShop();
  const items = useMemo(
    () =>
      s.cart
        .map((l) => ({ ...l, product: getProduct(l.productId) }))
        .filter((l): l is typeof l & { product: Product } => !!l.product),
    [s.cart],
  );
  const count = items.reduce((n, l) => n + l.qty, 0);
  const subtotal = items.reduce((n, l) => n + l.qty * l.product.price, 0);
  return { items, count, subtotal, open: s.cartOpen, setOpen: s.setCartOpen, add: s.addToCart, updateQty: s.updateQty, remove: s.removeFromCart, clear: s.clearCart };
}

export function useWishlist() {
  const s = useShop();
  const items = useMemo(() => s.wishlist.map(getProduct).filter(Boolean) as Product[], [s.wishlist]);
  return { ids: s.wishlist, items, count: s.wishlist.length, toggle: s.toggleWishlist, has: (id: string) => s.wishlist.includes(id) };
}

export function useCompare() {
  const s = useShop();
  const items = useMemo(() => s.compare.map(getProduct).filter(Boolean) as Product[], [s.compare]);
  return { items, toggle: s.toggleCompare, has: (id: string) => s.compare.includes(id), clear: s.clearCompare };
}

export function useRecommendations(limit = 18) {
  const { searchHistory, sessionSeed, hydrated } = useShop();
  const latest = searchHistory[0];
  const list = useMemo(() => getRecommendations(products, latest, sessionSeed, limit), [latest, sessionSeed, limit]);
  return { products: list, basedOn: latest, ready: hydrated };
}
