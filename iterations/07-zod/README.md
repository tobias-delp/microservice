# Iteration 07: Zod

Ziel: Request-Validierung als Teil des API-Vertrags verstehen.

In dieser Iteration validieren die Services ihre eigenen API-Eingaben mit Zod.
Der `order-service` prueft den Request-Body von `POST /orders`. Der
`product-service` und der `inventory-service` pruefen ihre Route-Parameter.

Die Zod-Schemas liegen in:

```text
services/order-service/src/schemas/orderSchemas.js
services/product-service/src/schemas/productSchemas.js
services/inventory-service/src/schemas/inventorySchemas.js
```

## Ausgangspunkt

Der Endpoint erwartet:

```json
{
  "productId": "1",
  "quantity": 2
}
```

Regeln:

- `productId` muss eine numerische String-ID sein
- `quantity` muss eine positive ganze Zahl sein
- Ungueltige Requests liefern `400`

## Ausprobieren

Services starten:

```bash
docker compose -f compose/docker-compose.yml up --build
```

Gueltiger Request:

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":"1","quantity":2}'
```

Ungueltiger Request:

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":"1","quantity":0}'
```

## Uebungsaufgaben

1. Erweitere `createOrderSchema` um ein optionales Feld `customerEmail`.
2. Validiere `customerEmail` als E-Mail-Adresse, wenn das Feld vorhanden ist.
3. Gib Validierungsfehler so aus, dass der Client erkennen kann, welches Feld
   betroffen ist.
4. Teste mindestens drei Fehlerfaelle mit `curl`.
5. Bonus: Ergaenze ein Feld `notes`, das maximal 200 Zeichen lang sein darf.
6. Bonus: Ergaenze eine Query-Validierung fuer `GET /products?currency=EUR`.

## Lernpunkte

- Express parst JSON, aber validiert es nicht automatisch
- Zod prueft Daten zur Laufzeit
- Jeder Service validiert seine eigene API-Grenze
- Validierungsfehler gehoeren zum API-Verhalten
- Saubere Fehlerantworten erleichtern Client-Entwicklung
