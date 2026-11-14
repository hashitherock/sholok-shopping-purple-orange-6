import { createFileRoute } from "@tanstack/react-router";
import { homeSections, type HomeSectionKey } from "@/data/homeSections";
import { HeroSection } from "@/components/home/HeroSection";
import { PromotionalBanners } from "@/components/home/PromotionalBanners";
import { FlashSale } from "@/components/home/FlashSale";
import { TrendingItems, MoreToLove } from "@/components/home/ProductSections";
import { SeasonalOfferBanner, SeasonalOfferPopup } from "@/components/home/SeasonalOffer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHOLOK Shopping — Fashion, Beauty, Home & More" },
      { name: "description", content: "Shop women's & men's clothing, beauty, personal care, home & kitchen and more with flash deals at SHOLOK." },
      { property: "og:title", content: "SHOLOK Shopping — Fashion, Beauty, Home & More" },
      { property: "og:description", content: "Premium online shopping in Bangladesh with daily flash deals." },
    ],
  }),
  component: Index,
});

const sectionMap: Record<HomeSectionKey, () => React.JSX.Element | null> = {
  hero: HeroSection,
  promoBanners: PromotionalBanners,
  flashSale: FlashSale,
  trending: TrendingItems,
  seasonalOffer: SeasonalOfferBanner,
  moreToLove: MoreToLove,
};

function Index() {
  return (
    <>
      <h1 className="sr-only">SHOLOK Shopping</h1>
      <SeasonalOfferPopup />
      {homeSections.map((k) => { const S = sectionMap[k]; return <S key={k} />; })}
    </>
  );
}
