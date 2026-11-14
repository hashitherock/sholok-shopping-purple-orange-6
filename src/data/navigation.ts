export const collections = {
  "flash-sale": { title: "Flash Sale", description: "Limited-time deals on top picks." },
  trending: { title: "Trending Items", description: "What everyone is shopping right now." },
  "new-arrivals": { title: "New Arrivals", description: "The latest products just landed." },
  "best-sellers": { title: "Best Sellers", description: "Our most-loved products of all time." },
  all: { title: "All Products", description: "Browse the full Sholok catalogue." },
} as const;

export type CollectionKey = keyof typeof collections;

export type NavItem =
  | { label: string; to: "/" }
  | { label: string; to: "/collection/$type"; type: CollectionKey }
  | { label: string; to: "/become-seller" };

export const mainNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Flash Sale", to: "/collection/$type", type: "flash-sale" },
  { label: "Trending", to: "/collection/$type", type: "trending" },
  { label: "New Arrivals", to: "/collection/$type", type: "new-arrivals" },
  { label: "Best Sellers", to: "/collection/$type", type: "best-sellers" },
  { label: "Become a Seller", to: "/become-seller" },
];

export const deliveryLocations = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];
