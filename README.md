# Mini Microservices Shop

Ein kompaktes Beispielprojekt fuer eine Lehrveranstaltung zu APIs, Docker,
Docker Compose, Kubernetes und CI/CD.

Die Anwendung besteht aus vier Node.js/Express-Services:

- `product-service` liefert Produktdaten.
- `inventory-service` liefert Lagerbestaende.
- `order-service` nimmt Bestellungen an und ruft Product und Inventory per HTTP auf.
- `api-gateway` ist der Einstiegspunkt fuer Clients.

## Schnellstart lokal

In vier Terminals:

```bash
cd services/product-service && npm install && npm start
cd services/inventory-service && npm install && npm start
cd services/order-service && npm install && npm start
cd services/api-gateway && npm install && npm start
```

Danach:

```bash
curl http://localhost:3000/products
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":"1","quantity":2}'
```

## Iterationen

Die Ordner unter `iterations/` zeigen denselben Shop in aufeinander aufbauenden
Stufen:

| Ordner | Inhalt |
| --- | --- |
| `01-local` | Services lokal ohne Docker starten |
| `02-dockerfiles` | Jeder Service mit eigenem Dockerfile |
| `03-compose` | Start aller Services mit Docker Compose |
| `04-healthchecks` | Compose mit Healthchecks und robusterer Startreihenfolge |
| `05-kubernetes` | Kubernetes-Manifeste fuer lokale Docker-Desktop-Cluster |
| `06-github-actions` | CI und optionaler Docker-Image-Publish |

Die aktuelle Gesamtvariante liegt zusaetzlich im Root unter `services/`,
`compose/`, `k8s/`, `.github/` und `docs/`.

## Ports

| Service | Port |
| --- | --- |
| api-gateway | `3000` |
| product-service | `3001` |
| inventory-service | `3002` |
| order-service | `3003` |

## Docker Compose

```bash
docker compose -f compose/docker-compose.yml up --build
```

Mit Healthchecks:

```bash
docker compose -f compose/docker-compose.best-practice.yml up --build
```

## Kubernetes

Images lokal bauen:

```bash
docker build -t product-service:latest services/product-service
docker build -t inventory-service:latest services/inventory-service
docker build -t order-service:latest services/order-service
docker build -t api-gateway:latest services/api-gateway
```

Manifeste anwenden:

```bash
kubectl apply -f k8s/
kubectl port-forward svc/api-gateway 3000:3000 -n mini-shop
```

