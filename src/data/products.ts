// DEMONSTRATION DATA ONLY — mock products, prices and reviews.
import type { Product } from "@/types/product";
import kurti from "@/assets/products/kurti.jpg";
import polo from "@/assets/products/polo.jpg";
import lipstick from "@/assets/products/lipstick.jpg";
import serum from "@/assets/products/serum.jpg";
import sneakers from "@/assets/products/sneakers.jpg";
import watch from "@/assets/products/watch.jpg";
import vitamin from "@/assets/products/vitamin.jpg";
import babyLotion from "@/assets/products/baby-lotion.jpg";
import cookware from "@/assets/products/cookware.jpg";
import detergent from "@/assets/products/detergent.jpg";
import notebooks from "@/assets/products/notebooks.jpg";
import dogFood from "@/assets/products/dog-food.jpg";
import football from "@/assets/products/football.jpg";
import carFreshener from "@/assets/products/car-freshener.jpg";
import jeans from "@/assets/products/jeans.jpg";
import hairDryer from "@/assets/products/hair-dryer.jpg";
import kettle from "@/assets/products/kettle.jpg";
import shampoo from "@/assets/products/shampoo.jpg";

export const products: Product[] = [
  { id: "p1", name: "Floral Block-Print Cotton Kurti", brand: "Aarong Style", category: "womens-clothing", price: 1450, regularPrice: 1950, rating: 4.7, reviews: 214, stock: 32, image: kurti, description: "Breathable cotton kurti with hand block floral print and embroidered neckline. Perfect for everyday elegance.", tags: ["kurti", "dress", "women", "cotton", "ethnic"], sold: 1820, addedAt: "2026-10-20", flashSale: true },
  { id: "p2", name: "Classic Pique Polo Shirt – Navy", brand: "Urban Thread", category: "mens-clothing", price: 890, regularPrice: 1190, rating: 4.5, reviews: 168, stock: 54, image: polo, description: "Soft pique cotton polo with a tailored fit and ribbed collar.", tags: ["polo", "shirt", "men", "tshirt"], sold: 2410, addedAt: "2026-09-02" },
  { id: "p3", name: "Velvet Matte Lipstick – Ruby Red", brand: "Lumière", category: "beauty-makeup", price: 650, regularPrice: 850, rating: 4.8, reviews: 392, stock: 80, image: lipstick, description: "Long-wear, comfortable matte finish enriched with vitamin E.", tags: ["lipstick", "makeup", "lips", "beauty"], sold: 3150, addedAt: "2026-10-28", flashSale: true },
  { id: "p4", name: "Hyaluronic Hydrating Face Serum 30ml", brand: "Lumière", category: "beauty-makeup", price: 1250, rating: 4.6, reviews: 127, stock: 40, image: serum, description: "Lightweight serum that deeply hydrates and plumps the skin.", tags: ["serum", "skincare", "face", "beauty"], sold: 1290, addedAt: "2026-11-01" },
  { id: "p5", name: "Everyday Leather Sneakers – White", brand: "Stride", category: "fashion-lifestyle", price: 2890, regularPrice: 3590, rating: 4.6, reviews: 241, stock: 18, image: sneakers, description: "Minimal white leather sneakers with cushioned insole.", tags: ["sneakers", "shoes", "footwear", "casual"], sold: 1975, addedAt: "2026-10-12", flashSale: true },
  { id: "p6", name: "Heritage Leather Strap Wristwatch", brand: "Tempo", category: "fashion-lifestyle", price: 3490, rating: 4.4, reviews: 88, stock: 12, image: watch, description: "Stainless steel case, quartz movement and genuine leather strap.", tags: ["watch", "accessories", "men", "gift"], sold: 640, addedAt: "2026-11-03" },
  { id: "p7", name: "Vitamin D3 + C Daily Immunity 60 Caps", brand: "VitaLife", category: "health-wellness", price: 720, regularPrice: 900, rating: 4.5, reviews: 156, stock: 64, image: vitamin, description: "Daily supplement supporting immunity and bone health.", tags: ["vitamin", "supplement", "health"], sold: 1430, addedAt: "2026-08-15" },
  { id: "p8", name: "Gentle Baby Lotion 400ml", brand: "Little Bear", category: "baby-care", price: 480, regularPrice: 560, rating: 4.9, reviews: 302, stock: 70, image: babyLotion, description: "Tear-free, dermatologist-tested lotion for delicate skin.", tags: ["baby", "lotion", "skincare"], sold: 2650, addedAt: "2026-07-10", flashSale: true },
  { id: "p9", name: "Stainless Steel Casserole Pot 5L", brand: "HomeCraft", category: "home-kitchen", price: 1890, regularPrice: 2490, rating: 4.6, reviews: 97, stock: 22, image: cookware, description: "Tri-ply base for even heating with tempered glass lid.", tags: ["cookware", "pot", "kitchen"], sold: 880, addedAt: "2026-10-05", flashSale: true },
  { id: "p10", name: "Liquid Laundry Detergent 2L", brand: "FreshNest", category: "cleaning-supplies", price: 540, rating: 4.3, reviews: 74, stock: 90, image: detergent, description: "Concentrated formula that removes tough stains in cold water.", tags: ["detergent", "laundry", "cleaning"], sold: 1710, addedAt: "2026-06-20" },
  { id: "p11", name: "Spiral Notebook & Gel Pen Set", brand: "Scribe", category: "stationery-office", price: 390, regularPrice: 450, rating: 4.4, reviews: 61, stock: 120, image: notebooks, description: "Four A5 ruled notebooks with four smooth gel pens.", tags: ["notebook", "pen", "stationery", "school"], sold: 990, addedAt: "2026-11-02" },
  { id: "p12", name: "Premium Adult Dog Food 3kg", brand: "PawPrime", category: "pet-care", price: 1650, rating: 4.7, reviews: 83, stock: 0, image: dogFood, description: "Balanced nutrition with real chicken and rice.", tags: ["dog", "pet", "food"], sold: 560, addedAt: "2026-09-18" },
  { id: "p13", name: "Match Grade Football Size 5", brand: "Kickoff", category: "toys-sports", price: 1150, regularPrice: 1400, rating: 4.5, reviews: 132, stock: 35, image: football, description: "Hand-stitched PU football for training and matches.", tags: ["football", "sports", "ball", "soccer"], sold: 1180, addedAt: "2026-10-22", flashSale: true },
  { id: "p14", name: "Car Air Freshener + Microfiber Cloth", brand: "AutoCare", category: "vehicle-essentials", price: 420, rating: 4.2, reviews: 45, stock: 60, image: carFreshener, description: "Long-lasting ocean scent with an ultra-soft cleaning cloth.", tags: ["car", "freshener", "vehicle", "cleaning"], sold: 720, addedAt: "2026-11-04" },
  { id: "p15", name: "Slim Fit Stretch Denim Jeans", brand: "Urban Thread", category: "mens-clothing", price: 1690, regularPrice: 2190, rating: 4.5, reviews: 189, stock: 28, image: jeans, description: "Comfort stretch denim with a modern slim fit.", tags: ["jeans", "denim", "men", "pants"], sold: 2080, addedAt: "2026-09-25" },
  { id: "p16", name: "Ionic Pro Hair Dryer 2000W", brand: "Glamour", category: "personal-care", price: 2350, regularPrice: 2990, rating: 4.6, reviews: 110, stock: 15, image: hairDryer, description: "Fast-drying ionic technology with 3 heat settings.", tags: ["hair dryer", "hair", "personal care"], sold: 930, addedAt: "2026-10-30" },
  { id: "p17", name: "Electric Kettle 1.7L Stainless", brand: "HomeCraft", category: "home-kitchen", price: 1490, rating: 4.4, reviews: 140, stock: 26, image: kettle, description: "Rapid boil with auto shut-off and boil-dry protection.", tags: ["kettle", "kitchen", "appliance"], sold: 1560, addedAt: "2026-08-30" },
  { id: "p18", name: "Nourishing Herbal Shampoo 340ml", brand: "Pure Earth", category: "personal-care", price: 360, regularPrice: 420, rating: 4.3, reviews: 98, stock: 85, image: shampoo, description: "Sulfate-free herbal shampoo for soft, shiny hair.", tags: ["shampoo", "hair", "personal care"], sold: 1890, addedAt: "2026-07-28" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
