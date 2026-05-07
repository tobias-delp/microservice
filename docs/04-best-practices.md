# Best Practices

- Ein Service pro Container.
- Konfiguration ueber Environment Variables.
- Health-Endpunkte fuer Betrieb und Automatisierung.
- Kleine Docker-Images, hier `node:22-alpine`.
- `npm ci` im Container fuer reproduzierbare Installationen.
- Keine Service-URLs im Code hardcoden, ausser lokalen Defaults fuer die
  Entwicklung.
- Infrastrukturdateien versionieren: Compose, Kubernetes und CI.

