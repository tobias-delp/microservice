# order-service

Nimmt Bestellungen an und ruft `product-service` sowie `inventory-service` per
HTTP auf.

## API

- `GET /health`
- `GET /orders`
- `POST /orders`

## Environment Variables

- `PRODUCT_SERVICE_URL`, Default: `http://localhost:3001`
- `INVENTORY_SERVICE_URL`, Default: `http://localhost:3002`

## Lokal starten

```bash
npm install
npm start
```

## Beispiel

```bash
curl -X POST http://localhost:3003/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":"1","quantity":2}'
```

