import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { CartLine, Product } from "@/types/product";
import { getProduct } from "@/data/products";
import { deliveryLocations } from "@/data/navigation";

interface ShopState {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  searchHistory: string[];
  location: string;
  sessionSeed: number;
  hydrated: boolean;
  cartOpen: boolean;
  quickView: Product | null;
  setCartOpen: (v: boolean) => void;
  setQuickView: (p: Product | null) => void;
  addToCart: (p: Product, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (p: Product) => void;
  toggleCompare: (p: Product) => void;
  clearCompare: () => void;
  recordSearch: (q: string) => void;
  setLocation: (l: string) => void;
}

const ShopContext = createContext<ShopState | null>(null);
const MAX_COMPARE = 4;

function readJSON<T>(store: Storage, key: string, fallback: T): T {
  try {
    const raw = store.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [location, setLocationState] = useState<string>(deliveryLocations[0] ?? "Dhaka");
  const [sessionSeed, setSessionSeed] = useState(1);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  // Load persisted demo state after hydration (cart/wishlist: localStorage; search + seed: session only).
  useEffect(() => {
    setCart(readJSON(localStorage, "sholok:cart", []));
    setWishlist(readJSON(localStorage, "sholok:wishlist", []));
    setLocationState(readJSON<string>(localStorage, "sholok:location", deliveryLocations[0] ?? "Dhaka"));
    setCompare(readJSON(sessionStorage, "sholok:compare", []));
    setSearchHistory(readJSON(sessionStorage, "sholok:searches", []));
    let seed = readJSON<number>(sessionStorage, "sholok:seed", 0);
    if (!seed) {
      seed = Math.floor(Math.random() * 1e9) + 1;
      sessionStorage.setItem("sholok:seed", String(seed));
    }
    setSessionSeed(seed);
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem("sholok:cart", JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("sholok:wishlist", JSON.stringify(wishlist)); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) sessionStorage.setItem("sholok:compare", JSON.stringify(compare)); }, [compare, hydrated]);
  useEffect(() => { if (hydrated) sessionStorage.setItem("sholok:searches", JSON.stringify(searchHistory)); }, [searchHistory, hydrated]);

  const addToCart = useCallback((p: Product, qty = 1) => {
    if (p.stock <= 0) {
      toast.error(`${p.name} is out of stock`);
      return;
    }
    setCart((c) => {
      const line = c.find((l) => l.productId === p.id);
      if (line) return c.map((l) => (l.productId === p.id ? { ...l, qty: Math.min(p.stock, l.qty + qty) } : l));
      return [...c, { productId: p.id, qty: Math.min(p.stock, qty) }];
    });
    toast.success("Added to cart", { description: p.name });
    setQuickView(null);
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    const p = getProduct(id);
    setCart((c) =>
      qty <= 0 ? c.filter((l) => l.productId !== id) : c.map((l) => (l.productId === id ? { ...l, qty: Math.min(p?.stock ?? qty, qty) } : l)),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((c) => c.filter((l) => l.productId !== id));
    toast("Removed from cart");
  }, []);

  const toggleWishlist = useCallback((p: Product) => {
    setWishlist((w) => {
      const has = w.includes(p.id);
      toast(has ? "Removed from wishlist" : "Saved to wishlist", { description: p.name });
      return has ? w.filter((x) => x !== p.id) : [...w, p.id];
    });
  }, []);

  const toggleCompare = useCallback((p: Product) => {
    setCompare((c) => {
      if (c.includes(p.id)) {
        toast("Removed from compare");
        return c.filter((x) => x !== p.id);
      }
      if (c.length >= MAX_COMPARE) {
        toast.error(`You can compare up to ${MAX_COMPARE} products`);
        return c;
      }
      toast.success("Added to compare", { description: p.name });
      return [...c, p.id];
    });
  }, []);

  const recordSearch = useCallback((q: string) => {
    const t = q.trim();
    if (!t) return;
    setSearchHistory((h) => [t, ...h.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, 6));
  }, []);

  const setLocation = useCallback((l: string) => {
    setLocationState(l);
    localStorage.setItem("sholok:location", JSON.stringify(l));
    toast.success(`Delivering to ${l}`);
  }, []);

  const value = useMemo<ShopState>(
    () => ({
      cart, wishlist, compare, searchHistory, location, sessionSeed, hydrated, cartOpen, quickView,
      setCartOpen, setQuickView, addToCart, updateQty, removeFromCart,
      clearCart: () => setCart([]),
      toggleWishlist, toggleCompare, clearCompare: () => setCompare([]), recordSearch, setLocation,
    }),
    [cart, wishlist, compare, searchHistory, location, sessionSeed, hydrated, cartOpen, quickView, addToCart, updateQty, removeFromCart, toggleWishlist, toggleCompare, recordSearch, setLocation],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
