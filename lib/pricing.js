// lib/pricing.js
import { db } from "./db.js";

export async function calculateDiscount(price, category) {
  // Simulate complex discount logic
  const discounts = await db.query(
    "SELECT * FROM discounts WHERE category = ?",
    [category]
  );

  let finalPrice = price;
  let totalDiscount = 0;

  for (const discount of discounts) {
    if (discount.active) {
      const discountAmount = price * (discount.percentage / 100);
      finalPrice -= discountAmount;
      totalDiscount += discountAmount;
    }
  }

  return {
    finalPrice: Math.round(finalPrice * 100) / 100, // Round to 2 decimal places
    discount: Math.round(totalDiscount * 100) / 100,
  };
}
