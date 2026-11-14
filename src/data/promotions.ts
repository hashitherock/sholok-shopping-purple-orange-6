// DEMONSTRATION promotional configuration. Edit here to change campaigns.
import heroFashion from "@/assets/hero-fashion.jpg";
import heroBeauty from "@/assets/hero-beauty.jpg";
import heroHome from "@/assets/hero-home.jpg";
import promoFashion from "@/assets/promo-fashion.jpg";
import promoBaby from "@/assets/promo-baby.jpg";
import promoCare from "@/assets/promo-care.jpg";
import promoKitchen from "@/assets/promo-kitchen.jpg";
import summerVeg from "@/assets/summer-vegetable.jpg";

export interface Promo {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  offer?: string;
  cta: string;
  href: string;
  image: string;
  enabled: boolean;
}

export const heroSlides: Promo[] = [
  { id: "s1", eyebrow: "New Season", title: "Style That Speaks For You", description: "Fresh women's fashion, curated kurtis and everyday essentials.", offer: "Up to 30% OFF", cta: "Shop Now", href: "/category/womens-clothing", image: heroFashion, enabled: true },
  { id: "s2", eyebrow: "Beauty Week", title: "Glow Up With Lumière", description: "Serums, lipsticks and skincare loved by thousands.", offer: "Save 25% on Makeup", cta: "Shop Now", href: "/category/beauty-makeup", image: heroBeauty, enabled: true },
  { id: "s3", eyebrow: "Home Edit", title: "Cook, Serve & Live Beautifully", description: "Premium cookware and kitchen appliances for every home.", offer: "Flat ৳500 OFF", cta: "Shop Now", href: "/category/home-kitchen", image: heroHome, enabled: true },
];

export const promoBanners: Promo[] = [
  { id: "b1", title: "Fashion Accessories", description: "Bags, watches & more", offer: "20% OFF", cta: "Shop Now", href: "/category/fashion-lifestyle", image: promoFashion, enabled: true },
  { id: "b2", title: "Baby Care Essentials", description: "Gentle on little ones", offer: "Buy 2 Save 15%", cta: "Shop Now", href: "/category/baby-care", image: promoBaby, enabled: true },
  { id: "b3", title: "Natural Personal Care", description: "Clean, herbal formulas", offer: "Up to 25% OFF", cta: "Shop Now", href: "/category/personal-care", image: promoCare, enabled: true },
  { id: "b4", title: "Kitchen Upgrades", description: "Appliances & cookware", offer: "From ৳390", cta: "Shop Now", href: "/category/home-kitchen", image: promoKitchen, enabled: true },
];

export const summerVegetable: Promo & { startsAt: string; endsAt: string } = {
  id: "summer-veg",
  title: "SUMMER VEGETABLE",
  description: "Farm-fresh greens and seasonal vegetables, delivered to your door.",
  offer: "Save up to 5% OFF",
  cta: "Shop Now",
  href: "/category/home-kitchen",
  image: summerVeg,
  enabled: true,
  startsAt: "2026-01-01T00:00:00+06:00",
  endsAt: "2027-03-31T23:59:59+06:00",
};

export const flashSaleConfig = {
  enabled: true,
  title: "Flash Sale",
  startsAt: "2026-11-01T00:00:00+06:00",
  endsAt: "2026-12-31T23:59:59+06:00",
};

export const isPromoActive = (p: { enabled: boolean; startsAt: string; endsAt: string }, now = Date.now()) =>
  p.enabled && now >= Date.parse(p.startsAt) && now < Date.parse(p.endsAt);

export const contactInfo = {
  // Placeholder — replace with the official Sholok contact number.
  phone: "Contact Number",
};
