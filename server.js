const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const products = [
  { id: 1, name: "Ajvar", price: 4.90 },
  { id: 2, name: "Honey", price: 6.50 },
  { id: 3, name: "Olive Oil", price: 12.00 }
];

app.get("/", (req, res) => {
  res.send("Brainster Practice Shop API is running!");
});

app.get("/items", (req, res) => {
  res.json(products);
});

app.get("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(item => item.id === id);

  if (!product) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json(product);
});
// Product Quality Assistant
app.post("/product-quality/check", (req, res) => {
  const product = req.body;

  const requiredFields = ["name", "brand", "category"];
  const missingFields = [];

  requiredFields.forEach(field => {
    if (!product[field]) {
      missingFields.push(field);
    }
  });

  const status = missingFields.length > 0 ? "incomplete" : "complete";

  res.json({
    product_name: product.name || null,
    validation: {
      status: status,
      missing_fields: missingFields
    },
    requires_human_review: status !== "complete"
  });
});
app.listen(PORT, () => {
  console.log(`Shop API running on port ${PORT}`);
});
