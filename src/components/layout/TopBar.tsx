import { Phone, Truck } from "lucide-react";
import { contactInfo } from "@/data/promotions";

export function TopBar() {
  return (
    <div className="border-b border-border bg-sale text-xs">
      <div className="container-shop flex h-9 items-center justify-between gap-4">
        <p className="flex min-w-0 items-center gap-2 truncate text-sale-foreground">
          <Truck className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">Welcome to <b>SHOLOK</b> — fashion, beauty & everyday essentials</span>
        </p>
        <p className="hidden shrink-0 items-center gap-1.5 font-semibold text-sale-foreground sm:flex">
          <Phone className="size-3.5" aria-hidden />
          <span>{contactInfo.phone}</span>
        </p>
      </div>
    </div>
  );
}
