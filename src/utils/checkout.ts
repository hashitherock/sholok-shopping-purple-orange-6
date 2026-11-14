export function checkoutTotals(subtotal: number) {
  return { subtotal, total: subtotal };
}

export function createOrderDraft(items: { productId: string; qty: number; price: number; name: string }[], customer: { name: string; phone: string; address: string; city: string }, now = Date.now()) {
  return { id: `SH-${now}`, createdAt: new Date(now).toISOString(), status: "Saved draft" as const, items, customer, ...checkoutTotals(items.reduce((sum, item) => sum + item.price * item.qty, 0)) };
}
export type OrderDraft = ReturnType<typeof createOrderDraft>;