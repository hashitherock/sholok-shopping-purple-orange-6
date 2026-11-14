import {
  Venus,
  Shirt,
  Sparkles,
  HandHeart,
  Gem,
  HeartPulse,
  Baby,
  CookingPot,
  SprayCan,
  NotebookPen,
  PawPrint,
  Volleyball,
  CarFront,
  type LucideIcon,
} from "lucide-react";
import type { CategorySlug } from "@/types/product";

export interface Category {
  slug: CategorySlug;
  name: string;
  icon: LucideIcon;
  related: CategorySlug[];
}

export const categories: Category[] = [
  { slug: "womens-clothing", name: "Women's Clothing", icon: Venus, related: ["fashion-lifestyle", "beauty-makeup"] },
  { slug: "mens-clothing", name: "Men's Clothing", icon: Shirt, related: ["fashion-lifestyle"] },
  { slug: "beauty-makeup", name: "Beauty & Makeup", icon: Sparkles, related: ["personal-care", "womens-clothing"] },
  { slug: "personal-care", name: "Personal Care", icon: HandHeart, related: ["beauty-makeup", "health-wellness"] },
  { slug: "fashion-lifestyle", name: "Fashion & Lifestyle", icon: Gem, related: ["mens-clothing", "womens-clothing"] },
  { slug: "health-wellness", name: "Health & Wellness", icon: HeartPulse, related: ["personal-care"] },
  { slug: "baby-care", name: "Baby Care", icon: Baby, related: ["personal-care", "toys-sports"] },
  { slug: "home-kitchen", name: "Home & Kitchen", icon: CookingPot, related: ["cleaning-supplies"] },
  { slug: "cleaning-supplies", name: "Cleaning Supplies", icon: SprayCan, related: ["home-kitchen"] },
  { slug: "stationery-office", name: "Stationery & Office", icon: NotebookPen, related: ["toys-sports"] },
  { slug: "pet-care", name: "Pet Care", icon: PawPrint, related: ["home-kitchen"] },
  { slug: "toys-sports", name: "Toys & Sports", icon: Volleyball, related: ["baby-care"] },
  { slug: "vehicle-essentials", name: "Vehicle Essentials", icon: CarFront, related: ["cleaning-supplies"] },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
