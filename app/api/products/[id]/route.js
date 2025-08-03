// app/api/products/[id]/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { calculateDiscount } from "@/lib/pricing";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Get product details
    const product = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Calculate pricing with discounts
    const pricing = await calculateDiscount(product.price, product.category);

    return NextResponse.json({
      ...product,
      finalPrice: pricing.finalPrice,
      discount: pricing.discount,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
