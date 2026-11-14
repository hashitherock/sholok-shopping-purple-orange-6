// Reorder, add or remove homepage sections here.
export const homeSections = ["hero", "promoBanners", "flashSale", "trending", "summerVegetable", "moreToLove"] as const;
export type HomeSectionKey = (typeof homeSections)[number];
