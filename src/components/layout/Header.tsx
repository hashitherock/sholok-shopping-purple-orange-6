import { Link } from "@tanstack/react-router";
import { Heart, MapPin, ShoppingCart, User, ChevronDown, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Logo } from "@/components/common/Logo";
import { SearchBar } from "@/components/search/SearchBar";
import { useShop } from "@/context/ShopProvider";
import { useCart, useWishlist } from "@/hooks/useShop";
import { deliveryLocations } from "@/data/navigation";
import { formatBDT } from "@/utils/currency";

function LocationPicker({ compact = false }: { compact?: boolean }) {
  const { location, setLocation } = useShop();
  return (
    <Popover>
      <PopoverTrigger className="flex shrink-0 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-left hover:border-primary" aria-label={`Delivery location: ${location}. Change`}>
        <MapPin className="size-5 text-primary" aria-hidden />
        <span className={compact ? "text-xs font-bold" : "leading-tight"}>
          {!compact && <span className="block text-[11px] text-muted-foreground">Deliver to</span>}
          <span className="text-sm font-bold">{location}</span>
        </span>
        <ChevronDown className="size-3.5 text-muted-foreground" aria-hidden />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 p-2">
        <p className="px-2 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Select delivery area</p>
        {deliveryLocations.map((l) => (
          <button key={l} type="button" onClick={() => setLocation(l)} className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-primary-soft">
            {l} {l === location && <Check className="size-4 text-primary" aria-hidden />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function CountBadge({ n }: { n: number }) {
  return <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-sale px-1 text-[10px] font-extrabold leading-5 text-sale-foreground">{n}</span>;
}

export function Header() {
  const cart = useCart();
  const wish = useWishlist();
  return (
    <header className="border-b border-border bg-surface">
      <div className="container-shop flex flex-wrap items-center gap-x-4 gap-y-3 py-3 lg:flex-nowrap lg:gap-6 lg:py-4">
        <Logo />
        <div className="hidden md:block"><LocationPicker /></div>
        <div className="order-last w-full lg:order-none lg:flex-1"><SearchBar /></div>
        <nav aria-label="Account" className="ml-auto flex items-center gap-1 sm:gap-3 lg:ml-0">
          <Link to="/account" className="flex items-center gap-2 rounded-lg p-2 hover:bg-primary-soft">
            <User className="size-6 text-primary" aria-hidden />
            <span className="hidden text-left leading-tight xl:block">
              <span className="block text-[11px] text-muted-foreground">Login</span>
              <span className="text-sm font-bold">My Account</span>
            </span>
            <span className="sr-only xl:hidden">My Account</span>
          </Link>
          <Link to="/wishlist" className="flex items-center gap-2 rounded-lg p-2 hover:bg-primary-soft">
            <span className="relative"><Heart className="size-6 text-primary" aria-hidden /><CountBadge n={wish.count} /></span>
            <span className="hidden text-left leading-tight xl:block">
              <span className="block text-[11px] text-muted-foreground">{wish.count} Favorite</span>
              <span className="text-sm font-bold">My Wishlist</span>
            </span>
            <span className="sr-only xl:hidden">Wishlist, {wish.count} items</span>
          </Link>
          <button type="button" onClick={() => cart.setOpen(true)} className="flex items-center gap-2 rounded-lg p-2 hover:bg-primary-soft">
            <span className="relative"><ShoppingCart className="size-6 text-primary" aria-hidden /><CountBadge n={cart.count} /></span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-[11px] text-muted-foreground">Your Cart</span>
              <span className="text-sm font-extrabold text-primary">{formatBDT(cart.subtotal)}</span>
            </span>
            <span className="sr-only sm:hidden">Cart, {cart.count} items</span>
          </button>
        </nav>
        <div className="w-full md:hidden"><LocationPicker compact /></div>
      </div>
    </header>
  );
}
