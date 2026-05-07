# Iteration 04: Compose mit Healthchecks

Ziel: Betriebsbereitschaft von Services sichtbar machen.

```bash
docker compose -f compose/docker-compose.best-practice.yml up --build
```

`depends_on` mit `condition: service_healthy` wartet darauf, dass vorgelagerte
Services ihren Healthcheck bestehen.

