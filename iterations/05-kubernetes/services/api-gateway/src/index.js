import express from "express";

const app = express();
const port = process.env.PORT || 3000;
const productServiceUrl = process.env.PRODUCT_SERVICE_URL || "http://localhost:3001";
const orderServiceUrl = process.env.ORDER_SERVICE_URL || "http://localhost:3003";

app.use(express.json());

async function proxyJson(url, options = {}) {
  const response = await fetch(url, options);
  const body = await response.json().catch(() => ({}));

  return {
    status: response.status,
    body
  };
}

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "api-gateway" });
});

app.get("/products", async (req, res) => {
  try {
    const result = await proxyJson(`${productServiceUrl}/products`);
    return res.status(result.status).json(result.body);
  } catch (error) {
    return res.status(502).json({ error: "Product service unavailable" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const result = await proxyJson(`${orderServiceUrl}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    return res.status(result.status).json(result.body);
  } catch (error) {
    return res.status(502).json({ error: "Order service unavailable" });
  }
});

app.listen(port, () => {
  console.log(`api-gateway listening on port ${port}`);
});

