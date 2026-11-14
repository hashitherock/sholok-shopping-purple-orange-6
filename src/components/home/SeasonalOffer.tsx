import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { seasonalOffer, popupConfig, shouldShowOfferPopup } from "@/data/promotions";
import { useActivePromotion } from "@/hooks/useActivePromotion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function SeasonalOfferBanner() {
  const active = useActivePromotion(seasonalOffer);
  if (!active) return null;
  return <section aria-label="Special Seasonal Offer" className="container-shop mt-10">
    <div className="seasonal-panel relative min-h-80 overflow-hidden sm:min-h-72 lg:min-h-96">
      <img src={seasonalOffer.image} alt="Seasonal fashion essentials with a purple kurti, sneakers and accessories" width={1536} height={512} loading="lazy" className="absolute inset-0 size-full object-cover object-right" />
      <div className="seasonal-shade absolute inset-0" />
      <div className="relative flex min-h-80 max-w-[75%] flex-col justify-center gap-3 px-5 py-8 sm:min-h-72 sm:max-w-[55%] sm:px-10 lg:min-h-96 lg:max-w-[48%]">
        <p className="text-xs font-bold uppercase text-sale">{seasonalOffer.eyebrow}</p>
        <h2 className="font-display text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl">{seasonalOffer.title}</h2>
        <p className="text-sm font-medium sm:text-lg">{seasonalOffer.description}</p>
        <p className="text-lg font-extrabold text-sale sm:text-2xl">{seasonalOffer.offer}</p>
        <Button variant="sale" asChild className="mt-2 h-11 w-fit px-6 font-bold"><Link to="/collection/$type" params={{ type: "seasonal" }}>{seasonalOffer.cta}<ArrowUpRight /></Link></Button>
      </div>
    </div>
  </section>;
}

export function SeasonalOfferPopup() {
  const active = useActivePromotion(seasonalOffer);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!active) { setOpen(false); return; }
    let seen = true;
    try { seen = sessionStorage.getItem(popupConfig.sessionKey) === "shown"; } catch { return; }
    if (!shouldShowOfferPopup(seasonalOffer, seen)) return;
    const timer = window.setTimeout(() => {
      if (!shouldShowOfferPopup(seasonalOffer, sessionStorage.getItem(popupConfig.sessionKey) === "shown")) return;
      sessionStorage.setItem(popupConfig.sessionKey, "shown");
      setOpen(true);
    }, popupConfig.delayMs);
    return () => window.clearTimeout(timer);
  }, [active]);
  return <Dialog open={open} onOpenChange={setOpen}><DialogContent className="w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-lg border-0 p-0 gap-0 max-h-[90dvh] overflow-y-auto">
    <img src={seasonalOffer.image} alt="Seasonal style collection" width={1536} height={512} className="h-44 w-full object-cover object-right sm:h-56" />
    <div className="px-6 py-7 text-center sm:px-10">
      <p className="mb-3 text-xs font-extrabold uppercase text-sale">{seasonalOffer.eyebrow}</p>
      <DialogTitle className="font-display text-3xl text-primary">{seasonalOffer.title}</DialogTitle>
      <DialogDescription className="mt-3">{seasonalOffer.description}</DialogDescription>
      <p className="mt-4 text-2xl font-extrabold text-sale">{seasonalOffer.offer}</p>
      <Button asChild variant="sale" className="mt-6 h-12 w-full font-bold"><Link to="/collection/$type" params={{ type: "seasonal" }} onClick={() => setOpen(false)}>{seasonalOffer.cta}<ArrowUpRight /></Link></Button>
    </div>
  </DialogContent></Dialog>;
}