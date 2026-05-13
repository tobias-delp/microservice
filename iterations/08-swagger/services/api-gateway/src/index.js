import express from "express";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = process.env.PORT || 3000;
const productServiceUrl = process.env.PRODUCT_SERVICE_URL || "http://localhost:3001";
const orderServiceUrl = process.env.ORDER_SERVICE_URL || "http://localhost:3003";

app.use(express.json());

const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Mini-Shop API Gateway",
    version: "1.0.0",
    description: "Public API for products and orders in the Mini-Shop example."
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local API Gateway"
    }
  ],
  paths: {
    "/health": {
      get: {
        summary: "Check gateway health",
        responses: {
          200: {
            description: "Gateway is healthy"
          }
        }
      }
    },
    "/products": {
      get: {
        summary: "List products",
        responses: {
          200: {
            description: "Product list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" }
                }
              }
            }
          },
          502: {
            description: "Product service unavailable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/orders": {
      post: {
        summary: "Create an order",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateOrderRequest" },
              examples: {
                validOrder: {
                  value: {
                    productId: "1",
                    quantity: 2
                  }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "Order created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" }
              }
            }
          },
          400: {
            description: "Invalid request body",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ValidationErrorResponse" }
              }
            }
          },
          409: {
            description: "Not enough inventory",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          },
          502: {
            description: "Order service unavailable",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Product: {
        type: "object",
        required: ["id", "name", "price", "currency"],
        properties: {
          id: { type: "string", example: "1" },
          name: { type: "string", example: "Notebook" },
          price: { type: "number", example: 899 },
          currency: { type: "string", example: "EUR" }
        }
      },
      CreateOrderRequest: {
        type: "object",
        required: ["productId", "quantity"],
        properties: {
          productId: { type: "string", pattern: "^\\d+$", example: "1" },
          quantity: { type: "integer", minimum: 1, example: 2 }
        }
      },
      Order: {
        type: "object",
        required: ["id", "productId", "quantity", "productName", "total", "currency", "createdAt"],
        properties: {
          id: { type: "string", example: "1" },
          productId: { type: "string", example: "1" },
          quantity: { type: "integer", example: 2 },
          productName: { type: "string", example: "Notebook" },
          total: { type: "number", example: 1798 },
          currency: { type: "string", example: "EUR" },
          createdAt: { type: "string", format: "date-time" }
        }
      },
      ErrorResponse: {
        type: "object",
        required: ["error"],
        properties: {
          error: { type: "string" },
          detail: { type: "string" }
        }
      },
      ValidationErrorResponse: {
        type: "object",
        required: ["error", "issues"],
        properties: {
          error: { type: "string", example: "Invalid request body" },
          issues: {
            type: "array",
            items: {
              type: "object",
              required: ["path", "message"],
              properties: {
                path: { type: "string", example: "quantity" },
                message: { type: "string", example: "Number must be greater than 0" }
              }
            }
          }
        }
      }
    }
  }
};

app.get("/openapi.json", (req, res) => {
  res.json(openApiDocument);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

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
