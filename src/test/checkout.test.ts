import { expect, it } from "vitest";
import { createOrderDraft } from "@/utils/checkout";
it("saves checkout as an unpaid, unsubmitted browser draft with the selected quantities", () => {
  const draft = createOrderDraft([{ productId: "p1", name: "Kurti", qty: 2, price: 1450 }], { name: "Hashi", phone: "01234567890", address: "Dhaka address", city: "Dhaka" }, 1794657600000);
  expect(draft.status).toBe("Saved draft");
  expect(draft.total).toBe(2900);
  expect(draft.items[0]?.qty).toBe(2);
});