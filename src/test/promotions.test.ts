import { describe, expect, it } from "vitest";
import { isPromoActive, seasonalOffer, shouldShowOfferPopup } from "@/data/promotions";

const active = { ...seasonalOffer, enabled: true, startsAt: "2026-11-14T00:00:00Z", endsAt: "2026-11-15T00:00:00Z" };
const now = Date.parse("2026-11-14T12:00:00Z");
describe("Promotional offer rules", () => {
  it("does not display an unconfirmed offer", () => expect(isPromoActive(seasonalOffer, now)).toBe(false));
  it("displays enabled offers only inside their active period", () => {
    expect(isPromoActive(active, now)).toBe(true);
    expect(isPromoActive(active, Date.parse("2026-11-13T23:59:59Z"))).toBe(false);
    expect(isPromoActive(active, Date.parse(active.endsAt))).toBe(false);
    expect(isPromoActive({ ...active, enabled: false }, now)).toBe(false);
  });
  it("shows an active offer popup only once per session", () => {
    expect(shouldShowOfferPopup(active, false, now)).toBe(true);
    expect(shouldShowOfferPopup(active, true, now)).toBe(false);
  });
  it("does not show a popup without an active offer", () => expect(shouldShowOfferPopup({ ...active, enabled: false }, false, now)).toBe(false));
});