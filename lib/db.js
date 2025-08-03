let products = [
  {
    id: "1",
    name: "Laptop",
    price: 999,
    category: "electronics",
    active: true,
  },
  { id: "2", name: "Coffee Mug", price: 15, category: "kitchen", active: true },
  {
    id: "3",
    name: "Desk Chair",
    price: 299,
    category: "furniture",
    active: true,
  },
];

// Simulate database operations with realistic delays 

const simulateDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));

export const db = {
  async query(sql, params = []) {
    await simulateDelay();

    if (sql.includes("SELECT * FROM products WHERE active = true")) {
      return products.filter((p) => p.active);
    }

    if (sql.includes("SELECT * FROM products WHERE id = ?")) {
      const id = params[0];
      const product = products.find((p) => p.id === id);
      return product ? [product] : [];
    }

    if (sql.includes("SELECT * FROM discounts WHERE category = ?")) {
      const category = params[0];
      // Simulate some discount data
      return [
        { id: 1, category, percentage: 10, active: true },
        { id: 2, category, percentage: 5, active: false },
      ];
    }

    throw new Error("Query not implemented in demo");
  },
};
