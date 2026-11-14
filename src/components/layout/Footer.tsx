import { Link } from "@tanstack/react-router";
import { categories } from "@/data/categories";
import { contactInfo } from "@/data/promotions";

export function Footer() {
  return (
    <footer className="mt-16 bg-sale text-sale-foreground">
      <div className="container-shop grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl">SHOLOK</p>
          <p className="mt-3 max-w-xs text-sm text-primary-foreground/75">Everything you need, beautifully delivered across Bangladesh.</p>
          <p className="mt-4 text-sm font-semibold">{contactInfo.phone}</p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider">Categories</h2>
          <ul className="grid gap-2 text-sm text-primary-foreground/75">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}><Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-primary-foreground">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider">Shop</h2>
          <ul className="grid gap-2 text-sm text-primary-foreground/75">
            <li><Link to="/collection/$type" params={{ type: "flash-sale" }} className="hover:text-primary-foreground">Flash Sale</Link></li>
            <li><Link to="/collection/$type" params={{ type: "new-arrivals" }} className="hover:text-primary-foreground">New Arrivals</Link></li>
            <li><Link to="/collection/$type" params={{ type: "best-sellers" }} className="hover:text-primary-foreground">Best Sellers</Link></li>
            <li><Link to="/compare" className="hover:text-primary-foreground">Compare</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider">Account</h2>
          <ul className="grid gap-2 text-sm text-primary-foreground/75">
            <li><Link to="/account" className="hover:text-primary-foreground">My Account</Link></li>
            <li><Link to="/wishlist" className="hover:text-primary-foreground">Wishlist</Link></li>
            <li><Link to="/become-seller" className="hover:text-primary-foreground">Become a Seller</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-4 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} SHOLOK Shopping · All rights reserved.
      </div>
    </footer>
  );
}
