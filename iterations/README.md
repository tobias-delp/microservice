# Iterationen

Diese Ordner zeigen den Projektstand nach jedem Lernschritt.

## 01-local

Nur Node.js/Express-Services. Ziel ist API-Kommunikation ohne Container.

## 02-dockerfiles

Die Services haben eigene Dockerfiles und koennen einzeln als Images gebaut
werden.

## 03-compose

Docker Compose startet alle Services zusammen und verbindet sie ueber ein
automatisches Netzwerk.

## 04-healthchecks

Die verbesserte Compose-Datei nutzt Healthchecks und `depends_on` mit
`service_healthy`.

## 05-kubernetes

Kubernetes-Manifeste fuehren Namespace, Deployments, Services und Probes ein.

## 06-github-actions

CI installiert Dependencies, fuehrt Tests aus und baut Docker Images. Ein
zweiter Workflow kann Images nach GHCR veroeffentlichen.

