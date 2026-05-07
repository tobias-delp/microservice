import express from "express";

const app = express();
const port = process.env.PORT || 3001;

const products = [
  { id: "1", name: "Notebook", price: 899, currency: "EUR" },
  { id: "2", name: "Headphones", price: 129, currency: "EUR" },
  { id: "3", name: "Keyboard", price: 79, currency: "EUR" }
];

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "product-service" });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((item) => item.id === req.params.id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  return res.json(product);
});

app.listen(port, () => {
  console.log(`product-service listening on port ${port}`);
});

