# api-gateway

Zentraler Einstiegspunkt fuer Clients.

## API

- `GET /health`
- `GET /products`
- `POST /orders`

## Environment Variables

- `PRODUCT_SERVICE_URL`, Default: `http://localhost:3001`
- `ORDER_SERVICE_URL`, Default: `http://localhost:3003`

## Lokal starten

```bash
npm install
npm start
```

