# Architektur

Der Mini-Shop besteht aus mehreren kleinen Services mit je einer klaren
Verantwortung.

```text
Client
  |
  v
api-gateway
  |-----------------> product-service
  |
  v
order-service ------> product-service
  |
  v
inventory-service
```

## Services

`product-service` verwaltet Produktdaten im Speicher.

`inventory-service` verwaltet Lagerbestaende im Speicher.

`order-service` validiert Bestellungen, fragt Produkt- und Lagerdaten per HTTP
ab und speichert angenommene Bestellungen im Speicher.

`api-gateway` ist der zentrale Einstiegspunkt fuer Clients und leitet Requests
an die passenden Services weiter.

## Lernpunkte

- Services kommunizieren ueber HTTP-APIs.
- Jeder Service kann separat gestartet, gebaut und deployed werden.
- Service-URLs werden ueber Environment Variables konfiguriert.
- In Docker Compose und Kubernetes funktioniert Service Discovery ueber
  Servicenamen.

Ein detaillierteres Schaubild steht in `docs/service-communication.md`.
