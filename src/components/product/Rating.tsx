import { Star } from "lucide-react";

export function Rating({ value, reviews }: { value?: number | undefined; reviews?: number | undefined }) {
  if (value === undefined) return null;
  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground" aria-label={`Rated ${value} out of 5${reviews ? `, ${reviews} reviews` : ""}`}>
      <Star className="size-3.5 fill-star text-star" aria-hidden />
      <span className="font-bold text-foreground">{value.toFixed(1)}</span>
      {reviews !== undefined && <span>({reviews})</span>}
    </div>
  );
}
