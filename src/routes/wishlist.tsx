import { createFileRoute, Link } from "@tanstack/react-router";
import { useWishlist } from "@/hooks/useShop";
import { ProductGrid } from "@/components/product/ProductGrid";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [
    { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "My Wishlist — SHOLOK Shopping" },
    { name: "description", content: "Products you saved for later at SHOLOK." },
    { property: "og:title", content: "My Wishlist — SHOLOK" },
    { property: "og:description", content: "Your saved SHOLOK products." },
  ] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items } = useWishlist();
  return (
    <div className="container-shop py-8">
      <h1 className="mb-1 text-2xl font-extrabold sm:text-3xl">My Wishlist</h1>
      <p className="mb-6 text-sm text-muted-foreground">{items.length} saved products</p>
      <ProductGrid products={items} emptyText="Your wishlist is empty. Tap the heart on any product to save it." />
      {items.length === 0 && <div className="mt-6 text-center"><Link to="/" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">Start shopping</Link></div>}
    </div>
  );
}
