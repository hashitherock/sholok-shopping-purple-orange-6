import { Phone, Truck } from "lucide-react";
import { contactInfo } from "@/data/promotions";

export function TopBar() {
  return (
    <div className="border-b border-border bg-primary-soft text-xs">
      <div className="container-shop flex h-9 items-center justify-between gap-4">
        <p className="flex min-w-0 items-center gap-2 truncate text-muted-foreground">
          <Truck className="size-3.5 shrink-0 text-primary" aria-hidden />
          <span className="truncate">Welcome to <b className="text-primary">SHOLOK</b> — fast delivery across Bangladesh</span>
        </p>
        <p className="flex shrink-0 items-center gap-1.5 font-semibold text-foreground">
          <Phone className="size-3.5 text-primary" aria-hidden />
          <span>{contactInfo.phone}</span>
        </p>
      </div>
    </div>
  );
}
