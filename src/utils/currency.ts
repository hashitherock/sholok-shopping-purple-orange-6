export const formatBDT = (n: number) =>
  "৳" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const discountPercent = (price: number, regular?: number) =>
  regular && regular > price ? Math.round(((regular - price) / regular) * 100) : 0;
