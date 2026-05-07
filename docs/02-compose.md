# Docker Compose

Compose ersetzt viele einzelne `docker run`-Befehle durch eine deklarative
Datei.

```bash
docker compose -f compose/docker-compose.yml up --build
```

Stoppen:

```bash
docker compose -f compose/docker-compose.yml down
```

Die Services erreichen sich im Compose-Netzwerk ueber ihre Servicenamen, zum
Beispiel `http://product-service:3001`.

