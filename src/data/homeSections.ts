// Reorder, add or remove homepage sections here.
export const homeSections = ["hero", "seasonalOffer", "promoBanners", "flashSale", "trending", "moreToLove"] as const;
export type HomeSectionKey = (typeof homeSections)[number];
