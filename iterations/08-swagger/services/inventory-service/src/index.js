import express from "express";
import { inventoryParamsSchema } from "./schemas/inventorySchemas.js";

const app = express();
const port = process.env.PORT || 3002;

const inventory = {
  "1": { productId: "1", quantity: 12 },
  "2": { productId: "2", quantity: 4 },
  "3": { productId: "3", quantity: 0 }
};

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "inventory-service" });
});

app.get("/inventory/:productId", (req, res) => {
  const result = inventoryParamsSchema.safeParse(req.params);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid route parameters",
      issues: result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  const stock = inventory[result.data.productId];

  if (!stock) {
    return res.status(404).json({ error: "Inventory item not found" });
  }

  return res.json(stock);
});

app.listen(port, () => {
  console.log(`inventory-service listening on port ${port}`);
});
