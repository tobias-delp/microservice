import express from "express";
import { createOrderSchema } from "./schemas/orderSchemas.js";

const app = express();
const port = process.env.PORT || 3003;
const productServiceUrl = process.env.PRODUCT_SERVICE_URL || "http://localhost:3001";
const inventoryServiceUrl = process.env.INVENTORY_SERVICE_URL || "http://localhost:3002";

const orders = [];

app.use(express.json());

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = body.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "order-service" });
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.post("/orders", async (req, res) => {
  const result = createOrderSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid request body",
      issues: result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  const { productId, quantity } = result.data;

  try {
    const [product, stock] = await Promise.all([
      fetchJson(`${productServiceUrl}/products/${productId}`),
      fetchJson(`${inventoryServiceUrl}/inventory/${productId}`)
    ]);

    if (stock.quantity < quantity) {
      return res.status(409).json({
        error: "Not enough inventory",
        available: stock.quantity
      });
    }

    const order = {
      id: String(orders.length + 1),
      productId,
      quantity,
      productName: product.name,
      total: product.price * quantity,
      currency: product.currency,
      createdAt: new Date().toISOString()
    };

    orders.push(order);

    return res.status(201).json(order);
  } catch (error) {
    return res.status(502).json({
      error: "Downstream service request failed",
      detail: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`order-service listening on port ${port}`);
});
