# Iteration 08: Swagger / OpenAPI

Ziel: Eine API als dokumentierten und ausprobierbaren Vertrag beschreiben.

In dieser Iteration stellt das `api-gateway` eine OpenAPI-Spezifikation und
Swagger UI bereit. Die Zod-Validierung aus Iteration 07 bleibt in den Services
erhalten.

Endpoints:

- `GET /openapi.json`
- `GET /docs`

## Ausprobieren

Services starten:

```bash
docker compose -f compose/docker-compose.yml up --build
```

Swagger UI im Browser oeffnen:

```text
http://localhost:3000/docs
```

OpenAPI JSON abrufen:

```bash
curl http://localhost:3000/openapi.json
```

## Uebungsaufgaben

1. Vergleiche die Dokumentation fuer `POST /orders` mit der Zod-Validierung im
   `order-service`.
2. Dokumentiere den Fehlerfall `400` mit Beispielen fuer eine ungueltige
   `quantity` und eine ungueltige `productId`.
3. Ergaenze die Response `409`, wenn nicht genug Lagerbestand vorhanden ist.
4. Fuehre einen Request direkt aus Swagger UI aus.
5. Bonus: Dokumentiere `GET /products/{id}` und leite den Endpoint im
   `api-gateway` weiter.

## Lernpunkte

- OpenAPI beschreibt den sichtbaren API-Vertrag
- Swagger UI macht diesen Vertrag interaktiv
- Dokumentation und Validierung muessen zusammenpassen
- Fehlerfaelle sind Teil einer vollstaendigen API
