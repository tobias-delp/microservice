# Iteration 03: Docker Compose

Ziel: Alle Services mit einer Compose-Datei starten.

```bash
docker compose -f compose/docker-compose.yml up --build
```

Compose stellt automatisch ein Netzwerk bereit. Die Services erreichen sich
ueber Namen wie `product-service` oder `order-service`.

