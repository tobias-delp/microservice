# Iteration 01: Lokal ohne Docker

Ziel: Services und synchrone HTTP-Kommunikation verstehen.

## Start

In vier Terminals:

```bash
cd services/product-service && npm install && npm start
cd services/inventory-service && npm install && npm start
cd services/order-service && npm install && npm start
cd services/api-gateway && npm install && npm start
```

## Test

```bash
curl http://localhost:3000/products
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":"1","quantity":2}'
```

