import { useEffect, useState } from "react";
import { isPromoActive, type ScheduledPromo } from "@/data/promotions";

export function useActivePromotion(promo: ScheduledPromo) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const check = () => setActive(isPromoActive(promo));
    check();
    const timer = window.setInterval(check, 1000);
    return () => window.clearInterval(timer);
  }, [promo]);
  return active;
}