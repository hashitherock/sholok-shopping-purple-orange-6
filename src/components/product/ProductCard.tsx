import { memo } from "react";
import { Eye, GitCompareArrows, Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { formatBDT, discountPercent } from "@/utils/currency";
import { useCart, useCompare, useWishlist } from "@/hooks/useShop";
import { useShop } from "@/context/ShopProvider";
import { Rating } from "./Rating";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const iconBtn =
  "grid size-9 place-items-center rounded-full border border-border bg-surface text-foreground shadow-card transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground";

function ProductCardBase({ product, showStock = false }: { product: Product; showStock?: boolean | undefined }) {
  const { add } = useCart();
  const wish = useWishlist();
  const cmp = useCompare();
  const { setQuickView } = useShop();
  const off = discountPercent(product.price, product.regularPrice);
  const inWish = wish.has(product.id);
  const inCmp = cmp.has(product.id);
  const out = product.stock <= 0;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={product.image}
          alt={product.name}
          width={512}
          height={512}
          loading="lazy"
          className="size-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />
        {off > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-sale px-2 py-1 text-[11px] font-extrabold text-sale-foreground">
            -{off}%
          </span>
        )}
        {out && (
          <span className="absolute inset-x-0 bottom-0 bg-foreground/75 py-1.5 text-center text-xs font-bold text-background">Out of stock</span>
        )}
        <button
          type="button"
          onClick={() => wish.toggle(product)}
          aria-pressed={inWish}
          aria-label={inWish ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={cn(iconBtn, "absolute right-2.5 top-2.5", inWish && "border-sale bg-sale text-sale-foreground hover:border-sale hover:bg-sale")}
        >
          <Heart className={cn("size-4", inWish && "fill-current")} aria-hidden />
        </button>
        <div className="absolute right-2.5 top-[3.25rem] flex flex-col gap-2 transition-all duration-300 lg:translate-x-12 lg:opacity-0 lg:group-focus-within:translate-x-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
          <button type="button" onClick={() => setQuickView(product)} aria-label={`Quick view ${product.name}`} className={iconBtn}>
            <Eye className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => cmp.toggle(product)}
            aria-pressed={inCmp}
            aria-label={inCmp ? `Remove ${product.name} from compare` : `Compare ${product.name}`}
            className={cn(iconBtn, inCmp && "border-primary bg-primary text-primary-foreground")}
          >
            <GitCompareArrows className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-3.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{product.brand}</p>
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-foreground">
          <button type="button" onClick={() => setQuickView(product)} className="text-left hover:text-primary">
            {product.name}
          </button>
        </h3>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-1">
          <span className="text-base font-extrabold text-primary">{formatBDT(product.price)}</span>
          {off > 0 && product.regularPrice !== undefined && <span className="text-xs text-muted-foreground line-through">{formatBDT(product.regularPrice)}</span>}
        </div>
        {showStock && !out && (
          <div className="space-y-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
              <div className="h-full rounded-full bg-sale" style={{ width: `${Math.max(12, Math.min(100, (product.stock / 60) * 100))}%` }} />
            </div>
            <p className="text-[11px] font-semibold text-muted-foreground">
              {product.stock <= 20 ? `Only ${product.stock} left` : `${product.stock} in stock`}
            </p>
          </div>
        )}
        <Button variant="sale"
          type="button"
          disabled={out}
          onClick={() => add(product)}
          className="mt-2 h-10 w-full px-2 text-sm font-bold disabled:bg-muted disabled:text-muted-foreground"
        >
          <ShoppingCart className="size-4" aria-hidden />
          {out ? "Sold Out" : "Add to Cart"}
        </Button>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardBase);
