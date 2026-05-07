# Iteration 02: Dockerfiles

Ziel: Images, Container, Port-Mapping und Docker-Netzwerke verstehen.

## Images bauen

```bash
docker build -t product-service:latest services/product-service
docker build -t inventory-service:latest services/inventory-service
docker build -t order-service:latest services/order-service
docker build -t api-gateway:latest services/api-gateway
```

## Container starten

Siehe `docker/manual-run-commands.md`.

