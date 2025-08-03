// app/products/page.js
async function getProducts() {
  // During build, skip the fetch entirely
  if (process.env.NODE_ENV === "development" && !process.env.VERCEL_URL) {
    // In development, we can safely fetch from localhost
    const res = await fetch("http://localhost:3000/api/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  }

  // In production on Vercel
  if (process.env.VERCEL_URL) {
    const res = await fetch(`https://${process.env.VERCEL_URL}/api/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  }

  // Fallback for build time - return mock data
  return [
    { id: "1", name: "Laptop", price: 999 },
    { id: "2", name: "Coffee Mug", price: 15 },
    { id: "3", name: "Desk Chair", price: 299 },
  ];
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
