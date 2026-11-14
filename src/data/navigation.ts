export const collections = {
  "flash-sale": { title: "Flash Sale", description: "Limited-time deals on top picks." },
  trending: { title: "Trending Items", description: "What everyone is shopping right now." },
  "new-arrivals": { title: "New Arrivals", description: "The latest products just landed." },
  "best-sellers": { title: "Best Sellers", description: "Our most-loved products of all time." },
  all: { title: "All Products", description: "Browse the full Sholok catalogue." },
  discover: { title: "Discover", description: "Fresh finds across fashion, beauty and home." },
  offers: { title: "Offers & Deals", description: "Explore reduced-price picks across the store." },
  bundles: { title: "Bundle Deals", description: "Shop ready-made sets and paired essentials." },
  festivals: { title: "Festivals & Celebrations", description: "Dress up, give beautifully and celebrate." },
  brands: { title: "Shop by Brand", description: "Explore your favourite brands." },
  seasonal: { title: "Everyday Style", description: "Discover More, Love More." },
} as const;

export type CollectionKey = keyof typeof collections;

export type NavItem =
  | { label: string; to: "/" }
  | { label: string; to: "/collection/$type"; type: CollectionKey }
  | { label: string; to: "/become-seller" };

export const mainNav: NavItem[] = [
  { label: "Flash Sale", to: "/collection/$type", type: "flash-sale" },
  { label: "Discover", to: "/collection/$type", type: "discover" },
  { label: "Offers & Deals", to: "/collection/$type", type: "offers" },
  { label: "Bundle Deals", to: "/collection/$type", type: "bundles" },
  { label: "Festivals & Celebrations", to: "/collection/$type", type: "festivals" },
  { label: "Shop by Brand", to: "/collection/$type", type: "brands" },
  { label: "Become a Seller", to: "/become-seller" },
];

export const deliveryLocations = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];
