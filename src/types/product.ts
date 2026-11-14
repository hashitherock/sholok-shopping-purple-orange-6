export type CategorySlug =
  | "womens-clothing"
  | "mens-clothing"
  | "beauty-makeup"
  | "personal-care"
  | "fashion-lifestyle"
  | "health-wellness"
  | "baby-care"
  | "home-kitchen"
  | "cleaning-supplies"
  | "stationery-office"
  | "pet-care"
  | "toys-sports"
  | "vehicle-essentials";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategorySlug;
  /** Current selling price in BDT */
  price: number;
  /** Original price, only when discounted */
  regularPrice?: number;
  rating?: number;
  reviews?: number;
  stock: number;
  image: string;
  description?: string;
  tags: string[];
  /** Units sold – drives Trending / Best Sellers */
  sold: number;
  addedAt: string;
  flashSale?: boolean;
}

export interface CartLine {
  productId: string;
  qty: number;
}
